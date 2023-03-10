import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"


class NotesService {
  createNote(formData) {
    console.log('creating from the service');
    let newNote = new Note(formData)
    appState.notes.push(newNote)
    appState.emit('notes')
  }

  setActive(noteId) {
    let selectedNote = appState.notes.find(n => n.id == noteId)
    appState.activeNote = selectedNote
    console.log(appState.activeNote)
  }

  delete() {
    let remainingNotes = appState.notes.filter(n => n.id != appState.activeNote.id)
    appState.notes = remainingNotes
    appState.activeNote = null
  }

}

export const notesService = new NotesService()