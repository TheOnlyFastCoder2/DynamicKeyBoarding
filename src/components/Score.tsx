import {  useSelector } from 'react-redux';
import { getState }from 'store/game';

export default function () {
  const state = useSelector(getState);

  return (
    <div className="Score">
        <h2>scrore</h2>
        <h1>{state.scores}</h1>
    </div>
  )
}