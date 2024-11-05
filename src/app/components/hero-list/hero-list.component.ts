import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
    displayedColumns: string[] = ['name', 'description', 'actions'];

    @Input() heroes: ExtendedHero[] = [];

    @Output() addHero = new EventEmitter<BaseHero>();

    @Output() editHero = new EventEmitter<BaseHero>();

    @Output() deleteHero = new EventEmitter<number>();

    @ViewChild(MatPaginator, { static: false })
    set paginator(value: MatPaginator) {
        if (this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    dataSource = new MatTableDataSource<ExtendedHero>();

    columnsToDisplay = ['name', 'alias', 'description', 'actions'];
    columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
    filteredColumns = this.columnsToDisplay.filter(col => col !== 'actions' && col !== 'expand');

    expandedElement: ExtendedHero | null = null;

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
        this.dataSource.data = this.heroes;
    }

    /**
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
            switch (result.action){
                case 'add':
                    this.addHero.emit(result.data);
                    break;
                case 'edit':
                    this.editHero.emit(result.data);
                    break;
                case 'close':
                    break;
            }
        });
    }
}
