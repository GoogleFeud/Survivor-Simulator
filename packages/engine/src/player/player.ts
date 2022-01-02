import { Engine } from "../engine";
import { Random } from "../utils";
import { Alliance } from "./alliance";
import { Strategy } from "./strategy";
import { Trait } from "./trait";
import { Tribe } from "./tribe";

export interface IPlayerData {
    firstName: string,
    lastName: string,
    age: number,
    job?: number,
    stats?: {
        intelligence: number,
        strength: number,
        stamina: number,
        appearance: number
    }
    traits?: Array<Trait>,
    strategy?: Strategy
}

export class Player {
    engine: Engine;
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    job?: number;
    stats: {
        intelligence: number,
        strength: number,
        appearance: number,
        stamina: number
    };
    traits: Map<string, Trait>;
    tribe: Tribe;
    strategy: Strategy;
    constructor(engine: Engine, tribe: Tribe, data: IPlayerData) {
        this.id = engine.players.size + 1;
        this.engine = engine;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.job = data.job;
        this.stats = data.stats || {
            intelligence: Random.btw(0, 10),
            strength: Random.btw(0, 10),
            appearance: Random.btw(0, 10),
            stamina: Random.btw(0, 10)
        };
        this.traits = new Map((data.traits ? data.traits : engine.traits.randomFilter(Random.btw(1, 3), (trait, known) => {
            if (known.includes(trait)) return;
            for (const knownTrait of known) {
                if (knownTrait.collidesWith.includes(trait.id) || trait.collidesWith.includes(knownTrait.id)) return;
            }
            return true;
        })).map(t => [t.id, t]));
        this.tribe = tribe;
        this.strategy = data.strategy || new (engine.strategies.random())(this); 
    }

    emit(event: string|number, ...data: Array<unknown>) : void {
        for (const [, trait] of this.traits) trait.emit(event, ...data);
        this.strategy.emit(event, ...data);
    }

    get name() : string {
        return `${this.firstName} ${this.lastName}`;
    }

    get alliances() : Array<Alliance> {
        return this.engine.alliances.filter(a => a.creator === this || a.members.has(this.id));
    }

}