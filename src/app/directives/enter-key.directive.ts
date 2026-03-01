import { Directive, output } from '@angular/core';

@Directive({
  selector: 'input[appEnterKey], textarea[appEnterKey]',
  host: {
    '(keydown.enter)': 'onEnter($event)',
  },
})
export class EnterKeyDirective {
  readonly enterPressed = output<KeyboardEvent>();

  protected onEnter(event: Event): void {
    if (event instanceof KeyboardEvent) {
      this.enterPressed.emit(event);
    }
  }
}
