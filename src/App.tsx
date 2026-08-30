import { BootScreen } from "@/components/BootScreen";
import { GameSection } from "@/components/GameSection";
import { Nav } from "@/components/Nav";
import { AchievementPopup } from "@/components/game/AchievementPopup";
import { ScoreboardChip } from "@/components/game/ScoreboardChip";
import { Achievements } from "@/components/sections/Achievements";
import { Inventory } from "@/components/sections/Inventory";
import { Missions } from "@/components/sections/Missions";
import { Party } from "@/components/sections/Party";
import { PlayerSection } from "@/components/sections/PlayerSection";
import { QuestLog } from "@/components/sections/QuestLog";
import { useReveal } from "@/hooks/useReveal";
import { useI18n } from "@/i18n";

export default function App() {
  const { lang } = useI18n();
  // A language switch remounts keyed content, so re-observe the new nodes.
  useReveal([lang]);

  return (
    <>
      <BootScreen />
      <Nav />
      <GameSection />
      <PlayerSection />
      <QuestLog />
      <Achievements />
      <Missions />
      <Inventory />
      <Party />
      <AchievementPopup />
      <ScoreboardChip />
    </>
  );
}
