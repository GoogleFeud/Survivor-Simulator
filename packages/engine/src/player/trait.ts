import { Player } from ".";
import { WeightedArray } from "..";
import { EventEmitter } from "../utils/EventEmitter";

export interface ITraitData {
    id: string,
    name: string,
    weight: number,
    description?: string,
    collidesWith?: Array<string>
    condition?: (player: Player) => boolean;
}

/**
 * Traits give a player a certain characteristic - witty, smart, annoying, dumb, etc. 
 * Every trait instance can listen to events and possibly change the outcome of those events.
 * Unlike strategies, traits are completely **stateless**, there will always be only one instance
 * of a trait, while each player gets a new instance of a strategy.
 */

export class Trait extends EventEmitter<string|number, [Player, ...Array<unknown>]> {
    id: string;
    name: string;
    weight: number;
    description?: string;
    collidesWith: Array<string>;
    condition?: (player: Player) => boolean;
    constructor(data: ITraitData) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.weight = data.weight;
        this.description = data.description;
        this.collidesWith = data.collidesWith || [];
        this.condition = data.condition;
    }
    
}

export class TraitStore extends WeightedArray<Trait> {

    add(...traits: Array<ITraitData>) : void {
        this.push(...traits.map(t => new Trait(t)));
    }

    smartRandom(amount: number, player: Player) : Array<Trait> {
        return this.randomFilter(amount, (trait, known) => {
            if (!trait.condition?.(player)) return false;
            for (const knownTrait of known) {
                if (knownTrait === trait || knownTrait.collidesWith.includes(trait.id) || trait.collidesWith.includes(knownTrait.id)) return false;
            }
            return true;
        });
    }

}