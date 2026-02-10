// Persistent game store using localStorage
export interface Skin {
  id: string;
  name: string;
  emoji: string;
  stallColor: string; // tailwind class
  price: number;
  owned: boolean;
}

export const ALL_SKINS: Skin[] = [
  { id: "classic", name: "Classic Stall", emoji: "🏪", stallColor: "from-amber-700 to-amber-800", price: 0, owned: true },
  { id: "tropical", name: "Tropical Hut", emoji: "🌴", stallColor: "from-green-600 to-emerald-700", price: 200, owned: false },
  { id: "neon", name: "Neon Kitchen", emoji: "💜", stallColor: "from-purple-600 to-pink-600", price: 350, owned: false },
  { id: "ocean", name: "Ocean Shack", emoji: "🌊", stallColor: "from-cyan-600 to-blue-700", price: 500, owned: false },
  { id: "fire", name: "Fire Grill", emoji: "🔥", stallColor: "from-red-600 to-orange-600", price: 750, owned: false },
  { id: "gold", name: "Golden Kitchen", emoji: "👑", stallColor: "from-yellow-500 to-amber-600", price: 1000, owned: false },
];

interface SaveData {
  coins: number;
  highScore: number;
  ownedSkins: string[];
  activeSkin: string;
  highestLevel: number;
}

const SAVE_KEY = "quick-kitchen-save";

function getDefault(): SaveData {
  return { coins: 0, highScore: 0, ownedSkins: ["classic"], activeSkin: "classic", highestLevel: 1 };
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return getDefault();
    return { ...getDefault(), ...JSON.parse(raw) };
  } catch {
    return getDefault();
  }
}

export function saveSave(data: SaveData) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function getActiveSkin(save: SaveData): Skin {
  return ALL_SKINS.find((s) => s.id === save.activeSkin) ?? ALL_SKINS[0];
}

// Level config: each level reduces time
export function getLevelTimer(level: number): number {
  const base = 30;
  const reduction = Math.min((level - 1) * 3, 18); // min 12 seconds at high levels
  return base - reduction;
}

export function getLevelRounds(level: number): number {
  return Math.min(3 + level, 8); // 4 rounds at level 1, up to 8
}
