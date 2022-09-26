import { Element } from "./element";

export class Informer extends Element{
  show(message) {
    this._container.innerText = message;
    super.show();
  }
}
