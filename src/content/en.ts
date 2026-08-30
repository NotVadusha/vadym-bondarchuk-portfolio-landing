import type { Content } from "./types";

export const en: Content = {
  nav: {
    items: [
      { id: "player", label: "player" },
      { id: "quests", label: "quests" },
      { id: "achv", label: "trophies" },
      { id: "missions", label: "missions" },
      { id: "inv", label: "inventory" },
      { id: "party", label: "party" },
    ],
    location: "Ústí n.L.",
  },

  boot: [
    { text: "$ boot bondarchuk.dev --save v2.1", cls: "cmd" },
    { text: "> exp.world day server ............ ok", cls: "ok" },
    { text: "> clouds, tiles, 5 nodes .......... ok", cls: "ok" },
    { text: "> 24 skills scattered on the map .. ok", cls: "ok" },
    { text: "$ run", cls: "cmd" },
  ],

  hero: {
    prompt: "~/exp_world $",
    typed: 'load --player "Vadym Bondarchuk" … done',
    firstName: "Vadym",
    lastName: "Bondarchuk",
    role: "Full-Stack & Backend Engineer",
    stack: "node.js · typescript · python · go",
    stats: [
      { value: "3~+~ years", label: "of commercial experience" },
      { value: "5–10~k~/day", label: "the product grew — the backend held" },
      { value: "Ústí n.L.", label: "Czechia · remote" },
      { value: "AI~-~native", label: "processes, not hype" },
    ],
    play: "play the experience world",
    specs: "stats",
    metaTop: "exp.world ~v2.1~ — day server",
    metaBottom: "~5 career nodes~ · ~24 skills~ on the map",
    hintTitle: "controls:",
    hintLines: ["WASD / arrows — move", "drag — camera · wheel — zoom", "esc — exit"],
  },

  hud: {
    questLabel: "// current quest",
    mission: "fly the path: ~frontend → full-stack → backend → AI~",
    nodes: "nodes",
    lootLabel: "// loot · skills",
    progress: "world progress",
    exit: "exit · esc",
    sound: "sound",
    soundOff: "muted",
    hints: [
      "*wasd / arrows* — move",
      "drag — camera · wheel — zoom",
      "fly into a node — it opens a quest card",
    ],
    mobileHint: "left thumb — joystick · right — camera",
  },

  dossier: {
    quest: (n, total) => `quest ${n}/${total}`,
    close: "close",
  },

  achievement: {
    nodeOpened: (n, total) => `node ${n}/${total} unlocked`,
    worldDone: "world cleared",
    worldDoneSub: "all 5 nodes — legendary",
  },

  complete: {
    title: "World cleared",
    titleAccent: "★",
    sub: "// all 5 nodes unlocked — achievement granted",
    time: "run time",
    skills: "skills collected",
    nextLabel: "next quest",
    nextValue: "your company?",
    retry: "again",
    toParty: "to the party",
    close: "close",
  },

  webglFallback: {
    text: "The 3D world could not start (WebGL unavailable). Everything that matters is below — just scroll.",
    cta: "to the text résumé",
  },

  nodes: {
    quarnuts: {
      label: "Quarnuts",
      role: "Frontend Engineer · entry point",
      bullets: [
        "An engine of my own in plain JavaScript — rendering and state by hand, no framework.",
        "A restaurant site built on it. The entry point into the profession.",
      ],
      tags: ["JavaScript", "custom engine"],
    },
    developstoday: {
      label: "DevelopsToday",
      role: "Full-Stack Engineer · agency",
      bullets: [
        "~5 products end-to-end: healthtech, geo SaaS, AI/media, mobile.",
        "Tile server on Lambda: <5s over billions of rows, −15% map load time.",
        "RAG on Kafka/Typesense over 1M+ articles.",
        "Healthcare: booking + video + Stripe → Expo → 2 app stores.",
      ],
      tags: ["React", "Node.js", "AWS", "Stripe", "RN"],
    },
    connectiveone: {
      label: "ConnectiveOne",
      role: "Backend Engineer · high-load",
      bullets: [
        "Tracing: OpenTelemetry + Grafana Tempo.",
        "High-load caching → +40% throughput.",
      ],
      tags: ["Node.js", "OTel", "Grafana", "Redis"],
    },
    universe: {
      label: "Universe Group",
      role: "Backend / Full-Stack · Genesis",
      bullets: [
        "STT backend from scratch, sole author, production in 2–3 weeks. Ads brought 5–10k new users/day — the backend held.",
        "Team standards → 7 engineers; the same standards packaged as agent rules for AI.",
        "Autonomous AI agent: Slack → Jira → plan → code → report.",
        "AI adoption: meetings grew from 4 to 30–40 people.",
      ],
      tags: ["TypeScript", "Node.js", "Kafka", "PostgreSQL", "LLM", "AWS"],
    },
    next: {
      label: "Next: your company",
      role: "AI-native engineer · open to offers",
      bullets: [
        "I don't just use AI — I build processes around it and teach others.",
        "Contacts at the bottom of the page. LFG!",
      ],
      tags: ["backend", "production", "AI processes"],
    },
  },

  player: {
    tag: "save_01 ~//~ player",
    title: "Stats",
    aside: "the short version. the rest is in the quest log below",
    initials: "VB",
    level: "LVL 3+",
    name: "Vadym Bondarchuk",
    cls: "class: full-stack & backend · guild: free agent · ex-Universe Group (Genesis)",
    bio: "There was no plan: front-end left me wanting to see what was under the hood — and that question kept pulling me one layer down. *frontend → full-stack agency → backend ownership → full-stack again*. AI-native by mindset: I don't just use the tools — *I build processes around them* and teach others to do the same.",
    sticks: ["AI writes the code. I write the rules."],
    facts: [
      "location: ~Ústí nad Labem~",
      "experience: ~3+ years~",
      "mode: ~AI-native~",
      "languages: ~ukr · eng · čeština~",
    ],
    sheetHeader:
      "// stat sheet — an honest self-assessment: every star has proof, every missing one has a reason",
    sheetRows: [
      {
        name: "Backend ownership",
        filled: 5,
        proof:
          "STT backend from scratch, sole author; production in 2–3 weeks; held an ad-driven ramp to 5–10k new users/day.",
        why: "why 5: design, code, deploy, monitoring — one person. 5/5 here describes the staffing, it isn't bragging.",
      },
      {
        name: "Full-stack",
        filled: 4,
        proof:
          "~5 products end-to-end: from React front-ends to a tile server on Lambda and RAG over 1M+ articles.",
        why: "why not 5: no native iOS/Android. counterweight: React Native + Expo, two app stores.",
      },
      {
        name: "AI-native",
        filled: 5,
        proof:
          "autonomous agent (Slack → Jira → plan → code → report); backend standards repackaged as agent rules; onboarded the team onto Cursor/Claude Code.",
        why: "why 5: not «I use Copilot» — I build the processes that people and agents both work inside.",
      },
      {
        name: "Team play",
        filled: 4,
        proof:
          "standards 7 engineers work by; meetups from 4 to 40 people; I mentor colleagues on AI tooling.",
        why: "why not 5: no formal tech-lead title — influence without the captain's armband.",
      },
      {
        name: "Time to production",
        filled: 4,
        proof: "from first commit to STT in production — 2–3 weeks.",
        why: "why not 5: I'll award the fifth star once I repeat it on a second product.",
      },
    ],
  },

  quests: {
    tag: "save_02 ~//~ quest_log",
    title: "Quest log",
    items: [
      {
        code: "QUEST #04",
        status: "completed",
        title: "Universe Group",
        meta: "2023 — August 2026 · Backend / Full-Stack · part of Genesis",
        bullets: [
          "*STT backend from scratch, sole author*, shipped in 2–3 weeks. When ads pushed the product to ~5–10k new users/day~ — the backend digested that growth.",
          "*Backend team standards*: guidelines, Git conventions → *7 engineers* on one set of rules; repackaged as *agent rules* that AI agents apply automatically.",
          "*Autonomous AI agent* (my idea, built with the team): Slack → Jira → plan → code → report, plus a second agent for data gathering.",
          "Drove *AI adoption without formal authority*: knowledge sharing grew from *4 to 30–40 people*.",
        ],
        tags: ["TypeScript", "Node.js", "Kafka", "PostgreSQL", "LLM", "K8s", "AWS"],
      },
      {
        code: "QUEST #03",
        status: "completed",
        title: "ConnectiveOne",
        meta: "2023 · Backend · high-load",
        bullets: [
          "Distributed tracing: *OpenTelemetry + Grafana Tempo* — you see the system instead of guessing.",
          "Caching on high-load endpoints → ~+40% throughput~.",
        ],
        tags: ["Node.js", "OpenTelemetry", "Grafana", "Redis"],
      },
      {
        code: "QUEST #02",
        status: "completed",
        title: "DevelopsToday",
        meta: "2022 — 2023 · Full-Stack · product agency",
        bullets: [
          "*~5 products end-to-end*: healthtech, geospatial SaaS, AI/media, mobile.",
          "Tile server on *AWS Lambda*: ~<5s over billions of rows~, −15% map load time.",
          "*RAG* on Kafka/Typesense over *1M+ articles*.",
          "Healthcare: booking + video + Stripe → Expo → *2 app stores*.",
        ],
        tags: ["React", "Node.js", "AWS", "Stripe", "React Native"],
      },
      {
        code: "QUEST #01",
        status: "completed",
        title: "Quarnuts",
        meta: "2021 — 2022 · Frontend · entry point",
        bullets: [
          "*An engine of my own in plain JavaScript*: rendering, state and routing by hand, no framework.",
          "A restaurant site built on that engine.",
        ],
        tags: ["JavaScript", "custom engine"],
      },
    ],
  },

  achievements: {
    tag: "save_03 ~//~ trophy_room",
    title: "Trophies",
    items: [
      {
        xp: "+9999 XP",
        num: "0→5–10k",
        text: "new users every day, brought in by ads. My half of the deal: an STT backend from scratch, one author, production in 2–3 weeks — and it digested that growth.",
        big: true,
      },
      { xp: "+500 XP", num: "2–3 ~wks~", text: "from first commit to STT in production." },
      { xp: "+400 XP", num: "+40~%~", text: "throughput on high-load endpoints." },
      { xp: "+300 XP", num: "−15~%~", text: "map load time, <5s over billions of rows." },
      { xp: "+350 XP", num: "1M~+~", text: "articles in a Kafka → Typesense RAG pipeline." },
      { xp: "+450 XP", num: "7", text: "engineers working to standards I wrote." },
      { xp: "+250 XP", num: "4→40", text: "people at the AI meetups I started." },
      {
        xp: "+100 XP",
        num: "24",
        text: "skills hidden in the world above — click to go collect them.",
        play: true,
      },
    ],
  },

  missions: {
    tag: "save_04 ~//~ completed_quests",
    title: "Closed missions",
    done: "completed",
    difficulty: "difficulty",
    lootPrefix: "loot:",
    items: [
      {
        code: "M–01",
        stars: 4,
        title: "STT backend from scratch",
        diagram: "audio → api → pipeline → transcript",
        reward: "held 5–10k/day",
      },
      {
        code: "M–02",
        stars: 5,
        title: "Autonomous AI agent",
        diagram: "slack → jira → plan → code ↩ (+agent₂)",
        reward: "ttm ↓ for marketing",
      },
      {
        code: "M–03",
        stars: 4,
        title: "Tile server on Lambda",
        diagram: "client → lambda → 1B+ rows < 5s",
        reward: "−15% map time",
      },
      {
        code: "M–04",
        stars: 3,
        title: "RAG over 1M+ articles",
        diagram: "1M+ → kafka → typesense → llm",
        reward: "search that works",
      },
      {
        code: "M–05",
        stars: 3,
        title: "Web → 2 app stores",
        diagram: "booking+video+stripe → expo → ios+android",
        reward: "2 app stores",
      },
      {
        code: "M–06",
        stars: 2,
        title: "Tracing + cache",
        diagram: "otel → tempo · cache → +40%",
        reward: "+40% throughput",
      },
    ],
  },

  inventory: {
    tag: "save_05 ~//~ inventory",
    title: "Inventory",
    aside: "legendary — in production daily. the rest — from real projects",
    rarity: ["common", "rare", "legendary"],
    found: "collected in the world:",
    stacks: [
      {
        label: "// languages",
        tokens: [
          { label: "TypeScript", rarity: 3, skill: "TypeScript" },
          { label: "JavaScript", rarity: 1, skill: "JavaScript" },
          { label: "Python", rarity: 2, skill: "Python" },
          { label: "Go", rarity: 2, skill: "Go" },
        ],
      },
      {
        label: "// backend",
        tokens: [
          { label: "Node.js", rarity: 3, skill: "Node.js" },
          { label: "NestJS", rarity: 2, skill: "NestJS" },
          { label: "Express", rarity: 1, skill: "Express" },
          { label: "PostgreSQL", rarity: 3, skill: "PostgreSQL" },
          { label: "Kafka", rarity: 3, skill: "Kafka" },
          { label: "Redis", rarity: 2, skill: "Redis" },
          { label: "WebSocket", rarity: 1, skill: "WebSocket" },
          { label: "Stripe", rarity: 2, skill: "Stripe" },
        ],
      },
      {
        label: "// frontend",
        tokens: [
          { label: "React", rarity: 3, skill: "React" },
          { label: "Next.js", rarity: 2, skill: "Next.js" },
          { label: "React Native", rarity: 2, skill: "React Native" },
          { label: "Expo", rarity: 1, skill: "Expo" },
        ],
      },
      {
        label: "// infra",
        tokens: [
          { label: "Docker", rarity: 2, skill: "Docker" },
          { label: "Kubernetes", rarity: 2, skill: "Kubernetes" },
          { label: "AWS", rarity: 3, skill: "AWS" },
          { label: "GCP", rarity: 1, skill: "GCP" },
        ],
      },
      {
        label: "// ai",
        tokens: [
          { label: "LLM integrations", rarity: 3, skill: "LLM" },
          { label: "RAG pipelines", rarity: 1 },
          { label: "Claude Code", rarity: 1 },
          { label: "Cursor", rarity: 1 },
          { label: "agent workflows", rarity: 1 },
        ],
      },
      {
        label: "// observability",
        tokens: [
          { label: "OpenTelemetry", rarity: 2, skill: "OpenTelemetry" },
          { label: "Grafana Tempo", rarity: 2, skill: "Grafana" },
          { label: "Typesense", rarity: 2, skill: "Typesense" },
        ],
      },
    ],
    note: "~✓~ — collected in the game on the first screen. state is shared between the world and this page.",
  },

  party: {
    tag: "save_06 ~//~ party",
    aside: "I reply fast",
    title: "Next quest — ~on your team~",
    lead: "Get in touch — let's take your problem apart on the merits: what we build, where it gets stuck, when it ships.",
    sticker: "LFG!",
    copied: "copied →",
    footerLeft: "© 2026 · Vadym Bondarchuk",
    footerBack: "↑ back to the world",
  },

  scoreboard: { nodes: "nodes", skills: "skills" },
};
