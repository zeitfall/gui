export interface GUIControlSelectOption<V = unknown> {
    label: string;
    value: V;
}

export interface GUIControlBaseOptions {
    placeholder?: string;
}

export interface GUIControlTextOptions extends GUIControlBaseOptions {
    type: 'text';
}

export interface GUIControlTextareaOptions extends GUIControlBaseOptions {
    type: 'textarea';
}

export interface GUIControlNumberOptions extends GUIControlBaseOptions {
    type: 'number';
    step: number;
}

export interface GUIControlRangeOptions extends GUIControlBaseOptions {
    type: 'range';
    min: number;
    max: number;
    step: number;
}

export interface GUIControlCheckboxOptions {
    type: 'checkbox';
}

export interface GUIControlColorOptions extends GUIControlBaseOptions {
    type: 'color';
}

export interface GUIControlDebugOptions extends GUIControlBaseOptions {
    type: 'debug';
}

export interface GUIControlSelectOptions extends GUIControlBaseOptions {
    type: 'select';
    options: unknown[] | GUIControlSelectOption[] | Record<PropertyKey, unknown> ;
}

export interface GUIControlOptionsMap {
    string: GUIControlTextOptions | GUIControlTextareaOptions | GUIControlColorOptions | GUIControlSelectOptions;
    number: GUIControlNumberOptions | GUIControlRangeOptions;
    boolean: GUIControlCheckboxOptions;
    object: GUIControlSelectOptions | GUIControlDebugOptions;
    array: GUIControlSelectOptions;
}

export type GUIControlOptions<T> =
  T extends unknown[] ? GUIControlOptionsMap['array'] :
  T extends string ? GUIControlOptionsMap['string'] :
  T extends number ? GUIControlOptionsMap['number'] :
  T extends boolean ? GUIControlOptionsMap['boolean'] :
  T extends object ? GUIControlOptionsMap['object'] :
  GUIControlSelectOptions;
