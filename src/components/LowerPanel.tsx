import Keyboard from "./Keyboard";
import Health from "./Health";
import Score from "./Score";
import Level from "./Level";
import VolumeController from "./VolumeController";

export default function () {
  return (
    <div className="LowerPanel">
      <Level/>
      <VolumeController/>
      <Score/>
      <Keyboard/>
      <Health/>
    </div>
  )
}