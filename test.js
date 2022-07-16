"nodejs ui";

const { showToast } = require('toast');
console.log(process.versions);
showToast('Hello, Auto.js Pro with Node.js!');

const {isUiThread, ui_object} = require("ui");
console.log(isUiThread());
ui_object.Rect( 1, 2, 3, 3)