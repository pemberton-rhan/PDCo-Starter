/* Custom GSAP animations
-------------------------------------------------------------- */
gsap.to('header', {
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    markers: false,
    scrub: true,
  },
  y: '-6rem',
});
