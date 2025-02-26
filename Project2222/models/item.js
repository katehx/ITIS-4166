const { v4: uuidv4 } = require('uuid');

const items = [
    {
        id: 1,
        title: 'Ratcheting Wrench Set',
        seller: 'John',
        condition: 'New',
        price: 30.00,
        details: 'A set of high-quality ratcheting wrenches for various mechanical needs.',
        image: '/images/95552_W3.jpg',
        active: true
    },
    {
        id: 2,
        title: 'Standard Hammer',
        seller: 'Mike',
        condition: 'Used - Fair',
        price: 2.00,
        details: 'A slightly rusty but still functional hammer.',
        image: '/images/s-l1200.jpg',
        active: true
    },
    {
        id: 3,
        title: 'Heat Gun',
        seller: 'Sarah',
        condition: 'Damaged',
        price: 2.00,
        details: 'Broken yellow heat gun, may be repairable or used for parts.',
        image: '/images/maxresdefault.jpg',
        active: true
    },
    {
        id: 4,
        title: 'Tool Assortment',
        seller: 'Tom',
        condition: 'Used - Fair',
        price: 15.00,
        details: 'An assortment of old tools in a box.',
        image: '/images/gallery-1453963896-img-8078.jpg',
        active: true
    },
    {
        id: 5,
        title: 'Tabletop Bandsaw',
        seller: 'Anna',
        condition: 'Used - Good',
        price: 150.00,
        details: 'A tabletop bandsaw for precision cutting.',
        image: '/images/61WeNiobknL._AC_UF894,1000_QL80_.jpg',
        active: true
    },
    {
        id: 6,
        title: 'Cordless Hand Drill',
        seller: 'Chris',
        condition: 'New',
        price: 125.00,
        details: 'A new cordless hand drill.',
        image: '/images/71NQl2pHZPL.jpg',
        active: true
    }
];

exports.find = () => items;

exports.findById = (id) => items.find(item => item.id === Number(id));

exports.save = (item) => {
    item.id = uuidv4();
    item.active = true;
    items.push(item)
};
