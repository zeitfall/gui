import GUIControl from './GUIControl';

import GUIControlNumberStyles from '../../styles/gui-control-number.css?inline';

import { clamp } from '../../utils';

import { GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES } from '../../constants';

const GUI_CONTROL_NUMBER_OBSERVED_ATTRIBUTES = [
    ...GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES,
    'min',
    'max',
    'step',
] as const;

const GUI_CONTROL_NUMBER_DEFAULT_MIN = -Infinity;
const GUI_CONTROL_NUMBER_DEFAULT_MAX = Infinity;
const GUI_CONTROL_NUMBER_DEFAULT_STEP = 1;

const _controller = new AbortController();

export default class GUIControlNumber extends GUIControl<number, typeof GUI_CONTROL_NUMBER_OBSERVED_ATTRIBUTES> {
    declare protected readonly _incrementElement: HTMLSpanElement;
    declare protected readonly _decrementElement: HTMLSpanElement;

    constructor() {
        const template = `
            <article id="root">
                <label id="label"></label>
                
                <div>
                    <input id="input" type="number" placeholder="Enter" />
                    <button id="increment"></button>
                    <button id="decrement"></button>
                </div>
            </article>
        `;

        super(template, GUIControlNumberStyles);

        this._attributeHandlers.set('min', this._handleMinAttributeChange.bind(this));
        this._attributeHandlers.set('max', this._handleMaxAttributeChange.bind(this));
        this._attributeHandlers.set('step', this._handleStepAttributeChange.bind(this));
    }

    static get observedAttributes() {
        return GUI_CONTROL_NUMBER_OBSERVED_ATTRIBUTES;
    }

    connectedCallback() {
        this._shadowRoot.addEventListener('click', (event) => {
            const { target } = event;

            if (target === this._incrementElement || target === this._decrementElement) {
                const sign = target === this._incrementElement ? 1 : -1;

                this._setValue(this.value + sign * this._stepValue);

                this._dispatchEvent('input');
            }
        }, { signal: _controller.signal });
    }

    disconnectedCallback() {
        _controller.abort();
    }

    protected get _minValue() {
        if (this.hasAttribute('min')) {
            return parseFloat(this.getAttribute('min'));
        }

        return GUI_CONTROL_NUMBER_DEFAULT_MIN;
    }

    protected get _maxValue() {
        if (this.hasAttribute('max')) {
            return parseFloat(this.getAttribute('max'));
        }

        return GUI_CONTROL_NUMBER_DEFAULT_MAX;
    }

    protected get _stepValue() {
        if (this.hasAttribute('step')) {
            return parseFloat(this.getAttribute('step'));
        }

        return GUI_CONTROL_NUMBER_DEFAULT_STEP;
    }

    protected _handleMinAttributeChange(value: string) {
        this._inputElement.setAttribute('min', value);
    }

    protected _handleMaxAttributeChange(value: string) {
        this._inputElement.setAttribute('max', value);
    }

    protected _handleStepAttributeChange(value: string) {
        this._inputElement.setAttribute('step', value);
    }

    protected _getValue() {
        return parseFloat(this._inputElement.value);
    }

    protected _setValue(value: number) {
        const _value = clamp(value, this._minValue, this._maxValue);

        if (this.value === _value) {
            return;
        }

        this.setAttribute('value', _value.toString());
    }
}
