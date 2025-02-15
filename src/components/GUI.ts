import GUIComponent from './GUIComponent';
import GUIControl from './GUI/Control/GUIControl';

import GUIStyles from '../styles/gui.css?inline';

import {
    isObject,
    isArray,
    isGUIControlElement,
} from '../utils';

import type { GUIControlOptions } from '../types';

const _controller = new AbortController();

export default class GUI extends GUIComponent {
    static controls: WeakMap<object, Map<PropertyKey, GUIControl>>;
    static sources: WeakMap<GUIControl, object>;

    declare protected readonly _mainElement: HTMLElement;
    declare protected readonly _slotElement: HTMLSlotElement;
    declare protected readonly _footerElement: HTMLElement;

    static {
        this.controls = new WeakMap();
        this.sources = new WeakMap();
    }

    constructor() {
        const template = `
            <article id="root">
                <header id="header">
                    <h4 id="title">GUI Title</h4>
                </header>

                <main id="main">
                    <slot></slot>
                </main>

                <footer id="footer">Footer</footer>
            </article>   
        `;

        super(template, GUIStyles);
    }

    static create(parentElement = document.body) {
        const element = document.createElement('gui-element');

        parentElement.prepend(element);

        return element as GUI;
    }

    static reactive<T extends object>(object: T) {
        const _cache = new WeakMap();

        function _proxify(source: object) {
            if (!isObject(source)) {
                return source;
            }

            if (_cache.has(source)) {
                return _cache.get(source);
            }

            return new Proxy(source, {
                get(target, property) {
                    const value = Reflect.get(target, property);

                    if (isObject(value)) {
                        const proxy = _proxify(value);

                        _cache.set(value, proxy);

                        return proxy;
                    }

                    return value;
                },
                set(target, property, value, receiver) {
                    if (GUI.controls.has(receiver)) {
                        const controls = GUI.controls.get(receiver);

                        if (controls.has(property)) {
                            controls.get(property).value = value;
                        }
                    }

                    return Reflect.set(target, property, value, receiver);
                },
            });
        }

        return _proxify(object) as T;
    }

    connectedCallback() {
        this._shadowRoot.addEventListener('input', (event) => {
            const { target: element } = event;

            if (isGUIControlElement(element) && GUI.sources.has(element)) {
                const target = GUI.sources.get(element);
                const property = element.getAttribute('property');

                // @ts-expect-error ...
                target[property] = element.value;
            }
        }, { passive: true, signal: _controller.signal });
    }

    disconnectedCallback() {
        _controller.abort();
    }

    protected _createControl<
        O extends {
            type: string;
            property: unknown;
            value: unknown;
        }
    >(options: O) {
        const { type, ...attributes } = options;

        if (type === 'debug') {
            const _value = JSON.stringify(options.value, null, 2);

            Object.assign(attributes, { value: _value });
        }

        const element = document.createElement(`gui-control-${type}`);

        Object.entries(attributes).forEach((attribute) => {
            const [key, value] = attribute;

            let _value = String(value);

            if (isObject(value) || isArray(value)) {
                _value = JSON.stringify(value);
            }

            element.setAttribute(key, _value);
        });

        return element as GUIControl;
    }

    group(title: string) {
        const groupElement = document.createElement('gui-group');

        groupElement.setAttribute('title', title);

        this._mainElement.append(groupElement);
    }

    add<T extends object, P extends keyof T & string>(
        target: T,
        property: P,
        options: GUIControlOptions<T[P]>
    ) {
        const value = target[property];

        const controlElement = this._createControl({
            ...options,
            property,
            value,
        });

        if (GUI.controls.has(target)) {
            const controls = GUI.controls.get(target);

            if (controls.has(property)) {
                throw new Error(`A control associated with property [${property}] already exists.`);
            }

            controls.set(property, controlElement);
        }
        else {
            const controls = new Map();

            controls.set(property, controlElement);

            GUI.controls.set(target, controls);
        }

        GUI.sources.set(controlElement, target);

        this._mainElement.append(controlElement);

        return this;
    }
}
