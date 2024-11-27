import { useEffect, useRef, useState } from "react"

interface IProps {
  title:string, 
  min:number,
  max:number,
  step:number,
  startVal?:number
  handler: (value:number) => void
}
export default function ({title, min, max, step, startVal, handler}: IProps) {;
  const refTrack = useRef<HTMLDivElement>(null);
  const refThumb = useRef<HTMLSpanElement>(null);
  const [value,setValue] = useState(startVal??min);

  function formattingValue(min:number,max:number,percent:number) {
    return +((max - min) * percent + min).toFixed(0);
  }

  function setSlip(thumb:HTMLSpanElement,track:HTMLDivElement) {
    thumb.onmousedown = () => {
      window.onmousemove = ({clientX}) => {
        const trackRect = track.getBoundingClientRect();
        let posX = clientX - trackRect.left + 50;
        const percent = posX / track.offsetWidth;

        if(posX % step < 1) {
         
          if(percent >= 0 && percent <= 1) {
            const val = formattingValue(min,max,percent);
            thumb.style.left = percent*100-5+"%";
            setValue(val);
            handler(val);
          }
        }
      }

      window.onmouseup = () => {
        window.onmousemove = null
      }
    }
  }
  
  useEffect(() => {
    const track = refTrack.current;
    const thumb = refThumb.current;
    
    if(thumb !== null && track !== null) {
      thumb.style.left = value*100-5+"%";
      setSlip(thumb,track);
    }
  },[])

  return (
    <>
      <div className="Range">
        {title && <h3>{title}</h3>}
        <div className="Range_track" ref={refTrack}>
          <span className="Range_track_thumb" ref={refThumb}></span>
        </div>
      </div>
    </>
  )
}