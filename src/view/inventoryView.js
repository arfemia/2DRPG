

'use strict';
const fs = require('fs');

var viewManager = require('../viewManager');
var TextBox = require('../TextBox');
var Texture = require('pixelbox/Texture');



var SCREEN_W = settings.screen.width;
var SCREEN_H = settings.screen.height;
var offset = 40;
var textbox = new TextBox(offset * 5, 24, assets.font.tetris).setColor(3);

var spacing = 14;
var option = 1;
var item = 0;
var pageNumber = 1;
var invLength = 0;
var invRef = "weapons";
var numPages = 1;
var camera = {};
var itemNameTexture = new Texture(offset * 2 - 5, 10 + (spacing * 10));



//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
exports.open = function (params) {
    params = params || {};
    this.params = params;
    textbox.clear();
    var y = 0;

    textbox.addText("WEAPONS", offset * (++y - 1) + 1, 12);
    textbox.addText("ARMOR", offset * (++y - 1) + 5, 12);
    textbox.addText("CONSUME", offset * (++y - 1) + 1, 12);
    textbox.addText("KEYITEMS", offset * (++y - 1), 12);

    this.wL = Object.keys(this.params.player.inventory.weapons).length || 0;
    this.aL = Object.keys(this.params.player.inventory.armor).length || 0;
    this.cL = Object.keys(this.params.player.inventory.consumables).length || 0;
    this.kL = Object.keys(this.params.player.inventory.keyItems).length || 0;

    camera = {
        x: this.params.camera.x,
        y: this.params.camera.y
    };





    let data = JSON.stringify(this.params.player.inventory);

    fs.writeFileSync('student-2.json', data);



    invLength = this.wL;
    pageNumber = 1;
    option = 1;
    item = 0;
    invRef = "weapons";
    numPages = ~~(invLength / 11) + 1;
    if (invLength !== 0 && invLength % 11 == 0) numPages -= 1;

    var itemNum = (pageNumber == numPages) ? invLength % 11 : 11;
    itemNameTexture.clear();
    for (var i = 0; i < itemNum; i++) {
        var invItemObj = this.params.player.inventory.getInventoryItem(invRef, i + (11 * (pageNumber - 1)));
        //  var txt = new Texture(offset * 2 - 5, 10 + (spacing * 10));
        var str = (invItemObj.count < 10) ? "   " : (invItemObj.count > 99) ? " " : "  ";
        itemNameTexture.print(invItemObj.count + str + invItemObj.data.name, 0, i * spacing);

    }
};


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
exports.update = function () {
    var pageChange = false;
    var tabSwitched = false;

    // user input - CHANGING INVENTORY TABS
    if (gamepad.btnp.left) {
        option -= 1; item = 0; pageNumber = 1;
        if (option <= 0) {
            option = 5;
        }
        tabSwitched = true;
        pageChange = true;

    }
    if (gamepad.btnp.right) {
        option += 1; item = 0; pageNumber = 1;
        if (option > 5) {
            option = 1;
        }
        tabSwitched = true;
        pageChange = true;
    }

    // inventory item list change (left or right pressed)
    if (tabSwitched) {
        switch (option) {
            case 1:
                invRef = "weapons";
                invLength = this.wL;
                break;
            case 2:
                invRef = "armor";
                invLength = this.aL;
                break;
            case 3:
                invRef = "consumables";
                invLength = this.cL;
                break;
            case 4:
                invRef = "keyItems";
                invLength = this.kL;
                break;
            case 5:
                invLength = 4;
                invRef = "party";
                break;
        }
        numPages = ~~(invLength / 11) + 1;

        if (invLength !== 0 && invLength % 11 == 0) numPages -= 1;

    }

    // party ui background
    paper(1);
    rectf(camera.x + offset * 4 + 17, camera.y + 4, 74, SCREEN_H - 13);
    paper(0);
    rectf(camera.x + offset * 4 + 19, camera.y + 6, 70, SCREEN_H - 17);
    paper(4);
    if (option == 5) {
        rectf(camera.x + offset * 4 + 21, camera.y + 7 + (item * 45), 66, 37);
    }
    //paper(1);
    //rectf(camera.x + offset * 4 + 17, camera.y  + 20, 74, 1);
    draw(this.params.player.getPartyIcons(), camera.x + offset * 4 + 22, camera.y + 8);






    // inv background/ui
    paper(1);
    rectf(camera.x + 4, camera.y + 6 - 2, offset * 4 + 6 + 4, SCREEN_H - 17 + 4);
    paper(0);
    rectf(camera.x + 6, camera.y + 6, offset * 4 + 6, SCREEN_H - 17);
    paper(1);
    rectf(camera.x + 4, camera.y + 24, offset * 4 + 6 + 4, 1);



    // inventory category highlight
    
    paper(4);
    if (option !== 5) {
        rectf(camera.x + offset * (option - 1) + 8, camera.y + 8, offset + 2, 14);
    } 
    

    // category text
    draw(textbox.texture, camera.x + 10 + 4, camera.y);

    var x = 0;

    // item highlight
    pen(1);
    if (invLength > 0 && option !== 5) {
        rect(camera.x + 8, camera.y + 24 + 3 + (item * spacing), offset * 2, 12);
    }

    // no items of the type in inventory - lock scrolling - display empty
    if (invLength == 0) {
        var txt = new Texture(offset * 2 - 5, 10);
        txt.print("EMPTY", 0, 0);
        draw(txt, camera.x + 11, camera.y + 24 + 3 + (0 * spacing) + 3);
    }
    else {
        // scroll through items
        if (gamepad.btnp.down) {
            item += 1;
            if (item > 10 || gamepad.btn.lt || (option == 5 && item > 3)) {
                item = 0; pageNumber += 1;
                if (pageNumber > numPages) {
                    pageNumber =  1; item = 0;
                }
                pageChange = true;
            }
            if (option !== 5 && !this.params.player.inventory.getInventoryItem(invRef, item + (11 * (pageNumber - 1)))) {
                pageNumber = 1; item = 0;
                pageChange = true;
            }
        }
        if (gamepad.btnp.up) {
            item -= 1;
            if (item < 0 || gamepad.btn.lt) {
                item = (gamepad.btn.lt) ? 0 : (option == 5) ? 3 : 10;
                pageNumber -= 1;
                if (pageNumber < 1) {
                    pageNumber = numPages; item = (option == 5) ? 3 : 10;
                }
                pageChange = true;
            }
            if (option !== 5 && !this.params.player.inventory.getInventoryItem(invRef, item + (11 * (pageNumber - 1)))) {
                pageNumber = numPages; item = invLength % 11 - 1;
                pageChange = true;
            }
        }

        // render item names
        /**
         * @TODO : clean this shit up, make texture on page/category change, render texture every frame
         */

        if (pageChange && option !== 5) {
            var itemNum = (pageNumber == numPages) ? invLength % 11 : 11;
            itemNameTexture.clear();
            for (var i = 0; i < itemNum; i++) {
                var invItemObj = this.params.player.inventory.getInventoryItem(invRef, i + (11 * (pageNumber - 1)));
                //  var txt = new Texture(offset * 2 - 5, 10 + (spacing * 10));
                var str = (invItemObj.count < 10) ? "   " : (invItemObj.count > 99) ? " " : "  ";
                itemNameTexture.print(invItemObj.count + str + invItemObj.data.name, 0, i * spacing);

            }
        }

        if (option !== 5) {

            draw(itemNameTexture, camera.x + 11, camera.y + 24 + 3 + 3);
            var invItemObj = this.params.player.inventory.getInventoryItem(invRef, item + (11 * (pageNumber - 1)));

            // item icon background
            // invItemObj = {Item, Integer}
            paper(4);
            rectf(camera.x + offset * 2 + 12 + 17 + 82 / 2 - (18), camera.y + 27, 36, 36);
            paper(1);
            rectf(camera.x + offset * 2 + 12 + 18 + 82 / 2 - (18), camera.y + 28, 34, 34);

            // item icon rendering
            if (invItemObj.data.sprites) {

                draw(invItemObj.data.sprites[0], camera.x + offset * 2 + 12 + 18 + 82 / 2 - (18) + 1, camera.y + 28);
                draw(invItemObj.data.statTexture(), camera.x + offset * 2 + 12, camera.y + 29);
            }
            else {
                // default item icon
                draw(assets.entity[invRef], camera.x + offset * 2 + 12 + 18 + 82 / 2 - (18) + 1, camera.y + 28);

            }
        }


    }

    // page number display - @TODO: fix for double/triple digit pg #
    paper(0);
    pen(1);
    let xdisp = 11;
    let numDisp = (pageNumber < 10) ? 4 : 0;
    rect(camera.x + 7, camera.y + SCREEN_H - 9, offset + xdisp, 9);
    rectf(camera.x + 8, camera.y + SCREEN_H - 9, offset + xdisp - 2, 8);
    var txt = new Texture(offset * 2, 10);
    txt.print("PAGE: " + pageNumber + "/" + numPages, 0, 0);
    draw(txt, camera.x + 11 + numDisp, camera.y + SCREEN_H - 8);


    // close inventory
    if (gamepad.btnr.start) {
        viewManager.open("game", this.params);
    }
};