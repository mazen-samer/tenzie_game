import React from "react";
import "./style/die.css";
function Die(props) {
  const myStyle = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      onClick={() => props.onClick(props.id)}
      className="die"
      id={props.id}
      style={myStyle}
    >
      {props.value}
    </div>
  );
}

export default Die;
