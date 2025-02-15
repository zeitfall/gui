import GUIControl from './GUIControl';

import GUIControlCheckboxStyles from '../../styles/gui-control-checkbox.css?inline';

export default class GUIControlCheckbox extends GUIControl<boolean> {
    constructor() {
        const template = `
            <article id="root">
                <label id="label"></label>
                <input id="input" type="checkbox" />
            </article>
        `;

        super(template, GUIControlCheckboxStyles);
    }

    protected _handleValueAttributeChange(value: string) {
        this._inputElement.checked = JSON.parse(value);
    }

    protected _getValue() {
        return this._inputElement.checked;
    }
}
