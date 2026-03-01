import { booleanAttribute, Component, input, model, output } from '@angular/core';

@Component({
  selector: 'todo-item',
  template: `
    <li
      class="py-2.5 px-4 flex items-center
      dark:bg-neutral-900 bg-neutral-200"
      [class.checked]="checked()"
      [class.is-input]="isInput()"
      [class.dark:hover:bg-neutral-800]="!isInput()"
      [class.hover:bg-neutral-300]="!isInput()"
    >
      <div class="relative size-5 mr-4 inline-flex">
        <input type="checkbox" class="absolute opacity-0 size-0" />
        <span
          class="checkmark select-none cursor-pointer absolute size-full border-2 border-neutral-300 dark:border-neutral-700
          rounded-full flex items-center justify-center font-extrabold"
          (click)="checked.set(!checked())"
        >
          @if (checked()) {
            ✓
          }
        </span>
      </div>

      <div class="content flex-1 overflow-hidden text-ellipsis">
        <ng-content></ng-content>
      </div>

      @if (!isInput()) {
        <button class="cursor-pointer" (click)="onDelete.emit()">✗</button>
      }
    </li>
  `,
  styles: `
    @reference "tailwindcss";

    .is-input {
      @apply border rounded-lg border-transparent focus-within:border-neutral-300 dark:focus-within:border-neutral-50;
    }

    .checked .checkmark {
      @apply dark:bg-neutral-50 dark:text-neutral-900 dark:border-neutral-50 bg-neutral-900 text-neutral-50 border-neutral-300;
    }

    .checked .content {
      @apply line-through! dark:text-neutral-500 text-neutral-500;
    }
  `,
  host: {
    class: 'block',
  },
})
export class TodoItem {
  isInput = input(false, { transform: booleanAttribute });

  checked = model(false);

  onDelete = output<void>();
}
