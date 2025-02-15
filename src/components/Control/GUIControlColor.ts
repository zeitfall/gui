import GUIControl from './GUIControl';

import GUIControlColorStyles from '../../styles/gui-control-color.css?inline';

export default class GUIControlColor extends GUIControl {
    declare protected readonly _spanElement: HTMLElement;

    constructor() {
        const template = `
            <article id="root">
                <label id="label"></label>
                <div>
                    <input id="input" type="color" />
                    <span id="span"></span>
                </div>
            </article>
        `;

        super(template, GUIControlColorStyles);
    }

    protected _handleValueAttributeChange(value: string) {
        super._handleValueAttributeChange(value);

        this._spanElement.textContent = value;
    }
}
