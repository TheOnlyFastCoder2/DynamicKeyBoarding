import { useAppSelector } from 'store/hooks';
import { getState }from 'store/game';
import IconStar from 'lib/icons/star'

export default function () {
  const state = useAppSelector(getState)
 
  return (
    <div className="Level">
        <div className="Level_trace"> 
          <div className="Level_trace_stars">
            {state.levels.map((val: number, i: number) => {
              return  <IconStar key={i} idStar={i} percent={val}/>
            })}
          </div>
        </div>

        <div className="Level_text">
            <h2>LVL</h2>
            <h1>{state.mainLevel}</h1>
        </div>
    </div>
  )
}