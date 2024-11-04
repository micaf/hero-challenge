import { BaseHero } from '../models/hero.model';

/**
 * Datos mock para los héroes.
 */
export const MOCK_HEROES: BaseHero[] = [
  { id: 1, name: 'Clark Kent', alias: 'Superman', description: 'Un extraterrestre del planeta Krypton que protege la Tierra.', gender: 'Masculino', powersIds: [1, 3], teamIds: [1, 2] },
  { id: 2, name: 'Diana Prince', alias: 'Wonder Woman', description: 'Princesa de las Amazonas con habilidades sobrehumanas.', gender: 'Femenino', powersIds: [1, 3], teamIds: [1] },
  { id: 3, name: 'Barry Allen', alias: 'The Flash', description: 'El hombre más rápido del mundo con habilidades de super velocidad.', gender: 'Masculino', powersIds: [3, 5], teamIds: [2] },
  { id: 4, name: 'Natasha Romanoff', alias: 'Black Widow', description: 'Espía altamente entrenada y miembro de los Avengers.', gender: 'Femenino', powersIds: [4, 2], teamIds: [1] },
  { id: 5, name: 'Victor Stone', alias: 'Cyborg', description: 'Héroe mitad humano, mitad tecnología avanzada.', gender: 'Masculino', powersIds: [2, 5], teamIds: [1, 3] },
  { id: 6, name: 'Bruce Wayne', alias: 'Batman', description: 'El Caballero Oscuro de Gotham.', gender: 'Masculino', powersIds: [2, 4], teamIds: [2] },
  { id: 7, name: 'Hal Jordan', alias: 'Green Lantern', description: 'Portador de un anillo de poder con habilidades cósmicas.', gender: 'Masculino', powersIds: [1, 5], teamIds: [2] },
  { id: 8, name: 'Tony Stark', alias: 'Iron Man', description: 'Millonario genio y filántropo con armadura avanzada.', gender: 'Masculino', powersIds: [5, 6], teamIds: [1] },
  { id: 9, name: 'Peter Parker', alias: 'Spider-Man', description: 'Un adolescente con habilidades de araña.', gender: 'Masculino', powersIds: [1, 4], teamIds: [1] },
  { id: 10, name: 'Steve Rogers', alias: 'Captain America', description: 'Un super soldado con habilidades mejoradas.', gender: 'Masculino', powersIds: [1, 3], teamIds: [1] },
  { id: 11, name: 'Stephen Strange', alias: 'Doctor Strange', description: 'Hechicero supremo y protector del mundo mágico.', gender: 'Masculino', powersIds: [7, 5], teamIds: [1] },
  { id: 12, name: 'Bruce Banner', alias: 'Hulk', description: 'Científico que se transforma en un monstruo de fuerza bruta.', gender: 'Masculino', powersIds: [1, 3], teamIds: [1] },
  { id: 13, name: 'Thor Odinson', alias: 'Thor', description: 'Dios del trueno y príncipe de Asgard.', gender: 'Masculino', powersIds: [1, 8], teamIds: [1] },
  { id: 14, name: 'Scott Lang', alias: 'Ant-Man', description: 'Héroe con la capacidad de reducirse al tamaño de una hormiga.', gender: 'Masculino', powersIds: [4, 6], teamIds: [1] },
  { id: 15, name: 'Wanda Maximoff', alias: 'Scarlet Witch', description: 'Poderosa mutante con habilidades de manipulación de la realidad.', gender: 'Femenino', powersIds: [7, 2], teamIds: [1] },
  { id: 16, name: 'T’Challa', alias: 'Black Panther', description: 'Rey de Wakanda con habilidades sobrehumanas.', gender: 'Masculino', powersIds: [1, 3], teamIds: [1] },
  { id: 17, name: 'Arthur Curry', alias: 'Aquaman', description: 'Rey de Atlantis con habilidades acuáticas.', gender: 'Masculino', powersIds: [3, 8], teamIds: [2] },
  { id: 18, name: 'Barbara Gordon', alias: 'Batgirl', description: 'Hábil luchadora y detective de Gotham City.', gender: 'Femenino', powersIds: [2, 4], teamIds: [2] },
  { id: 19, name: 'Oliver Queen', alias: 'Green Arrow', description: 'Experto arquero y vigilante de Star City.', gender: 'Masculino', powersIds: [2, 4], teamIds: [2] },
  { id: 20, name: 'Jean Grey', alias: 'Phoenix', description: 'Mutante telepática y con habilidades de la Fuerza Fénix.', gender: 'Femenino', powersIds: [2, 7], teamIds: [3] },
  { id: 21, name: 'Scott Summers', alias: 'Cyclops', description: 'Mutante con habilidad de disparar rayos de energía.', gender: 'Masculino', powersIds: [1, 6], teamIds: [3] },
  { id: 22, name: 'Ororo Munroe', alias: 'Storm', description: 'Mutante con el poder de controlar el clima.', gender: 'Femenino', powersIds: [8, 7], teamIds: [3] },
  { id: 23, name: 'Remy LeBeau', alias: 'Gambit', description: 'Mutante con habilidad de cargar objetos con energía cinética.', gender: 'Masculino', powersIds: [5, 6], teamIds: [3] },
  { id: 24, name: 'Logan', alias: 'Wolverine', description: 'Mutante con garras de adamantium y factor de curación.', gender: 'Masculino', powersIds: [1, 5], teamIds: [3] },
  { id: 25, name: 'Raven Darkhölme', alias: 'Mystique', description: 'Mutante cambiaformas.', gender: 'Femenino', powersIds: [4, 5], teamIds: [3] },
  { id: 26, name: 'Hank McCoy', alias: 'Beast', description: 'Mutante con fuerza y agilidad sobrehumanas.', gender: 'Masculino', powersIds: [1, 6], teamIds: [3] },
  { id: 27, name: 'Kara Zor-El', alias: 'Supergirl', description: 'Superheroína de Krypton, prima de Superman.', gender: 'Femenino', powersIds: [1, 3], teamIds: [2] },
  { id: 28, name: 'Selina Kyle', alias: 'Catwoman', description: 'Ladrona experta con habilidades de sigilo y combate.', gender: 'Femenino', powersIds: [4, 2], teamIds: [2] },
  { id: 29, name: 'Slade Wilson', alias: 'Deathstroke', description: 'Asesino y mercenario con habilidades de combate avanzadas.', gender: 'Masculino', powersIds: [1, 4], teamIds: [3] },
  { id: 30, name: 'Billy Batson', alias: 'Shazam', description: 'Niño que se convierte en un poderoso héroe al decir "Shazam".', gender: 'Masculino', powersIds: [1, 3, 7], teamIds: [2] },
];

