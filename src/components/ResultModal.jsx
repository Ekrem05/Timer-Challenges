import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeLeft, onReset },
  ref
) {
  const hasUserWon = timeLeft > 0;
  const formattedTimeLeft = timeLeft / (1000).toFixed(2);
  const score = Math.round((1 - timeLeft / (targetTime * 1000)) * 100);
  const myDialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        myDialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog className="result-modal" ref={myDialog} onClose={onReset}>
      {hasUserWon ? <h2>Your Score: {score}</h2> : <h2>You lost</h2>}
      <p>
        Target time was <strong>{targetTime} seconds</strong>.
      </p>
      <p>You stopped the timer with {formattedTimeLeft} seconds left.</p>
      <form method="dialog">
        <button onClick={onReset}>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
