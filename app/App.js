import { NotesController } from "./Controllers/NotesController.js";


class App {
  notesController = new NotesController();
}

window["app"] = new App();
