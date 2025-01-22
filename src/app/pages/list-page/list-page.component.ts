import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit {
  tasks: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTasks()
  }

  editTask(taskId: any) {
    this.router.navigate([`/task/${taskId}`]);
  }

  deleteTask(taskId: any) {
    if (window.confirm("Do you really want to delete this task?")) {
      this.authService.apiCall('delete', `/tasks/${taskId}`).subscribe(
        (res: any) => {
          if (res) {
            this.getTasks()
            alert('Task deleted successfully.');
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

  getTasks() {
    this.authService.apiCall('get', '/tasks').subscribe(
      (res: any) => {
        if (res) {
          this.tasks = res
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
