/** A compositor animation owns every frame. JavaScript only handles lifecycle and input. */
export function createTimelineMotion({
  section, viewport, track, sequence, count, onNavigate,
}: {
  section: HTMLElement;
  viewport: HTMLElement;
  track: HTMLElement;
  sequence: HTMLElement;
  count: number;
  onNavigate: (index: number) => void;
}) {
  const pixelsPerSecond = 12;
  const resumeDelay = 4000;
  let cycle = 0;
  let step = 0;
  let viewportWidth = 0;
  let automatic: Animation | null = null;
  let manual: Animation | null = null;
  let resumeTimer: ReturnType<typeof setTimeout> | undefined;
  let visible = false;
  let hidden = document.hidden;
  let hovered = false;
  let focused = section.contains(document.activeElement);
  let userPaused = false;
  let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let coolingDown = false;
  let pointer: { id: number; x: number; y: number; origin: number; horizontal: boolean } | null = null;

  const modulo = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;
  const transform = (x: number) => `translate3d(${x}px, 0, 0)`;
  // Two identical sequences on either side give manual movement room across either seam.
  const normalize = (x: number) => -2 * cycle + modulo(x + 2 * cycle, cycle);

  function currentX() {
    if (manual) return new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
    return -cycle - modulo(Number(automatic?.currentTime ?? 0) * pixelsPerSecond / 1000, cycle);
  }

  function sync() {
    const available = visible && !hidden;
    const autoplay = available && !reduced && !userPaused && !hovered && !focused && !pointer && !manual && !coolingDown;
    if (automatic) {
      if (autoplay && automatic.playState !== "running") automatic.play();
      else if (!autoplay && automatic.playState !== "paused") automatic.pause();
    }
    if (manual) {
      if (available && manual.playState !== "running") manual.play();
      else if (!available && manual.playState !== "paused") manual.pause();
    }
    track.dataset.motion = manual ? (available ? "manual" : "paused") : autoplay ? "auto" : "paused";
  }

  function setPosition(x: number) {
    if (automatic) automatic.currentTime = modulo(-cycle - normalize(x), cycle) / pixelsPerSecond * 1000;
  }

  function cancelManual() {
    if (!manual) return;
    const animation = manual;
    manual = null;
    animation.onfinish = null;
    animation.cancel();
  }

  function delayResume() {
    clearTimeout(resumeTimer);
    coolingDown = true;
    resumeTimer = setTimeout(() => { coolingDown = false; sync(); }, resumeDelay);
  }

  function moveTo(x: number, target: number) {
    clearTimeout(resumeTimer);
    coolingDown = true;
    automatic?.pause();
    cancelManual();
    setPosition(x);
    if (reduced) {
      setPosition(target);
      delayResume();
      sync();
      return;
    }
    manual = track.animate(
      [{ transform: transform(x) }, { transform: transform(target) }],
      { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" },
    );
    manual.onfinish = () => {
      // Normalizing by one whole sequence is visually identical, including its rail.
      setPosition(target);
      cancelManual();
      delayResume();
      sync();
    };
    sync();
  }

  function navigate(direction: number) {
    if (!cycle) return;
    const x = currentX();
    const center = viewportWidth / 2 - x;
    const lap = Math.floor(center / cycle);
    let nearest = 0;
    let distance = Infinity;
    // Search neighboring sequences because the last-to-first spacing is larger.
    for (let repeat = lap - 1; repeat <= lap + 1; repeat++) {
      for (let index = 0; index < count; index++) {
        const delta = Math.abs(repeat * cycle + (index + 0.5) * step - center);
        if (delta < distance) { distance = delta; nearest = repeat * count + index; }
      }
    }
    const targetIndex = nearest + direction;
    const index = modulo(targetIndex, count);
    const targetCenter = Math.floor(targetIndex / count) * cycle + (index + 0.5) * step;
    moveTo(x, viewportWidth / 2 - targetCenter);
    onNavigate(index);
  }

  function measure() {
    const nextCycle = sequence.getBoundingClientRect().width;
    viewportWidth = viewport.clientWidth;
    if (!nextCycle || Math.abs(nextCycle - cycle) < 0.1) return;
    const phase = cycle ? modulo(currentX() + 2 * cycle, cycle) / cycle : 0;
    if (manual || pointer) delayResume();
    pointer = null;
    cancelManual();
    automatic?.cancel();
    cycle = nextCycle;
    step = (sequence.firstElementChild as HTMLElement).getBoundingClientRect().width;
    automatic = track.animate(
      [{ transform: transform(-cycle) }, { transform: transform(-2 * cycle) }],
      { duration: cycle / pixelsPerSecond * 1000, iterations: Infinity, easing: "linear" },
    );
    automatic.pause();
    setPosition(-2 * cycle + phase * cycle);
    sync();
  }

  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  const resize = new ResizeObserver(measure);
  observer.observe(viewport);
  resize.observe(sequence);
  resize.observe(viewport);
  measure();

  const onVisibility = () => { hidden = document.hidden; sync(); };
  const onEnter = (event: PointerEvent) => { if (event.pointerType !== "touch") { hovered = true; sync(); } };
  const onLeave = () => { hovered = false; if (pointer && !pointer.horizontal) { pointer = null; delayResume(); } sync(); };
  const onFocus = () => { focused = true; sync(); };
  const onBlur = (event: FocusEvent) => { focused = event.relatedTarget instanceof Node && section.contains(event.relatedTarget); sync(); };
  const onPointerDown = (event: PointerEvent) => {
    if (!event.isPrimary || event.button !== 0 || !cycle) return;
    const x = currentX();
    cancelManual();
    setPosition(x);
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, origin: x, horizontal: false };
    sync();
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!pointer || event.pointerId !== pointer.id) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (!pointer.horizontal) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) { pointer = null; delayResume(); sync(); return; }
      pointer.horizontal = true;
      viewport.setPointerCapture(event.pointerId);
    }
    setPosition(pointer.origin + dx);
  };
  const onPointerEnd = (event: PointerEvent) => {
    if (!pointer || event.pointerId !== pointer.id) return;
    const dragged = pointer.horizontal;
    pointer = null;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (dragged) navigate(0);
    else { delayResume(); sync(); }
  };

  document.addEventListener("visibilitychange", onVisibility);
  section.addEventListener("pointerenter", onEnter);
  section.addEventListener("pointerleave", onLeave);
  section.addEventListener("focusin", onFocus);
  section.addEventListener("focusout", onBlur);
  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", onPointerEnd);
  viewport.addEventListener("pointercancel", onPointerEnd);

  return {
    navigate,
    pause(value: boolean) { userPaused = value; sync(); },
    reduce(value: boolean) {
      reduced = value;
      if (value && manual) {
        const x = currentX();
        cancelManual();
        setPosition(x);
        delayResume();
      }
      sync();
    },
    destroy() {
      clearTimeout(resumeTimer);
      observer.disconnect();
      resize.disconnect();
      cancelManual();
      automatic?.cancel();
      document.removeEventListener("visibilitychange", onVisibility);
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("focusin", onFocus);
      section.removeEventListener("focusout", onBlur);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerEnd);
      viewport.removeEventListener("pointercancel", onPointerEnd);
    },
  };
}
