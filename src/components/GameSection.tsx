import { Component, useEffect, useRef, useState } from "react";
import type { ErrorInfo, ReactNode } from "react";

import { CompleteModal } from "@/components/game/CompleteModal";
import { DossierPanel } from "@/components/game/DossierPanel";
import { GameCanvas } from "@/components/game/GameCanvas";
import { HeroOverlay } from "@/components/game/HeroOverlay";
import { Hud } from "@/components/game/Hud";
import { sound, ensureAudio, setMuted } from "@/components/game/sound";
import { useGameControls } from "@/components/game/useGameControls";
import type { JoyVisual } from "@/components/game/useGameControls";
import { CAREER_NODES } from "@/constants/gameData";
import { useI18n } from "@/i18n";
import { useGameStore } from "@/store/gameStore";

const NO_JOY: JoyVisual = { active: false, cx: 0, cy: 0, dx: 0, dy: 0 };

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function WebglFallback() {
  const { c } = useI18n();
  return (
    <div id="glno">
      <div>
        {c.webglFallback.text}
        <br />
        <br />
        <a className="btn" href="#player">
          {c.webglFallback.cta}
        </a>
      </div>
    </div>
  );
}

class GameErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Game crashed:", error, info.componentStack);
  }

  render() {
    return this.state.failed ? <WebglFallback /> : this.props.children;
  }
}

export function GameSection() {
  const phase = useGameStore((s) => s.phase);
  const muted = useGameStore((s) => s.muted);
  const visitedNodes = useGameStore((s) => s.visitedNodes);
  const requestStart = useGameStore((s) => s.requestStart);
  const requestExit = useGameStore((s) => s.requestExit);
  const restart = useGameStore((s) => s.restart);
  const finish = useGameStore((s) => s.finish);
  const showDonePopup = useGameStore((s) => s.showDonePopup);
  const containerRef = useRef<HTMLDivElement>(null);
  const [joy, setJoy] = useState<JoyVisual>(NO_JOY);
  const [webgl] = useState(isWebGLSupported);

  useGameControls(containerRef, setJoy);

  // Lock the page while the game owns the viewport. The "play" click can
  // scroll first, so snap back to the top as well.
  useEffect(() => {
    const locked = phase !== "idle";
    if (locked) window.scrollTo({ top: 0 });
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => setMuted(muted), [muted]);

  // Victory: all nodes visited → achievement popup, then the summary card.
  useEffect(() => {
    if (phase !== "playing" || visitedNodes.length < CAREER_NODES.length) return;
    showDonePopup();
    const timer = setTimeout(() => {
      sound.victory();
      finish();
    }, 1100);
    return () => clearTimeout(timer);
  }, [phase, visitedNodes, finish, showDonePopup]);

  return (
    <section id="world">
      {webgl ? (
        <GameErrorBoundary>
          <div
            ref={containerRef}
            id="game-root"
            className="absolute inset-0"
            style={{ touchAction: phase === "playing" ? "none" : "pan-y" }}
          >
            <GameCanvas />
          </div>
          <HeroOverlay
            hidden={phase !== "idle"}
            onPlay={() => {
              ensureAudio();
              requestStart();
            }}
          />
          <Hud joy={joy} visible={phase === "playing" || phase === "transition"} />
          <DossierPanel />
          {phase === "complete" && (
            <CompleteModal
              onRestart={restart}
              onParty={() => {
                requestExit();
                setTimeout(
                  () =>
                    document
                      .getElementById("party")
                      ?.scrollIntoView({ behavior: "smooth" }),
                  1300,
                );
              }}
              onClose={requestExit}
            />
          )}
        </GameErrorBoundary>
      ) : (
        <WebglFallback />
      )}
    </section>
  );
}
