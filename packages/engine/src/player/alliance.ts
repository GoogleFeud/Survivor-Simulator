import { Collection } from "../utils/Collection";
import { Player } from "./player";
import { Tribe } from "./tribe";

export class Alliance {
    creator: Player;
    members: Collection<Player, number>;
    tribe: Tribe;
    constructor(creator: Player, members: Array<Player>, tribe: Tribe) {
        this.creator = creator;
        this.members = new Collection(members.map(m => [m.id, m]));
        this.tribe = tribe;
    }

    get allPlayers() : Array<Player> {
        const vals = this.members.valArray();
        vals.push(this.creator);
        return vals;
    }

    calculateRelationships() : number {
        const allPlayers = this.allPlayers;
        let totalRelationships = 0;
        for (const player of allPlayers) {
            for (const otherPlayer of allPlayers) {
                if (player === otherPlayer) continue;
                totalRelationships += player.relationships.get(otherPlayer);
            }
        }
        return totalRelationships;
    }
    
    /**
     * - Relationships of all players inside the alliance. The higher the relationships, the better.
     * - Relationships of all players inside the tribe.
     * - If any of the players inside this alliance are inside other, stronger alliances.
     * - The amount of players inside the alliance. The more players there are, the less the score is.
     * - If the alliance is the majority in the tribe.
     * 
     * The lower the returned number, the higher the chance of the alliance failing.
     */
    calculatePower() : number {
        const allPlayers = this.allPlayers;
        const relationshipLevel = this.calculatePower();
        let power = (10 - allPlayers.length) + relationshipLevel;

        for (const alliance of this.tribe.engine.alliances) {
            if (alliance.tribe !== this.tribe) continue;
            if (relationshipLevel < alliance.calculateRelationships()) {
                for (const player of allPlayers) {
                    if (alliance.allPlayers.includes(player)) power--;
                }
                power--;
            }
        }

        if (allPlayers.length > Math.floor(this.tribe.players.length / 2)) power++;

        return power;
    }
}