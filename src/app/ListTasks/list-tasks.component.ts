import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../Shared/Interfaces/Task';
import { TaskService } from '../Shared/Services/tasks.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'list-tasks',
    templateUrl: './list-tasks.component.html',
    styleUrls: ['./list-tasks.component.css'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class ListTasksComponent implements OnInit, OnDestroy {
    tasks: Task[] = [];
    filteredTasks: Task[] = [];
    currentFilter: string = 'all';
    taskSubscription!: Subscription;

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
        this.taskSubscription = this.taskService.getTasks().subscribe((tasks) => {
            this.tasks = tasks;
            this.applyFilter();
        });
    }

    ngOnDestroy(): void {
        if (this.taskSubscription) this.taskSubscription.unsubscribe();
    }

    // 
    toggleTask(taskName: string): void {
        this.taskService.toggleTaskStatus(taskName);
    }

    changeFilter(filter: string): void {
        this.currentFilter = filter;
        this.applyFilter();
    }

    // Apply the filter based on the currentFilter value
    applyFilter(): void {
        if (this.currentFilter === 'completed') {
            this.filteredTasks = this.tasks.filter(task => task.status === 'completed');
        } else if (this.currentFilter === 'pending') {
            this.filteredTasks = this.tasks.filter(task => task.status === 'pending');
        } else {
            this.filteredTasks = this.tasks;
        }
    }
}
