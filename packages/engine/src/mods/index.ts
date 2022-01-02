import { Engine } from "..";

export interface Mod {
    name: string,
    order: number;
    load: (engine: Engine, settings: Record<string, unknown>) => void;
    unload?: (engine: Engine, settings: Record<string, unknown>) => void;
    settingsBlueprint: Record<string, unknown>;
    settings: Record<string, unknown>
}