import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, Home } from "lucide-react";
import { playButtonClick } from "./sounds";

interface Props {
  level: number;
  score: number;
  p2Score?: number;
  mode: "solo" | "versus";
  onNextLevel: () => void;
  onHome: () => void;
  onEndGame: () => void;
}

const LevelCompleteScreen = ({ level, score, p2Score, mode, onNextLevel, onHome, onEndGame }: Props) => {
  const winner = mode === "versus"
    ? score > (p2Score ?? 0) ? "Player 1" : score < (p2Score ?? 0) ? "Player 2" : "Tie"
    : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gradient-to-b from-green-100 to-emerald-200">
      <div className="animate-bounce">
        <Trophy className="w-16 h-16 text-yellow-500" />
      </div>

      <h1 className="text-4xl font-extrabold text-green-700" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        Level {level} Complete! 🎉
      </h1>

      <div className="bg-white/80 rounded-2xl p-6 shadow-lg text-center space-y-3">
        {mode === "versus" ? (
          <>
            <div className="flex gap-8">
              <div>
                <p className="text-sm text-gray-500">Player 1</p>
                <p className="text-3xl font-black text-orange-500">{score}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Player 2</p>
                <p className="text-3xl font-black text-rose-500">{p2Score}</p>
              </div>
            </div>
            {winner && winner !== "Tie" && (
              <p className="text-lg font-bold text-green-600">🏆 {winner} Wins!</p>
            )}
            {winner === "Tie" && <p className="text-lg font-bold text-amber-600">🤝 It's a Tie!</p>}
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500">Score</p>
            <p className="text-5xl font-black text-orange-500">{score}</p>
            <p className="text-sm text-green-600">+{Math.floor(score / 10)} coins earned so far</p>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => { playButtonClick(); onNextLevel(); }}
          size="lg"
          className="text-lg px-8 py-5 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg gap-2"
        >
          Next Level <ArrowRight className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => { playButtonClick(); onEndGame(); }}
          variant="outline"
          size="lg"
          className="px-6 py-5 rounded-2xl border-2 border-amber-400 text-amber-700 gap-2"
        >
          Cash Out 🪙
        </Button>
      </div>

      <Button variant="ghost" onClick={() => { playButtonClick(); onHome(); }} className="gap-2 text-gray-500">
        <Home className="w-4 h-4" /> Home
      </Button>
    </div>
  );
};

export default LevelCompleteScreen;
