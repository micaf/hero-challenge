// src/app/mocks/mock-heroes.ts

import { BaseHero } from '../models/hero.model';
/**
 * Datos mock para los héroes.
 */
export const MOCK_HEROES: BaseHero[] = [
  {
    id: 1,
    name: 'Clark Kent',
    alias: 'Superman',
    description: 'Un extraterrestre del planeta Krypton que protege la Tierra.',
    gender: 'M',
    powersIds: [1,3],
    teamIds: [1, 2], // Avengers, Justice League
    uniqueAbilities: [
      {
        abilityName: 'Heat Vision',
        description: 'Emite rayos de calor desde los ojos.',
        relatedPowerId: 1, // Super Strength
      },
    ],
  },
  {
    id: 2,
    name: 'Diana Prince',
    alias: 'Wonder Woman',
    description: 'Princesa de las Amazonas con habilidades sobrehumanas.',
    gender: 'F',
    powersIds: [1,3],
    teamIds: [1], // Avengers
    uniqueAbilities: [
      {
        abilityName: 'Lasso of Truth',
        description: 'Una lanza mágica que obliga a decir la verdad.',
        relatedPowerId: 2, // Telepathy
      },
    ],
  },
  {
    id: 3,
    name: 'Barry Allen',
    alias: 'The Flash',
    description: 'El hombre más rápido del mundo con habilidades de super velocidad.',
    gender: 'M',
    powersIds: [3,5],
    teamIds: [2], // Justice League
    uniqueAbilities: [
      {
        abilityName: 'Time Travel',
        description: 'Capacidad para viajar en el tiempo usando la velocidad.',
        relatedPowerId: 3, // Flight
      },
    ],
  },
  {
    id: 4,
    name: 'Natasha Romanoff',
    alias: 'Black Widow',
    description: 'Espía altamente entrenada y miembro de los Avengers.',
    gender: 'F', 
    powersIds: [4,2],
    teamIds: [1], // Avengers
    uniqueAbilities: [
      {
        abilityName: 'Martial Arts Mastery',
        description: 'Maestría en múltiples formas de artes marciales.',
        relatedPowerId: 2, // Telepathy
      },
    ],
  },
  {
    id: 5,
    name: 'Victor Stone',
    alias: 'Cyborg',
    description: 'Héroe mitad humano, mitad tecnología avanzada.',
    gender: 'M',
    powersIds: [2,5],
    teamIds: [1, 3], // Avengers, Titans
    uniqueAbilities: [
      {
        abilityName: 'Technopathy',
        description: 'Control y manipulación de tecnología con la mente.',
        relatedPowerId: 2, // Telepathy
      },
    ],
  },
];
