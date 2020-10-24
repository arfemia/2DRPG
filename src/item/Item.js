var Texture = require('pixelbox/Texture');
var Inventory = require('../Inventory');

var TILE_WIDTH  = settings.tileSize.width;
var TILE_HEIGHT = settings.tileSize.height;
var ANIM_SPEED = 0.2;

//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
function Item(params) {

    params = params || {};
    this.name = params.name || "n/a";
    

    this.sprites = params.sprites;

    this.frame    = 0;
	this.animated = this.sprites.length > 1;
}
module.exports = Item;


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Item.prototype.addToInventory = function(inventory, classRef, i, itemRef) {
  
    if (inventory[classRef][itemRef]) {
        inventory.setCount(this, classRef, inventory[classRef][itemRef].count + i);
    }
    
    else {
        inventory.pushToInventory(this, classRef, i);
    }
    
    
}


//▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
Item.prototype.removeFromInventory = function(inventory, classRef, i, itemRef) {
    if (!inventory[classRef][itemRef]) {console.error("tried to remove item not in inventory"); return false;}

    if (inventory[classRef][itemRef].count - i < 0) {
        console.error("tried to remove too many items");
        return false;
    }

    if (inventory[classRef][itemRef].count - i == 0) {
        delete inventory[classRef][itemRef];
        return true;
    }

    inventory.setCount(this, classRef, inventory.getCount(this, classRef) - i);
    return true;
}

