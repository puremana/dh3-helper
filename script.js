// ==UserScript==
// @name         DH3 Helper
// @version      1.0
// @description  
// @author       level
// @match        http://dh3.diamondhunt.co/
// @match        https://dh3.diamondhunt.co/
// @run-at       document-idle
// @grant        none
// ==/UserScript==
window.addEventListener("load", function() {
    console.log('Loading DH3 Helper...');
    loading();
    var loaded = false;
    var Hinterval = setInterval(loading, 100);

    function loading() {
        if (loaded === false) {
            console.log("Loaded DH3 Helper");
            loaded = true;
            init();
        }
    }
    
    function init() {
        console.log("init")
    }
});

