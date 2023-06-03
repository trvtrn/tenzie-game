import React from "react";
import { Game } from "./Game";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";


export function Main() {
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 9),
      isHeld: false,
      id: nanoid(),
    };
  };

  
  // generates random number dice
  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };
  
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  
  // generates new random numbers
  const handleRoll = () => {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(dice => {
          return dice.isHeld ? dice : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  };

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(prevState => !prevState);
    }
  }, [dice]);


  // this makes sure that those we clicked turns green using its id
  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const diceElements = dice.map((dice) => (
    <Game
      holdDice={() => holdDice(dice.id)}
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
    />
  ));

  return (
    <div className="body-wrapper">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <h3 className="body-text">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <div className="die-container">{diceElements}</div>
      <button className="roll-button" onClick={handleRoll}>
        {tenzies ? "Restart" : "Roll"}
      </button>
    </div>
  );
}
