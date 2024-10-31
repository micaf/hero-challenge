import { Power } from '../models/power.model';

/**
 * Datos mock para los superpoderes.
 */
export const MOCK_POWERS: Power[] = [
    {
      id: 1,
      name: 'Super Strength',
      description: 'Ability to exert extraordinary physical force.',
      type: 'Physical',
      isUnique: false,
    },
    {
      id: 2,
      name: 'Telepathy',
      description: 'Ability to read and communicate thoughts.',
      type: 'Mental',
      isUnique: true,
    },
    {
      id: 3,
      name: 'Flight',
      description: 'Ability to defy gravity and fly.',
      type: 'Physical',
      isUnique: false,
    },
    {
      id: 4,
      name: 'Invisibility',
      description: 'Ability to become unseen to the naked eye.',
      type: 'Stealth',
      isUnique: true,
    },
    {
      id: 5,
      name: 'Healing Factor',
      description: 'Rapidly regenerates damaged or destroyed cells.',
      type: 'Biological',
      isUnique: false,
    },
  ];