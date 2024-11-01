export enum PowerType {
    Physical = 'Physical',
    Mental = 'Mental',
    Stealth = 'Stealth',
    Biological = 'Biological',
    Elemental = 'Elemental',
    Technological = 'Technological',
    Mystical = 'Mystical'
  }
  
  export const SuperPowers: Record<string, { id: number; name: string; type: PowerType; isUnique: boolean }> = {
    SuperStrength: { id: 1, name: 'Super Strength', type: PowerType.Physical, isUnique: false },
    Telepathy: { id: 2, name: 'Telepathy', type: PowerType.Mental, isUnique: true },
    Flight: { id: 3, name: 'Flight', type: PowerType.Physical, isUnique: false },
    Invisibility: { id: 4, name: 'Invisibility', type: PowerType.Stealth, isUnique: true },
    HealingFactor: { id: 5, name: 'Healing Factor', type: PowerType.Biological, isUnique: false },
    Pyrokinesis: { id: 6, name: 'Pyrokinesis', type: PowerType.Elemental, isUnique: true },
    Technopathy: { id: 7, name: 'Technopathy', type: PowerType.Technological, isUnique: true },
    Telekinesis: { id: 8, name: 'Telekinesis', type: PowerType.Mental, isUnique: true },
    ShapeShifting: { id: 9, name: 'Shape Shifting', type: PowerType.Biological, isUnique: false },
    SuperSpeed: { id: 10, name: 'Super Speed', type: PowerType.Physical, isUnique: false },
    TimeTravel: { id: 11, name: 'Time Travel', type: PowerType.Mystical, isUnique: true },
    XRayVision: { id: 12, name: 'X-Ray Vision', type: PowerType.Physical, isUnique: false },
    MindControl: { id: 13, name: 'Mind Control', type: PowerType.Mental, isUnique: true },
    WaterManipulation: { id: 14, name: 'Water Manipulation', type: PowerType.Elemental, isUnique: false },
    LightningControl: { id: 15, name: 'Lightning Control', type: PowerType.Elemental, isUnique: false },
    ForceField: { id: 16, name: 'Force Field', type: PowerType.Technological, isUnique: true },
    Precognition: { id: 17, name: 'Precognition', type: PowerType.Mystical, isUnique: true },
    SonicScream: { id: 18, name: 'Sonic Scream', type: PowerType.Physical, isUnique: false },
    EnhancedIntelligence: { id: 19, name: 'Enhanced Intelligence', type: PowerType.Mental, isUnique: false },
    NightVision: { id: 20, name: 'Night Vision', type: PowerType.Stealth, isUnique: false },
    Regeneration: { id: 21, name: 'Regeneration', type: PowerType.Biological, isUnique: false },
    AcidGeneration: { id: 22, name: 'Acid Generation', type: PowerType.Biological, isUnique: false },
    GravityControl: { id: 23, name: 'Gravity Control', type: PowerType.Elemental, isUnique: true },
    Teleportation: { id: 24, name: 'Teleportation', type: PowerType.Mystical, isUnique: true }
  };
export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export enum TeamType {
    Avengers = 'Avengers',
    JusticeLeague = 'Justice League',
    Titans = 'Titans'
}