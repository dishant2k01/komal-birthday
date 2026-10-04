'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function ensureGsap() {
  if (typeof window === 'undefined') return { gsap, ScrollTrigger };
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function fadeUp(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
) {
  const { gsap } = ensureGsap();
  const list = gsap.utils.toArray(targets).filter(Boolean);
  if (!list.length) return gsap.timeline({ paused: Boolean(vars.paused) });
  return gsap.fromTo(
    list,
    { opacity: 0, y: 40, filter: 'blur(6px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out',
      stagger: 0.08,
      ...vars,
    }
  );
}

export function imageReveal(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {}
) {
  const { gsap } = ensureGsap();
  return gsap.fromTo(
    targets,
    {
      opacity: 0,
      scale: 1.08,
      filter: 'blur(10px)',
      clipPath: 'inset(8% 8% 8% 8%)',
    },
    {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.35,
      ease: 'power3.out',
      ...vars,
    }
  );
}

export function sectionTrigger(
  trigger: Element | string,
  animation: gsap.core.Animation,
  vars: ScrollTrigger.Vars = {}
) {
  const { ScrollTrigger } = ensureGsap();
  return ScrollTrigger.create({
    trigger,
    start: 'top 78%',
    animation,
    once: true,
    ...vars,
  });
}
