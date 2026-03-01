import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'todo-list',
  template: `
    <ul
      class="rounded-lg size-full border border-neutral-300
      dark:border-neutral-700 divide-y divide-neutral-300 dark:divide-neutral-700 overflow-hidden"
    >
      <ng-content select="todo-header"></ng-content>
      <ng-content></ng-content>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'size-full',
  },
})
export class TodoList {}
