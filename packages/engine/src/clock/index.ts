
import { Engine } from "../engine";
import { EventEmitter } from "../utils/EventEmitter";
import { WeightedArray } from "../utils/WeightedArray";
import { Event, IEventData } from "./event";

export const enum DayPhases {
    Begin,
    End
}

export class Clock extends EventEmitter<number> {
    engine: Engine;
    gameEvents: WeightedArray<Event>;
    day: number;
    constructor(engine: Engine) {
        super();
        this.engine = engine;
        this.day = 0;
        this.gameEvents = new WeightedArray<Event>();
    }

    runEvents(amount: number, categories?: Array<string>) : void {
        for (const event of this.gameEvents.randomFilter(amount, (el) => el.canRun(this.engine, categories))) {
            event.run(this.engine);
        }
    }

    addEvents(...events: Array<IEventData>) : void {
        this.gameEvents.push(...events.map(ev => new Event(ev)));
    }

    move() : void {
        this.emit(this.day++, DayPhases.End, this.engine);
        this.emit(this.day, DayPhases.Begin, this.engine);
    }

    skipTo(day: number) : void {
        while(this.day !== day) {
            this.move();
        }
    }

}