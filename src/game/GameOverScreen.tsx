import { Button } from "@/components/ui/button";
import { Trophy, Home, RotateCcw } from "lucide-react";
import { playButtonClick } from "./sounds";

interface Props {
  score: number;
  p2Score?: number;
  mode: "solo" | "versus";
  level: number;
  coinsEarned: number;
  onRestart: () => void;
  onHome: () => void;
}

const GameOverScreen = ({ score, p2Score, mode, level, coinsEarned, onRestart, onHome }: Props) => {
  const winner = mode === "versus"
    ? score > (p2Score ?? 0) ? "Player 1" : score < (p2Score ?? 0) ? "Player 2" : "Tie"
    : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gradient-to-b from-amber-50 to-orange-100">
      <Trophy className="w-20 h-20 text-yellow-500 animate-pulse" />
      <h1 className="text-5xl font-extrabold text-orange-600" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        Game Over!
      </h1>

      <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center space-y-2">
        <p className="text-sm text-gray-500">Reached Level {level}</p>

        {mode === "versus" ? (
          <div className="flex gap-8 justify-center">
            <div>
              <p className="text-sm text-gray-500">P1</p>
              <p className="text-4xl font-black text-orange-500">{score}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">P2</p>
              <p className="text-4xl font-black text-rose-500">{p2Score}</p>
            </div>
          </div>
        ) : (
          <p className="text-5xl font-black text-orange-500">{score}</p>
        )}

        {winner && winner !== "Tie" && (
          <p className="text-lg font-bold text-green-600">🏆 {winner} Wins!</p>
        )}

        <div className="flex items-center justify-center gap-2 mt-2 bg-yellow-100 rounded-full px-4 py-2">
          <span>🪙</span>
          <span className="font-bold text-amber-800">+{coinsEarned} coins</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => { playButtonClick(); onRestart(); }}
          size="lg"
          className="text-lg px-8 py-5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Play Again
        </Button>
        <Button
          onClick={() => { playButtonClick(); onHome(); }}
          variant="outline"
          size="lg"
          className="px-6 py-5 rounded-2xl border-2 border-amber-400 text-amber-700 gap-2"
        >
          <Home className="w-5 h-5" /> Home
        </Button>
      </div>
    </div>
  );
};

export default GameOverScreen;
