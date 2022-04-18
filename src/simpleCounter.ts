import { createNanoEvents, Emitter } from "nanoevents";
import { FINISH_EVENT } from "./events";
import { EventT } from "./types/event";

export default class SimpleCounter {
  endDate: Date;

  startDate: Date;

  element: HTMLElement;

  private interval: NodeJS.Timeout;

  private emitter: Emitter;

  constructor(startDate: Date, endDate: Date, element: HTMLElement) {
    this.endDate = endDate;

    this.startDate = startDate;

    this.element = element;

    this.emitter = createNanoEvents();
  }

  getRemainingTime() {
    
    this.startDate = new Date(this.startDate.getTime() + 1000);

    const distance = this.endDate.getTime() - this.startDate.getTime();

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { distance, days, hours, minutes, seconds };
  }

  start() {
    this.element.innerHTML = "Chargement...";

    if (this.interval !== null) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      const { distance, days, hours, minutes, seconds } =
        this.getRemainingTime();

      const format = [
        {
          key: "Day",
          value: days,
        },
        {
          key: "Hour",
          value: hours,
        },
        {
          key: "Minute",
          value: minutes,
        },
        {
          key: "Second",
          value: seconds,
        },
      ];

      const str: string = format
        .filter(({ value }) => value > 0)
        .map(({ key, value }) => `${value} ${value > 1 ? key + "s" : key}`)
        .join(", ");

      if (distance < 0) {
        this.stop();
      } else {
        this.element.innerHTML = str;
      }
    }, 1000);

    return this;
  }

  stop() {
    
    clearInterval(this.interval);

    this.element.innerHTML = "Finished";

    this.emitter.emit(FINISH_EVENT, this.element);
  }

  on(event: EventT, callback: any) {
    return this.emitter.on(event, callback);
  }
}
