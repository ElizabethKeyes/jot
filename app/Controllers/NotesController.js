import { appState } from "../AppState.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
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

function _drawNoteCount() {
  let noteCount = appState.notes.length
  setText('note-count', noteCount)
  console.log('draw note count', noteCount);
}


export class NotesController {
  constructor() {
    console.log('hello from NotesController');
    _drawNotes()
    _drawNoteCount()
    appState.on('activeNote', _drawActive)
    appState.on('notes', _drawNotes)
    appState.on('noteCount', _drawNoteCount)
  }

  setActive(noteId) {
    notesService.setActive(noteId)
  }

  createNote() {
    window.event.preventDefault()
    let form = window.event.target
    let formData = getFormData(form)
    notesService.createNote(formData)
    // @ts-ignore
    form.reset()
  }

  minimize() {
    notesService.minimize()
  }

  saveNote() {
    let editedNote = document.getElementById('active-jot')
    // @ts-ignore
    notesService.saveNote(editedNote.value)
  }

  async delete() {
    if (await Pop.confirm("Are you sure you'd like to delete this note?")) {
      notesService.delete()
    }
  }

}

