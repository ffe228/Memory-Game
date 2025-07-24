import "../assets/StyleCard.css";

export default function Card({ number, onClick, isRevealed }) {
  return (
    <div>
      <button onClick={onClick}>{isRevealed ? number : "?"}</button>
    </div>
  );
}
