import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    // Get the current value and transform it to uppercase
    const input = (event.target as HTMLInputElement);
    const upperCaseValue = input.value.toUpperCase();

    // Update the element value directly
    input.value = upperCaseValue;

    // Update the form control programmatically
    this.control.control?.setValue(upperCaseValue, { emitEvent: false });
  }
}
