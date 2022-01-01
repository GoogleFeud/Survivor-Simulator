import { EventEmitter } from "../utils/EventEmitter";


export interface ITraitData {
    id: string,
    name: string,
    weight: number,
    description?: string,
    collidesWith?: Array<string>
}

export class Trait extends EventEmitter<string|number> {
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