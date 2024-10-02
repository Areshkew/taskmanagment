import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { uniqueNameValidator } from '../Shared/Validators/unique-name.validator';
import { Task } from '../Shared/Interfaces/Task';
import { TaskService } from '../Shared/Services/tasks.service';

@Component({
    selector: 'create-task',
    templateUrl: './create-task.component.html',
    styleUrls: ['./create-task.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class CreateTaskComponent implements OnInit {
    form!: FormGroup;
    successMessage: string = '';

    constructor(private fb: FormBuilder, private taskService: TaskService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            taskName: new FormControl('', Validators.required),
            deadline: new FormControl('', Validators.required),
            status: new FormControl('pending'),
            persons: this.fb.array([], [Validators.required, uniqueNameValidator()])
        });
    }

    // People
    get persons(): FormArray {
        return this.form.get('persons') as FormArray;
    }

    addPerson() {
        const personGroup = this.fb.group({
            name: new FormControl('', Validators.required),
            age: new FormControl('', [Validators.required, Validators.min(18)]),
            skills: this.fb.array([], Validators.required)
        });

        this.persons.push(personGroup);
        this.persons.markAsTouched();
    }

    removePerson(index: number) {
        this.persons.removeAt(index);

        // Mark as touched
        if (this.persons.length === 0) {
            this.persons.markAsTouched();
        }
    }

    clearPersons() {
        while (this.persons.length !== 0)
          this.persons.removeAt(0);
    }

    // Skills
    getSkills(personIndex: number): FormArray {
        return this.persons.at(personIndex).get('skills') as FormArray;
    }

    addSkill(personIndex: number) {
        this.getSkills(personIndex).push(new FormControl('', Validators.required));
        this.getSkills(personIndex).markAsTouched();
    }

    removeSkill(personIndex: number, skillIndex: number) {
        this.getSkills(personIndex).removeAt(skillIndex);

        // Mark as touched
        if (this.getSkills(personIndex).length === 0) {
            this.getSkills(personIndex).markAsTouched();
        }
    }

    onSubmit() {
        if (this.form.valid) {
            const newTask: Task = this.form.value;
            this.taskService.addTask(newTask); 
            this.clearPersons();

            this.form.reset({
                taskName: '',
                deadline: '',
                status: 'pending',
                persons: this.fb.array([])
            });
    
            // Show success message
            this.successMessage = 'Nueva tarea añadida satisfactoriamente!';
            
            // Clear the success message after 3 seconds
            setTimeout(() => {
                this.successMessage = '';
            }, 3000);
        }
    }
}
