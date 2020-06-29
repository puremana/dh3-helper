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
                height: 777px;
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
            #dh3-helper-menu h1 img {
                margin: 0 10px 0 10px;
            }
            #dh3-helper-menu h1 img:nth-child(1) {
                transform: scaleX(-1);
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
            .dh3-helper-inputContainer-sub-sub input[type="checkbox"] {
                margin-left: 50px;
            }
            .dh3-helper-inputContainer label {
                color: black;
                font-size: 20px;
            }
            .dh3-helper-footer {
                position: absolute;
                width: 100%;
                border-top: 1px solid #e0e0e0;
                bottom: 0;
                padding: 10px 0 10px;
                display: flex;
                flex-direction: column;
            }
            #dh3-helper-menu .dh3-helper-footer span {
                color: #5a5a5a;
                padding: 5px;
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
        let headerImage = document.createElement('img');
        headerImage.setAttribute('src', 'images/santaHatSigil.png');
        headerImage.setAttribute('class', 'img-50');
        let headerImage2 = headerImage.cloneNode(true);
        header.innerText = "DH3 Helper";
        header.insertBefore(headerImage, header.firstChild);
        header.appendChild(headerImage2);
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
        notificationsInput.addEventListener("change", grantNotifications);
        
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

        // Woodcutting Notifications Checkbox
        let woodcuttingInputContainer = document.createElement('div');
        woodcuttingInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub');
        let woodcuttingInput = document.createElement('input');
        woodcuttingInput.setAttribute('type', 'checkbox');
        woodcuttingInput.setAttribute('name', 'dh3-notificationsInput');
        woodcuttingInput.setAttribute('data-storage', 'hwoodcutting');
        
        if (localStorage.hwoodcutting === "true") {
            woodcuttingInput.setAttribute('checked', 'checked');
        }
        woodcuttingInput.addEventListener("change", toggleStorage);
        
        let woodcuttingLabel = document.createElement('label');
        woodcuttingLabel.setAttribute('for', 'checkbox');
        woodcuttingLabel.innerText = "Woodcutting Notifications";

        woodcuttingInputContainer.append(woodcuttingInput);
        woodcuttingInputContainer.append(woodcuttingLabel);

        menu.appendChild(woodcuttingInputContainer);

        // Farming Notifications Checkbox
        let farmingInputContainer = document.createElement('div');
        farmingInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub');
        let farmingInput = document.createElement('input');
        farmingInput.setAttribute('type', 'checkbox');
        farmingInput.setAttribute('name', 'dh3-notificationsInput');
        farmingInput.setAttribute('data-storage', 'hfarming');
        
        if (localStorage.hfarming === "true") {
            farmingInput.setAttribute('checked', 'checked');
        }
        farmingInput.addEventListener("change", toggleStorage);
        
        let farmingLabel = document.createElement('label');
        farmingLabel.setAttribute('for', 'checkbox');
        farmingLabel.innerText = "Farming Notifications";

        farmingInputContainer.append(farmingInput);
        farmingInputContainer.append(farmingLabel);

        menu.appendChild(farmingInputContainer);

        // Combat Notifications Checkbox
        let combatInputContainer = document.createElement('div');
        combatInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub');
        let combatInput = document.createElement('input');
        combatInput.setAttribute('type', 'checkbox');
        combatInput.setAttribute('name', 'dh3-notificationsInput');
        combatInput.setAttribute('data-storage', 'hcombat');
        
        if (localStorage.hcombat === "true") {
            combatInput.setAttribute('checked', 'checked');
        }
        combatInput.addEventListener("change", toggleStorage);
        
        let combatLabel = document.createElement('label');
        combatLabel.setAttribute('for', 'checkbox');
        combatLabel.innerText = "Combat Notifications";

        combatInputContainer.append(combatInput);
        combatInputContainer.append(combatLabel);

        menu.appendChild(combatInputContainer);

        // Oxygen Tank Notifications Checkbox
        let oxygenInputContainer = document.createElement('div');
        oxygenInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub');
        let oxygenInput = document.createElement('input');
        oxygenInput.setAttribute('type', 'checkbox');
        oxygenInput.setAttribute('name', 'dh3-notificationsInput');
        oxygenInput.setAttribute('data-storage', 'hoxygen');
        
        if (localStorage.hoxygen === "true") {
            oxygenInput.setAttribute('checked', 'checked');
        }
        oxygenInput.addEventListener("change", toggleStorage);
        
        let oxygenLabel = document.createElement('label');
        oxygenLabel.setAttribute('for', 'checkbox');
        oxygenLabel.innerText = "Oxygen Tank Notifications";

        oxygenInputContainer.append(oxygenInput);
        oxygenInputContainer.append(oxygenLabel);

        menu.appendChild(oxygenInputContainer);

        // Recipe Book Notifications Checkbox
        let recipeInputContainer = document.createElement('div');
        recipeInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub');
        let recipeInput = document.createElement('input');
        recipeInput.setAttribute('type', 'checkbox');
        recipeInput.setAttribute('name', 'dh3-notificationsInput');
        recipeInput.setAttribute('data-storage', 'hrecipe');
        
        if (localStorage.hrecipe === "true") {
            recipeInput.setAttribute('checked', 'checked');
        }
        recipeInput.addEventListener("change", toggleStorage);
        
        let recipeLabel = document.createElement('label');
        recipeLabel.setAttribute('for', 'checkbox');
        recipeLabel.innerText = "Recipe Book Notifications";

        recipeInputContainer.append(recipeInput);
        recipeInputContainer.append(recipeLabel);

        menu.appendChild(recipeInputContainer);

        // Researcher Notifications Checkbox
        let researcherInputContainer = document.createElement('div');
        researcherInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub');
        let researcherInput = document.createElement('input');
        researcherInput.setAttribute('type', 'checkbox');
        researcherInput.setAttribute('name', 'dh3-notificationsInput');
        researcherInput.setAttribute('data-storage', 'hresearcher');
        
        if (localStorage.hresearcher === "true") {
            researcherInput.setAttribute('checked', 'checked');
        }
        researcherInput.addEventListener("change", toggleStorage);
        
        let researcherLabel = document.createElement('label');
        researcherLabel.setAttribute('for', 'checkbox');
        researcherLabel.innerText = "Researcher Notifications";

        researcherInputContainer.append(researcherInput);
        researcherInputContainer.append(researcherLabel);

        menu.appendChild(researcherInputContainer);

        // Brewing Notifications Checkbox
        let brewingInputContainer = document.createElement('div');
        brewingInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub');
        let brewingInput = document.createElement('input');
        brewingInput.setAttribute('type', 'checkbox');
        brewingInput.setAttribute('name', 'dh3-notificationsInput');
        brewingInput.setAttribute('data-storage', 'hbrewing');
        
        if (localStorage.hbrewing === "true") {
            brewingInput.setAttribute('checked', 'checked');
        }
        brewingInput.addEventListener("change", toggleStorage);
        
        let brewingLabel = document.createElement('label');
        brewingLabel.setAttribute('for', 'checkbox');
        brewingLabel.innerText = "Brewing Notifications";

        brewingInputContainer.append(brewingInput);
        brewingInputContainer.append(brewingLabel);

        menu.appendChild(brewingInputContainer);

        // SD Pot Notifications Checkbox
        let SDPotInputContainer = document.createElement('div');
        SDPotInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub-sub');
        let SDPotInput = document.createElement('input');
        SDPotInput.setAttribute('type', 'checkbox');
        SDPotInput.setAttribute('name', 'dh3-notificationsInput');
        SDPotInput.setAttribute('data-storage', 'hSDPot');
        
        if (localStorage.hSDPot === "true") {
            SDPotInput.setAttribute('checked', 'checked');
        }
        SDPotInput.addEventListener("change", toggleStorage);
        
        let SDPotLabel = document.createElement('label');
        SDPotLabel.setAttribute('for', 'checkbox');
        SDPotLabel.innerText = "SD Pot Notifications";

        SDPotInputContainer.append(SDPotInput);
        SDPotInputContainer.append(SDPotLabel);

        menu.appendChild(SDPotInputContainer);

        // Compost Potion Notifications Checkbox
        let compostPotInputContainer = document.createElement('div');
        compostPotInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub-sub');
        let compostPotInput = document.createElement('input');
        compostPotInput.setAttribute('type', 'checkbox');
        compostPotInput.setAttribute('name', 'dh3-notificationsInput');
        compostPotInput.setAttribute('data-storage', 'hcompostPot');
        
        if (localStorage.hcompostPot === "true") {
            compostPotInput.setAttribute('checked', 'checked');
        }
        compostPotInput.addEventListener("change", toggleStorage);
        
        let compostPotLabel = document.createElement('label');
        compostPotLabel.setAttribute('for', 'checkbox');
        compostPotLabel.innerText = "Compost Pot Notifications";

        compostPotInputContainer.append(compostPotInput);
        compostPotInputContainer.append(compostPotLabel);

        menu.appendChild(compostPotInputContainer);

        // Bone Potion Notifications Checkbox
        let bonePotInputContainer = document.createElement('div');
        bonePotInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub-sub');
        let bonePotInput = document.createElement('input');
        bonePotInput.setAttribute('type', 'checkbox');
        bonePotInput.setAttribute('name', 'dh3-notificationsInput');
        bonePotInput.setAttribute('data-storage', 'hbonePot');
        
        if (localStorage.hbonePot === "true") {
            bonePotInput.setAttribute('checked', 'checked');
        }
        bonePotInput.addEventListener("change", toggleStorage);
        
        let bonePotLabel = document.createElement('label');
        bonePotLabel.setAttribute('for', 'checkbox');
        bonePotLabel.innerText = "Bone Pot Notifications";

        bonePotInputContainer.append(bonePotInput);
        bonePotInputContainer.append(bonePotLabel);

        menu.appendChild(bonePotInputContainer);

        // Bar Potion Notifications Checkbox
        let barPotInputContainer = document.createElement('div');
        barPotInputContainer.setAttribute('class', 'dh3-helper-inputContainer dh3-helper-inputContainer-sub-sub');
        let barPotInput = document.createElement('input');
        barPotInput.setAttribute('type', 'checkbox');
        barPotInput.setAttribute('name', 'dh3-notificationsInput');
        barPotInput.setAttribute('data-storage', 'hbarPot');
        
        if (localStorage.hbarPot === "true") {
            barPotInput.setAttribute('checked', 'checked');
        }
        barPotInput.addEventListener("change", toggleStorage);
        
        let barPotLabel = document.createElement('label');
        barPotLabel.setAttribute('for', 'checkbox');
        barPotLabel.innerText = "Bar Pot Notifications";

        barPotInputContainer.append(barPotInput);
        barPotInputContainer.append(barPotLabel);

        menu.appendChild(barPotInputContainer);

        // Footer
        let footerContainer = document.createElement('div');
        footerContainer.setAttribute('class', 'dh3-helper-footer');

        let footerTopText = document.createElement('span');
        footerTopText.innerText = "Made with love by Level <3";
        footerContainer.appendChild(footerTopText);

        let footerBottomText = document.createElement('span');
        footerBottomText.innerHTML = "Found this useful? Please star this <a href='https://github.com/puremana/dh3-helper' target='_blank' rel='noopener noreferer'>repo on Github</a>";
        footerContainer.appendChild(footerBottomText);

        menu.appendChild(footerContainer);

        document.body.appendChild(menu);
    }

    function grantNotifications() {
        if (localStorage["hNotifications"] && localStorage["hNotifications"] == "true") {
            localStorage["hNotifications"] = "false";
        } else {
            if (Notification.permission !== "granted") {
                Notification.requestPermission(function(permission) {
                    if (permission === "granted") {
                        localStorage["hNotifications"] = "true";
                    } else {
                        alert("You will need to need desktop notifcations for DH3 alerts to work.")
                    }
                  });
            } else {
                localStorage["hNotifications"] = "true";
            }
        }
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
        // Furnace
        var furnaceObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-furnace").style.display === "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hFurnace === "true")) {
                        var notification = new Notification("Furnace Ready",{ icon: 'images/silverFurnaceOn.gif' });
                    }
                }
            });    
        });
    
        var furnaceTarget = document.getElementById('notification-furnace');
        furnaceObserver.observe(furnaceTarget, { attributes : true, attributeFilter : ['style'] });

        // Woodcutting
        var woodcuttingObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-woodcuttingReadyNotification").style.display !== "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hwoodcutting === "true")) {
                        var notification = new Notification("Woodcutting Ready",{ icon: 'images/woodcuttingSkill.png' });
                    }
                }
            });    
        });
    
        var woodcuttingTarget = document.getElementById('notification-woodcuttingReadyNotification');
        woodcuttingObserver.observe(woodcuttingTarget, { attributes : true, attributeFilter : ['style'] });

        // Farming
        var farmingObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-farmingReadyNotification").style.display !== "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hfarming === "true")) {
                        var notification = new Notification("Farming Completed",{ icon: 'images/farmingSkill.png' });
                    }
                }
            });    
        });
    
        var farmingTarget = document.getElementById('notification-farmingReadyNotification');
        farmingObserver.observe(farmingTarget, { attributes : true, attributeFilter : ['style'] });

        // Combat
        var combatObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-heroReadyNotification").style.display !== "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hcombat === "true")) {
                        var notification = new Notification("Combat Ready",{ icon: 'images/combatSkill.png' });
                    }
                }
            });    
        });
    
        var combatTarget = document.getElementById('notification-heroReadyNotification');
        combatObserver.observe(combatTarget, { attributes : true, attributeFilter : ['style'] });

        // Oxygen Tank
        var oxygenObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-oxygenTankTimer-Ready").style.display !== "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hoxygen === "true")) {
                        var notification = new Notification("Oxygen Tank Complete",{ icon: 'images/oxygenTank.png' });
                    }
                }
            });    
        });
    
        var oxygenTarget = document.getElementById('notification-oxygenTankTimer-Ready');
        oxygenObserver.observe(oxygenTarget, { attributes : true, attributeFilter : ['style'] });

        // Recipe Book
        var recipeObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-cooksBookReady").style.display !== "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hrecipe === "true")) {
                        var notification = new Notification("Recipe Book Complete",{ icon: 'images/cooksBook1.png' });
                    }
                }
            });    
        });
    
        var recipeTarget = document.getElementById('notification-cooksBookReady');
        recipeObserver.observe(recipeTarget, { attributes : true, attributeFilter : ['style'] });

        // Researcher
        var researcherObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-researcherReady").style.display !== "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hresearcher === "true")) {
                        var notification = new Notification("Researcher Ready",{ icon: 'images/researcher.png' });
                    }
                }
            });    
        });
    
        var researcherTarget = document.getElementById('notification-researcherReady');
        researcherObserver.observe(researcherTarget, { attributes : true, attributeFilter : ['style'] });

        // Stardust Potion
        var SDPotObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-stardustPotionTimer").style.display === "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hbrewing === "true") && (localStorage.hSDPot === "true")) {
                        var notification = new Notification("Stardust Potion Completed",{ icon: 'images/stardustPotion.png' });
                    }
                }
            });    
        });
    
        var SDPotTarget = document.getElementById('notification-stardustPotionTimer');
        SDPotObserver.observe(SDPotTarget, { attributes : true, attributeFilter : ['style'] });

        // Compost Potion
        var compostPotObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-compostPotionTimer").style.display === "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hbrewing === "true") && (localStorage.hcompostPot === "true")) {
                        var notification = new Notification("Compost Potion Completed",{ icon: 'images/compostPotion.png' });
                    }
                }
            });    
        });
    
        var compostPotTarget = document.getElementById('notification-compostPotionTimer');
        compostPotObserver.observe(compostPotTarget, { attributes : true, attributeFilter : ['style'] });

        // Bone Potion
        var bonePotObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-bonePotionTimer").style.display === "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hbrewing === "true") && (localStorage.hbonePot === "true")) {
                        var notification = new Notification("Bone Potion Completed",{ icon: 'images/bonePotion.png' });
                    }
                }
            });    
        });
    
        var bonePotTarget = document.getElementById('notification-bonePotionTimer');
        bonePotObserver.observe(bonePotTarget, { attributes : true, attributeFilter : ['style'] });

        // Bar Potion
        var barPotObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (document.getElementById("notification-barPotionTimer").style.display === "none") {
                    if ((localStorage.hNotifications === "true") && (localStorage.hbrewing === "true") && (localStorage.hbarPot === "true")) {
                        var notification = new Notification("Bar Potion Completed",{ icon: 'images/barPotion.png' });
                    }
                }
            });    
        });
    
        var barPotTarget = document.getElementById('notification-barPotionTimer');
        barPotObserver.observe(barPotTarget, { attributes : true, attributeFilter : ['style'] });
    }
});


