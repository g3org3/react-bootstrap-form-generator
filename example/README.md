# Example

## Step 1
Let's create a new react application
```sh
# CRA: create-react-app
create-react-app my-app
```

## Step 2
Copy-paste the App.js provided in `example/` into `my-app/src/App.js` and replace the one created with CRA
```sh
code my-app/src/App.js
```
Lazy-way
```sh
cd my-app/src
wget https://raw.githubusercontent.com/g3org3/react-camera/master/example/App.js
```

## Step 3
Install dependencies
```sh
yarn add react-bootstrap-form-generator

# or if you use npm
npm i --save react-bootstrap-form-generator
```

## GO!
```sh
yarn start
```

## Style
Just for quick play around with this you may add this to the index.html at the headers
```html
<!-- my-app/public/index.html -->
<link rel="stylesheet" href="https://bootswatch.com/3/flatly/bootstrap.min.css">
```
