# react-bootstrap-form-generator
provide a schema and a layout and it will generate the form for you
>📝 schema -> 📔 react-bootstrap-form

## Install
```sh
yarn add react-bootstrap-form-generator
```

## Props
| Name               | Type        | Params  | Description |
|--------------------|-------------|---------|-------------|
| schema `required`  | object      | -       | schema of the model
| onSubmit           | func        | payload | receives the object with the values from the input
| submitLabel        | string      | -       | label for the submit button
| layout             | [[numbers]] | -       | matrix with the col size e.g. [[ 4, 8 ]] -> col-md-4, col-md-8
| verbose            | bool        | -       | for development usage only
| cancelLabel        | string      | -       | label for the cancel button
| onCancel           | func        | -       | called when you click the cancel button, not providing a function will hide the button
| defaultValue       | object      | -       |

## Example
[See Example](/example/README.md)

## Contributors
* George <7jagjag@gmail.com>
