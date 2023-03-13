import { generateId } from "../Utils/generateId.js";


export class Note {
  constructor(data) {
    this.id = data.id || generateId()
    this.name = data.name
    this.color = data.color
    this.creationDate = data.creationDate ? new Date(data.creationDate) : new Date()
    this.savedDate = data.savedDate ? new Date(data.savedDate) : new Date()
    this.text = data.text ? data.text : ''
  }

  get ComputeDate() {
    let creationDate = this.creationDate
    return (creationDate.getMonth() + 1) + '/' + (creationDate.getDate()) + '/' + (creationDate.getFullYear() + ' ' + creationDate.getHours()) + ':' + (creationDate.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 }))
  }

  get ComputeSaveDate() {
    let savedDate = this.savedDate
    return (savedDate.getMonth() + 1) + '/' + (savedDate.getDate()) + '/' + (savedDate.getFullYear() + ' ' + savedDate.getHours()) + ':' + (savedDate.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 }))
  }

  get ListDate() {
    let listDate = this.creationDate
    return (listDate.getMonth() + 1) + '/' + (listDate.getDate()) + '/' + (listDate.getFullYear())
  }

  get ListTemplate() {
    return `
    <div class="row selectable" onclick="app.notesController.setActive('${this.id}')">
      <div class="col-2">
      <p style="color: ${this.color}"><i class="mdi mdi-circle"></i></p>
      </div>
      <div class="col-6">
        <p>${this.name}</p>
      </div>
      <div class="col-4">
        <p>${this.ListDate}</p>
      </div>
    </div>
    `
  }

  get ActiveTemplate() {
    return `
    <div class="card text-dark my-active-jot mx-3" id="active-template">
      <div class="row px-3 me-5">
        <div class="col-8">
          <h1><span style="color: ${this.color}"><i class="mdi mdi-circle"></i></span> ${this.name}</h1>
        </div>
        <div class="col-4 text-end">
        <button onclick="app.notesController.minimize()" class="btn btn-outline-primary m-2"
          title="Close this Jot"><i class="mdi mdi-minus"></i></button>
        <button onclick="app.notesController.saveNote()" class="btn btn-outline-success m-2" title="Save this Jot"><i class="mdi mdi-content-save"></i></button>
        <button onclick="app.notesController.delete()" class="btn btn-outline-danger m-2" title="Delete this Jot"><i class="mdi mdi-delete"></i></button>
        </div>
      </div>
      <textarea onblur="app.notesController.saveNote()" name="active-jot" id="active-jot" cols="30" rows="22" class="m-2">${this.text}</textarea>
      <div class="d-flex justify-content-between">
        <p>Date Created: ${this.ComputeDate}</p>
        <button class="btn btn-info" onclick="app.notesController.darkMode()"><i class="mdi mdi-weather-night"></i></button>
        <p>Last Save: ${this.ComputeSaveDate}</p>
      </div>
    </div>
  </div>
    `
  }

}