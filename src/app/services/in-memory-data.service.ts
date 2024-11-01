import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MOCK_HEROES } from '../mocks/mock-heroes';
import { MOCK_TEAMS } from '../mocks/mock-teams';
import { MOCK_POWERS } from '../mocks/mock-powers';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = MOCK_HEROES;
    const powers = MOCK_POWERS;
    const teams = MOCK_TEAMS;
    return {heroes, powers, teams};
  }


}