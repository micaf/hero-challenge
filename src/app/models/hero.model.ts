export interface BaseHero {
    id: number;
    name: string;
    alias: string;
    description: string;
    gender: string;
    powersIds: number[];
    teamIds?: number[];
}


export interface ExtendedHero extends BaseHero {
    teamNames?: (string | undefined)[];
    powerNames?: (string | undefined)[];
  }