import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive'; 
import { By } from '@angular/platform-browser';

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
      declarations: [UppercaseDirective, TestComponent], 
      imports: [FormsModule, ReactiveFormsModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges(); 

    inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should convert lowercase input to uppercase', () => {
    inputElement.value = 'hello';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('HELLO'); 
  });

  it('should update the form control value to uppercase without emitting change event', () => {
    const component = fixture.componentInstance;
    spyOn(component.control, 'setValue').and.callThrough();

    inputElement.value = 'world';
    inputElement.dispatchEvent(new Event('input')); 
    fixture.detectChanges();

    expect(component.control.value).toBe('WORLD'); 
    expect(component.control.setValue).toHaveBeenCalledWith('WORLD', { emitEvent: false });
  });
});
