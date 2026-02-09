const Path = require('path');
const FileSystem = require('fs');

const inventoryPath = Path.join(__dirname, 'inventory.json');
if (!FileSystem.existsSync(inventoryPath)) {
    FileSystem.writeFileSync(inventoryPath,
        JSON.stringify({ items: [] }, null, 2)
    );
}

const inventory =JSON.parse(FileSystem.readFileSync(inventoryPath, 'utf-8'));

const [,,command, item, quantity] = process.argv;
let avalableStatus = 0;
let outOfStockStatus = 0;
let lowStockStatus = 0;

function addItem(name, quantity, category) {
    const id = inventory.items.length > 0? inventory.items[inventory.items.length - 1].id + 1 : 1;
    const inventoryItem = {
        id: id,
        name: name,
        quantity: quantity,
        Category: category
    };
    const newInventory = inventory.items.concat(inventoryItem);
    FileSystem.writeFileSync(inventoryPath, JSON.stringify({ items: newInventory }, null, 2));
}

function destockItem(id, quantity) {    
    const itemIndex =inventory.items.findIndex(item =>item.id === id);
    if (itemIndex !== -1) {
        if (inventory.items[itemIndex].quantity < quantity) {
            console.log(`Not enough quantity for item with id ${id}.`);
            return;
        }
        inventory.items[itemIndex].quantity -= quantity;
        FileSystem.writeFileSync(inventoryPath, JSON.stringify({ items: inventory.items }, null, 2));
    } else console.log(`Item with id ${id} not found.`);
}

function restockItem(id, quantity) {
    const itemIndex = inventory.items.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        inventory.items[itemIndex].quantity += quantity;
        FileSystem.writeFileSync(inventoryPath, JSON.stringify({ items: inventory.items }, null, 2));
    } else console.log(`Item with id ${id} not found.`);
}

function editItemName(id, newName) {
    const itemIndex = inventory.items.findIndex(item =>item.id === id);
    if(itemIndex !== -1){
        inventory.items[itemIndex].name =newName;
        FileSystem.writeFileSync(inventoryPath, JSON.stringify({items: inventory.items},null,2));
    }else console.log(`Item with id ${id} not found.`);
}

function deleteItem(id) {
    //
    const itemIndex = inventory.items.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        inventory.items.splice(itemIndex, 1);
        FileSystem.writeFileSync(inventoryPath, JSON.stringify({ items: inventory.items }, null, 2));
        console.log(`Item with id ${id} has been deleted.`);
    } else console.log(`Item with id ${id} not found.`);
}

function getStatus(quantity) {
    if (quantity === 0) return 'out of stock';
    if (quantity <= 2) return 'low stock';
    return 'available';
}

function listItems() {
    inventory.items.map(item => {
        console.log(
            `${item.id}: ${item.name} - (${item.quantity}) - ${item.Category}`
        );
        console.log(`status: ${getStatus(item.quantity)}`);
    });
}


function showSummary() {
    const totalItems = inventory.items.length;
    const totalQuantity = inventory.items.reduce((sum, item) => sum + item.quantity, 0);
    //
    for (const item of inventory.items) {
        if (item.quantity > 2) {
            avalableStatus++;
        } else if (item.quantity === 0) {
            outOfStockStatus++;
        } else if (item.quantity === 1) {
            lowStockStatus++;
        }
    }

    console.log(`Total items: ${totalItems}`);
    console.log(`Total quantity: ${totalQuantity}`);
    console.log(`Available items: ${avalableStatus}`);
    console.log(`Out of stock items: ${outOfStockStatus}`);
    console.log(`Low stock items: ${lowStockStatus}`);
}

if(command === 'add' && item) {
    addItem(item, 1, 'general');
}
if(command === 'destock' && item && quantity) {
    destockItem(parseInt(item), parseInt(quantity));
}
if(command === 'restock' && item && quantity) {
    restockItem(parseInt(item), parseInt(quantity));
}
if(command === 'edit' && item && quantity) {
    editItemName(parseInt(item), quantity);
}
if(command === 'delete' && item) {
    deleteItem(parseInt(item));
}
if(command === 'list') {
    listItems();
}
if(command === 'summary') {
    showSummary();
}

