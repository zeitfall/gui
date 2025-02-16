import GUIControl from './GUIControl';

import GUIControlRangeStyles from '../../styles/gui-control-range.css?inline';

import { clamp } from '../../utils';

import { GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES } from '../../constants';

const GUI_CONTROL_RANGE_OBSERVED_ATTRIBUTES = [
    ...GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES,
    'min',
    'max',
    'step',
] as const;

const GUI_CONTROL_DEFAULT_MIN = 0;
const GUI_CONTROL_DEFAULT_MAX = 100;
const GUI_CONTROL_DEFAULT_STEP = 1;

export default class GUIControlRange extends GUIControl<number, typeof GUI_CONTROL_RANGE_OBSERVED_ATTRIBUTES> {
    declare protected readonly _minElement: HTMLSpanElement;
    declare protected readonly _maxElement: HTMLSpanElement;
    declare protected readonly _valueElement: HTMLSpanElement;

    constructor() {
        const template = `
            <article id="root">
                <label id="label"></label>
                <div>
                    <span id="min"></span>
                    <input id="input" type="range" />
                    <span id="max"></span>
                    <span id="value"></span>
                </div>
            </article>
        `;

        super(template, GUIControlRangeStyles);

        this._attributeHandlers.set('min', this._handleMinAttributeChange.bind(this));
        this._attributeHandlers.set('max', this._handleMaxAttributeChange.bind(this));
        this._attributeHandlers.set('step', this._handleStepAttributeChange.bind(this));
    }

    static get observedAttributes() {
        return GUI_CONTROL_RANGE_OBSERVED_ATTRIBUTES;
    }

    protected get _minValue() {
        if (this.hasAttribute('min')) {
            return parseFloat(this.getAttribute('min'));
        }

        return GUI_CONTROL_DEFAULT_MIN;
    }

    protected get _maxValue() {
        if (this.hasAttribute('max')) {
            return parseFloat(this.getAttribute('max'));
        }

        return GUI_CONTROL_DEFAULT_MAX;
    }

    protected get _stepValue() {
        if (this.hasAttribute('step')) {
            return parseFloat(this.getAttribute('step'));
        }

        return GUI_CONTROL_DEFAULT_STEP;
    }

    protected _handleValueAttributeChange(value: string) {
        super._handleValueAttributeChange(value);

        this._valueElement.textContent = value;
    }

    protected _handleMinAttributeChange(value: string) {
        this._inputElement.setAttribute('min', value);

        this._minElement.textContent = value;

        this._setValue(parseFloat(value));
    }

    protected _handleMaxAttributeChange(value: string) {
        this._inputElement.setAttribute('max', value);

        this._maxElement.textContent = value;

        this._setValue(parseFloat(value));
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
