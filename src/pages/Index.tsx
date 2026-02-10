import { useGameState } from "@/game/useGameState";
import StartScreen from "@/game/StartScreen";
import GamePlayScreen from "@/game/GamePlayScreen";
import GameOverScreen from "@/game/GameOverScreen";
import LevelCompleteScreen from "@/game/LevelCompleteScreen";
import ShopScreen from "@/game/ShopScreen";
import { getActiveSkin } from "@/game/gameStore";

const Index = () => {
  const g = useGameState();
  const skin = getActiveSkin(g.save);
  const coinsEarned = Math.floor((g.mode === "versus" ? Math.max(g.score, g.p2Score) : g.score) / 10);

  if (g.phase === "shop") {
    return (
      <ShopScreen
        coins={g.save.coins}
        ownedSkins={g.save.ownedSkins}
        activeSkin={g.save.activeSkin}
        onBuy={g.handleBuySkin}
        onEquip={g.handleEquipSkin}
        onBack={g.goHome}
      />
    );
  }

  if (g.phase === "start") {
    return (
      <StartScreen
        onStart={g.startGame}
        onShop={g.goShop}
        coins={g.save.coins}
        highScore={g.save.highScore}
        highestLevel={g.save.highestLevel}
        activeSkinData={skin}
      />
    );
  }

  if (g.phase === "levelcomplete") {
    return (
      <LevelCompleteScreen
        level={g.level}
        score={g.score}
        p2Score={g.mode === "versus" ? g.p2Score : undefined}
        mode={g.mode}
        onNextLevel={g.nextLevel}
        onHome={g.goHome}
        onEndGame={g.endGame}
      />
    );
  }

  if (g.phase === "gameover") {
    return (
      <GameOverScreen
        score={g.score}
        p2Score={g.mode === "versus" ? g.p2Score : undefined}
        mode={g.mode}
        level={g.level}
        coinsEarned={coinsEarned}
        onRestart={() => g.startGame(g.mode)}
        onHome={g.goHome}
      />
    );
  }

  return g.currentOrder ? (
    <GamePlayScreen
      order={g.currentOrder}
      round={g.round}
      totalRounds={g.totalRounds}
      currentStep={g.currentStep}
      score={g.score}
      timer={g.timer}
      timerSeconds={g.timerSeconds}
      feedback={g.feedback}
      shuffledActions={g.shuffledActions}
      onAction={(a) => g.handleAction(a, 1)}
      onBack={g.goHome}
      level={g.level}
      customerEntering={g.customerEntering}
      stallSkin={skin}
      mode={g.mode}
      p2Order={g.p2CurrentOrder}
      p2Round={g.p2Round}
      p2Step={g.p2Step}
      p2Score={g.p2Score}
      p2Timer={g.p2Timer}
      p2Feedback={g.p2Feedback}
      p2ShuffledActions={g.p2ShuffledActions}
      onP2Action={(a) => g.handleAction(a, 2)}
    />
  ) : null;
};

export default Index;
