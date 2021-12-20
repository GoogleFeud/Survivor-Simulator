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

    canRun(engine: Engine, categories?: Array<string>) : boolean|undefined {
        return this.amount !== 0 && (categories ? categories.every(cat => this.categories.includes(cat)) : true) || (this.checker ? this.checker(engine) : true);
    }

    run(engine: Engine) {
        this.amount--;
        this.executor(engine);
    }

}