import { GUI } from './components';

const guiElement = GUI.create();

const object = GUI.reactive({
    valueA: 10,
    valueB: 'Hello, world!',
    valueC: true,
    valueD: {
        nestedA: 30,
        nestedB: 'Random text',
        nestedC: { a: 1, b: 2, c: 3 },
        nestedD: false,
    },
    valueE: '',
});

guiElement
    .add(object, 'valueA', {
        type: 'range',
        min: -10,
        max: 50,
        step: 1,
    })
    .add(object, 'valueB', { type: 'text' })
    .add(object, 'valueC', { type: 'checkbox' })
    .add(object.valueD, 'nestedA', { type: 'number', step: 1 })
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

// setInterval(() => {
//     // object.valueA++;
//     // object.valueD.nestedA++;

//     console.log(object.valueE);
// }, 100);
