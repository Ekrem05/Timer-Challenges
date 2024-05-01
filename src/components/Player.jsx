import { useState, useRef } from "react";

export default function Player() {
  const nameRef = useRef();
  const [playerName, setPlayerName] = useState("unknown entity");

  function handleClick() {
    setPlayerName(nameRef.current.value);
    nameRef.current.value = "";
  }
  return (
    <section id="player">
      <h2>Welcome {playerName}</h2>
      <p>
        <input ref={nameRef} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
