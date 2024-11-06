import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HeroListComponent } from './hero-list.component';
import { MOCK_HEROES } from '../../mocks/mock-heroes';
import { MaterialModule } from '../../shared/material.module';
import { of } from 'rxjs';

describe('HeroListComponent', () => {
    let component: HeroListComponent;
    let fixture: ComponentFixture<HeroListComponent>;
    let dialog: jasmine.SpyObj<MatDialog>;

    beforeEach(async () => {
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            imports: [
                HeroListComponent,
                MaterialModule,
                MatTableModule,
                MatDialogModule,
                MatPaginatorModule,
                BrowserAnimationsModule,
            ],
            providers: [
                { provide: MatDialog, useValue: dialogSpy }, 
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeroListComponent);
        component = fixture.componentInstance;
        dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render table with Heroes', fakeAsync(() => {
        component.dataSource.data = MOCK_HEROES;
        component.dataSource._updateChangeSubscription();
        tick();
        fixture.detectChanges();

        const tableRows = fixture.nativeElement.querySelectorAll('tr');
        expect(tableRows.length).toBe(11); // 10 heroes + 1 header

        const headerRow = tableRows[0];
        expect(headerRow.cells[0].innerHTML.trim()).toBe('Name');
        expect(headerRow.cells[1].innerHTML.trim()).toBe('Alias');
        expect(headerRow.cells[2].innerHTML.trim()).toBe('Description');
        expect(headerRow.cells[3].innerHTML.trim()).toBe('Acciones');

        const row1 = tableRows[1];
        expect(row1.cells[0].innerHTML.trim()).toBe('CLARK KENT');
        expect(row1.cells[1].innerHTML.trim()).toBe('SUPERMAN');
        flush();
    }));

    it('should emit editHero when clicking the edit icon and confirming', fakeAsync(() => {
        const editHeroSpy = spyOn(component.editHero, 'emit');
        const editedHero = {
            id: 1,
            name: 'Edited Hero',
            alias: 'SUPERMAN',
            description: 'Updated description',
            gender: 'Masculino',
            powersIds: [1, 3],
            teamIds: [1, 2]
        };

        const dialogSpy = spyOn(component['dialog'], 'open').and.returnValue({
            afterClosed: () => of({ action: 'edit', data: editedHero }) 
        } as MatDialogRef<any>);

        component.dataSource.data = MOCK_HEROES;
        fixture.detectChanges();
        tick(); 

        const editButton = fixture.debugElement.query(
            By.css('tbody tr:nth-child(1) td.mat-column-actions button')
        );
        editButton.nativeElement.click();
        fixture.detectChanges();
        tick();

        expect(dialogSpy).toHaveBeenCalled(); 
        expect(editHeroSpy).toHaveBeenCalledWith(editedHero); 
    }));

    it('should emit deleteHero when clicking the delete icon and confirming', fakeAsync(() => {
        const deleteHeroSpy = spyOn(component.deleteHero, 'emit');
        const dialogSpy = spyOn(component['dialog'], 'open').and.returnValue({
            afterClosed: () => of(true) 
        } as MatDialogRef<any>);

        component.dataSource.data = MOCK_HEROES;
        fixture.detectChanges();
        tick();

        const deleteButton = fixture.debugElement.query(By.css('button[color="warn"]'));
        expect(deleteButton).toBeTruthy();

        deleteButton.nativeElement.click(); 
        fixture.detectChanges();
        tick();

        expect(dialogSpy).toHaveBeenCalled(); 
        expect(deleteHeroSpy).toHaveBeenCalledWith(MOCK_HEROES[0].id); 
    }));

    it('should emit addHero when clicking the add button', fakeAsync(() => {
        const addHeroSpy = spyOn(component.addHero, 'emit');
        const newHero = { id: 99, name: 'New Hero', alias: 'NEW', description: 'A new hero', gender: 'Masculino', powersIds: [1], teamIds: [1] };

        const dialogSpy = spyOn(component['dialog'], 'open').and.returnValue({
            afterClosed: () => of({ action: 'add', data: newHero }) // Simulate add confirmation
        } as MatDialogRef<any>);

        fixture.detectChanges();
        tick();

        const addButton = fixture.debugElement.query(By.css('.table-actions button'));
        expect(addButton).toBeTruthy();
        addButton.nativeElement.click();
        fixture.detectChanges();
        tick();

        expect(dialogSpy).toHaveBeenCalled(); 
        expect(addHeroSpy).toHaveBeenCalledWith(newHero); 
    }));


    it('should call applyFilter when typing in the filter input', fakeAsync(() => {
        const applyFilterSpy = spyOn(component, 'applyFilter');
        fixture.detectChanges();
        tick();

        const filterInput = fixture.debugElement.query(By.css('.filter-input input'));
        expect(filterInput).toBeTruthy();

        filterInput.nativeElement.value = 'Elektra';
        filterInput.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'e' })); // Trigger 'keyup' event

        fixture.detectChanges();
        tick();

        expect(applyFilterSpy).toHaveBeenCalledWith(jasmine.any(Event));
        flush();
    }));

});
