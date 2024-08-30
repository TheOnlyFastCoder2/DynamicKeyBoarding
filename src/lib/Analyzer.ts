export default class Analyzer {
  private callback: Function | undefined;
  public audio: HTMLAudioElement | undefined;

  private context!: AudioContext;
  private analyser!: AnalyserNode;
  private src!: MediaElementAudioSourceNode;
  private animID: number = 0;

  init(audio: HTMLAudioElement, callback:Function) {
    this.callback = callback;
    this.audio = audio;
  }

  isThereAudio(): boolean {
    return this.audio !== undefined
  }

  setVolume(value: number) {
    this.audio!.volume = value;
  } 

  getPauseAudio() {
    this.audio!.pause()
    cancelAnimationFrame(this.animID);
  }

  getPlayAudio() {
    this.audio!.play()
    this.listnerAudio()
  }

  getRestartAudio() {
    this.audio!.currentTime = 0;
    this.getPlayAudio() 
  }

  preparationAudio() {
    if(this.audio) {
      this.context = new AudioContext();
      this.analyser = this.context.createAnalyser();
      this.src = this.context.createMediaElementSource(this.audio);
  
      this.src.connect(this.analyser);
      this.analyser.connect(this.context.destination);
    }
  }

  listnerAudio() {
    if(this.audio && this.callback) {
      const bufferLength = this.analyser.frequencyBinCount;
      const array = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(array);

      if(this.audio.duration - 20 < this.audio.currentTime) {
        this.audio.currentTime = 0;
      }

      this.callback(array);
  
      this.animID = requestAnimationFrame(this.listnerAudio.bind(this));
    }
  }
}

