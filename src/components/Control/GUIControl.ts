import GUIComponent from '../GUIComponent';

import GUIControlStyles from '../../styles/gui-control.css?inline';

import {
    GUI_CONTROL_DEFAULT_TEMPLATE,
    GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES,
} from '../../constants';

export default class GUIControl<
    V = string,
    A extends readonly string[] = typeof GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES
> extends GUIComponent<A> {
    declare protected readonly _rootElement: HTMLElement;
    declare protected readonly _labelElement: HTMLLabelElement;
    declare protected readonly _inputElement: HTMLInputElement;

    declare value: V;

    constructor(template = GUI_CONTROL_DEFAULT_TEMPLATE, styles: string | string[] = []) {
        const _styles = [GUIControlStyles].concat(styles);

        super(template, _styles);

        this._attributeHandlers.set('type', this._handleTypeAttributeChange.bind(this));
        this._attributeHandlers.set('placeholder', this._handlePlaceholderAttributeChange.bind(this));
        this._attributeHandlers.set('property', this._handleKeyAttributeChange.bind(this));
        this._attributeHandlers.set('value', this._handleValueAttributeChange.bind(this));

        Object.defineProperty(this, 'value', {
            get: this._getValue,
            set: this._setValue,
        });
    }

    static get observedAttributes(): unknown {
        return GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES;
    }

    protected _handleTypeAttributeChange(value: string) {
        this._inputElement.setAttribute('type', value);
    }

    protected _handlePlaceholderAttributeChange(value: string) {
        this._inputElement.setAttribute('placeholder', value);
    }

    protected _handleKeyAttributeChange(value: string) {
        this._inputElement.setAttribute('id', value);
        this._labelElement.setAttribute('for', value);

        this._labelElement.textContent = value;
    }

    protected _handleValueAttributeChange(value: string) {
        this._inputElement.value = value;
    }

    protected _getValue(): unknown {
        return this._inputElement.value;
    }

    protected _setValue(value: unknown): void {
        const _value = String(value);

        if (this.value === _value) {
            return;
        }

        this.setAttribute('value', _value);
    }
}
