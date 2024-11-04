import { BaseHero } from '../models/hero.model';

/**
 * Mock data for heroes.
 */
export const MOCK_HEROES: BaseHero[] = [
  { id: 1, name: 'CLARK KENT', alias: 'SUPERMAN', description: 'Un extraterrestre del planeta Krypton que protege la Tierra.', gender: 'Masculino', powersIds: [1, 3], teamIds: [1, 2] },
  { id: 2, name: 'DIANA PRINCE', alias: 'WONDER WOMAN', description: 'Princesa de las Amazonas con habilidades sobrehumanas.', gender: 'Femenino', powersIds: [1, 3], teamIds: [1] },
  { id: 3, name: 'BARRY ALLEN', alias: 'THE FLASH', description: 'El hombre más rápido del mundo con habilidades de super velocidad.', gender: 'Masculino', powersIds: [3, 5], teamIds: [2] },
  { id: 4, name: 'NATASHA ROMANOFF', alias: 'BLACK WIDOW', description: 'Espía altamente entrenada y miembro de los Avengers.', gender: 'Femenino', powersIds: [4, 2], teamIds: [1] },
  { id: 5, name: 'VICTOR STONE', alias: 'CYBORG', description: 'Héroe mitad humano, mitad tecnología avanzada.', gender: 'Masculino', powersIds: [2, 5], teamIds: [1, 3] },
  { id: 6, name: 'BRUCE WAYNE', alias: 'BATMAN', description: 'El Caballero Oscuro de Gotham.', gender: 'Masculino', powersIds: [2, 4], teamIds: [2] },
  { id: 7, name: 'HAL JORDAN', alias: 'GREEN LANTERN', description: 'Portador de un anillo de poder con habilidades cósmicas.', gender: 'Masculino', powersIds: [1, 5], teamIds: [2] },
  { id: 8, name: 'TONY STARK', alias: 'IRON MAN', description: 'Millonario genio y filántropo con armadura avanzada.', gender: 'Masculino', powersIds: [5, 6], teamIds: [1] },
  { id: 9, name: 'PETER PARKER', alias: 'SPIDER-MAN', description: 'Un adolescente con habilidades de araña.', gender: 'Masculino', powersIds: [1, 4], teamIds: [1] },
  { id: 10, name: 'STEVE ROGERS', alias: 'CAPTAIN AMERICA', description: 'Un super soldado con habilidades mejoradas.', gender: 'Masculino', powersIds: [1, 3], teamIds: [1] },
  { id: 11, name: 'STEPHEN STRANGE', alias: 'DOCTOR STRANGE', description: 'Hechicero supremo y protector del mundo mágico.', gender: 'Masculino', powersIds: [7, 5], teamIds: [1] },
  { id: 12, name: 'BRUCE BANNER', alias: 'HULK', description: 'Científico que se transforma en un monstruo de fuerza bruta.', gender: 'Masculino', powersIds: [1, 3], teamIds: [1] },
  { id: 13, name: 'THOR ODINSON', alias: 'THOR', description: 'Dios del trueno y príncipe de Asgard.', gender: 'Masculino', powersIds: [1, 8], teamIds: [1] },
  { id: 14, name: 'SCOTT LANG', alias: 'ANT-MAN', description: 'Héroe con la capacidad de reducirse al tamaño de una hormiga.', gender: 'Masculino', powersIds: [4, 6], teamIds: [1] },
  { id: 15, name: 'WANDA MAXIMOFF', alias: 'SCARLET WITCH', description: 'Poderosa mutante con habilidades de manipulación de la realidad.', gender: 'Femenino', powersIds: [7, 2], teamIds: [1] },
  { id: 16, name: 'T’CHALLA', alias: 'BLACK PANTHER', description: 'Rey de Wakanda con habilidades sobrehumanas.', gender: 'Masculino', powersIds: [1, 3], teamIds: [1] },
  { id: 17, name: 'ARTHUR CURRY', alias: 'AQUAMAN', description: 'Rey de Atlantis con habilidades acuáticas.', gender: 'Masculino', powersIds: [3, 8], teamIds: [2] },
  { id: 18, name: 'BARBARA GORDON', alias: 'BATGIRL', description: 'Hábil luchadora y detective de Gotham City.', gender: 'Femenino', powersIds: [2, 4], teamIds: [2] },
  { id: 19, name: 'OLIVER QUEEN', alias: 'GREEN ARROW', description: 'Experto arquero y vigilante de Star City.', gender: 'Masculino', powersIds: [2, 4], teamIds: [2] },
  { id: 20, name: 'JEAN GREY', alias: 'PHOENIX', description: 'Mutante telepática y con habilidades de la Fuerza Fénix.', gender: 'Femenino', powersIds: [2, 7], teamIds: [3] },
  { id: 21, name: 'SCOTT SUMMERS', alias: 'CYCLOPS', description: 'Mutante con habilidad de disparar rayos de energía.', gender: 'Masculino', powersIds: [1, 6], teamIds: [3] },
  { id: 22, name: 'ORORO MUNROE', alias: 'STORM', description: 'Mutante con el poder de controlar el clima.', gender: 'Femenino', powersIds: [8, 7], teamIds: [3] },
  { id: 23, name: 'REMY LEBEAU', alias: 'GAMBIT', description: 'Mutante con habilidad de cargar objetos con energía cinética.', gender: 'Masculino', powersIds: [5, 6], teamIds: [3] },
  { id: 24, name: 'LOGAN', alias: 'WOLVERINE', description: 'Mutante con garras de adamantium y factor de curación.', gender: 'Masculino', powersIds: [1, 5], teamIds: [3] },
  { id: 25, name: 'RAVEN DARKHÖLME', alias: 'MYSTIQUE', description: 'Mutante cambiaformas.', gender: 'Femenino', powersIds: [4, 5], teamIds: [3] },
  { id: 26, name: 'HANK MCCOY', alias: 'BEAST', description: 'Mutante con fuerza y agilidad sobrehumanas.', gender: 'Masculino', powersIds: [1, 6], teamIds: [3] },
  { id: 27, name: 'KARA ZOR-EL', alias: 'SUPERGIRL', description: 'Superheroína de Krypton, prima de Superman.', gender: 'Femenino', powersIds: [1, 3], teamIds: [2] },
  { id: 28, name: 'SELINA KYLE', alias: 'CATWOMAN', description: 'Ladrona experta con habilidades de sigilo y combate.', gender: 'Femenino', powersIds: [4, 2], teamIds: [2] },
  { id: 29, name: 'SLADE WILSON', alias: 'DEATHSTROKE', description: 'Asesino y mercenario con habilidades de combate avanzadas.', gender: 'Masculino', powersIds: [1, 4], teamIds: [3] },
  { id: 30, name: 'BILLY BATSON', alias: 'SHAZAM', description: 'Niño que se convierte en un poderoso héroe al decir "Shazam".', gender: 'Masculino', powersIds: [1, 3, 7], teamIds: [2] },
];

