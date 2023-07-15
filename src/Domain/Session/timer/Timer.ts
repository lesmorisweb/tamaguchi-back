import {getSeconds} from "../../utils/timeConverters";

export class Timer {
   private _hour: number;
   private _minutes: number;
   private _seconds: number;
   private interval: NodeJS.Timer | undefined;
   private _isPaused: boolean = false;
   private _isStopped: boolean = false;
   private _started: boolean = false;
   private readonly _secondCallback: (() => void) | undefined;

   private readonly _timeOutCallback: (() => void) | undefined;

   constructor(
      hour: number,
      minutes: number,
      seconds: number,
      callback?: () => void,
      timeOutCallback?: () => void,
   ) {
      this._hour = hour;
      this._minutes = minutes;
      this._seconds = seconds;
      this._secondCallback = callback;
      this._timeOutCallback = timeOutCallback;
   }

   public start() {
      if (!this._started && !this._isStopped) this._started = true;
      this._isStopped = false;
      this.interval = setInterval(() => {
         this.secondPassed();
      }, 1000);
   }

   public resume() {
      if (!this._isStopped) {
         this._isPaused = false;
         this.start();
      }
   }

   public pause(): void {
      this._isPaused = true;
      clearInterval(this.interval);
   }

   public stop() {
      this._isStopped = true;
      clearInterval(this.interval);
   }

   private secondPassed(): void {
      if (this.isTimout()) {
         this.executeTimeoutActions();
         return;
      }
      if (this._seconds - 1 >= 0) {
         this._seconds -= 1;
      } else {
         this._seconds = 59;
         this.minutePassed();
      }
      if (this._secondCallback) this._secondCallback();
   }

   private minutePassed(): void {
      if (this._minutes - 1 >= 0) {
         this._minutes -= 1;
      } else {
         this._minutes = 59;
         this.hourPassed();
      }
   }

   private hourPassed(): void {
      if (this._hour - 1 >= 0) {
         this._hour -= 1;
      } else {
         this.stop();
      }
   }

   private isTimout(): boolean {
      return this._minutes === 0 &&
         this._seconds === 0 &&
         this._hour === 0;
   }

   private executeTimeoutActions(): void {
      if (this._timeOutCallback) this._timeOutCallback();
      this._isStopped = true;
   }

   get isStopped(): boolean {
      return this._isStopped;
   }

   get isPaused(): boolean {
      return this._isPaused;
   }

   get isStarted(): boolean {
      return this._started;
   }

   get timer(): string {
      return `${ this._hour }:${ this._minutes }:${ this._seconds }`;
   }

   get remainingSeconds(): number {
      return getSeconds(this._hour, this._minutes, this._seconds);
   }
}
