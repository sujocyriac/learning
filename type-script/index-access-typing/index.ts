type ContactStatus = 'active' | 'inactive' | 'pending';

interface Address {
  street: string;
  province: string;
  postalCode: string;
}

interface Contact {
  id: number;
  name: string;
  status: ContactStatus;
  address: Address;
}

interface ContactEvent {
  contactId: Contact['id']; // getting the id type from the Contact interface using index access typing
}

interface ContactDeleteEvent extends ContactEvent {
}

interface ContactChangeEvent extends ContactEvent {
  oldStatus: Contact['status']; // getting the status type from the Contact interface  using index access typing;
  newStatus: Contact['status'];
}

interface ContactEvents {
  deleted: ContactDeleteEvent;
  statusChanged: ContactChangeEvent;
}


function getValue<T, U extends keyof T>(source: T, propertyName: U): T[U] {
  return source[propertyName]
}


function handleEvent<T extends keyof ContactEvents>(
  eventName: T,
  handler: (event: ContactEvents[T]) => void
): void {
  if (eventName === 'deleted') {
    (handler as (event: ContactDeleteEvent) => void)({ contactId: 1 });
  } else if (eventName === 'statusChanged') {
     (handler as (event: ContactChangeEvent) => void)({
      contactId: 1,
      oldStatus: 'active',
      newStatus: 'inactive',
    });
    
  }
}

handleEvent('deleted', (event) => {
  console.log(event.newStatus); // this will give an error since newStatus is not a property of ContactDeleteEvent
})

handleEvent('statusChanged', (event) => {
  console.log(event.newStatus);
})


const address: Address = {
  street: '123 Main St',
  province: 'Ontario',
  postalCode: 'A1B 2C3'
}

const contact: Contact = {
  id: 1,
  name: 'John Doe',
  status: 'active',
  address
}

// // since we used generics we can use getValue with both Contact and Address
const contactAddress = getValue(contact, 'address');
const AddressProvince = getValue(address, 'province');
const AddressPostalCode = getValue(address, 'id'); // this will give an error since id is not a property of Address