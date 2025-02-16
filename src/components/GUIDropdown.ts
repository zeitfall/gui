import GUIComponent from './GUIComponent';

import GUIDropdownStyles from '../styles/gui-dropdown.css?inline';

const GUI_DROPDOWN_OBSERVED_ATTRIBUTES = ['title'] as const;

const _controller = new AbortController();

export default class GUIDropdown extends GUIComponent<typeof GUI_DROPDOWN_OBSERVED_ATTRIBUTES> {
    declare protected readonly _rootElement: HTMLElement;
    declare protected readonly _headerElement: HTMLElement;
    declare protected readonly _titleElement: HTMLElement;
    declare protected readonly _mainElement: HTMLElement;

    constructor() {
        const template = `
            <article part="root" id="root">
                <header part="header" id="header">
                    <slot id="title" name="title"></slot>

                    <button></button>
                </header>

                <main part="main" id="main">
                    <div part="div">
                        <slot></slot>
                    </div>
                </main>
            </article>
        `;

        super(template, GUIDropdownStyles);

        this._attributeHandlers.set('title', this._handleTitleAttributeChanged.bind(this));
    }

    connectedCallback() {
        this._headerElement.addEventListener('click', () => {
            if (this.hasAttribute('opened')) {
                this.removeAttribute('opened');

                return;
            }

            this.setAttribute('opened', '');
        }, { signal: _controller.signal });
    }

    disconnectedCallback() {
        _controller.abort();
    }

    static get observedAttributes() {
        return GUI_DROPDOWN_OBSERVED_ATTRIBUTES;
    }

    protected _handleTitleAttributeChanged(value: string) {
        this._titleElement.textContent = value;
    }
}
