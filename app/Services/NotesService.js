import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"
import { saveState } from "../Utils/Store.js";


class NotesService {
  createNote(formData) {
    let newNote = new Note(formData)
    appState.notes.push(newNote)
    appState.emit('notes')
    saveState('notes', appState.notes)
    appState.emit('noteCount')
    this.setActive(newNote.id)
  }

  setActive(noteId) {
    let selectedNote = appState.notes.find(n => n.id == noteId)
    appState.activeNote = selectedNote
    saveState('active-note', selectedNote)
  }

  minimize() {
    appState.activeNote = null
    saveState('active-note', appState.activeNote)

  }

  saveNote(editedNote) {
    let noteInArray = appState.notes.find(n => n.id == appState.activeNote.id)
    noteInArray.text = editedNote
    noteInArray.savedDate = new Date()
    appState.activeNote = noteInArray
    saveState('active-note', appState.activeNote)
    saveState('notes', appState.notes)
  }

  delete() {
    let remainingNotes = appState.notes.filter(n => n.id != appState.activeNote.id)
    appState.notes = remainingNotes
    appState.activeNote = null
    saveState('active-note', appState.activeNote)
    saveState('notes', appState.notes)
    appState.emit('noteCount')
  }

}

export const notesService = new NotesService()