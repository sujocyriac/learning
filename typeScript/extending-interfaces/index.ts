interface Item {
     id: number;
}

interface ItemWithStatus extends Item {
    status: string;
}

// correct usage
const item: ItemWithStatus = { status: 'active', id: 1 };

// incorreact usage: missing id
const item2: ItemWithStatus = { status: 'active' };