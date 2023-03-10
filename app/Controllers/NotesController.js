import { appState } from "../AppState.js";
import { notesService } from "../Services/NotesService.js";
import { setHTML } from "../Utils/Writer.js";


export class NotesController {
  constructor() {
    console.log('hello from NotesController');
    _drawNotes()
    appState.on(`activeNote`, _drawActive)
  }

  setActive(noteId) {
    notesService.setActive(noteId)
  }

}

function _drawNotes() {
  let template = ``
  appState.notes.forEach(n => template += n.ListTemplate)
  setHTML('notes-list', template)
}

function _drawActive() {
  setHTML('active-note', appState.activeNote.ActiveTemplate)
}