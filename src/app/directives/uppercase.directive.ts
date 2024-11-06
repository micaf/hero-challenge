import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = (event.target as HTMLInputElement);
    const upperCaseValue = input.value.toUpperCase();

    input.value = upperCaseValue;

    this.control.control?.setValue(upperCaseValue, { emitEvent: false });
  }
}
