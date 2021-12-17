gsap.to('.hero-v1__content-wrap', {
  scrollTrigger: {
    trigger: '.hero-v1',
    start: 'top top',
    markers: false,
    scrub: true,
  },
  y: '-15rem',
});
