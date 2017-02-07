require('babel-register')();
var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
 if (typeof global[property] === 'undefined') {
 exposedProperties.push(property);
 global[property] = document.defaultView[property];
 }
});
global.navigator = {
 userAgent: 'node.js'
};
// Storage Mock from http://stackoverflow.com/a/26177872
 function storageMock() {
   var storage = {};

   return {
     setItem: function(key, value) {
       storage[key] = value || '';
     },
     getItem: function(key) {
       return key in storage ? storage[key] : null;
     },
     removeItem: function(key) {
       delete storage[key];
     },
     get length() {
       return Object.keys(storage).length;
     },
     key: function(i) {
       var keys = Object.keys(storage);
       return keys[i] || null;
     }
   };
 }
 window.localStorage = storageMock();
 window.sessionStorage = storageMock();
documentRef = document;
