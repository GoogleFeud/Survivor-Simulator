import { Trait } from "./trait";

export interface IPlayerData {
    firstName: string,
    lastName: string,
    age: number,
    job?: number,
    stats: {
        intelligence: number,
        strength: number,
        appearance: number
    }
    traits?: Array<Trait>
}

export class Player {
    firstName: string;
    lastName: string;
    age: number;
    job?: number;
    stats: {
        intelligence: number,
        strength: number,
        appearance: number
    };
    traits: Map<string, Trait>;
    constructor(data: IPlayerData) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.job = data.job;
        this.stats = data.stats;
        this.traits = new Map(data.traits ? data.traits.map(t => [t.id, t]) : undefined);
    }

    get name() : string {
        return `${this.firstName} ${this.lastName}`;
    }

}