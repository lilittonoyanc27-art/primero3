import { ElementDefinition } from './types.ts';

export const ELEMENTS_THEORY: ElementDefinition[] = [
  {
    id: 'emisor',
    nameEs: 'Emisor',
    nameHy: 'Հաղորդող',
    descEs: 'Quien envía el mensaje.',
    descHy: 'Ով ուղարկում է հաղորդագրությունը։',
    exampleEs: 'La profesora explica, María habla, el árbitro pita.',
    exampleHy: 'Ուսուցչուհին բացատրում է, Մարիան խոսում է, մրցավարը սուլում է։',
    roleHint: '¿Quién habla, escribe o emite la señal?'
  },
  {
    id: 'receptor',
    nameEs: 'Receptor',
    nameHy: 'Ընդունող',
    descEs: 'Quien recibe y descifra el mensaje.',
    descHy: 'Ով ստանում և ընկալում է հաղորդագրությունը։',
    exampleEs: 'Los alumnos que escuchan, Pablo que lee el WhatsApp, los conductores que ven la señal.',
    exampleHy: 'Լսող աշակերտները, հաղորդագրություն կարդացող Պաբլոն, ցուցանակը տեսնող վարորդները։',
    roleHint: '¿Quién recibe o lee la información?'
  },
  {
    id: 'mensaje',
    nameEs: 'Mensaje',
    nameHy: 'Հաղորդագրություն',
    descEs: 'Lo que se comunica: la información transmitida.',
    descHy: 'Այն բովանդակությունը կամ տեղեկությունը, ինչ փոխանցվում է։',
    exampleEs: '«Mañana hay examen», «Llegaré a las cinco», «Prohibido el paso».',
    exampleHy: '«Վաղը քննություն կա», «Կգամ ժամը 5-ին», «Մուտքն արգելված է»։',
    roleHint: '¿Qué dice o qué comunica exactamente?'
  },
  {
    id: 'canal',
    nameEs: 'Canal',
    nameHy: 'Հաղորդման միջոց / ալիք',
    descEs: 'Medio físico o soporte por el que viaja el mensaje.',
    descHy: 'Ֆիզիկական միջոցը, որի միջոցով տարածվում/փոխանցվում է հաղորդագրությունը։',
    exampleEs: 'El aire y la voz (canal oral), papel / pizarra / cartel (canal escrito), teléfono, WhatsApp, altavoces.',
    exampleHy: 'Օդը և ձայնը (բանավոր), գրատախտակը/ցուցանակը (գրավոր), հեռախոսը, բարձրախոսը։',
    roleHint: '¿Por qué medio o soporte físico viaja?'
  },
  {
    id: 'codigo',
    nameEs: 'Código',
    nameHy: 'Կոդ / Նշանների համակարգ',
    descEs: 'Sistema de signos y reglas utilizado para construir el mensaje.',
    descHy: 'Օգտագործվող նշանների, լեզվի կամ կանոնների համակարգը։',
    exampleEs: 'Idioma español, armenio, lengua de signos, señales de tráfico, código morse, gestos.',
    exampleHy: 'Իսպաներեն լեզուն, հայերենը, ժեստերի լեզուն, ճանապարհային նշանները, ժեստերը։',
    roleHint: '¿Qué idioma o sistema de signos se usa?'
  },
  {
    id: 'contexto',
    nameEs: 'Contexto o situación',
    nameHy: 'Հաղորդակցական իրավիճակ / համատեքստ',
    descEs: 'Circunstancias de tiempo, lugar y relación en las que ocurre la comunicación.',
    descHy: 'Հանգամանքները, ժամանակը, վայրը և իրադրությունը, որտեղ տեղի է ունենում հաղորդակցությունը։',
    exampleEs: 'Una clase de Lengua en el instituto, un partido de fútbol, una consulta médica, una biblioteca.',
    exampleHy: 'Իսպաներենի դասը դպրոցում, ֆուտբոլային հանդիպումը, բժշկի ընդունարանը, գրադարանը։',
    roleHint: '¿Dónde y en qué circunstancias ocurre?'
  }
];

export const EXAM_FORMULA = {
  titleEs: 'Fórmula para responder en el examen',
  titleHy: 'Քննության ժամանակ պատասխանելու ձև',
  tipEs: 'En 1º ESO (7º grado), los profesores esperan una respuesta completa y bien redactada:',
  tipHy: '7-րդ դասարանում (1º ESO) ուսուցիչները պահանջում են ամբողջական հիմնավորված պատասխան․',
  exampleEs: 'El emisor es la profesora porque es quien envía el mensaje. El receptor son los alumnos. El mensaje es “Mañana hay examen”. El canal es la voz, el código es el español y el contexto es una clase.',
  exampleHy: 'Հաղորդողը ուսուցչուհին է, որովհետև նա է հաղորդագրությունը փոխանցում։ Ընդունողները աշակերտներն են։ Հաղորդագրությունն է՝ «Վաղը քննություն կա»։ Հաղորդման միջոցը ձայնն է, կոդը՝ իսպաներենը, իսկ իրավիճակը՝ դասը։'
};
