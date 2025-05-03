

interface Contact {
    fname: String,
    lname: String,
    age: Number,
}

 
interface Shipping {
    address: String,
    quantity: String,
}

function getContactDetils<T, K extends keyof T>(contactObject: T, field: K): T[K] {
    return contactObject[field]
}

// incorrect usage
getContactDetils({
    fname: 'sujo',
    lname: 'cyriac',
    age: 36
}, 'sujo');

// correct usage
getContactDetils({
    fname: 'sujo',
    lname: 'cyriac',
    age: 36
}, 'lname')

// correct usage for shipping
getContactDetils({
    address: 'adsdasdasdasd',
    quantity: '122',
}, 'address');