import { generateId } from "../Utils/generateId.js";


export class Note {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.color = data.color
    this.creationDate = data.creationDate ? new Date(data.date) : new Date()
    this.savedDate = data.savedDate ? data.savedDate : new Date()
  }

  get ComputeDate() {
    let creationDate = this.creationDate
    return (creationDate.getMonth() + 1) + '/' + (creationDate.getDate()) + '/' + (creationDate.getFullYear())
  }

  get ListTemplate() {
    return `
    <div class="row selectable">
      <div class="col-2">
      <p style="color: ${this.color}"><i class="mdi mdi-circle"></i></p>
      </div>
      <div class="col-6">
        <p>${this.name}</p>
      </div>
      <div class="col-4">
        <p>${this.ComputeDate}</p>
      </div>
    </div>
    `
  }

  get ActiveTemplate() {
    return `
    <!-- <div class="card text-dark my-active-jot">
      <div class="row">
        <div class="col-8">
          <h1>🔷 Note Title</h1>
        </div>
        <div class="col 4 text-end">
          <button class="btn btn-outline-danger m-2" title="Delete this note"><i
              class="mdi mdi-delete"></i></button>
        </div>
      </div>
      <textarea name="active-jot" id="active-jot" cols="30" rows="20" class="m-2"></textarea>
      <div class="d-flex justify-content-between">
        <p>Date created: <span>3/8/2023</span></p>
        <p>Date modified: <span>3/10/2023</span></p>
      </div>
    </div>
  </div> -->
    `
  }

}