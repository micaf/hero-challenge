import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HeroListComponent } from './hero-list.component';
import { ExtendedHero } from '../../models/hero.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PowerService } from '../../services/power.service';

describe('HeroListComponent', () => {
    let component: HeroListComponent;
    let fixture: ComponentFixture<HeroListComponent>;
    let dialogSpy: jasmine.SpyObj<MatDialog>;
    let mockDialogRef: jasmine.SpyObj<any>;

    const mockHeroes: ExtendedHero[] = [
        { id: 1, name: 'Clark Kent', alias: 'Superman', description: 'Strong hero', gender: 'Male', powersIds: [1], teamIds: [1] },
        { id: 2, name: 'Bruce Wayne', alias: 'Batman', description: 'Detective', gender: 'Male', powersIds: [2], teamIds: [2] }
    ];

    beforeEach(async () => {
        mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
        const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
        matDialogSpy.open.and.returnValue(mockDialogRef);

        await TestBed.configureTestingModule({
            imports: [HeroListComponent, BrowserAnimationsModule, MaterialModule, MatPaginatorModule, HttpClientTestingModule],
            providers: [
                { provide: MatDialog, useValue: matDialogSpy },
                PowerService
            ],
        }).compileComponents();

        dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroListComponent);
        component = fixture.componentInstance;
        component.heroes = mockHeroes;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set dataSource on initialization', () => {
        component.ngOnInit();
        expect(component.dataSource.data).toEqual(mockHeroes);
    });

    it('should apply filter to dataSource', () => {
        const filterInput = fixture.debugElement.query(By.css('input')).nativeElement;
        
        filterInput.value = 'superman';
        filterInput.dispatchEvent(new Event('keyup'));
    
        fixture.detectChanges();
    
        expect(component.dataSource.filter).toBe('superman');
    });


    it('should set paginator for dataSource when paginator is set', () => {
        const paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;
        
        component.paginator = paginator;
    
        expect(component.dataSource.paginator).toBe(paginator);
    });

    it('should expand and collapse the element on row click', fakeAsync(() => {
        const row = fixture.debugElement.query(By.css('.example-element-row'));
        
        row.triggerEventHandler('click', null);
        fixture.detectChanges();
        tick();
        expect(component.expandedElement).toEqual(component.heroes[0]);

        row.triggerEventHandler('click', null);
        fixture.detectChanges();
        tick();
        expect(component.expandedElement).toBeNull();
    }));

    it('should display no data row when there are no heroes', () => {
        component.heroes = [];
        component.dataSource.data = [];
        fixture.detectChanges();

        const noDataRow = fixture.debugElement.query(By.css('#empty-table'));
        expect(noDataRow).toBeTruthy();
    });
});
