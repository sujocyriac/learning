

type ContactDate = Date | String | Number

interface Contact {
    fname: String,
    lname: String,
    age: Number,
    dob: ContactDate
}

enum AddressType {
    home = 'HOME',
    office = 'OFFICE'
}

interface Address {
    name: String,
    line1: String,
    line2?: String,
    city: String,
    type?: AddressType
}

type ConactWithAddress = Contact & Address

const contactInfo: Contact = {
    fname: 'sujo',
    lname: 'cyriac',
    age: 36,
    dob: '16/11/1988'
}

const addressInfo: Address = {
    name: 'sujo cyriac',
    line1: 'hello lane 2',
    city: 'mashbourne',
    type: AddressType.home
}

const conactWithAddress: ConactWithAddress = {
    fname: 'sujo',
    lname: 'cyriac',
    age: 36,
    dob: new Date('16-11-1988'),
    name: 'sujo cyriac',
    line1: 'hello lane 2',
    city: 'mashbourne'
}