const CDN = "https://static1.squarespace.com/static/63c06980952b493d8ffac26f/t";

export type Track = {
  id: string;
  title: string;
  credit: string;
  src: string;
  note?: string;
};

export const SITE = {
  name: "Sebastian St. John",
  tagline: "Music Collaborator & Creator",
  lede: "Music composition, live and studio performance, arranging, orchestration, and music direction.",
  base: "New Orleans & France",
  instagram: "https://www.instagram.com/speedupthetv/",
  spotify: "https://open.spotify.com/artist/6X8WdFjrNhXATMDSs26aCc",
  quote: "All music is folk music. I ain’t never heard a horse sing a song.",
  quoteBy: "Louis Armstrong",
};

export const SOLO_TRACKS: Track[] = [
  {
    id: "umbrella",
    title: "The Umbrella",
    credit: "Sebastian St. John",
    src: `${CDN}/69d67230d15375563ec9d2f7/1775661626291/Umbrella-MusicBox-ReeltoReelPiano.mp3`,
    note: "Composed for violin and piano; premiered in Paris for clarinet and piano.",
  },
  {
    id: "greek-bells",
    title: "Greek Bells",
    credit: "Sebastian St. John",
    src: `${CDN}/691ca79b5e94771359cfe68c/1763485606452/v5_AB_Greek-Bells.mp3`,
  },
  {
    id: "silent-scary-story",
    title: "Silent Scary Story",
    credit: "feat. Teeko and the All Stars",
    src: `${CDN}/6526a98263024f6defc0083f/1697032585774/SilentScaryStory_wTeekoAllStars_Final.mp3`,
  },
  {
    id: "moonlight",
    title: "Moonlight Sonata, Mvt. 1",
    credit: "Beethoven · arr. Sebastian St. John",
    src: `${CDN}/646eebcd349289280467e910/1684990954212/Beethoven-Moonlight-Mvt1-v4-wTempo3.mp3`,
  },
  {
    id: "symphony-mvt3",
    title: "Symphony No. 1, Movement 3 or 4",
    credit: "Sebastian St. John · Louisiana Philharmonic Orchestra",
    src: `${CDN}/6855a6cd070858069cf6bae6/1750443738515/Mvt3_LPO.mp3`,
  },
  {
    id: "presion",
    title: "Presión",
    credit: "Rebz River, Dan Mess, Sebastian St. John",
    src: `${CDN}/69cbe3b99d8ebc45c86191af/1774969793755/RebRiv-DanMess-SSJ_Presion.mp3`,
  },
];

export type BeforeAfter = {
  id: string;
  artist: string;
  song: string;
  before: Track;
  after: Track;
};

const t = (id: string, title: string, credit: string, path: string): Track => ({
  id,
  title,
  credit,
  src: `${CDN}/${path}`,
});

export const CO_PRODUCTIONS: BeforeAfter[] = [
  {
    id: "faster",
    artist: "Rebz River & Dan Mess",
    song: "FASTER (climax to end)",
    before: t("faster-b", "FASTER, before", "Rebz River & Dan Mess", "69794c5fd09b0a3746b1845f/1769557092365/Faster-Climax-to-End-Before.mp3"),
    after: t("faster-a", "FASTER, after", "Rebz River, Dan Mess & Sebastian St. John", "69794cbd75f8b90c3c72dc9d/1769557185758/Faster-Climax-to-End-After.mp3"),
  },
  {
    id: "moo-latte",
    artist: "Moo Latte",
    song: "UNTITLED",
    before: t("moo-b", "UNTITLED, before (first 30 secs)", "Moo Latte", "682f5488e973dc5352121775/1747932298739/MooLatte-BEFORE-wFadeOut.mp3"),
    after: t("moo-a", "UNTITLED, after (full)", "Moo Latte & Sebastian St. John", "681cd8c123ba6750435b4ebe/1746720965828/MooLatte-After.mp3"),
  },
  {
    id: "recover",
    artist: "Marc Uddo",
    song: "RECOVER",
    before: t("recover-b", "RECOVER, before", "Marc Uddo", "681ccdd19837925518bd144e/1746718163562/Recover-Before.mp3"),
    after: t("recover-a", "RECOVER, after", "Marc Uddo & Sebastian St. John", "68301a1bf058276fb9bdbe22/1747982880944/RECOVER_After.mp3"),
  },
];

export const INSOMNIA: Track = t(
  "insomnia",
  "Insomnia Street",
  "Bart Ramsey · after",
  "681d3f0ff97b3e6aa565a228/1746747157031/02+Insomnia+Street.mp3",
);

export const REELS = [
  { id: "C_vmSvCxw-j", label: "Have a Great Day! Go Smoke Some, with Poppy and 504IcyGrl" },
  { id: "C6omiuSr-CQ", label: "Have a Great Day! Louisiana Philharmonic season opener, Berlioz — Symphonie fantastique" },
  { id: "C5yv_hcREda", label: "Have a Great Day! with Alfred Banks and musicians from the Louisiana Philharmonic" },
  { id: "DQUSGLfjuQt", label: "Guerrilla Radio (Rage Against the Machine), feat. Neutral Snap" },
];

export const BOOK = {
  slug: "book",
  title: "Book Title Goes Here",
  subtitle: "Placeholder edition for the demo",
  author: "Sebastian St. John",
  blurb:
    "A demo product so the checkout flow can be seen end to end. Swap in the real title, cover, description and prices in src/content/site.ts and nothing else changes.",
  bullets: [
    "One-time payment through Stripe Checkout",
    "Digital edition delivered the moment payment clears",
    "Signed print edition shipped to the address collected at checkout",
  ],
  editions: [
    { id: "digital", label: "Digital edition", detail: "PDF download", cents: 1800, ships: false },
    { id: "print", label: "Signed print edition", detail: "Ships within the US", cents: 3400, ships: true },
  ] as const,
  shippingCents: 600,
};

export type EditionId = (typeof BOOK.editions)[number]["id"];

export const fmt = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
