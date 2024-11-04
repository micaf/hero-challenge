import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for displaying a confirmation dialog to delete an item.
 * 
 * The `DeleteConfirmationComponent` provides users with options to confirm or cancel
 * the deletion of an item. It includes two actions: "Cancelar" and "Eliminar".
 */
@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmar Eliminación</h2>
    <mat-dialog-content>¿Estás seguro de que deseas eliminar este elemento?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Eliminar</button>
    </mat-dialog-actions>
  `
})
export class DeleteConfirmationComponent {

  /**
   * Creates an instance of DeleteConfirmationComponent.
   * 
   * @param dialogRef - Reference to the dialog opened to manage dialog result.
   */
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  /**
   * Confirms the deletion by closing the dialog with a true result.
   */
  onConfirm(): void {
    this.dialogRef.close(true); // Confirma eliminación
  }

  /**
   * Cancels the deletion by closing the dialog with a false result.
   */
  onCancel(): void {
    this.dialogRef.close(false); // Cancela eliminación
  }
}
