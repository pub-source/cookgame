

# 🍳 Quick Kitchen — 2D Cooking Game

A fun, colorful React-based cooking game where players complete food orders by clicking actions in the correct sequence before time runs out.

## Game Flow

1. **Start Screen** — Game title with a "Start Game" button
2. **Gameplay Screen** — Orders appear one at a time; player clicks actions in order to complete each dish
3. **Game Over Screen** — Final score displayed with a "Play Again" button

## Core Gameplay

- **Orders**: Burger, Fried Egg, Pancake, Salad, Sandwich (5 dishes to start)
- Each order has 3–4 sequential steps (e.g., Burger: Cut Bun → Grill Patty → Add Cheese → Plate It)
- Player sees action buttons and must click them in the correct order
- **Correct action**: Step completes with a green checkmark animation
- **Wrong action**: Brief warning toast ("Wrong step! Try again") — no penalty, no game over
- **30-second countdown timer** per order
- Points awarded for completing orders (bonus points for speed)
- Game ends after a set number of orders (e.g., 5 rounds)

## UI Layout

- **Top bar**: Score display + Timer countdown
- **Center**: Current order card showing the dish name, icon, and step progress tracker
- **Bottom**: Grid of colorful action buttons (Cut, Grill, Fry, Plate, Add Cheese, Crack Egg, Flip, Mix, etc.)
- Cartoon-style design with bright colors, rounded corners, and playful typography
- Lucide icons used for ingredients and tools (knife, flame, egg, etc.)

## Features

- Step progress indicator (dots/checkmarks showing which steps are done)
- Visual feedback animations on correct/wrong clicks
- Score breakdown: base points + time bonus
- "Play Again" button on game over screen to restart
- Responsive layout that works on desktop and mobile

## Technical Approach

- Pure React with `useState` and `useEffect` — no backend needed
- Game state managed locally (current order, current step, score, timer)
- All recipe data defined as a simple config array
- Lucide React icons for all visual elements (no external images needed)

