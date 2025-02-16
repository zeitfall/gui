import GUIControl from './GUIControl';

import GUIControlCheckboxStyles from '../../styles/gui-control-checkbox.css?inline';

export default class GUIControlCheckbox extends GUIControl<boolean> {
    constructor() {
        const template = `
            <article id="root">
                <label id="label"></label>
                <input id="input" type="checkbox" title="Check" />
            </article>
        `;

        super(template, GUIControlCheckboxStyles);
    }

    protected _handleValueAttributeChange(value: string) {
        this._inputElement.checked = JSON.parse(value);
    }

    protected _handlePlaceholderAttributeChange(value: string): void {
        this._inputElement.setAttribute('title', value);
    }

    protected _getValue() {
        return this._inputElement.checked;
    }
}
