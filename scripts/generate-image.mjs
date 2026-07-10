#!/usr/bin/env node
// Generates a comic-panel image via the Gemini API (no visible sparkle watermark,
// unlike the consumer Gemini app). Requires GEMINI_API_KEY in the environment.
//
// Usage:
//   node scripts/generate-image.mjs --prompt "..." --out public/images/hero.png [--ref photo1.jpg,photo2.jpg]

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, extname } from 'node:path';

const MODEL = 'gemini-2.5-flash-image';
const MIME_BY_EXT = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };

function parseArgs(argv) {
	const args = { ref: [] };
	for (let i = 0; i < argv.length; i++) {
		if (argv[i] === '--prompt') args.prompt = argv[++i];
		else if (argv[i] === '--out') args.out = argv[++i];
		else if (argv[i] === '--ref') args.ref = argv[++i].split(',').map((s) => s.trim());
	}
	return args;
}

async function main() {
	const { prompt, out, ref } = parseArgs(process.argv.slice(2));
	const apiKey = process.env.GEMINI_API_KEY;

	if (!apiKey) {
		console.error('Missing GEMINI_API_KEY environment variable.');
		process.exit(1);
	}
	if (!prompt || !out) {
		console.error('Usage: node scripts/generate-image.mjs --prompt "..." --out path/to/file.png [--ref photo1.jpg,photo2.jpg]');
		process.exit(1);
	}

	const parts = [{ text: prompt }];
	for (const refPath of ref) {
		const ext = extname(refPath).toLowerCase();
		const mimeType = MIME_BY_EXT[ext];
		if (!mimeType) {
			console.error(`Unsupported reference image type: ${refPath}`);
			process.exit(1);
		}
		const data = readFileSync(refPath).toString('base64');
		parts.push({ inlineData: { mimeType, data } });
	}

	const res = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-goog-api-key': apiKey,
			},
			body: JSON.stringify({ contents: [{ parts }] }),
		},
	);

	if (!res.ok) {
		console.error(`Gemini API error ${res.status}: ${await res.text()}`);
		process.exit(1);
	}

	const json = await res.json();
	const imagePart = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);

	if (!imagePart) {
		console.error('No image returned. Full response:', JSON.stringify(json, null, 2));
		process.exit(1);
	}

	mkdirSync(dirname(out), { recursive: true });
	writeFileSync(out, Buffer.from(imagePart.inlineData.data, 'base64'));
	console.log(`Saved: ${out}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
