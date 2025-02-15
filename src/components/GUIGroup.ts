import GUIComponent from './GUIComponent';

import GUIGroupStyles from '../styles/gui-group.css?inline';

const GUI_GROUP_OBSERVED_ATTRIBUTES = ['title'] as const;

const _controller = new AbortController();

export default class GUIGroup extends GUIComponent<typeof GUI_GROUP_OBSERVED_ATTRIBUTES> {
    declare protected readonly _rootElement: HTMLElement;
    declare protected readonly _headerElement: HTMLElement;
    declare protected readonly _titleElement: HTMLElement;
    declare protected readonly _mainElement: HTMLElement;

    constructor() {
        const template = `
            <article id="root">
                <header id="header">
                    <h4 id="title">Group #1</h4>

                    <button></button>
                </header>

                <main id="main">
                    <div>
                        <slot></slot>
                    </div>
                </main>
            </article>
        `;

        super(template, GUIGroupStyles);

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
        return GUI_GROUP_OBSERVED_ATTRIBUTES;
    }

    protected _handleTitleAttributeChanged(value: string) {
        this._titleElement.textContent = value;
    }
}
