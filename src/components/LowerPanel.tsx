import { getState }from 'store/game';
import { useAppSelector } from "store/hooks";

import Keyboard from "./Keyboard";
import Health from "./Health";
import Score from "./Score";
import Level from "./Level";
import VolumeController from "./VolumeController";




export default function () {
  const state = useAppSelector(getState)

  return (
    <div className="LowerPanel">
      {
        state.isRunning && (
          <div className="rightPanel">
            <Level/>
            <VolumeController/>
          </div>
        )
      }
      <Score/>
      <Keyboard/>
      <Health/>
    </div>
  )
}