import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, Star, AlertTriangle, ArrowLeft } from "lucide-react";
import type { Recipe } from "./recipes";
import ChefNPC from "./ChefNPC";
import CustomerNPC from "./CustomerNPC";
import { getActiveSkin, type Skin } from "./gameStore";
import { playButtonClick } from "./sounds";

interface PlayerProps {
  order: Recipe;
  round: number;
  totalRounds: number;
  currentStep: number;
  score: number;
  timer: number;
  timerSeconds: number;
  feedback: "correct" | "wrong" | null;
  shuffledActions: { action: string; icon: any }[];
  onAction: (action: string) => void;
  customerEntering: boolean;
  label?: string;
}

const PlayerPanel = ({ order, round, totalRounds, currentStep, score, timer, timerSeconds, feedback, shuffledActions, onAction, customerEntering, label }: PlayerProps) => {
  const timerPercent = (timer / timerSeconds) * 100;
  const isOrderComplete = currentStep >= order.steps.length;

  return (
    <div className="flex flex-col flex-1 min-w-0">
      {label && (
        <div className="text-center py-1 bg-amber-900/80 text-white font-bold text-sm">{label}</div>
      )}

      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-amber-800/90 shadow-lg">
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-bold text-white">{score}</span>
        </div>
        <span className="text-xs font-medium text-amber-100">
          {round + 1}/{totalRounds}
        </span>
        <div className="flex items-center gap-1.5">
          <Clock className={`w-4 h-4 ${timer <= 5 ? "text-red-400" : timer <= 10 ? "text-orange-300" : "text-green-400"}`} />
          <span className={`text-sm font-bold tabular-nums ${timer <= 5 ? "text-red-400" : timer <= 10 ? "text-orange-300" : "text-green-400"}`}>{timer}s</span>
        </div>
      </div>

      <Progress
        value={timerPercent}
        className="h-1.5 rounded-none bg-amber-300 [&>div]:transition-all [&>div]:duration-1000 [&>div]:bg-orange-500"
      />

      {/* Customer */}
      <div className="bg-gradient-to-b from-amber-200 to-amber-100 p-2 border-b-4 border-amber-800/30">
        <div className={`flex justify-center transition-all duration-500 ${customerEntering ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
          <CustomerNPC order={order} timer={timer} isComplete={isOrderComplete} />
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`mx-auto mt-2 px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-fade-in flex items-center gap-1 z-20 ${
          feedback === "correct"
            ? "bg-green-100 text-green-700 border-2 border-green-300"
            : "bg-red-100 text-red-700 border-2 border-red-300"
        }`}>
          {feedback === "correct" ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
          {feedback === "correct" ? "Correct!" : "Wrong!"}
        </div>
      )}

      {/* Order Ticket */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3 p-3 overflow-auto">
        <Card className="w-full max-w-sm bg-yellow-50 shadow-xl border-2 border-amber-400 rotate-1 relative">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-5 bg-amber-600 rounded-b-lg shadow" />
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">{order.emoji}</span>
              <h2 className="text-xl font-extrabold text-amber-800" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
                {order.name}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
              {order.steps.map((step, i) => {
                const StepIcon = step.icon;
                const done = i < currentStep;
                const active = i === currentStep;
                return (
                  <div key={i} className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all text-center ${
                    done ? "bg-green-200 text-green-700 shadow" :
                    active ? "bg-orange-200 text-orange-700 scale-110 ring-2 ring-orange-400 shadow-lg" :
                    "bg-gray-100 text-gray-400"
                  }`}>
                    {done ? <Check className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
                    <span className="text-[10px] font-semibold">{step.action}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons - SHUFFLED */}
        <div className="w-full max-w-sm bg-gray-200/80 rounded-xl p-3 shadow-inner border-4 border-gray-300">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 text-center">🍳 Cooking Station</p>
          <div className="grid grid-cols-5 gap-1.5">
            {shuffledActions.map(({ action, icon: Icon }) => (
              <Button
                key={action}
                variant="outline"
                onClick={() => onAction(action)}
                className="flex flex-col items-center gap-0.5 h-auto py-2 px-1 rounded-lg border-2 border-amber-300 bg-white hover:bg-amber-50 hover:border-amber-500 hover:scale-105 transition-all shadow-md active:scale-95"
              >
                <Icon className="w-5 h-5 text-amber-600" />
                <span className="text-[9px] font-semibold text-amber-800 leading-tight">{action}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  order: Recipe;
  round: number;
  totalRounds: number;
  currentStep: number;
  score: number;
  timer: number;
  timerSeconds: number;
  feedback: "correct" | "wrong" | null;
  shuffledActions: { action: string; icon: any }[];
  onAction: (action: string) => void;
  onBack: () => void;
  level: number;
  customerEntering: boolean;
  stallSkin: any;
  // Versus
  mode: "solo" | "versus";
  p2Order?: Recipe | null;
  p2Round?: number;
  p2Step?: number;
  p2Score?: number;
  p2Timer?: number;
  p2Feedback?: "correct" | "wrong" | null;
  p2ShuffledActions?: { action: string; icon: any }[];
  onP2Action?: (action: string) => void;
}

const GamePlayScreen = (props: Props) => {
  const { mode, stallSkin, level, onBack } = props;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Stall Roof */}
      <div className={`w-full bg-gradient-to-r ${stallSkin.stallColor} relative`}>
        <div className="flex items-center justify-between px-3 py-1.5">
          <Button variant="ghost" size="sm" onClick={() => { playButtonClick(); onBack(); }} className="text-white/80 hover:text-white p-1 h-auto">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="text-white font-bold text-sm" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
            Level {level} {stallSkin.emoji}
          </span>
          <div className="w-4" />
        </div>
        {/* Awning */}
        <div className="flex justify-center gap-0 overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-8 h-4 bg-red-600/70 rounded-b-full border-b border-red-900/30" />
          ))}
        </div>
      </div>

      {/* Game Area */}
      <div className={`flex flex-1 ${mode === "versus" ? "flex-row" : "flex-col"} bg-gradient-to-b from-amber-100 to-orange-200`}>
        <PlayerPanel
          order={props.order}
          round={props.round}
          totalRounds={props.totalRounds}
          currentStep={props.currentStep}
          score={props.score}
          timer={props.timer}
          timerSeconds={props.timerSeconds}
          feedback={props.feedback}
          shuffledActions={props.shuffledActions}
          onAction={(a) => props.onAction(a)}
          customerEntering={props.customerEntering}
          label={mode === "versus" ? "👨‍🍳 Player 1" : undefined}
        />

        {mode === "versus" && props.p2Order && (
          <>
            <div className="w-1 bg-amber-800/50" />
            <PlayerPanel
              order={props.p2Order}
              round={props.p2Round ?? 0}
              totalRounds={props.totalRounds}
              currentStep={props.p2Step ?? 0}
              score={props.p2Score ?? 0}
              timer={props.p2Timer ?? 0}
              timerSeconds={props.timerSeconds}
              feedback={props.p2Feedback ?? null}
              shuffledActions={props.p2ShuffledActions ?? []}
              onAction={(a) => props.onP2Action?.(a)}
              customerEntering={props.customerEntering}
              label="👩‍🍳 Player 2"
            />
          </>
        )}
      </div>

      {/* Chef NPC - only in solo */}
      {mode === "solo" && (
        <ChefNPC feedback={props.feedback} isPlaying={true} timer={props.timer} />
      )}
    </div>
  );
};

export default GamePlayScreen;
