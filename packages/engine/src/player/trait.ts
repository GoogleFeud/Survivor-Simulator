import { EventEmitter } from "../utils/EventEmitter";


export interface ITrait {
    id: string,
    name: string,
    weight: number,
    description?: string
}

export class Trait extends EventEmitter<string|number> {
    id: string;
    name: string;
    weight: number;
    description?: string;
    constructor(data: ITrait) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.weight = data.weight;
        this.description = data.description;
    }
    
}