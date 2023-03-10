import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"
import { Note } from "./Models/Note.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Note').Note[]} */
  notes = [
    new Note({
      name: 'HTML',
      color: '#1b9dc6',
    }),
    new Note({
      name: 'JavaScript',
      color: '#7670b4'
    })
  ]
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
