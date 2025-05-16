const productItem = {
    id: 1,
    name: 'Product A',
    price: 100,
}

// incorrectly typed examples
const productItem2: typeof productItem = {}
const productItem3: typeof productItem = { id: 4, name: 'Product 3' }
const productItem4: typeof productItem = { id: '4', name: 'Product 4', price: 100 }
const productItem5: typeof productItem = { id: 4, name: 'Product 5', price: 100, description: 'test' }

// correctly typed example
const productItem6: typeof productItem = { id: 4, name: 'test', price: 100 }