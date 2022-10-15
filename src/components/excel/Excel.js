import { $ } from "../../core/dom";
import { Emitter } from "../../core/Emitter";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.componets = options.components || [];
    this.emitter = new Emitter();
  }
  getRoot() {
    const componentOptions = {
      emitter: this.emitter,
    };
    const $root = $.create("div", "excel");
    this.componets = this.componets.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el, componentOptions);
      if (component.name) {
        window["c" + component.name] = component;
      }
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }
  render() {
    this.$el.append(this.getRoot());
    this.componets.forEach((component) => component.init());
  }
  destroy() {
    this.componets.forEach((componet) => componet.destroy());
  }
}
