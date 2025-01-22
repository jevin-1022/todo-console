import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId: any;
  taskDetails: any;
  isEdit: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['taskId'];
      this.isEdit = this.taskId && this.taskId !== 'add' ? true : false;
    });
    this.getTask();
  }

  getTask() {
    if (this.taskId && this.taskId !== 'add') {
      this.authService.apiCall('get', `/tasks/${this.taskId}`).subscribe(
        (res: any) => {
          if (res) {
            this.taskDetails = res;
            this.patchValues(this.taskDetails);
          }
        },
        (error: any) => {
          if (error && error.error && error.error.message) {
            alert(error.error.message);
          }
        }
      );
    }
  }

  patchValues(data: any) {
    const date = new Date(data?.dueDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    this.taskForm.setValue({
      title: data?.title,
      description: data?.description,
      dueDate: formattedDate,
      status: data?.status,
    });
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  createTask() {
    if (!this.taskForm.invalid) {
      const payload = this.taskForm.value;
      this.authService.apiCall('post', '/tasks', payload).subscribe(
        (res: any) => {
          if (res) {
            this.router.navigateByUrl('/todo-list');
          }
        },
        (error: any) => {
          if (error && error.error && error.error.message) {
            alert(error.error.message);
          }
        }
      );
    }
  }

  updateTask() {
    if (!this.taskForm.invalid) {
      const payload = this.taskForm.value;
      this.authService
        .apiCall('put', `/tasks/${this.taskId}`, payload)
        .subscribe(
          (res: any) => {
            if (res) {
              this.router.navigateByUrl('/todo-list');
            }
          },
          (error: any) => {
            if (error && error.error && error.error.message) {
              alert(error.error.message);
            }
          }
        );
    }
  }
}
