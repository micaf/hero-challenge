export interface BaseHero {
    /**
     * Identificador único del héroe.
     */
    id: number;

    /**
     * Nombre real del héroe.
     */
    name: string;

    /**
     * Alias o nombre enmascarado del héroe.
     */
    alias?: string;

    /**
     * Descripción detallada del héroe.
     */
    description: string;

    /**
     * Género del héroe.
     */
    gender: string;

    /**
     * Lista de superpoderes del héroe.
     */
    powersIds: number[];

    /**
     * IDs de los equipos a los que pertenece el héroe.
     */
    teamIds?: number[];
}


export interface ExtendedHero extends BaseHero {
    teamNames?: (string | undefined)[];
    powerNames?: (string | undefined)[];
  }