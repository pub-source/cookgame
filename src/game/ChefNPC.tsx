import { useState, useEffect } from "react";
import { ChefHat } from "lucide-react";

interface Props {
  feedback: "correct" | "wrong" | null;
  isPlaying: boolean;
  timer: number;
}

const IDLE_MESSAGES = [
  "You got this! 👨‍🍳",
  "Keep cooking!",
  "Smells great!",
  "Nice rhythm!",
  "Focus!",
];

const CORRECT_MESSAGES = [
  "Perfect! ⭐",
  "Yum yum!",
  "Chef's kiss! 💋",
  "Brilliant!",
  "Delicious!",
];

const WRONG_MESSAGES = [
  "Oops! Try again!",
  "Not that one!",
  "Wrong ingredient!",
  "Check the order!",
];

const HURRY_MESSAGES = [
  "Hurry up! ⏰",
  "Time's running!",
  "Faster chef!",
  "Quick quick!",
];

const ChefNPC = ({ feedback, isPlaying, timer }: Props) => {
  const [message, setMessage] = useState("Let's cook! 🔥");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      setMessage("Ready to cook?");
      return;
    }

    if (feedback === "correct") {
      setMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
      setIsAnimating(true);
    } else if (feedback === "wrong") {
      setMessage(WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)]);
      setIsAnimating(true);
    } else if (timer <= 5 && timer > 0) {
      setMessage(HURRY_MESSAGES[Math.floor(Math.random() * HURRY_MESSAGES.length)]);
    }

    const timeout = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timeout);
  }, [feedback, timer, isPlaying]);

  // Random idle messages
  useEffect(() => {
    if (!isPlaying || feedback) return;
    
    const interval = setInterval(() => {
      if (timer > 10) {
        setMessage(IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, feedback, timer]);

  return (
    <div className="fixed bottom-4 left-4 flex items-end gap-2 z-50">
      {/* Speech Bubble */}
      <div className={`relative bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-orange-200 max-w-[140px] transition-transform duration-200 ${isAnimating ? "scale-110" : "scale-100"}`}>
        <p className="text-sm font-semibold text-orange-700 text-center">
          {message}
        </p>
        {/* Bubble tail */}
        <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-b-2 border-r-2 border-orange-200 transform rotate-45" />
      </div>

      {/* Chef Character */}
      <div className={`flex flex-col items-center transition-transform duration-200 ${isAnimating ? (feedback === "correct" ? "animate-bounce" : "animate-shake") : ""}`}>
        <div className="relative">
          {/* Chef hat */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <ChefHat className="w-10 h-10 text-white drop-shadow-md" fill="white" />
          </div>
          {/* Face */}
          <div className="w-16 h-16 bg-amber-200 rounded-full border-4 border-amber-300 flex items-center justify-center shadow-lg">
            {/* Eyes */}
            <div className="flex gap-3 -mt-1">
              <div className={`w-2 h-2 bg-gray-800 rounded-full ${feedback === "correct" ? "scale-0" : ""}`} />
              <div className={`w-2 h-2 bg-gray-800 rounded-full ${feedback === "correct" ? "scale-0" : ""}`} />
              {feedback === "correct" && (
                <>
                  <div className="absolute left-3 top-5 text-xs">^</div>
                  <div className="absolute right-3 top-5 text-xs">^</div>
                </>
              )}
            </div>
          </div>
          {/* Mouth */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            {feedback === "correct" ? (
              <div className="w-4 h-2 border-b-2 border-gray-800 rounded-b-full" />
            ) : feedback === "wrong" ? (
              <div className="w-3 h-3 rounded-full border-2 border-gray-800" />
            ) : (
              <div className="w-4 h-1 bg-gray-800 rounded-full" />
            )}
          </div>
        </div>
        {/* Body hint */}
        <div className="w-12 h-6 bg-white rounded-t-lg border-2 border-t-0 border-gray-200 -mt-1" />
      </div>
    </div>
  );
};

export default ChefNPC;
