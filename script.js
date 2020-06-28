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
var VERSION_NUMBER = "1.0";

window.addEventListener("load", function() {
    console.log('Loading DH3 Helper...');
    var loaded = false;
    loading();
    var Hinterval = setInterval(loading, 100);

    function loading() {
        if (loaded === false) {
            console.log("Loaded DH3 Helper");
            loaded = true;
            addStyles();
            createNav();
            createMenu();
            init();
        }
    }
    
    function addStyles() {
        let style = document.createElement('style');
        style.innerHTML = `
            #dh3-helper-menu {
                position: absolute;
                background: white;
                width: 700px;
                height: 700px;
                max-width: 100%;
                max-height: 100%;
                z-index: 10000;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                box-shadow: black 0 0 15px 1px;
            }
            #dh3-helper-menu h1, #dh3-helper-menu span, #dh3-helper-menu p {
                color: black;
                text-align: center;
            }
            .dh3-helper-headerContainer {
                text-align: center;
            }
            #dh3-helper-menu hr {
                background-color: #e0e0e0;
                width: 100%;
            }
            .dh3-helper-inputContainer {
                max-width: 400px;
                margin: 0 auto;
                height: 40px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .dh3-helper-inputContainer input[type="checkbox"] {
                width: 20px;
                height: 20px;
            }
            .dh3-helper-inputContainer-sub input[type="checkbox"] {
                margin-left: 25px;
            }
            .dh3-helper-inputContainer label {
                color: black;
                font-size: 20px;
            }
        `;
        document.head.appendChild(style);
    }

    function createNav() {
        let navItem = document.createElement('div');
        navItem.setAttribute('class', 'navigate-button');
        navItem.setAttribute('id', 'dh3-helper-nav');
        navItem.innerHTML = "<img src='images/santaHatSigil.png' class='img-50'> <br><div style='font-size:10pt;text-align:center;'>Helper";
        navItem.addEventListener('click', toggleMenu)
        document.getElementById('navigation-area-buttons').appendChild(navItem);
    }

    function createMenu() {
        let menu = document.createElement('div');
        menu.setAttribute('id', 'dh3-helper-menu');
        menu.style.display = 'none';
        
        let closeButton = document.createElement('div');
        closeButton.setAttribute('class', 'dialogue-button');
        closeButton.innerText = "Close";
        closeButton.addEventListener('click', toggleMenu)
        menu.appendChild(closeButton);

        let headerContainer = document.createElement('div');
        headerContainer.setAttribute('class', 'dh3-helper-headerContainer');

        let header = document.createElement('h1');
        header.innerText = "DH3 Helper";
        headerContainer.appendChild(header);

        let version = document.createElement('span');
        version.innerText = "Version: " + VERSION_NUMBER;
        headerContainer.appendChild(version);
        
        menu.appendChild(headerContainer);
        
        let hr = document.createElement('hr');
        menu.appendChild(hr);
    
        // Global Notifications Checkbox
        let notificationsInputContainer = document.createElement('div');
        notificationsInputContainer.setAttribute('class', 'dh3-helper-inputContainer');
        let notificationsInput = document.createElement('input');
        notificationsInput.setAttribute('type', 'checkbox');
        notificationsInput.setAttribute('name', 'dh3-notificationsInput');
        notificationsInput.setAttribute('data-storage', 'hNotifications');
        
        if (localStorage.hNotifications === "true") {
            notificationsInput.setAttribute('checked', 'checked');
        }
        notificationsInput.addEventListener("change", toggleStorage);
        
        let notificationsLabel = document.createElement('label');
        notificationsLabel.setAttribute('for', 'checkbox');
        notificationsLabel.innerText = "Desktop Notifications";

        notificationsInputContainer.append(notificationsInput);
        notificationsInputContainer.append(notificationsLabel);

        menu.appendChild(notificationsInputContainer);

        // Furnace Notifications Checkbox
        let furnaceInputContainer = document.createElement('div');
        furnaceInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub');
        let furnaceInput = document.createElement('input');
        furnaceInput.setAttribute('type', 'checkbox');
        furnaceInput.setAttribute('name', 'dh3-notificationsInput');
        furnaceInput.setAttribute('data-storage', 'hFurnace');
        
        if (localStorage.hFurnace === "true") {
            furnaceInput.setAttribute('checked', 'checked');
        }
        furnaceInput.addEventListener("change", toggleStorage);
        
        let furnaceLabel = document.createElement('label');
        furnaceLabel.setAttribute('for', 'checkbox');
        furnaceLabel.innerText = "Furnace Notifications";

        furnaceInputContainer.append(furnaceInput);
        furnaceInputContainer.append(furnaceLabel);

        menu.appendChild(furnaceInputContainer);

        document.body.appendChild(menu);
    }

    function toggleStorage() {
        let name = this.getAttribute('data-storage');
        if (localStorage[name] && localStorage[name] == "true") {
            localStorage[name] = "false";
        } else {
            localStorage[name] = "true";
        }
    }

    function toggleMenu() {
        let menu = document.getElementById('dh3-helper-menu');
        menu.style.display = menu.style.display === 'none' ? '' : 'none';
    }

    function init() {
        console.log("init")
    }
});


