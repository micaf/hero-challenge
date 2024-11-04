import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { BaseHero, ExtendedHero } from '../../models/hero.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../shared/material.module';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../../services/interceptor/loading-interceptor';

/**
 * Component for displaying a list of heroes in a table format with pagination and filtering capabilities.
 * Provides actions for editing, deleting, and adding new heroes, along with an expandable row for additional details.
 */
@Component({
    selector: 'app-hero-list',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.scss'],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
            state('expanded', style({ height: '*', visibility: 'visible' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class HeroListComponent implements OnInit {
    /** Columns to display in the table */
    displayedColumns: string[] = ['name', 'description', 'actions'];

    /** Array of heroes to display in the table, provided by the parent component */
    @Input() heroes: ExtendedHero[] = [];

    /** Event emitted when a hero is added */
    @Output() addHero = new EventEmitter<BaseHero>();

    /** Event emitted when a hero is edited */
    @Output() editHero = new EventEmitter<BaseHero>();

    /** Event emitted when a hero is deleted */
    @Output() deleteHero = new EventEmitter<number>();

    /** Paginator for the table, set dynamically */
    @ViewChild(MatPaginator, { static: false })
    set paginator(value: MatPaginator) {
        if (this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    /** Data source for the table */
    dataSource = new MatTableDataSource<ExtendedHero>();

    /** Columns to display, including expandable row */
    columnsToDisplay = ['name', 'alias', 'description', 'actions'];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    filteredColumns = this.columnsToDisplay.filter(col => col !== 'actions' && col !== 'expand');
    
    /** Currently expanded hero for displaying additional details */
    expandedElement: ExtendedHero | null = null;

    /** Indicator for loading state */
    isLoadingResults = true;

    constructor(private dialog: MatDialog) { }

    /**
     * Initializes the component by setting the table data to the provided heroes input.
     */
    ngOnInit(): void {
        this.dataSource.data = this.heroes;
    }

    /**
     * Opens a confirmation dialog to delete a hero.
     * @param event The event that triggered the delete action, stopping propagation.
     * @param itemId The ID of the hero to delete.
     */
    openDeleteConfirmation(event: Event, itemId: number): void {
        event.stopPropagation(); 
        const dialogRef = this.dialog.open(DeleteConfirmationComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteHero.emit(itemId);
            }
        });
    }

    /**
     * Applies a filter to the table data based on user input.
     * @param event The input event containing the filter value.
     */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /**
     * Opens a form dialog to add or edit a hero.
     * If an existing hero is provided, the form is pre-filled for editing.
     * Emits the appropriate event on form submission.
     * @param event The event that triggered the form opening, stopping propagation.
     * @param hero The hero data to edit, if any.
     */
    openHeroForm(event: Event, hero?: ExtendedHero): void {
        event.stopPropagation();
        const dialogRef = this.dialog.open(HeroFormComponent, {
            width: '500px',
            data: hero
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.id) {
                    this.editHero.emit(result);
                } else {
                    this.addHero.emit(result);
                }
            }
        });
    }
}
