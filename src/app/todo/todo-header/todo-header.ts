import { ChangeDetectionStrategy, Component, input, model, numberAttribute } from '@angular/core';

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

@Component({
  selector: 'todo-header',
  imports: [],
  template: `
    <header class="flex justify-between gap-2 py-2.5 px-4">
      <div class="flex gap-2">
        <button
          [class.active]="activeFilter() === Filter.All"
          (click)="setActiveFilter(Filter.All)"
        >
          Todas
        </button>
        <button
          [class.active]="activeFilter() === Filter.Active"
          (click)="setActiveFilter(Filter.Active)"
        >
          Pendientes
        </button>
        <button
          [class.active]="activeFilter() === Filter.Completed"
          (click)="setActiveFilter(Filter.Completed)"
        >
          Completadas
        </button>
      </div>

      <p>{{ length() }} Tarea{{ length() === 1 ? '' : 's' }}</p>
    </header>
  `,
  styles: `
    @reference "tailwindcss";

    :host {
      display: block;
    }

    button {
      cursor: pointer;
    }

    .active {
      @apply underline;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoHeader {
  Filter = Filter;

  activeFilter = model<Filter>(Filter.All);

  length = input(0, { transform: numberAttribute });

  setActiveFilter(filter: Filter) {
    this.activeFilter.set(filter);
  }
}
