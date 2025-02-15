import GUIControlText from './Control/GUIControlText';
import GUIControlTextArea from './Control/GUIControlTextArea';
import GUIControlNumber from './Control/GUIControlNumber';
import GUIControlRange from './Control/GUIControlRange';
import GUIControlCheckbox from './Control/GUIControlCheckbox';
import GUIControlColor from './Control/GUIControlColor';
import GUIControlDebug from './Control/GUIControlDebug';
import GUIControlSelect from './Control/GUIControlSelect';

import GUIGroup from './GUIGroup';
import GUI from './GUI';

customElements.define('gui-control-text', GUIControlText);
customElements.define('gui-control-textarea', GUIControlTextArea);
customElements.define('gui-control-number', GUIControlNumber);
customElements.define('gui-control-range', GUIControlRange);
customElements.define('gui-control-checkbox', GUIControlCheckbox);
customElements.define('gui-control-color', GUIControlColor);
customElements.define('gui-control-debug', GUIControlDebug);
customElements.define('gui-control-select', GUIControlSelect);

customElements.define('gui-group', GUIGroup);
customElements.define('gui-element', GUI);

export {
    GUI,
};
