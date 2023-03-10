import { appState } from "../AppState.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML, setText } from "../Utils/Writer.js";


function _drawNotes() {
  let template = ``
  appState.notes.forEach(n => template += n.ListTemplate)
  setHTML('notes-list', template)
}

function _drawActive() {
  if (appState.activeNote) {
    setHTML('active-note', appState.activeNote.ActiveTemplate)
  } else {
    setHTML('active-note', `<h1 class="text-center mt-5 pt-5"><i class="mdi mdi-lightbulb"></i>Have an idea? Jot it down!</h1>`)
  }
}


export class NotesController {
  constructor() {
    console.log('hello from NotesController');
    _drawNotes()
    appState.on(`activeNote`, _drawActive)
    appState.on(`notes`, _drawNotes)
  }

  setActive(noteId) {
    notesService.setActive(noteId)
  }

  createNote() {
    window.event.preventDefault()
    let form = window.event.target
    let formData = getFormData(form)
    notesService.createNote(formData)
  }

  minimize() {
    notesService.minimize()
  }

  saveNote() {
    let editedNote = document.getElementById('active-jot')
    // @ts-ignore
    notesService.saveNote(editedNote.value)
  }

  delete() {
    notesService.delete()
  }

}

