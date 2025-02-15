import GUIControl from './GUIControl';

import GUIControlSelectStyles from '../../styles/gui-control-select.css?inline';

import { isObject, isArray, isSelectOption } from '../../utils';

import { GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES } from '../../constants';

const GUI_CONTROL_SELECT_OBSERVED_ATTRIBUTES = [
    ...GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES,
    'options',
] as const;

export default class GUIControlSelect extends GUIControl<unknown, typeof GUI_CONTROL_SELECT_OBSERVED_ATTRIBUTES> {
    declare protected readonly _selectElement: HTMLSelectElement;

    constructor() {
        const template = `
            <article id="root">
                <label id="label"></label>
                <select id="select">
                    <option value selected disabled>Enter</option>
                </select>
            </article>
        `;

        super(template, GUIControlSelectStyles);

        this._attributeHandlers.set('options', this._handleOptionsAttributeChange.bind(this));
    }

    static get observedAttributes() {
        return GUI_CONTROL_SELECT_OBSERVED_ATTRIBUTES;
    }

    protected _handleTypeAttributeChange(_value: string) {}

    protected _handleKeyAttributeChange(value: string) {
        this._selectElement.setAttribute('id', value);
        this._labelElement.setAttribute('for', value);

        this._labelElement.textContent = value;
    }

    protected _handlePlaceholderAttributeChange(value: string): void {
        const optionElement = this._selectElement.querySelector('option[disabled]');

        optionElement.textContent = value;
    }

    protected _handleValueAttributeChange(value: string) {
        this._selectElement.value = value;
    }

    protected _handleOptionsAttributeChange(options: string) {
        const _options = JSON.parse(options);

        if (isObject(_options)) {
            Object.entries(_options).forEach((option) => {
                const [key, value] = option;

                const optionElement = document.createElement('option');

                optionElement.textContent = key;
                optionElement.setAttribute('value', value);

                this._selectElement.append(optionElement);
            });

            return;
        }

        if (isArray(_options)) {
            _options.forEach((option) => {
                const optionElement = document.createElement('option');

                let key = String(option);
                let value = key;

                if (isSelectOption(option)) {
                    key = option.label;
                    value = String(option.value);
                }

                optionElement.textContent = key;
                optionElement.setAttribute('value', value);

                this._selectElement.append(optionElement);
            });

            return;
        }

        throw new TypeError(`[GUIControlSelect]: The type of options is not valid. Type "${typeof _options}" given.`);
    }

    protected _getValue(): unknown {
        return this._selectElement.value;
    }
}
