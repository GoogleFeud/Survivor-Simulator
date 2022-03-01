import { Player } from ".";
import { WeightedArray } from "..";
import { EventEmitter } from "../utils/EventEmitter";


export interface ITraitData {
    id: string,
    name: string,
    weight: number,
    description?: string,
    collidesWith?: Array<string>
}

export class Trait extends EventEmitter<string|number, [Player, ...Array<unknown>]> {
    id: string;
    name: string;
    weight: number;
    description?: string;
    collidesWith: Array<string>;
    constructor(data: ITraitData) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.weight = data.weight;
        this.description = data.description;
        this.collidesWith = data.collidesWith || [];
    }
    
}

export class TraitStore extends WeightedArray<Trait> {

    add(...traits: Array<ITraitData>) : void {
        this.push(...traits.map(t => new Trait(t)));
    }

    randomNonColliding(amount: number) : Array<Trait> {
        return this.randomFilter(amount, (trait, known) => {
            for (const knownTrait of known) {
                if (knownTrait === trait || knownTrait.collidesWith.includes(trait.id) || trait.collidesWith.includes(knownTrait.id)) return false;
            }
            return true;
        });
    }
}