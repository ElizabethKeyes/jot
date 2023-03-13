import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"
import { Note } from "./Models/Note.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Note').Note[]} */
  notes = loadState('notes', [Note])
  // #region hard coded notes
  // notes = [
  //   new Note({
  //     name: 'HTML',
  //     color: '#1b9dc6',
  //   }),
  //   new Note({
  //     name: 'JavaScript',
  //     color: '#7670b4'
  //   })
  // ]
  // #endregion

  /** @type {import('./Models/Note').Note|null} */
  activeNote = loadState('active-note', Note) || null

  noteCount = 0
}


export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
