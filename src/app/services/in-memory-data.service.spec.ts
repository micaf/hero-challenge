import { TestBed } from '@angular/core/testing';
import { InMemoryDataService } from './in-memory-data.service';
import { MOCK_HEROES } from '../mocks/mock-heroes';
import { MOCK_TEAMS } from '../mocks/mock-teams';
import { MOCK_POWERS } from '../mocks/mock-powers';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createDb', () => {
    it('should return an object containing heroes, powers, and teams collections', () => {
      const db = service.createDb();
      expect(db).toBeTruthy();
      expect(db.heroes).toEqual(MOCK_HEROES);
      expect(db.powers).toEqual(MOCK_POWERS);
      expect(db.teams).toEqual(MOCK_TEAMS);
    });
  });

  describe('genId', () => {
    it('should return a new ID that is one greater than the current max ID in a non-empty collection', () => {
      const newId = service.genId(MOCK_HEROES);
      const maxId = Math.max(...MOCK_HEROES.map(hero => hero.id));
      expect(newId).toBe(maxId + 1);
    });

    it('should return 11 if the collection is empty', () => {
      const newId = service.genId([]);
      expect(newId).toBe(11);
    });
  });
});
