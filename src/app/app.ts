import { Component, computed, signal, viewChild } from '@angular/core';
import { TodoList } from './todo/todo-list/todo-list';
import { TodoItem } from './todo/todo-item/todo-item';
import { FormsModule } from '@angular/forms';
import { EnterKeyDirective } from './directives/enter-key.directive';
import { Todo } from './todo/todo';
import { Filter, TodoHeader } from './todo/todo-header/todo-header';

@Component({
  selector: 'app-root',
  imports: [TodoList, TodoItem, TodoHeader, FormsModule, EnterKeyDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    class: 'size-full flex flex-col',
  },
})
export class App {
  todoInput = viewChild<TodoItem>('todoInput');

  todoHeader = viewChild(TodoHeader);

  protected readonly title = signal('todo-app');

  protected readonly newItem = signal('');

  items = signal<Todo[]>([]);

  filteredItems = computed(() => {
    const filter = this.todoHeader()?.activeFilter() ?? Filter.All;

    switch (filter) {
      case Filter.Active:
        return this.items().filter((item) => !item.completed);
      case Filter.Completed:
        return this.items().filter((item) => item.completed);
      default:
        return this.items();
    }
  });

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
