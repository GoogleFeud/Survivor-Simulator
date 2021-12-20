
import { Engine } from "..";
import { EventEmitter } from "../utils/EventEmitter";
import { WeightedArray } from "../utils/WeightedArray";
import { Event } from "./event";

export const enum DayPhases {
    Begin,
    Middle,
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
        const newEvents = new WeightedArray(...this.gameEvents.filter(el => el.canRun(this.engine, categories)));
        while (amount--) {
            const event = newEvents.random();
            event.run(this.engine);
        }
    }

    inc() : void {
        this.emit(this.day++, DayPhases.End, this.engine);
        this.emit(this.day, DayPhases.Begin, this.engine);
    }

}