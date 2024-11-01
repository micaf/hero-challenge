import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, of, switchMap } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { ExtendedHero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';
import { TeamService } from '../../services/team.service';
import { PowerService } from '../../services/power.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog'; 
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<ExtendedHero>([]); 
  columnsToDisplay = ['name', 'alias', 'description', 'actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  filteredColumns = this.columnsToDisplay.filter(col => col !== 'actions' && col !== 'expand');
  expandedElement: ExtendedHero | null = null;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private heroService: HeroService, private teamService: TeamService, private powerService: PowerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllHeroes();
  }

  getAllHeroes() {
    this.isLoadingResults = true;
    this.heroService.getHeroes().pipe(
      switchMap((heroes) => {
        const teamIds = heroes?.flatMap(hero => hero.teamIds).filter((id): id is number => id !== undefined);
        const powerIds = heroes?.flatMap(hero => hero.powersIds).filter((id): id is number => id !== undefined);
  
        return forkJoin({
          heroes: of(heroes),
          teams: teamIds.length > 0 ? this.teamService.getTeamsByIds(teamIds) : of([]),
          powers: powerIds.length > 0 ? this.powerService.getPowersByIds(powerIds) : of([]),
        });
      })
    ).subscribe(({ heroes, teams, powers }) => {
      debugger;
      this.dataSource = new MatTableDataSource(
        heroes.map(hero => ({
          ...hero,
          teamNames: hero.teamIds?.map(id => teams.find(team => team.id === id)?.name),
          powerNames: hero.powersIds.map(id => powers.find(power => power.id === id)?.name)
        } as ExtendedHero)) // Forzar tipo a ExtendedHero
      );
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    });
  }

  openHeroForm(hero?: ExtendedHero): void {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '400px',
      data: hero || {} // Envía los datos del héroe para editar o un objeto vacío para agregar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Maneja la lógica de guardar el héroe
        if (result.id) {
          // Actualiza el héroe existente
          this.editHero(result);
        } else {
          // Añade un nuevo héroe
          this.addHero(result);
        }
      }
    });
  }

  openEditHero(event: Event, hero: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(HeroFormComponent, {
      width: '400px',
      data: hero || {} // Envía los datos del héroe para editar o un objeto vacío para agregar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.id) {
          this.editHero(result);
        } 
    });
  }

  openDeleteConfirmation(event: Event, itemId: number): void {
    event.stopPropagation(); // Evita la propagación del evento
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(itemId);
      }
    });
  }

  deleteItem(itemId: number): void {
    // Lógica para eliminar el elemento
  }

  addHero(hero: any){
    return

  }

  editHero(hero: any){
    return

  }
}
