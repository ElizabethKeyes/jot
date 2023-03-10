import { appState } from "../AppState.js";
import { setHTML } from "../Utils/Writer.js";


export class NotesController {
  constructor() {
    console.log('hello from NotesController');
    _drawNotes()
  }
}

function _drawNotes() {
  let template = ``
  appState.notes.forEach(n => template += n.ListTemplate)
  setHTML('notes-list', template)
}