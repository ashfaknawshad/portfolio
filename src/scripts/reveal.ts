// Shared scroll-reveal engine for the whole page.
//
// Goal: elements "fall in" once, only when reached by scrolling DOWN. Anything reached by
// scrolling UP — including the whole page above your position after a mid-page refresh —
// must already be settled, never animating.
//
// How the direction-awareness works without tracking scroll velocity, and robustly
// against the browser restoring scroll position on reload:
//   1. Everything is observed by one IntersectionObserver.
//   2. Reveals that happen during an initial "settling" window (before the browser has
//      restored scroll and the first observer callbacks have flushed) are INSTANT — no
//      animation. So whatever issue you reload into just appears.
//   3. After `load` + two frames, a one-time sweep instantly settles anything now at or
//      above the fold that never intersected (i.e. it sits above your restored scroll
//      position), then arms animation.
//   4. From then on, only elements entering view via a genuine downward scroll animate.
//      Anything above where you are was already settled in steps 2–3, so scrolling up
//      never triggers a reveal.
//
// Fail-safe: the hidden pre-reveal state is gated on `html.js` (set inline in <head>) and
// neutralized under prefers-reduced-motion, so no-JS / no-IntersectionObserver /
// reduced-motion visitors always get fully-visible, static content.

const REVEALED = 'is-revealed';
const INSTANT = 'reveal-instant';

function reveal(el: Element, instant: boolean) {
	if (instant) el.classList.add(INSTANT);
	el.classList.add(REVEALED);
}

function init() {
	const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
	if (els.length === 0) return;

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduceMotion || !('IntersectionObserver' in window)) {
		for (const el of els) reveal(el, true);
		return;
	}

	// Until the initial scroll position has settled, reveals are instant (no animation).
	let settled = false;

	const observer = new IntersectionObserver(
		(entries, obs) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					reveal(entry.target, !settled);
					obs.unobserve(entry.target);
				}
			}
		},
		// Fire a touch before the element is fully in view so it's already settling by
		// the time it's comfortably on screen.
		{ rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
	);

	for (const el of els) observer.observe(el);

	// Arm animation on the first genuine user intent to scroll. This is the one signal
	// reliably AFTER the browser has finished restoring scroll on a reload (scroll
	// restoration never involves wheel/touch/key/pointer input), which `load` + a couple
	// frames is not — restoration can land later than that. Just before arming, sweep
	// everything now at/above the fold to an instant (un-animated) revealed state: on a
	// mid-page refresh that's the whole page above your restored position, so scrolling
	// back up finds it already settled and nothing re-animates.
	const settle = () => {
		if (settled) return;
		const foldline = window.innerHeight;
		for (const el of els) {
			if (!el.classList.contains(REVEALED) && el.getBoundingClientRect().top < foldline) {
				reveal(el, true);
				observer.unobserve(el);
			}
		}
		settled = true;
	};

	for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const) {
		window.addEventListener(type, settle, { once: true, passive: true });
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
	init();
}
