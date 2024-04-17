import { track, trigger } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  constructor(value) {
    if (Object.prototype.toString.call(value) === "[object Object]") {
      this._value = reactive(value);
    } else {
      this._value = value;
    }
  }
  get value() {
    track(this, "value");
    return this._value;
  }

  set value(v) {
    if (Object.prototype.toString.call(v) === "[object Object]") {
      this._value = reactive(v);
    }
    trigger(this, "value");
  }
}

function createRef(value) {
  return new RefImpl(value);
}

export function ref(value: any) {
  return createRef(value);
}

// const createApp = (...args) => {
//   const app = ensureRenderer().createApp(...args); //使用ensureRenderer函数的createAPP方法创建APP
//   {
//     injectNativeTagCheck(app);
//     injectCompilerOptionsCheck(app);
//   }
//   const { mount } = app;
//
//   app.mount = (containerOrSelector) => {//重写app的mount方法
//     const container = normalizeContainer(containerOrSelector);
//     if (!container) return;
//     const component = app._component;
//     if (!isFunction(component) && !component.render && !component.template) {
//       component.template = container.innerHTML;
//     }
//     container.innerHTML = "";
//     const proxy = mount(container, false, resolveRootNamespace(container));
//     if (container instanceof Element) {
//       container.removeAttribute("v-cloak");
//       container.setAttribute("data-v-app", "");
//     }
//     return proxy;
//   };
//   return app;
// };

// function normalizeContainer(container) {
//   if (isString(container)) {//传递的参数为要绑定的dom 可以是dom本身 也可以是dom的类名/ID选择器等
//     const res = document.querySelector(container);
//     if (!res) {
//       warn(
//         `Failed to mount app: mount target selector "${container}" returned null.`
//       );
//     }
//     return res;
//   }
//   if (
//     window.ShadowRoot &&
//     container instanceof window.ShadowRoot &&
//     container.mode === "closed"
//   ) {
//     warn(
//       `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
//     );
//   }
//   return container;
// }
