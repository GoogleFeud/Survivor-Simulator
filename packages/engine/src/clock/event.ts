import { Engine } from "../engine";

export type EventExecutor = (engine: Engine) => void;
export type EventChecker = (engine: Engine) => boolean;

export interface IEventData {
    name: string,
    description?: string,
    executor: EventExecutor,
    checker?: EventChecker,
    weight: number,
    amount?: number,
    categories?: Array<string>
}

export class Event {
    name: string;
    description?: string;
    executor: EventExecutor;
    checker?: EventChecker;
    weight: number;
    amount: number;
    categories: Array<string>;
    constructor(data: IEventData) {
        this.name = data.name;
        this.description = data.description;
        this.executor = data.executor;
        this.checker = data.checker;
        this.weight = data.weight;
        this.categories = data.categories || [];
        this.amount = data.amount || Infinity;
    }

    run(engine: Engine) : boolean {
        if (this.amount === 0 || (this.checker && !this.checker(engine))) return false;
        this.executor(engine);
        this.amount--;
        return true;
    }

}