/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2018 The noVNC Authors
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * See README.md for usage and integration instructions.
 */

export default class EventTargetMixin {
    constructor() {
        this._listeners = null;
    }

    addEventListener(type, callback) {
        if (!this._listeners) {
            this._listeners = new Map();
        }
        if (!this._listeners.has(type)) {
            this._listeners.set(type, new Set());
        }
        this._listeners.get(type).add(callback);
    }

    removeEventListener(type, callback) {
        if (!this._listeners || !this._listeners.has(type)) {
            return;
        }
        this._listeners.get(type).delete(callback);
    }

    dispatchEvent(event) {
        if (!this._listeners || !this._listeners.has(event.type)) {
            return true;
        }
        this._listeners.get(event.type).forEach((callback) => {
            callback.call(this, event);
        }, this);
        return !event.defaultPrevented;
    }
}
