import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzie, setTenzie] = React.useState(false);

  React.useEffect(() => {
    const isHeldDice = dice.every((die) => die.isHeld);
    const firstDiceValue = dice[0].value;
    const allValuesDice = dice.every((die) => die.value === firstDiceValue);
    if (isHeldDice && allValuesDice) {
      setTenzie(true);
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzie) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              };
        })
      );
    } else {
      setTenzie(false);
      setDice(allNewDice());
    }
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        onClick={hold}
        value={die.value}
        id={die.id}
        key={die.id}
        isHeld={die.isHeld}
      />
    );
  });

  return (
    <div className="App">
      {tenzie && <Confetti width={360} height={360} />}
      <div className="context">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice">{diceElements}</div>
      <button onClick={rollDice}>{tenzie ? "You won!" : "Roll"}</button>
    </div>
  );
}

export default App;
