
import { isPromise } from './utils';

export class Queue {
    private tasks: Promise<void>[] = [];

    constructor() {
        this.tasks = [];
    }
    
    add(task: any)  {
        this.tasks.push(isPromise(task) ? task : Promise.resolve(task));
    }

    readTask(firstInFirstOut: boolean = true): Promise<void> | null {
        if (this.tasks.length === 0) {
            return null;
        }

        return (firstInFirstOut ? this.tasks.shift() : this.tasks.pop()) || null;
    }
    
    get tasksCount(): number {
        return this.tasks.length;
    }
    
}