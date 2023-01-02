import React from 'react';
import { constState } from 'store/game/state'

import IconVolume from 'lib/icons/volume'

export default function () {


  function setVolume({target}: React.ChangeEvent<HTMLInputElement> ) {
    constState.analyzer.setVolume(+target.value);
  }

  return (
    !constState.analyzer.audio ? <></>
    : (
      <div className="VolumeController">
        <div className="container"> 
          <input type="range" min={0} max={1} step={0.05} onChange={setVolume}/>
          <IconVolume />
        </div>
      </div>
    )
  )
}