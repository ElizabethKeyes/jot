import { appState } from "../AppState.js"
import { Note } from "../Models/Note.js"
import { saveState } from "../Utils/Store.js";


class NotesService {
  createNote(formData) {
    console.log('creating from the service');
    let newNote = new Note(formData)
    appState.notes.push(newNote)
    appState.emit('notes')
    saveState('notes', appState.notes)
    appState.emit('noteCount')
  }

  setActive(noteId) {
    let selectedNote = appState.notes.find(n => n.id == noteId)
    appState.activeNote = selectedNote
  }

  minimize() {
    appState.activeNote = null
  }

  saveNote(editedNote) {
    let activeNote = appState.activeNote
    activeNote.text = editedNote
    let noteInArray = appState.notes.find(n => n.id == activeNote.id)
    noteInArray.text = activeNote.text
    noteInArray.savedDate = new Date()
    appState.emit('activeNote')
    saveState('notes', appState.notes)
  }

  delete() {
    let remainingNotes = appState.notes.filter(n => n.id != appState.activeNote.id)
    appState.notes = remainingNotes
    appState.activeNote = null
    saveState('notes', appState.notes)
    appState.emit('noteCount')
  }

}

export const notesService = new NotesService()