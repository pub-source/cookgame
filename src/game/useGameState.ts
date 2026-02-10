import { useState, useEffect, useCallback, useRef } from "react";
import { RECIPES, BASE_POINTS, ALL_ACTIONS } from "./recipes";
import { getLevelTimer, getLevelRounds, loadSave, saveSave, ALL_SKINS } from "./gameStore";
import { playCorrect, playWrong, playOrderComplete, playTimerWarning, playGameOver, playDoorBell, playLevelUp } from "./sounds";

export type GamePhase = "start" | "playing" | "levelcomplete" | "gameover" | "shop";
export type GameMode = "solo" | "versus";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getShuffledRecipes(count: number) {
  const shuffled = shuffleArray(RECIPES);
  const result = [];
  while (result.length < count) {
    result.push(...shuffleArray(RECIPES));
  }
  return result.slice(0, count);
}

function getShuffledActions() {
  return shuffleArray(ALL_ACTIONS);
}

export function useGameState() {
  const [save, setSave] = useState(loadSave);
  const [phase, setPhase] = useState<GamePhase>("start");
  const [mode, setMode] = useState<GameMode>("solo");
  const [level, setLevel] = useState(1);

  // Player 1
  const [orders, setOrders] = useState(() => getShuffledRecipes(5));
  const [round, setRound] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [shuffledActions, setShuffledActions] = useState(getShuffledActions);
  const [customerEntering, setCustomerEntering] = useState(false);

  // Player 2 (versus mode)
  const [p2Orders, setP2Orders] = useState(() => getShuffledRecipes(5));
  const [p2Round, setP2Round] = useState(0);
  const [p2Step, setP2Step] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [p2Timer, setP2Timer] = useState(30);
  const [p2Feedback, setP2Feedback] = useState<"correct" | "wrong" | null>(null);
  const [p2ShuffledActions, setP2ShuffledActions] = useState(getShuffledActions);

  const currentOrder = orders[round] ?? null;
  const p2CurrentOrder = p2Orders[p2Round] ?? null;
  const timerSeconds = getLevelTimer(level);
  const totalRounds = getLevelRounds(level);

  // Customer entering effect
  useEffect(() => {
    if (phase === "playing") {
      setCustomerEntering(true);
      playDoorBell();
      const t = setTimeout(() => setCustomerEntering(false), 800);
      return () => clearTimeout(t);
    }
  }, [phase, round]);

  // Timer countdown P1
  useEffect(() => {
    if (phase !== "playing") return;
    if (timer <= 0) {
      advanceRound(1);
      return;
    }
    if (timer === 5) playTimerWarning();
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, timer, round]);

  // Timer countdown P2
  useEffect(() => {
    if (phase !== "playing" || mode !== "versus") return;
    if (p2Timer <= 0) {
      advanceRound(2);
      return;
    }
    const id = setInterval(() => setP2Timer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, p2Timer, p2Round, mode]);

  // Clear feedback
  useEffect(() => {
    if (!feedback) return;
    const id = setTimeout(() => setFeedback(null), 600);
    return () => clearTimeout(id);
  }, [feedback]);

  useEffect(() => {
    if (!p2Feedback) return;
    const id = setTimeout(() => setP2Feedback(null), 600);
    return () => clearTimeout(id);
  }, [p2Feedback]);

  const advanceRound = useCallback((player: 1 | 2) => {
    if (player === 1) {
      if (round + 1 >= totalRounds) {
        // Level complete
        handleLevelEnd();
      } else {
        setRound((r) => r + 1);
        setCurrentStep(0);
        setTimer(timerSeconds);
        setShuffledActions(getShuffledActions());
      }
    } else {
      if (p2Round + 1 >= totalRounds) {
        handleLevelEnd();
      } else {
        setP2Round((r) => r + 1);
        setP2Step(0);
        setP2Timer(timerSeconds);
        setP2ShuffledActions(getShuffledActions());
      }
    }
  }, [round, p2Round, totalRounds, timerSeconds]);

  const handleLevelEnd = useCallback(() => {
    playLevelUp();
    setPhase("levelcomplete");
  }, []);

  const startGame = useCallback((gameMode: GameMode) => {
    setMode(gameMode);
    setLevel(1);
    const ts = getLevelTimer(1);
    const tr = getLevelRounds(1);

    setOrders(getShuffledRecipes(tr));
    setRound(0);
    setCurrentStep(0);
    setScore(0);
    setTimer(ts);
    setFeedback(null);
    setShuffledActions(getShuffledActions());

    if (gameMode === "versus") {
      setP2Orders(getShuffledRecipes(tr));
      setP2Round(0);
      setP2Step(0);
      setP2Score(0);
      setP2Timer(ts);
      setP2Feedback(null);
      setP2ShuffledActions(getShuffledActions());
    }

    setPhase("playing");
  }, []);

  const nextLevel = useCallback(() => {
    const newLevel = level + 1;
    setLevel(newLevel);
    const ts = getLevelTimer(newLevel);
    const tr = getLevelRounds(newLevel);

    setOrders(getShuffledRecipes(tr));
    setRound(0);
    setCurrentStep(0);
    setTimer(ts);
    setFeedback(null);
    setShuffledActions(getShuffledActions());

    if (mode === "versus") {
      setP2Orders(getShuffledRecipes(tr));
      setP2Round(0);
      setP2Step(0);
      setP2Timer(ts);
      setP2Feedback(null);
      setP2ShuffledActions(getShuffledActions());
    }

    setPhase("playing");
  }, [level, mode]);

  const endGame = useCallback(() => {
    playGameOver();
    const totalScore = mode === "versus" ? Math.max(score, p2Score) : score;
    const coinsEarned = Math.floor(totalScore / 10);
    const newSave = {
      ...save,
      coins: save.coins + coinsEarned,
      highScore: Math.max(save.highScore, totalScore),
      highestLevel: Math.max(save.highestLevel, level),
    };
    setSave(newSave);
    saveSave(newSave);
    setPhase("gameover");
  }, [score, p2Score, mode, save, level]);

  const handleAction = useCallback(
    (action: string, player: 1 | 2 = 1) => {
      if (phase !== "playing") return;

      if (player === 1) {
        if (!currentOrder) return;
        const expected = currentOrder.steps[currentStep]?.action;
        if (action === expected) {
          playCorrect();
          setFeedback("correct");
          const nextStep = currentStep + 1;
          if (nextStep >= currentOrder.steps.length) {
            playOrderComplete();
            const timeBonus = timer * 2;
            const levelBonus = level * 10;
            setScore((s) => s + BASE_POINTS + timeBonus + levelBonus);
            setShuffledActions(getShuffledActions());
            if (round + 1 >= totalRounds) {
              handleLevelEnd();
            } else {
              setRound((r) => r + 1);
              setCurrentStep(0);
              setTimer(timerSeconds);
              setShuffledActions(getShuffledActions());
            }
          } else {
            setCurrentStep(nextStep);
            setShuffledActions(getShuffledActions()); // shuffle on each correct step
          }
        } else {
          playWrong();
          setFeedback("wrong");
        }
      } else {
        if (!p2CurrentOrder) return;
        const expected = p2CurrentOrder.steps[p2Step]?.action;
        if (action === expected) {
          playCorrect();
          setP2Feedback("correct");
          const nextStep = p2Step + 1;
          if (nextStep >= p2CurrentOrder.steps.length) {
            playOrderComplete();
            const timeBonus = p2Timer * 2;
            const levelBonus = level * 10;
            setP2Score((s) => s + BASE_POINTS + timeBonus + levelBonus);
            if (p2Round + 1 >= totalRounds) {
              handleLevelEnd();
            } else {
              setP2Round((r) => r + 1);
              setP2Step(0);
              setP2Timer(timerSeconds);
              setP2ShuffledActions(getShuffledActions());
            }
          } else {
            setP2Step(nextStep);
            setP2ShuffledActions(getShuffledActions());
          }
        } else {
          playWrong();
          setP2Feedback("wrong");
        }
      }
    },
    [phase, currentOrder, currentStep, timer, round, totalRounds, timerSeconds, level, p2CurrentOrder, p2Step, p2Timer, p2Round, handleLevelEnd]
  );

  const goHome = useCallback(() => {
    setPhase("start");
  }, []);

  const goShop = useCallback(() => {
    setPhase("shop");
  }, []);

  const handleBuySkin = useCallback((skinId: string) => {
    const skin = ALL_SKINS.find((s) => s.id === skinId);
    if (!skin || save.coins < skin.price) return;
    const newSave = {
      ...save,
      coins: save.coins - skin.price,
      ownedSkins: [...save.ownedSkins, skinId],
    };
    setSave(newSave);
    saveSave(newSave);
  }, [save]);

  const handleEquipSkin = useCallback((skinId: string) => {
    const newSave = { ...save, activeSkin: skinId };
    setSave(newSave);
    saveSave(newSave);
  }, [save]);

  return {
    phase, mode, level, save,
    // P1
    currentOrder, round, currentStep, score, timer, feedback, shuffledActions, customerEntering,
    // P2
    p2CurrentOrder, p2Round, p2Step, p2Score, p2Timer, p2Feedback, p2ShuffledActions,
    // Derived
    totalRounds, timerSeconds,
    // Actions
    startGame, nextLevel, endGame, handleAction, goHome, goShop,
    handleBuySkin, handleEquipSkin,
  };
}
