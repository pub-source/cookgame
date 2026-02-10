// Web Audio API sound effects
const audioCtx = () => {
  if (!(window as any).__audioCtx) {
    (window as any).__audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return (window as any).__audioCtx as AudioContext;
};

function playTone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.3) {
  const ctx = audioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function playCorrect() {
  playTone(523, 0.1, "sine", 0.25);
  setTimeout(() => playTone(659, 0.1, "sine", 0.25), 80);
  setTimeout(() => playTone(784, 0.15, "sine", 0.25), 160);
}

export function playWrong() {
  playTone(200, 0.15, "sawtooth", 0.2);
  setTimeout(() => playTone(150, 0.2, "sawtooth", 0.2), 100);
}

export function playOrderComplete() {
  [523, 659, 784, 1047].forEach((f, i) =>
    setTimeout(() => playTone(f, 0.15, "sine", 0.3), i * 100)
  );
}

export function playTimerWarning() {
  playTone(880, 0.08, "square", 0.15);
}

export function playGameOver() {
  [784, 659, 523, 392].forEach((f, i) =>
    setTimeout(() => playTone(f, 0.25, "triangle", 0.25), i * 200)
  );
}

export function playDoorBell() {
  playTone(1200, 0.15, "sine", 0.2);
  setTimeout(() => playTone(900, 0.2, "sine", 0.2), 150);
}

export function playButtonClick() {
  playTone(600, 0.05, "sine", 0.1);
}

export function playPurchase() {
  [800, 1000, 1200, 1600].forEach((f, i) =>
    setTimeout(() => playTone(f, 0.1, "sine", 0.2), i * 60)
  );
}

export function playLevelUp() {
  [523, 659, 784, 1047, 1318].forEach((f, i) =>
    setTimeout(() => playTone(f, 0.12, "sine", 0.3), i * 80)
  );
}
