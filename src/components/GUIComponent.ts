import GUIResetStyles from '../styles/gui-reset.css?inline';
import GUIVariablesStyles from '../styles/gui-variables.css?inline';

export default class GUIComponent<A extends readonly unknown[] = unknown[]> extends HTMLElement {
    protected readonly _shadowRoot: ShadowRoot;
    protected readonly _attributeHandlers: Map<A[number], (value: string) => unknown>;

    constructor(template: string, styles: string | string[] = []) {
        super();

        Object.defineProperty(this, '_shadowRoot', {
            value: this.attachShadow({ mode: 'closed' }),
            writable: false,
            configurable: false,
        });

        this._attributeHandlers = new Map();

        this._parseHTML(template);
        this._attachStyles(styles);
    }

    attributeChangedCallback(name: A[number], _: unknown, value: string) {
        if (this._attributeHandlers.has(name)) {
            this._attributeHandlers.get(name)(value);
        }
    }

    private _parseHTML(template: string) {
        this._shadowRoot.innerHTML = template;

        const children = this._shadowRoot.querySelectorAll('[id]');

        Array.from(children).forEach((element) => {
            const property = `_${element.id}Element`;

            Object.defineProperty(this, property, {
                value: element,
                writable: false,
                configurable: false,
            });

            element.removeAttribute('id');
        });
    }

    private _attachStyles(styles: string | string[]) {
        const _styles = [GUIResetStyles, GUIVariablesStyles].concat(styles).join('\n');
        const stylesheet = new CSSStyleSheet();

        stylesheet.replaceSync(_styles);

        this._shadowRoot.adoptedStyleSheets.push(stylesheet);
    }

    protected _dispatchEvent(type: string) {
        const event = new Event(type, { bubbles: true });

        this.dispatchEvent(event);
    }
}
