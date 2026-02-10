import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";
import { ALL_SKINS, type Skin } from "./gameStore";
import { playPurchase, playButtonClick } from "./sounds";

interface Props {
  coins: number;
  ownedSkins: string[];
  activeSkin: string;
  onBuy: (skinId: string) => void;
  onEquip: (skinId: string) => void;
  onBack: () => void;
}

const ShopScreen = ({ coins, ownedSkins, activeSkin, onBuy, onEquip, onBack }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-100 to-orange-200 p-4">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => { playButtonClick(); onBack(); }} className="gap-2">
          <ArrowLeft className="w-5 h-5" /> Back
        </Button>
        <div className="flex items-center gap-2 bg-yellow-400/80 px-4 py-2 rounded-full shadow">
          <span className="text-lg">🪙</span>
          <span className="font-bold text-amber-900">{coins}</span>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-center text-amber-800 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
        <ShoppingBag className="inline w-8 h-8 mr-2" />
        Stall Skins Shop
      </h1>
      <p className="text-center text-amber-700/70 mb-6 text-sm">Customize your food stall!</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto w-full">
        {ALL_SKINS.map((skin) => {
          const owned = ownedSkins.includes(skin.id);
          const equipped = activeSkin === skin.id;
          const canAfford = coins >= skin.price;

          return (
            <Card key={skin.id} className={`relative overflow-hidden transition-all ${equipped ? "ring-4 ring-yellow-400 shadow-xl" : "shadow-md"}`}>
              <CardContent className="p-3 flex flex-col items-center gap-2">
                {/* Preview */}
                <div className={`w-full h-16 rounded-lg bg-gradient-to-r ${skin.stallColor} flex items-center justify-center`}>
                  <span className="text-3xl">{skin.emoji}</span>
                </div>
                <span className="font-bold text-sm text-amber-900">{skin.name}</span>

                {equipped ? (
                  <div className="flex items-center gap-1 text-xs text-green-700 font-semibold">
                    <Check className="w-3 h-3" /> Equipped
                  </div>
                ) : owned ? (
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => { playButtonClick(); onEquip(skin.id); }}>
                    Equip
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className={`text-xs h-7 ${canAfford ? "bg-yellow-500 hover:bg-yellow-600 text-amber-900" : "bg-gray-300 text-gray-500"}`}
                    disabled={!canAfford}
                    onClick={() => { playPurchase(); onBuy(skin.id); }}
                  >
                    🪙 {skin.price}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ShopScreen;
