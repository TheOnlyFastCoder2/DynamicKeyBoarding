import { useEffect, useRef } from 'react';

interface Type {
  flag:boolean,
  restartGame: Function
}

export default function ({flag,restartGame}: Type) {
  const refFinishGame = useRef<HTMLDivElement>(null);


  function setLoseEnd () {
    const delay = 1000; 
    const offsetDelay = delay + 1000;
    const {current} = refFinishGame;

    const timeout = setTimeout(() => {
      current!.classList.add(`${flag as boolean}`)

      const timeout_1 = setTimeout(() => {
        restartGame()
        clearTimeout(timeout_1);
        clearTimeout(timeout);
      },offsetDelay);
    },delay) 
  }

  useEffect(() => {
    if (flag) {
      setLoseEnd()
    }
  },[flag])

  return flag !== false ? (
    <div className={`FinishGame`} ref={refFinishGame}>
      <h1>Game Over</h1>
    </div>
  ) : <></>
}