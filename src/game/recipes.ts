import {
  PocketKnife, Flame, CookingPot, UtensilsCrossed,
  Egg, Sandwich, Salad, Beef,
  ChefHat, CircleDot, Milk, Wheat
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface RecipeStep {
  action: string;
  icon: LucideIcon;
}

export interface Recipe {
  name: string;
  icon: LucideIcon;
  emoji: string;
  steps: RecipeStep[];
}

export const ALL_ACTIONS = [
  { action: "Cut", icon: PocketKnife },
  { action: "Grill", icon: Flame },
  { action: "Fry", icon: CookingPot },
  { action: "Plate", icon: UtensilsCrossed },
  { action: "Crack Egg", icon: Egg },
  { action: "Flip", icon: CircleDot },
  { action: "Mix", icon: Salad },
  { action: "Add Cheese", icon: Milk },
  { action: "Toast", icon: Wheat },
  { action: "Season", icon: ChefHat },
];

export const RECIPES: Recipe[] = [
  {
    name: "Burger",
    icon: Beef,
    emoji: "🍔",
    steps: [
      { action: "Cut", icon: PocketKnife },
      { action: "Grill", icon: Flame },
      { action: "Add Cheese", icon: Milk },
      { action: "Plate", icon: UtensilsCrossed },
    ],
  },
  {
    name: "Fried Egg",
    icon: Egg,
    emoji: "🍳",
    steps: [
      { action: "Crack Egg", icon: Egg },
      { action: "Fry", icon: CookingPot },
      { action: "Season", icon: ChefHat },
      { action: "Plate", icon: UtensilsCrossed },
    ],
  },
  {
    name: "Pancake",
    icon: CircleDot,
    emoji: "🥞",
    steps: [
      { action: "Mix", icon: Salad },
      { action: "Fry", icon: CookingPot },
      { action: "Flip", icon: CircleDot },
      { action: "Plate", icon: UtensilsCrossed },
    ],
  },
  {
    name: "Salad",
    icon: Salad,
    emoji: "🥗",
    steps: [
      { action: "Cut", icon: PocketKnife },
      { action: "Mix", icon: Salad },
      { action: "Season", icon: ChefHat },
    ],
  },
  {
    name: "Sandwich",
    icon: Sandwich,
    emoji: "🥪",
    steps: [
      { action: "Cut", icon: PocketKnife },
      { action: "Toast", icon: Wheat },
      { action: "Add Cheese", icon: Milk },
      { action: "Plate", icon: UtensilsCrossed },
    ],
  },
];

export const TOTAL_ROUNDS = 5;
export const TIMER_SECONDS = 30;
export const BASE_POINTS = 100;
