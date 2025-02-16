import GUIControl from './components/Control/GUIControl';

import { GUIControlSelectOption } from './types';

export function isObject(value: unknown): value is object {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

export function isSelectOption(value: unknown): value is GUIControlSelectOption {
    return isObject(value) && 'label' in value && 'value' in value;
}

export function isGUIControlElement(value: unknown): value is GUIControl {
    return value && value instanceof GUIControl;
}

export function isHTMLElement(value: unknown): value is HTMLElement {
    return value && value instanceof HTMLElement;
}

export function isHTMLLIElement(value: unknown): value is HTMLLIElement {
    return value && value instanceof HTMLLIElement;
}

export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max));
}
