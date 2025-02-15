import GUIControl from './GUIControl';

import GUIControlDebugStyles from '../../styles/gui-control-debug.css?inline';

export default class GUIControlDebug extends GUIControl {
    declare protected readonly _preElement: HTMLPreElement;

    constructor() {
        const template = `
            <article id="root">
                <label id="label"></label>
                <input id="input" type="hidden"></input>
                <pre id="pre"></pre>
            </article>
        `;

        super(template, GUIControlDebugStyles);
    }

    protected _handlePlaceholderAttributeChange(value: string): void {
        this._preElement.textContent = value;
    }

    protected _handleValueAttributeChange(value: string) {
        this._preElement.innerHTML = value;
    }
}
