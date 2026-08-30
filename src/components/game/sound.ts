/**
 * Tiny WebAudio synth — no audio files, lazy AudioContext (autoplay policies).
 * Must be `ensureAudio()`-ed once from a user gesture (the "play" click).
 */

let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(value: boolean) {
  muted = value;
}

export function ensureAudio() {
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;
      ctx = new Ctor();
    }
    if (ctx.state === "suspended") void ctx.resume();
  } catch {
    ctx = null;
  }
}

function tone(
  freq: number,
  duration: number,
  opts: { type?: OscillatorType; gain?: number; delay?: number } = {},
) {
  if (muted || !ctx) return;
  const { type = "sine", gain = 0.14, delay = 0 } = opts;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export const sound = {
  /** Short high "blip" for a collected skill crystal. */
  pickup() {
    tone(680 + Math.random() * 160, 0.12, { type: "triangle", gain: 0.12 });
  },
  /** Two-note chord for opening a career node. */
  nodeOpen() {
    tone(300, 0.2, { type: "sine", gain: 0.16 });
    tone(450, 0.3, { type: "sine", gain: 0.16, delay: 0.12 });
  },
  /** Victory arpeggio. */
  victory() {
    [392, 523, 659].forEach((f, i) =>
      tone(f, 0.4, { type: "triangle", gain: 0.14, delay: i * 0.16 }),
    );
  },
};
