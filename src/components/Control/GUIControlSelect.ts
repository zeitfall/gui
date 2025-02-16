import GUIControl from './GUIControl';

import GUIControlSelectStyles from '../../styles/gui-control-select.css?inline';

import { isObject, isArray, isSelectOption, isHTMLLIElement } from '../../utils';

import { GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES } from '../../constants';

import type { GUIControlSelectOption } from '../../types';

const GUI_CONTROL_SELECT_OBSERVED_ATTRIBUTES = [
    ...GUI_CONTROL_DEFAULT_OBSERVED_ATTRIBUTES,
    'options',
] as const;

const _controller = new AbortController();

export default class GUIControlSelect extends GUIControl<unknown, typeof GUI_CONTROL_SELECT_OBSERVED_ATTRIBUTES> {
    protected readonly _options: WeakMap<HTMLLIElement, GUIControlSelectOption<string>>;

    declare protected readonly _dropdownElement: HTMLSelectElement;
    declare protected readonly _placeholderElement: HTMLTitleElement;

    constructor() {
        const template = `
            <article id="root">
                <label id="label"></label>
                
                <div>
                    <gui-dropdown id="dropdown">
                        <h4 id="placeholder" slot="title">Select</h4>
                    </gui-dropdown>
                </div>
            </article>
        `;

        super(template, GUIControlSelectStyles);

        this._options = new WeakMap();

        this._attributeHandlers.set('options', this._handleOptionsAttributeChange.bind(this));
    }

    static get observedAttributes() {
        return GUI_CONTROL_SELECT_OBSERVED_ATTRIBUTES;
    }

    connectedCallback() {
        this._dropdownElement.addEventListener('click', (event) => {
            const { target } = event;

            if (isHTMLLIElement(target) && this._options.has(target)) {
                const { label, value } = this._options.get(target);

                this._setSelected(target);
                this._setValue(value);
                this._placeholderElement.textContent = label;

                this._dropdownElement.removeAttribute('opened');
            }

        }, { signal: _controller.signal });
    }

    disconnectedCallback() {
        _controller.abort();
    }

    protected _setSelected(target: HTMLLIElement) {
        const elements = this._shadowRoot.querySelectorAll('li[selected]');

        elements.forEach((element) => {
            if (element === target) {
                target.setAttribute('selected', '');

                return;
            }

            element.removeAttribute('selected');
        });
    }

    protected _handleTypeAttributeChange(_value: string) {}

    protected _handleKeyAttributeChange(value: string) {
        this._dropdownElement.setAttribute('id', value);
        this._labelElement.setAttribute('for', value);

        this._labelElement.textContent = value;
    }

    protected _handlePlaceholderAttributeChange(value: string): void {
        this._placeholderElement.textContent = value;
    }

    protected _handleValueAttributeChange() {
        this._dispatchEvent('input');
    }

    protected _handleOptionsAttributeChange(options: string) {
        const _options = JSON.parse(options);

        if (isObject(_options)) {
            Object.entries(_options).forEach((option) => {
                const [label, value] = option;

                const listElement = document.createElement('li');

                listElement.textContent = label;
                listElement.setAttribute('value', value);
                listElement.setAttribute('aria-role', 'option');

                this._options.set(listElement, { label, value });

                this._dropdownElement.append(listElement);
            });

            return;
        }

        if (isArray(_options)) {
            _options.forEach((option) => {
                const listElement = document.createElement('li');

                let label = String(option);
                let value = label;

                if (isSelectOption(option)) {
                    // eslint-disable-next-line prefer-destructuring
                    label = option.label;
                    value = String(option.value);
                }

                listElement.textContent = label;
                listElement.setAttribute('value', value);

                this._options.set(listElement, { label, value });

                this._dropdownElement.append(listElement);
            });

            return;
        }

        throw new TypeError(`[GUIControlSelect]: The type of options is not valid. Type "${typeof _options}" given.`);
    }

    protected _getValue() {
        return this.getAttribute('value');
    }
}
