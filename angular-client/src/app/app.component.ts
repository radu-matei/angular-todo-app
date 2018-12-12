import { Component, OnInit, Injectable } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
@Injectable()
export class AppComponent implements OnInit {


  todos: Todo[] = [];
  random ;

  constructor(
    private todoDataService: TodoDataService,
    private api: ApiService
  ) {
  }

  public ngOnInit() {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
  }

  onAddTodo(todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  onRemoveTodo(todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (_) => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }

  getRandomTodo() {
    this.api.http.get(environment.apiUrl + "/random")
    .subscribe(
      (res) => {
        this.random = res.json().title
      }, (err) => {
        this.random = err
      }
    )
  }
}
