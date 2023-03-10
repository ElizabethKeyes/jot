import { appState } from "../AppState.js"


class NotesService {
  setActive(noteId) {
    let selectedNote = appState.notes.find(n => n.id == noteId)
    appState.activeNote = selectedNote
    console.log(appState.activeNote)
  }


}

export const notesService = new NotesService()