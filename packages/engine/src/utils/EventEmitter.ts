/* eslint-disable @typescript-eslint/no-explicit-any */

export const STOPPED_EVENT = Symbol("STOPPED_EVENT");
/**
 * An [[EventEmitter]] event listener. If the listener returns [[STOPPED_EVENT]], then any following listeners will not
 * be executed, and the [[EventEmitter.emit()]] function will return `false`. 
 * 
 * If anything else is returned, the emit function will return true and the next listener will be executed.
 */
export type EventListener<T extends [...Array<any>]> = (...args: T) => typeof STOPPED_EVENT|any;

/**
 * A class which allows components to **listen** to events and **emit** events whenever they want to.
 */
export class EventEmitter<T extends string|number, ARGS extends [...Array<any>] = Array<any>> {
    private _events: Record<T, Array<EventListener<ARGS>>> = {} as Record<T, Array<EventListener<ARGS>>>;

    on(event: T, cb: EventListener<ARGS>) : () => void {
        if (event in this._events) {
            this._events[event].push(cb);
        } else this._events[event] = [cb];
        return () => this.off(event, cb);
    }

    /**
     * Puts the event at the start of the chain instead of the end.
     */
    priority(event: T, cb: EventListener<ARGS>) : () => void {
        if (event in this._events) {
            this._events[event].unshift(cb);
        } else this._events[event] = [cb];
        return () => this.off(event, cb);
    }

    /**
     * Removes all other listeners.
     */
    only(event: T, cb: EventListener<ARGS>) : () => void {
        this._events[event] = [cb];
        return () => this.off(event, cb);
    }

    /**
     * Runs the event only once, and then removes it.
     * 
     * |> You **cannot** use [[EventEmitter.off()]] by providing the callback passed to this function. Use the function returned by this method instead.
     */
    once(event: T, cb: EventListener<ARGS>) : () => void {
        const newCb = (...args: ARGS) => {
            cb(...args);
            this.off(event, newCb);
        };
        if (event in this._events) {
            this._events[event].push(newCb);
        } else this._events[event] = [newCb];
        return () => this.off(event, newCb);
    }

    off(event: T, cb: EventListener<ARGS>) : void {
        const ind = this._events[event].indexOf(cb);
        if (ind === -1) return;
        this._events[event].splice(ind, 1);
    }

    emit<Res extends [...Array<any>]>(event: T, ...args: ARGS) : typeof STOPPED_EVENT | Res {
        if (!this._events[event]) return STOPPED_EVENT;
        const res = [];
        for (const cb of this._events[event]) {
            const result = cb(...args);
            if (result === STOPPED_EVENT) return STOPPED_EVENT;
            res.push(result);
        }
        //@ts-expect-error ...
        return res;
    }

}