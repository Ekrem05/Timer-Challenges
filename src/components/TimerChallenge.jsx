import { useState, useRef } from "react";

import ResultModal from "./ResultModal.jsx";

// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeLeft, setTimeLeft] = useState(targetTime * 1000);

  const timerIsActive = timeLeft > 1 && timeLeft < targetTime * 1000;
  if (timeLeft <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 10);
    }, 10);
  }

  function handleReset() {
    setTimeLeft(targetTime * 1000);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        timeLeft={timeLeft}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
