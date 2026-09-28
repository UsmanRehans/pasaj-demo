(() => {
  'use strict';
  const section = document.getElementById('pasaj-product-film');
  const video = section?.querySelector('[data-product-film]');
  const toggle = section?.querySelector('[data-film-toggle]');
  const status = section?.querySelector('[data-film-status]');
  if (!video || !toggle) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let userPaused = false;
  let manualPlay = false;
  let failed = false;
  video.autoplay = false;
  video.removeAttribute('autoplay');
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.pause();
  toggle.hidden = false;
  const allowed = () => visible && !document.hidden && !failed && !userPaused && (!motion.matches || manualPlay);
  function update() {
    const playing = !video.paused && !video.ended;
    toggle.textContent = playing ? 'Pause film' : 'Play film';
    toggle.setAttribute('aria-label', playing ? 'Pause product film' : 'Play product film');
    section.dataset.filmPlaying = String(playing);
  }
  function pause() { video.pause(); update(); }
  async function sync() {
    if (!allowed()) { pause(); return; }
    if (!video.paused) return;
    try {
      await video.play();
      if (!allowed()) video.pause();
    } catch (_) {
      // A browser may block autoplay. The visible play button remains usable.
    }
    update();
  }
  function onToggle() {
    if (!video.paused) { userPaused = true; manualPlay = false; pause(); }
    else { userPaused = false; manualPlay = true; sync(); }
  }
  function onMotion() { manualPlay = false; sync(); }
  function onError() {
    failed = true;
    pause();
    toggle.hidden = true;
    section.dataset.filmError = 'true';
    if (status) { status.hidden = false; status.textContent = 'The film is unavailable. Please try again later.'; }
  }
  toggle.addEventListener('click', onToggle);
  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  video.addEventListener('error', onError);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', onMotion);
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.15;
    sync();
  }, { threshold: [0, 0.15] }) : null;
  if (observer) observer.observe(video);
  else {
    // Older browsers receive manual playback rather than offscreen autoplay.
    visible = true;
    userPaused = true;
  }
  window.addEventListener('pagehide', pause);
  window.addEventListener('pageshow', sync);
  // The static page owns these listeners. Disconnect when a host explicitly removes it.
  section.addEventListener('pasaj:film-destroy', () => {
    pause();
    observer?.disconnect();
    toggle.removeEventListener('click', onToggle);
    video.removeEventListener('play', update);
    video.removeEventListener('pause', update);
    video.removeEventListener('error', onError);
    document.removeEventListener('visibilitychange', sync);
    motion.removeEventListener('change', onMotion);
    window.removeEventListener('pagehide', pause);
    window.removeEventListener('pageshow', sync);
  }, { once: true });
  if (video.error) onError();
  update();
})();
