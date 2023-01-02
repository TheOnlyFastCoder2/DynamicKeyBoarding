import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState ,useRef } from 'react';

import requestAnimation from 'game/render/requestAnimation';

import * as Game from 'store/game';
import { constState } from 'store/game/state';

import LowerPanel from 'components/LowerPanel';
import DialogFile from 'components/DialogFile';
import FinishGame from 'components/FinishGame';

import {createCell} from 'game/render/context2D';

export default function () {

  const state = useSelector(Game.getState);
  const dispatch = useDispatch();

  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [refCtx, setRefCtx] = useState<CanvasRenderingContext2D>();
  const [reqAnimation, setReqAnimation] = useState<requestAnimation>()


  function setPositionsForCells() {
    for(let i = 0; i < state.cells.length; i++) {
      dispatch(Game.actions.setPosition(i));
    }
  }

  function clearCanvas() {
    refCtx!.clearRect(
      0,0, 
      constState.widthCanvas, 
      constState.heightCanvas
    );
  }
  
  useEffect(() => {
    dispatch(Game.actions.setCells([30, state.currLang]))  
  },[state.currLang])

  useEffect(() => {
    const canvas = refCanvas.current!;
    canvas.width = constState.widthCanvas;
    canvas.height = constState.heightCanvas;
    
    if(state.isRunning) { 
      setRefCtx(canvas.getContext('2d')!);
      setReqAnimation(new requestAnimation(
        0.009, 0.012, setPositionsForCells
      ));
    }
  }, [state.isRunning])
  
  function restartGame() {
    clearCanvas();
    reqAnimation?.getClearFrame();
    constState.analyzer.getPauseAudio();
    dispatch(Game.actions.restartStore());
  }


  useEffect(() => {
    if(refCtx && state.isRunning) {
      clearCanvas()
      for(let i = 0; i < state.cells.length; i++) {
        const cell =  state.cells[i];
        createCell(refCtx, cell);
      }
    }

  },[refCtx, state.cells])

  return (
    <>
      <FinishGame flag={state.isGameOver} restartGame={restartGame}/>
      <DialogFile/>
      <canvas ref={refCanvas}></canvas>
      <LowerPanel/>
    </>
  )
}