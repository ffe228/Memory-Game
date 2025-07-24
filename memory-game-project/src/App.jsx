import Card from "./components/Card";
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const countCard = 12;
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [revealedCards, setRevealedCards] = useState(
    Array(countCard).fill(false)
  );
  const [openedCards, setOpenedCards] = useState([]);
  const [isWinner, setIsWinner] = useState(false);

  const handleCardClick = (index) => {
    if (revealedCards[index] || openedCards.length === 2) return;

    const newRevealedCards = [...revealedCards];
    newRevealedCards[index] = true;
    setRevealedCards(newRevealedCards);

    const newOpenedCards = [...openedCards, index];
    setOpenedCards(newOpenedCards);

    if (newOpenedCards.length === 2) {
      const [firstIndex, secondIndex] = newOpenedCards;

      if (shuffledNumbers[firstIndex] === shuffledNumbers[secondIndex]) {
        setOpenedCards([]);
        const allRevealed = newRevealedCards.every(
          (card, i) =>
            card || shuffledNumbers[i] === shuffledNumbers[firstIndex]
        );

        if (allRevealed) {
          setIsWinner(true);
        }
      } else {
        setTimeout(() => {
          const resetRevealed = [...newRevealedCards];
          resetRevealed[firstIndex] = false;
          resetRevealed[secondIndex] = false;
          setRevealedCards(resetRevealed);
          setOpenedCards([]);
        }, 1000);
      }
    }
  };

  const generateShuffledArray = () => {
    const baseArray = Array.from({ length: 6 }, (_, i) => [
      i + 1,
      i + 1,
    ]).flat();

    return [...baseArray].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const newShuffledArray = generateShuffledArray();
    setShuffledNumbers(newShuffledArray);
    setRevealedCards(Array(newShuffledArray.length).fill(false));
    setOpenedCards([]);
  }, []);

  const restartGame = () => {
    const newShuffledArray = generateShuffledArray();
    setShuffledNumbers(newShuffledArray);
    setRevealedCards(Array(newShuffledArray.length).fill(false));
    setOpenedCards([]);
    setIsWinner(false);
  };

  return (
    <>
      {!isWinner ? (
        <div className="playground">
          {Array.from({ length: countCard }).map((_, index) => (
            <Card
              key={index}
              number={shuffledNumbers[index]}
              isRevealed={revealedCards[index]}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      ) : (
        <div className="winner-message">Поздравляем! Вы победили!</div>
      )}

      <div className="restart-button">
        <button onClick={restartGame}>Начать игру заново!</button>
      </div>
    </>
  );
}
