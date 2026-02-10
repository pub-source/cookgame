import { Button } from "@/components/ui/button";
import { ChefHat, Users, User, ShoppingBag, Trophy } from "lucide-react";
import { playButtonClick } from "./sounds";
import { getActiveSkin, type Skin } from "./gameStore";
interface Props {
  onStart: (mode: "solo" | "versus") => void;
  onShop: () => void;
  coins: number;
  highScore: number;
  highestLevel: number;
  activeSkinData: Skin;
}
const StartScreen = ({
  onStart,
  onShop,
  coins,
  highScore,
  highestLevel,
  activeSkinData
}: Props) => <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gradient-to-b from-amber-50 to-orange-100 relative overflow-hidden">
    {/* Stall decoration */}
    <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-r ${activeSkinData.stallColor} shadow-lg`}>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-900/30" />
      {/* Awning scallops */}
      <div className="absolute -bottom-3 left-0 right-0 flex justify-center gap-0">
        {Array.from({
        length: 12
      }).map((_, i) => <div key={i} className="w-10 h-6 bg-red-600/80 rounded-b-full border-b-2 border-red-800/40" />)}
      </div>
    </div>

    <div className="mt-16 animate-bounce">
      <ChefHat className="w-20 h-20 text-orange-500" />
    </div>

    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-orange-600 drop-shadow-md text-center" style={{
    fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive"
  }}>🍳 Quickytchen</h1>

    <p className="text-lg text-orange-700/80 max-w-md text-center">
      Complete food orders by clicking the right actions in order. Be fast — the clock is ticking!
    </p>

    {/* Stats row */}
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-1.5 bg-yellow-400/60 px-3 py-1.5 rounded-full">
        <span>🪙</span>
        <span className="font-bold text-amber-900 text-sm">{coins}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-orange-300/50 px-3 py-1.5 rounded-full">
        <Trophy className="w-4 h-4 text-orange-700" />
        <span className="font-bold text-orange-800 text-sm">{highScore}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-green-300/50 px-3 py-1.5 rounded-full">
        <span className="text-sm">⭐</span>
        <span className="font-bold text-green-800 text-sm">Lv.{highestLevel}</span>
      </div>
    </div>

    {/* Mode buttons */}
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
      <Button onClick={() => {
      playButtonClick();
      onStart("solo");
    }} size="lg" className="flex-1 text-lg px-8 py-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 gap-2">
        <User className="w-5 h-5" />
        Solo Mode
      </Button>
      <Button onClick={() => {
      playButtonClick();
      onStart("versus");
    }} size="lg" className="flex-1 text-lg px-8 py-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 gap-2">
        <Users className="w-5 h-5" />
        2 Player
      </Button>
    </div>

    {/* Shop button */}
    <Button onClick={() => {
    playButtonClick();
    onShop();
  }} variant="outline" className="gap-2 rounded-full px-6 border-2 border-amber-400 text-amber-700 hover:bg-amber-100">
      <ShoppingBag className="w-5 h-5" />
      Stall Skins Shop
    </Button>
  </div>;
export default StartScreen;