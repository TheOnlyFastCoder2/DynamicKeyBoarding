import { runInThisContext } from "vm";

class RequestAnimation  {
  private timer:number = 0;

  private updateFrequency:number;
  private readonly updateFrequencyStep:number;

  private totalTime:number = 0;
  private startTime:number = Date.now();
  private isCanvasVisible = true;
  private requestID:number = 0;

  constructor (
    freq:number, 
    freqStep:number,
    callback:Function
  ) 
  {
    this.updateFrequency = freq;
    this.updateFrequencyStep = freqStep;
    this.frame(callback);
  }

  getClearFrame () { 
    cancelAnimationFrame(this.requestID)
  }

  getStart() {this.isCanvasVisible = true;}
  getStop() {this.isCanvasVisible = false;}
  
  setSpeedUp () {this.updateFrequency -= this.updateFrequencyStep; }
  setSpeedDown () {this.updateFrequency += this.updateFrequencyStep; }

  winTarget() {
    window.onfocus = () => this.getStart()
    window.onblur = () => this.getStop()
  }

  frame(callback:Function) {
    const deltaTime = (Date.now() - this.startTime) - this.totalTime;
    this.totalTime = deltaTime + this.totalTime;
    
    if(this.isCanvasVisible) {
      this.update(deltaTime,callback);
    }
  
    this.requestID = window.requestAnimationFrame(
      this.frame.bind(this,callback)
    );
  }

  private update(deltaTime:number,callback:Function) {
    this.timer += deltaTime / 1000; 

    if(this.timer > this.updateFrequency) {
      this.timer -= this.updateFrequency;
      callback();
    }
  }
}

export default RequestAnimation