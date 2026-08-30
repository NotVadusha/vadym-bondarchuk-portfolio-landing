/**
 * Shape of all user-facing copy. Two implementations (uk / en) must stay in
 * sync — TypeScript enforces it.
 *
 * Rich strings support two inline markers, rendered by <Rich>:
 *   *bold*   → <b> (ink)
 *   ~accent~ → <em> (orange)
 */

export interface StatCard {
  value: string;
  label: string;
}

export interface SheetRow {
  name: string;
  filled: number;
  /** Evidence for the stars that are filled. */
  proof: string;
  /** Why the row stops where it stops (or why it maxes out). */
  why: string;
}

export interface Quest {
  code: string;
  active?: boolean;
  status: string;
  title: string;
  meta: string;
  bullets: string[];
  tags: string[];
}

export interface Achievement {
  xp: string;
  num: string;
  text: string;
  big?: boolean;
  /** Renders as a button that scrolls up and starts the game. */
  play?: boolean;
}

export interface Mission {
  code: string;
  stars: number;
  title: string;
  diagram: string;
  /** Loot chip text, rendered after the shared `loot:` prefix. */
  reward: string;
}

export interface InventoryToken {
  label: string;
  rarity: 1 | 2 | 3;
  /** Matching skill name in the game world, if any. */
  skill?: string;
}

export interface InventoryStack {
  label: string;
  tokens: InventoryToken[];
}

export interface NodeCopy {
  /** Display name on the 3D map and in the HUD. */
  label: string;
  role: string;
  bullets: string[];
  tags: string[];
}

export interface Content {
  nav: {
    items: { id: string; label: string }[];
    location: string;
  };
  boot: { text: string; cls?: "ok" | "cmd" }[];
  hero: {
    prompt: string;
    typed: string;
    firstName: string;
    lastName: string;
    role: string;
    stack: string;
    stats: StatCard[];
    play: string;
    specs: string;
    metaTop: string;
    metaBottom: string;
    hintTitle: string;
    hintLines: string[];
  };
  hud: {
    questLabel: string;
    mission: string;
    nodes: string;
    lootLabel: string;
    progress: string;
    exit: string;
    sound: string;
    soundOff: string;
    hints: string[];
    mobileHint: string;
  };
  dossier: {
    quest: (n: number, total: number) => string;
    close: string;
  };
  achievement: {
    nodeOpened: (n: number, total: number) => string;
    worldDone: string;
    worldDoneSub: string;
  };
  complete: {
    title: string;
    titleAccent: string;
    sub: string;
    time: string;
    skills: string;
    nextLabel: string;
    nextValue: string;
    retry: string;
    toParty: string;
    close: string;
  };
  webglFallback: { text: string; cta: string };
  nodes: Record<string, NodeCopy>;
  player: {
    tag: string;
    title: string;
    aside: string;
    initials: string;
    level: string;
    name: string;
    cls: string;
    bio: string;
    sticks: string[];
    facts: string[];
    sheetHeader: string;
    sheetRows: SheetRow[];
  };
  quests: { tag: string; title: string; items: Quest[] };
  achievements: { tag: string; title: string; items: Achievement[] };
  missions: {
    tag: string;
    title: string;
    /** Shared card labels — every mission is closed. */
    done: string;
    difficulty: string;
    lootPrefix: string;
    items: Mission[];
  };
  inventory: {
    tag: string;
    title: string;
    aside: string;
    rarity: [string, string, string];
    found: string;
    stacks: InventoryStack[];
    note: string;
  };
  party: {
    tag: string;
    aside: string;
    title: string;
    lead: string;
    sticker: string;
    copied: string;
    footerLeft: string;
    footerBack: string;
  };
  scoreboard: { nodes: string; skills: string };
}
