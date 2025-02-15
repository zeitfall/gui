import GUIControl from './GUIControl';

import GUIControlTextareaStyles from '../../styles/gui-control-textarea.css?inline';

export default class GUIControlTextArea extends GUIControl {
    declare protected readonly _textAreaElement: HTMLTextAreaElement;

    constructor() {
        const template = `
            <article id="root">
                <label id="label"></label>
                <textarea id="textArea" placeholder="Enter"></textarea>
            </article>
        `;

        super(template, GUIControlTextareaStyles);
    }

    protected _handleTypeAttributeChange(value: string) {
        this._textAreaElement.setAttribute('type', value);
    }

    protected _handlePlaceholderAttributeChange(value: string): void {
        this._textAreaElement.setAttribute('placeholder', value);
    }

    protected _handleKeyAttributeChange(value: string) {
        this._textAreaElement.setAttribute('id', value);
        this._labelElement.setAttribute('for', value);

        this._labelElement.textContent = value;
    }

    protected _handleValueAttributeChange(value: string) {
        this._textAreaElement.value = value;
    }

    protected _getValue(): unknown {
        return this._textAreaElement.value;
    }
}
