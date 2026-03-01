import { Component, signal, viewChild } from '@angular/core';
import { TodoList } from './todo/todo-list/todo-list';
import { TodoItem } from './todo/todo-item/todo-item';
import { FormsModule } from '@angular/forms';
import { EnterKeyDirective } from './directives/enter-key.directive';
import { Todo } from './todo/todo';

@Component({
  selector: 'app-root',
  imports: [TodoList, TodoItem, FormsModule, EnterKeyDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'size-full flex flex-col',
  },
})
export class App {
  todoInput = viewChild<TodoItem>('todoInput');

  protected readonly title = signal('todo-app');

  protected readonly newItem = signal('');

  items = signal<Todo[]>([]);

  protected addItem(checked: boolean): void {
    const value = this.newItem().trim();
    if (!value) {
      return;
    }

    this.items.set([
      ...this.items(),
      { id: Date.now().toString(), title: value, completed: checked },
    ]);

    this.newItem.set('');
    this.todoInput()?.checked.set(false);
  }
}
