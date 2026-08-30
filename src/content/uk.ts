import type { Content } from "./types";

export const uk: Content = {
  nav: {
    items: [
      { id: "player", label: "гравець" },
      { id: "quests", label: "квести" },
      { id: "achv", label: "трофеї" },
      { id: "missions", label: "місії" },
      { id: "inv", label: "інвентар" },
      { id: "party", label: "партія" },
    ],
    location: "Ústí n.L.",
  },

  boot: [
    { text: "$ boot bondarchuk.dev --save v2.1", cls: "cmd" },
    { text: "> денний сервер exp.world ......... ok", cls: "ok" },
    { text: "> хмари, тайли, 5 вузлів .......... ok", cls: "ok" },
    { text: "> 24 скіли розкидав по мапі ....... ok", cls: "ok" },
    { text: "$ run", cls: "cmd" },
  ],

  hero: {
    prompt: "~/exp_world $",
    typed: 'load --player "Вадим Бондарчук" … готово',
    firstName: "Вадим",
    lastName: "Бондарчук",
    role: "Full-Stack & Backend Engineer",
    stack: "node.js · typescript · python · go",
    stats: [
      { value: "3~+~ роки", label: "комерційного досвіду" },
      { value: "5–10~k~/день", label: "продукт ріс — бек тримав" },
      { value: "Ústí n.L.", label: "Чехія · remote" },
      { value: "AI~-~native", label: "процеси, не хайп" },
    ],
    play: "грати у світ досвіду",
    specs: "характеристики",
    metaTop: "exp.world ~v2.1~ — денний сервер",
    metaBottom: "~5 вузлів~ кар'єри · ~24 скіли~ на мапі",
    hintTitle: "керування:",
    hintLines: ["WASD / стрілки — рух", "drag — камера · колесо — зум", "esc — вихід"],
  },

  hud: {
    questLabel: "// поточний квест",
    mission: "пройди шлях: ~frontend → full-stack → backend → AI~",
    nodes: "вузлів",
    lootLabel: "// лут · скіли",
    progress: "прогрес світу",
    exit: "вихід · esc",
    sound: "звук",
    soundOff: "без звуку",
    hints: [
      "*wasd / стрілки* — рух",
      "drag — камера · колесо — зум",
      "влітай у вузли — відкриють квест-картку",
    ],
    mobileHint: "лівий палець — джойстик · правий — камера",
  },

  dossier: {
    quest: (n, total) => `квест ${n}/${total}`,
    close: "закрити",
  },

  achievement: {
    nodeOpened: (n, total) => `вузол ${n}/${total} відкрито`,
    worldDone: "світ пройдено",
    worldDoneSub: "усі 5 вузлів — легендарно",
  },

  complete: {
    title: "Світ пройдено",
    titleAccent: "★",
    sub: "// усі 5 вузлів відкрито — досягнення зараховано",
    time: "час проходження",
    skills: "скілів зібрано",
    nextLabel: "наступний квест",
    nextValue: "твоя компанія?",
    retry: "ще раз",
    toParty: "до партії",
    close: "закрити",
  },

  webglFallback: {
    text: "3D-світ не завантажився (WebGL недоступний). Вся суть сторінки — нижче, скролом.",
    cta: "до текстового резюме",
  },

  nodes: {
    quarnuts: {
      label: "Quarnuts",
      role: "Frontend Engineer · точка входу",
      bullets: [
        "Власний рушій на чистому JavaScript — рендер і стан руками, без фреймворку.",
        "Сайт ресторану, зібраний на ньому ж. Точка входу в професію.",
      ],
      tags: ["JavaScript", "власний рушій"],
    },
    developstoday: {
      label: "DevelopsToday",
      role: "Full-Stack Engineer · agency",
      bullets: [
        "~5 продуктів end-to-end: healthtech, geo SaaS, AI/media, mobile.",
        "Tile-сервер на Lambda: <5с по мільярдах рядків, −15% часу карт.",
        "RAG на Kafka/Typesense над 1M+ статей.",
        "Healthcare: booking + video + Stripe → Expo → 2 стори.",
      ],
      tags: ["React", "Node.js", "AWS", "Stripe", "RN"],
    },
    connectiveone: {
      label: "ConnectiveOne",
      role: "Backend Engineer · high-load",
      bullets: [
        "Трейсинг: OpenTelemetry + Grafana Tempo.",
        "Кеш high-load → +40% швидкодії.",
      ],
      tags: ["Node.js", "OTel", "Grafana", "Redis"],
    },
    universe: {
      label: "Universe Group",
      role: "Backend / Full-Stack · Genesis",
      bullets: [
        "STT-бекенд з нуля, єдиний автор, прод за 2–3 тижні. Реклама привела 5–10k нових користувачів/день — бекенд тримав.",
        "Стандарти команди → 7 інженерів; ті самі стандарти — agent rules для AI.",
        "Автономний AI-агент: Slack → Jira → план → код → звіт.",
        "AI-adoption: зустрічі з 4 до 30–40 людей.",
      ],
      tags: ["TypeScript", "Node.js", "Kafka", "PostgreSQL", "LLM", "AWS"],
    },
    next: {
      label: "Next: твоя компанія",
      role: "AI-native інженер · відкритий до задач",
      bullets: [
        "Не користуюсь AI — будую навколо нього процеси і навчаю інших.",
        "Контакти — в кінці сторінки. LFG!",
      ],
      tags: ["backend", "прод", "AI-процеси"],
    },
  },

  player: {
    tag: "save_01 ~//~ гравець",
    title: "Характеристики",
    aside: "коротко. решта деталей — у квест-лозі нижче",
    initials: "ВБ",
    level: "LVL 3+",
    name: "Вадим Бондарчук",
    cls: "class: full-stack & backend · guild: вільний агент · ex-Universe Group (Genesis)",
    bio: "Плану не було: з фронтенду хотілось подивитись, що «під капотом» — і це питання щоразу тягло рівнем нижче. *frontend → full-stack agency → backend ownership → знову full-stack*. AI-native за складом мислення: не просто користуюся інструментами — *будую навколо них процеси* і навчаю інших.",
    sticks: ["AI пише код. я пишу правила."],
    facts: [
      "локація: ~Ústí nad Labem~",
      "досвід: ~3+ роки~",
      "режим: ~AI-native~",
      "мови: ~укр · eng · čeština~",
    ],
    sheetRows: [
      {
        name: "Backend ownership",
        filled: 5,
        proof:
          "STT-бекенд з нуля, єдиний автор; прод за 2–3 тижні; витримав рекламний ріст до 5–10k нових користувачів/день.",
        why: "чому 5: дизайн, код, деплой, моніторинг — одна людина. тут 5/5 — опис штатного розкладу, не самохвальство.",
      },
      {
        name: "Full-stack",
        filled: 4,
        proof:
          "~5 продуктів end-to-end: від React-фронтів до tile-сервера на Lambda і RAG над 1M+ статей.",
        why: "чому не 5: нативного iOS/Android немає. компенсація: React Native + Expo, два стори.",
      },
      {
        name: "AI-native",
        filled: 5,
        proof:
          "автономний агент (Slack → Jira → план → код → звіт); backend-стандарти переупаковані в agent rules; онборд команди на Cursor/Claude Code.",
        why: "чому 5: не «користуюся Copilot'ом» — будую процеси, у яких працюють люди і агенти.",
      },
      {
        name: "Командна гра",
        filled: 4,
        proof:
          "стандарти, за якими працюють 7 інженерів; зустрічі 4 → 40 людей; менторю колег по AI-інструментах.",
        why: "чому не 5: формального тайтла тімліда немає — вплив без капітанської пов'язки.",
      },
      {
        name: "Прод-швидкість",
        filled: 4,
        proof: "від першого коміта до проду STT — 2–3 тижні.",
        why: "чому не 5: п'яту зірку вручу собі, коли повторю це в другому продукті.",
      },
    ],
  },

  quests: {
    tag: "save_02 ~//~ quest_log",
    title: "Квест-лог",
    items: [
      {
        code: "QUEST #04",
        status: "завершено",
        title: "Universe Group",
        meta: "2023 — серпень 2026 · Backend / Full-Stack · частина Genesis",
        bullets: [
          "*STT-бекенд з нуля, єдиний автор*, у прод за 2–3 тижні. Коли реклама розігнала продукт до ~5–10k нових користувачів/день~ — бекенд цей ріст переварив.",
          "*Backend-стандарти команди*: гайдлайни, Git-конвенції → *7 інженерів* за єдиними правилами; переупаковані в *agent rules* — їх застосовують AI-агенти автоматично.",
          "*Автономний AI-агент* (моя ідея, реалізація в команді): Slack → Jira → план → код → звіт, + другий агент для збору даних.",
          "Драйвер *AI-adoption без формальної влади*: knowledge-sharing виріс з *4 до 30–40 людей*.",
        ],
        tags: ["TypeScript", "Node.js", "Kafka", "PostgreSQL", "LLM", "K8s", "AWS"],
      },
      {
        code: "QUEST #03",
        status: "завершено",
        title: "ConnectiveOne",
        meta: "2023 · Backend · high-load",
        bullets: [
          "Розподілений трейсинг: *OpenTelemetry + Grafana Tempo* — бачиш систему, а не вгадуєш.",
          "Кеш high-load ендпоінтів → ~+40% швидкодії~.",
        ],
        tags: ["Node.js", "OpenTelemetry", "Grafana", "Redis"],
      },
      {
        code: "QUEST #02",
        status: "завершено",
        title: "DevelopsToday",
        meta: "2022 — 2023 · Full-Stack · продуктова agency",
        bullets: [
          "*~5 продуктів end-to-end*: healthtech, geospatial SaaS, AI/media, mobile.",
          "Tile-сервер на *AWS Lambda*: ~<5с по мільярдах рядків~, −15% часу карт.",
          "*RAG* на Kafka/Typesense над *1M+ статей*.",
          "Healthcare: booking + video + Stripe → Expo → *2 стори*.",
        ],
        tags: ["React", "Node.js", "AWS", "Stripe", "React Native"],
      },
      {
        code: "QUEST #01",
        status: "завершено",
        title: "Quarnuts",
        meta: "2021 — 2022 · Frontend · точка входу",
        bullets: [
          "*Власний рушій на чистому JavaScript*: рендер, стан і роутинг — руками, без фреймворку.",
          "Сайт ресторану, зібраний на цьому рушії.",
        ],
        tags: ["JavaScript", "власний рушій"],
      },
    ],
  },

  achievements: {
    tag: "save_03 ~//~ trophy_room",
    title: "Трофеї",
    items: [
      {
        xp: "+9999 XP",
        num: "0→5–10k",
        text: "нових користувачів щодня привела реклама. Моя частина угоди: STT-бекенд з нуля, один автор, прод за 2–3 тижні — і він цей ріст переварив.",
        big: true,
      },
      { xp: "+500 XP", num: "2–3 ~тиж~", text: "від першого коміта до проду STT." },
      { xp: "+400 XP", num: "+40~%~", text: "швидкодія high-load ендпоінтів." },
      { xp: "+300 XP", num: "−15~%~", text: "часу завантаження карт, <5с по мільярдах рядків." },
      { xp: "+350 XP", num: "1M~+~", text: "статей у RAG-пайплайні Kafka → Typesense." },
      { xp: "+450 XP", num: "7", text: "інженерів працюють за написаними мною стандартами." },
      { xp: "+250 XP", num: "4→40", text: "людей на AI-зустрічах, які я запустив." },
      {
        xp: "+100 XP",
        num: "24",
        text: "скіли заховані у світі вище — клік, щоб летіти збирати.",
        play: true,
      },
    ],
  },

  missions: {
    tag: "save_04 ~//~ completed_quests",
    title: "Закриті місії",
    done: "завершено",
    difficulty: "складність",
    lootPrefix: "лут:",
    items: [
      {
        code: "M–01",
        stars: 4,
        title: "STT-бекенд з нуля",
        diagram: "audio → api → pipeline → transcript",
        reward: "витримав 5–10k/день",
      },
      {
        code: "M–02",
        stars: 5,
        title: "Автономний AI-агент",
        diagram: "slack → jira → plan → code ↩ (+agent₂)",
        reward: "ttm ↓ на маркетингу",
      },
      {
        code: "M–03",
        stars: 4,
        title: "Tile-сервер на Lambda",
        diagram: "client → lambda → 1B+ rows < 5s",
        reward: "−15% часу карт",
      },
      {
        code: "M–04",
        stars: 3,
        title: "RAG над 1M+ статей",
        diagram: "1M+ → kafka → typesense → llm",
        reward: "пошук, який працює",
      },
      {
        code: "M–05",
        stars: 3,
        title: "Web → 2 стори",
        diagram: "booking+video+stripe → expo → ios+android",
        reward: "2 стори",
      },
      {
        code: "M–06",
        stars: 2,
        title: "Трейсинг + кеш",
        diagram: "otel → tempo · cache → +40%",
        reward: "+40% швидкодії",
      },
    ],
  },

  inventory: {
    tag: "save_05 ~//~ inventory",
    title: "Інвентар",
    aside: "легендарне — щодня в проді. решта — з реальних проєктів",
    rarity: ["звичайне", "рідкісне", "легендарне"],
    found: "зібрано у світі:",
    stacks: [
      {
        label: "// мови",
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
          { label: "LLM-інтеграції", rarity: 3, skill: "LLM" },
          { label: "RAG-пайплайни", rarity: 1 },
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
    note: "~✓~ — зібрано у грі на першому екрані. синхронізується між ігровим світом і цією сторінкою.",
  },

  party: {
    tag: "save_06 ~//~ party",
    aside: "відповідаю швидко",
    title: "Наступний квест — ~у твоїй команді~",
    lead: "Пишіть — розберемо вашу задачу по суті: що будуємо, де впираємось, коли у проді.",
    sticker: "LFG!",
    copied: "скопійовано →",
    footerLeft: "© 2026 · Вадим Бондарчук",
    footerBack: "↑ назад у світ",
  },

  scoreboard: { nodes: "вузлів", skills: "скілів" },
};
