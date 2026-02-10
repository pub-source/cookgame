import { useEffect, useState } from "react";
import type { Recipe } from "./recipes";

interface Props {
  order: Recipe;
  timer: number;
  isComplete: boolean;
}

const CUSTOMER_STYLES = [
  { hair: "bg-amber-800", skin: "bg-amber-200", shirt: "bg-blue-500" },
  { hair: "bg-gray-800", skin: "bg-amber-100", shirt: "bg-pink-500" },
  { hair: "bg-yellow-600", skin: "bg-orange-200", shirt: "bg-green-500" },
  { hair: "bg-red-800", skin: "bg-amber-100", shirt: "bg-purple-500" },
  { hair: "bg-gray-600", skin: "bg-amber-200", shirt: "bg-orange-500" },
];

const ORDER_PHRASES = [
  "I'd like a",
  "Can I get a",
  "One",
  "I'll have a",
  "Give me a",
];

const WAITING_PHRASES = [
  "Is it ready yet? 🤔",
  "I'm hungry... 😋",
  "Smells good! 👃",
  "Can't wait! 😊",
  "Mmm... 🤤",
];

const HURRY_PHRASES = [
  "I'm starving!! 😫",
  "Hurry please! 😰",
  "So hungry... 😩",
  "Almost done?! 😬",
];

const HAPPY_PHRASES = [
  "Thank you!! 🎉",
  "Looks delicious! 😍",
  "Perfect! ⭐",
  "Yummy!! 🤩",
];

const CustomerNPC = ({ order, timer, isComplete }: Props) => {
  const [customerStyle] = useState(() => 
    CUSTOMER_STYLES[Math.floor(Math.random() * CUSTOMER_STYLES.length)]
  );
  const [orderPhrase] = useState(() =>
    ORDER_PHRASES[Math.floor(Math.random() * ORDER_PHRASES.length)]
  );
  const [message, setMessage] = useState(`${orderPhrase} ${order.name}! ${order.emoji}`);
  const [mood, setMood] = useState<"happy" | "waiting" | "hurry">("waiting");

  useEffect(() => {
    if (isComplete) {
      setMessage(HAPPY_PHRASES[Math.floor(Math.random() * HAPPY_PHRASES.length)]);
      setMood("happy");
      return;
    }

    if (timer <= 5) {
      setMood("hurry");
      setMessage(HURRY_PHRASES[Math.floor(Math.random() * HURRY_PHRASES.length)]);
    } else if (timer <= 20) {
      setMood("waiting");
    }
  }, [timer, isComplete]);

  // Random waiting messages
  useEffect(() => {
    if (isComplete || timer <= 5) return;

    const interval = setInterval(() => {
      if (timer > 10 && timer < 25) {
        setMessage(WAITING_PHRASES[Math.floor(Math.random() * WAITING_PHRASES.length)]);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [timer, isComplete]);

  // Reset message when new order comes in
  useEffect(() => {
    setMessage(`${orderPhrase} ${order.name}! ${order.emoji}`);
    setMood("waiting");
  }, [order, orderPhrase]);

  return (
    <div className="flex flex-col items-center gap-2 animate-fade-in">
      {/* Speech Bubble */}
      <div className={`relative bg-white rounded-2xl px-4 py-3 shadow-lg border-2 max-w-[180px] transition-all duration-300 ${
        mood === "hurry" ? "border-red-300 bg-red-50" : 
        mood === "happy" ? "border-green-300 bg-green-50" : 
        "border-orange-200"
      }`}>
        <p className={`text-sm font-semibold text-center ${
          mood === "hurry" ? "text-red-700" :
          mood === "happy" ? "text-green-700" :
          "text-orange-700"
        }`}>
          {message}
        </p>
        {/* Bubble tail */}
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 transform rotate-45 border-b-2 border-r-2 ${
          mood === "hurry" ? "bg-red-50 border-red-300" :
          mood === "happy" ? "bg-green-50 border-green-300" :
          "bg-white border-orange-200"
        }`} />
      </div>

      {/* Customer Character */}
      <div className={`relative transition-transform duration-300 ${
        mood === "hurry" ? "animate-shake" : 
        mood === "happy" ? "animate-bounce" : ""
      }`}>
        {/* Hair */}
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-6 ${customerStyle.hair} rounded-t-full`} />
        
        {/* Face */}
        <div className={`w-14 h-14 ${customerStyle.skin} rounded-full border-4 border-opacity-30 border-gray-400 flex flex-col items-center justify-center shadow-lg relative`}>
          {/* Eyes */}
          <div className="flex gap-3 -mt-1">
            {mood === "happy" ? (
              <>
                <span className="text-xs">^</span>
                <span className="text-xs">^</span>
              </>
            ) : (
              <>
                <div className={`w-2 h-2 bg-gray-800 rounded-full ${mood === "hurry" ? "animate-pulse" : ""}`} />
                <div className={`w-2 h-2 bg-gray-800 rounded-full ${mood === "hurry" ? "animate-pulse" : ""}`} />
              </>
            )}
          </div>
          
          {/* Mouth */}
          <div className="mt-1">
            {mood === "happy" ? (
              <div className="w-4 h-2 border-b-2 border-gray-800 rounded-b-full" />
            ) : mood === "hurry" ? (
              <div className="w-3 h-2 border-2 border-gray-800 rounded-full" />
            ) : (
              <div className="w-3 h-1 bg-gray-800 rounded-full" />
            )}
          </div>
        </div>

        {/* Body */}
        <div className={`w-16 h-8 ${customerStyle.shirt} rounded-t-2xl -mt-2 mx-auto border-t-0`} />
      </div>
    </div>
  );
};

export default CustomerNPC;
