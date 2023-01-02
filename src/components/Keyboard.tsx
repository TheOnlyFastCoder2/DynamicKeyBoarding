import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Game from 'store/game';
import {letters} from 'store/game/state';

export default function () {
  const state = useSelector(Game.getState)
  const dispatch = useDispatch();

  const [activeLetter, setActiveLetter] = useState<string>();

  function listenerKeyDown(ev: KeyboardEvent) {
    setActiveLetter(ev.key);
    dispatch(Game.actions.removeLetter(ev.key.toLowerCase()))
    setTimeout(() => {
      setActiveLetter("")
    }, 100)
  }

  useEffect(() => {
    document.addEventListener('keydown', listenerKeyDown);
    return () => {
      document.removeEventListener('keydown', listenerKeyDown);
    }
  }, [])
  

  return (
    <div className="Keyboard">
      {
        letters[state.currLang].map((row, i) => {
          return (
            <ul key={row[0]+i}>
              {
                row.map((letter) => {
                  const isActive = letter == activeLetter ? "active" : '';
                  return (
                    <li className={isActive} key={letter}>
                      {letter}
                    </li>
                  )
                })
              }
            </ul>
          )
        })
      }
    </div>
  )
}