import { useEffect} from 'react';
import {useSelector } from 'react-redux';

import {getState}from 'store/game';
import setCSSProperty from 'lib/setCSSProperty';

export default function () {
  const state = useSelector(getState)
  // const dispatch = useDispatch();

  useEffect(() => {
    setCSSProperty('--hp', `${100 - state.health}%`)
  },[state.health])

  return (
    <div className="Health">
      <h2>hp</h2>
    </div>
  )
}