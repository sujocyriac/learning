import { Queue } from './queue';

export class Runner { 
     async run(queue: any, callBack: any = null) {
        while (true) {
            const task = await queue.readTask(false);

            const isDone = await task;
            isDone!==null && callBack && callBack(isDone);
            if (task === null) {
                break;
            }
        }
     }   
}

const queue = new Queue();
 
const task1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Task 1');
    }, 1000);
});

const task2 =  new Promise((resolve) => {
    setTimeout(() => {
        resolve('Task 2');
    }, 2000);
});

const task3 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Task 3');
    }, 3000);
});

const task4 = Math.PI

queue.add(task4);
queue.add(task1);
queue.add(task2);
queue.add(task3);


 
 new Runner().run(queue, (resolve: any) => {
    console.log(resolve);
 });
 