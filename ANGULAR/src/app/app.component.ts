import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StudentManagement';

  baseUrl = "http://localhost:8080/";
  students: any;
  list: any[] = [];

  constructor(public http: HttpClient) {
    let url = this.baseUrl + 'get';
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      this.students = data;
    });
  }

delete(student: any) {
  let url = this.baseUrl + 'delete/' + student.id; // This is correct
  this.http.delete(url).subscribe((data: any) => {
      if (data == 1) {
          let index = this.students.indexOf(student);
          if (index >= 0) {
              this.students.splice(index, 1); // Remove the deleted student from the array
          }
      } else {
          alert('Exception on server');
      }
  });
}

  

  // Add a new property to track the student being edited
  editId: number | null = null;

  edit(student: any) {
    this.name = student.name;
    this.marks = student.marks;
    this.editId = student.id; // Set the editId when editing a student
  }

  name: string = '';
  marks: number = 0;

  add() {
    let obj = {
      "name": this.name,
      "marks": this.marks
    };

    if (this.editId !== null) {
      // If editId is not null, update the existing student
      let url = this.baseUrl + 'update/' + this.editId;
      this.http.put(url, obj).subscribe((data: any) => {
        if (data == null) {
          alert('Exception on server');
        } else {
          // Update the local students array with the edited data
          const index = this.students.findIndex((student: any) => student.id === this.editId);
          if (index !== -1) {
            this.students[index] = { id: this.editId, name: this.name, marks: this.marks };
          }
          this.clearForm(); // Clear the form
        }
      });
    } else {
      // If editId is null, add a new student
      let url = this.baseUrl + 'add';
      this.http.post(url, obj).subscribe((data: any) => {
        if (data == null) {
          alert('Exception on server');
        } else {
          this.students.push(data); // Add new student to the list
          this.clearForm(); // Clear the form
        }
      });
    }
  }

  // Modify the clearForm function to reset editId
  clearForm() {
    this.name = '';
    this.marks = 0;
    this.editId = null; // Reset editId after clearing the form
  }

  isLoggedIn: number = 0;
  username: String = '';
  password: string = '';

  login() {
    let url = this.baseUrl + 'login/' + this.username;

    this.http.post(url, this.password).subscribe((data: any) => {
      if (data == 1) {
        this.isLoggedIn = 1;
      } else if (data == 2) {
        alert("wrong username");
      } else if (data == 3) {
        alert('multiple accounts with the same username');
      } else if (data == 4) {
        alert('password wrong');
      } else {
        alert('Invalid credentials');
      }
    });
  }

  logout() {
    this.isLoggedIn = 0;
  }
}

