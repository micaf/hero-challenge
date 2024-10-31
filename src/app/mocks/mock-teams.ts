// src/app/mocks/mock-teams.ts

import { Team } from '../models/team.model';

/**
 * Datos mock para los equipos.
 */
export const MOCK_TEAMS: Team[] = [
  {
    id: 1,
    name: 'Avengers',
    members: [1, 2, 4, 5], // Clark Kent, Diana Prince, Natasha Romanoff, Victor Stone
    established: new Date('1963-09-01'),
  },
  {
    id: 2,
    name: 'Justice League',
    members: [1, 2, 3, 5], // Clark Kent, Diana Prince, Barry Allen, Victor Stone
    established: new Date('1960-05-01'),
  },
  {
    id: 3,
    name: 'Titans',
    members: [3, 5], // Barry Allen, Victor Stone
    established: new Date('1964-11-01'),
  },
];