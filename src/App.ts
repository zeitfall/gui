import { GUI } from './components';

const guiElement = GUI.create();

const object = GUI.reactive({
    valueA: 10,
    valueB: 'Hello, world!',
    valueC: true,
    valueD: {
        nestedA: 30,
        nestedB: 'Random text',
        nestedD: false,
    },
    valueE: '',
});

guiElement
    .add(object, 'valueA', {
        type: 'range',
        min: -10,
        max: 50,
    })
    .add(object, 'valueB', { type: 'text' })
    .add(object, 'valueC', { type: 'checkbox' })
    .add(object.valueD, 'nestedA', { type: 'number' })
    .add(object, 'valueD', { type: 'debug' })
    .add(object.valueD, 'nestedB', { type: 'textarea' })
    .add(object, 'valueE', {
        type: 'select',
        options: {
            labelA: 'valueA',
            labelB: 'valueB',
            labelC: 'valueC',
            labelD: 'valueD',
        },
    });

setInterval(() => {
    object.valueA++;
    object.valueD.nestedA++;
}, 100);
