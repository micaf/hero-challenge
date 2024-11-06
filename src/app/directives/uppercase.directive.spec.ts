import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive'; // Ensure this path is correct
import { By } from '@angular/platform-browser';

// Test component to host the directive
@Component({
  template: `<input type="text" appUppercase [formControl]="control">`
})
class TestComponent {
  control = new FormControl();
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UppercaseDirective, TestComponent], // Declare the directive here
      imports: [FormsModule, ReactiveFormsModule], // Import necessary modules
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges(); // Initialize the directive

    // Find the input element with the directive applied
    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should convert lowercase input to uppercase', () => {
    inputElement.value = 'hello';
    inputElement.dispatchEvent(new Event('input')); // Trigger input event
    fixture.detectChanges();

    expect(inputElement.value).toBe('HELLO'); // Check if converted to uppercase
  });

  it('should update the form control value to uppercase without emitting change event', () => {
    const component = fixture.componentInstance;
    spyOn(component.control, 'setValue').and.callThrough();

    inputElement.value = 'world';
    inputElement.dispatchEvent(new Event('input')); // Trigger input event
    fixture.detectChanges();

    expect(component.control.value).toBe('WORLD'); // Check if form control updated to uppercase
    expect(component.control.setValue).toHaveBeenCalledWith('WORLD', { emitEvent: false });
  });
});
