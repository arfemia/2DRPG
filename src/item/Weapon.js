var Texture = require('pixelbox/Texture');
var Inventory = require('../Inventory');
var Item = require('./Item');

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄

function Weapon(params) {
    //params.sprites = params.sprites || [assets.entity.weapons];
    Item.call(this, params);
    params = params || {};
    
    this.attack = params.attack || 1;
    this.speed = params.speed || 1;
    this.value = params.value || 1;
    this.modifiers = params.modifiers || {};
    this.aura = params.aura || {};
}

inherits(Weapon, Item);
module.exports = Weapon;

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Weapon.prototype.addToInventory = function(inventory, i) {

    var id = this.getNameId();
    Item.prototype.addToInventory.call(this, inventory, "weapons", i, id);

}


/**
 * @param i - amount to remove
 */
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Weapon.prototype.removeFromInventory = function(inventory, i) {
    Item.prototype.removeFromInventory.call(this, inventory, "weapons", i);


}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Weapon.prototype.getNameId = function() {
    var id = "";
    id += "W:";
    id += this.name + ":"
    id += "A:"  + this.attack;
    id += "S:"  + this.speed;
    id += "V:"  + this.value;
    // id += "M:"  + modifiersToString();
    // id += "AR:" + auraToString();


    return id;
}


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Weapon.prototype.statTexture = function() {
    var txt = new Texture(36, 48);
    txt.print("A : " + this.attack, 0, 0);
    txt.print("Sp: " + this.speed, 0, 10);
    txt.print("$ : " + this.value, 0, 20);
    return txt;

}




