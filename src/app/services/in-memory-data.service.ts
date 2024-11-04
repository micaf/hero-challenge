import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { MOCK_HEROES } from '../mocks/mock-heroes';
import { MOCK_TEAMS } from '../mocks/mock-teams';
import { MOCK_POWERS } from '../mocks/mock-powers';

/**
 * Service that provides an in-memory database for mock data.
 * This service uses the `angular-in-memory-web-api` to simulate server responses.
 */
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  /**
   * Creates the initial database with collections for heroes, powers, and teams.
   *
   * @returns An object containing the mock data collections.
   */
  createDb() {
    const heroes = MOCK_HEROES;
    const powers = MOCK_POWERS;
    const teams = MOCK_TEAMS;
    return { heroes, powers, teams };
  }

  /**
   * Generates a new ID for an item in the specified collection.
   *
   * @param collection - The collection for which to generate a new ID.
   * @returns The new ID, which is one greater than the current max ID in the collection, or 11 if the collection is empty.
   */
  genId<T extends { id: number }>(collection: T[]): number {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 11;
  }
}
