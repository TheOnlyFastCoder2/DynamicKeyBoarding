import Keyboard from "./Keyboard";
import Health from "./Health";
import Score from "./Score";
import VolumeController from "./VolumeController";

export default function () {
  return (
    <div className="LowerPanel">
      <VolumeController/>
      <Score/>
      <Keyboard/>
      <Health/>
    </div>
  )
}