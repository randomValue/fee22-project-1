import { createElement } from '../rective/create-element.js'

export const Content = () =>
  createElement(
    'article',
    { class: 'note-content' },
    createElement('h1', { class: 'note-title' }, 'Einkaufen'),
    createElement(
      'p',
      { class: 'note-text' },
      `Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die
        Blindtexte. Abgeschieden wohnen sie in Buchstabhausen an der Küste des Semantik, eines großen
        Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den
        nötigen Regelialien.`
    )
  )
