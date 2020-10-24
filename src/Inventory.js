var Texture = require('pixelbox/Texture');
var Item = require('./item/Item');
const Weapon = require('./item/Weapon');


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
function Inventory() {


    this.weapons = {};
    this.armor = {};
    this.consumables = {};
    this.keyItems = {};
    this.makeWeaponList()

}

module.exports = Inventory;

// FIX ITEM DATA LOADING
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Inventory.prototype.addItem = function(item, i){
    
    
    item.addToInventory(this, i);

    
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Inventory.prototype.removeItem = function(item, i) {
    return item.removeFromInventory(this, i);
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Inventory.prototype.setCount = function(item, classRef, i) {
    this[classRef][item.getNameId()].count = i;
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Inventory.prototype.getCount = function(item, classRef) {
    return this[classRef][item.getNameId()].count;
}

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Inventory.prototype.pushToInventory = function(item, classRef, i) {
    this[classRef][item.getNameId()] = {
      data : item,
      count : i
    } 

}

/** 
*   
*   @return - {data : Item , count : #} 
*/
//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Inventory.prototype.getInventoryItem = function(classRef, n) {
    var id = "";
    id = Object.keys(this[classRef])[n];

    if (id == "") return false;

    return this[classRef][id];
}

Inventory.prototype.makeWeaponList = function() {
    //var list = {};
    var len = random(200) + 1;
    for (var i = 0; i < len; i++) {
        let a = random(4);
        let str = "";
        switch (a) {
            case 0:
                str = "Sword";
                break;
            case 1:
                str = "Staff";
                break;
            case 2:
                str = "Axe";
                break;
            case 3:
                str = "Slingshot"
                break;
        }
        var img = assets.entity.weaponIcons.arsenal[str + "s"][str];
  
        var wep = new Weapon({
            name : str,
            sprites : [img],
            attack : random(20),
            speed : random(10),
            value: random(1000)
        });
        
        this.addItem(wep, random(50) + 1);
        //list[wep.getNameId()] = {data: wep, count : random(100)  + 50 - random (50)};

    }

    //return list;
    
}