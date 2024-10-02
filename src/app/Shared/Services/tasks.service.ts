import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../Interfaces/Task'; // Import the Task interface from your model

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  // 
  addTask(newTask: Task): void {
    const currentTasks = this.tasksSubject.getValue(); 
    currentTasks.push(newTask);
    this.tasksSubject.next(currentTasks);
  }

  // 
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  //
  toggleTaskStatus(taskName: string): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map(task => {
      if (task.taskName === taskName) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
      }
      return task;
    });
    this.tasksSubject.next(updatedTasks); // Emit updated tasks
  }
}
