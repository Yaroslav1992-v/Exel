import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.prepare();
  }
  prepare() {}
  toHTML() {
    return "";
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
