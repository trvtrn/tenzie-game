import React from 'react';

export function Game(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
  }

  return <div className="box" style={styles} onClick={props.holdDice}>{props.value}</div>
}