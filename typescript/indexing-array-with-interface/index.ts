
interface ToDo {
    id: number;
    title: string;
    completed: boolean;
}

// now there are mutiple ways to create a todo list type

// 1. using type alias
type ToDoList = ToDo[];

const todoList1: ToDoList = [
    { id: 1, title: 'Learn TypeScript', completed: false },
    { id: 2, title: 'Learn React', completed: false }
]

// 2. using interface
interface ToDoListInterface {
    [index: number]: ToDo;
}
const todoList2: ToDoListInterface = [
    { id: 1, title: 'Learn TypeScript', completed: false },
    { id: 2, title: 'Learn React', completed: false }
]

// 3. using Type Annotation for an Array of Objects
const todoList3: ToDo[] = [
    { id: 1, title: 'Learn TypeScript', completed: false }
]