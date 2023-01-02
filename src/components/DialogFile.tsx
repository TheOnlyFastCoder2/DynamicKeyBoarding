import { useDispatch, useSelector } from 'react-redux';
import React  from 'react';

import { constState, letters } from 'store/game/state';
import * as Game from 'store/game';
import { LettersType } from 'lib/types';


type EventTarget = React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>;

export default function () {
  const state = useSelector(Game.getState);
  const dispatch = useDispatch();

  function setFrequencyDates(arr:Array<number>) {
    for(let i = 0; i < state.cells.length; i++) {
      dispatch(Game.actions.setFrequencyData([i,arr[400]]))
    }
  }

  function addMusic(audio: HTMLAudioElement) {
    constState.analyzer.init(audio, setFrequencyDates)
    constState.analyzer.preparationAudio();
    constState.analyzer.getPlayAudio();
}

  function setLanguage({target}: React.MouseEvent<HTMLElement>) {
    const button = target as HTMLElement;
    dispatch(Game.actions.setLang(button.textContent as LettersType))
  }

  function closePopUp({target}:EventTarget) {
    if(target instanceof HTMLInputElement) {
      if(target!.files as FileList) {
        const files: FileList = target!.files!;
        const audio = new Audio(URL.createObjectURL(files[0]));

        addMusic(audio);
      }
    }
    else {
      const button = target as HTMLElement;
      switch(button.dataset.key) {
        case "testMusic": 
          const audio = new Audio(window.location.href + "music_1.mp3");
          addMusic(audio);
          break;
        case "withCurrMusic":
          constState.analyzer.getRestartAudio();
          break;
      }
    }

    dispatch(Game.actions.getRun(true));
  }

  return (
    <>
      {
        state.isRunning === false && 
        <div className="DialogFile">
          <div className="DialogFile_container">
              <label htmlFor="dialogFile">выберите музыку на ПК</label>
              <input id="dialogFile" type="file" onChange={closePopUp} accept="audio/*"/>
              <button data-key={"testMusic"} onClick={closePopUp}>
                выбрать тестовую музыку
              </button>

              {
                constState.analyzer.isThereAudio() &&
                <button data-key={"withCurrMusic"} onClick={closePopUp}>
                  начать заново с этой музыкой
                </button>
              }
              
              <button onClick={closePopUp}>
                играть без музыки
              </button>

              <div className="DialogFile_lang">
                {
                  Object.keys(letters).map((lang) => {
                    const isCurr = state.currLang === lang;
                    const currClass = isCurr ? "current" : "";

                    return (
                      <button 
                        key={lang}
                        onClick={setLanguage}
                        className={currClass}>
                        {lang}
                      </button>
                    )
                  })
                }
              </div>
            </div>

          <div className="DialogFile_background"></div>
        </div>
      }
    </>
  )
}