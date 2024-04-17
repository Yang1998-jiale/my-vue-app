/*
 * @Author: yjl
 * @Date: 2024-03-18 10:47:05
 * @LastEditors: yjl
 * @LastEditTime: 2024-03-18 14:48:06
 * @Description: 描述
 */

import { effect, track, trigger } from "./effect";
class ComputedRefImpl {
  private _value: any;
  private _dirty: boolean;
  private cbk: Function;
  constructor(fn) {
    this._dirty = true;
    this.cbk = fn;
    effect(
     fn,
      {
        lazy: false,
        scheduler: () => {
          if (!this._dirty) {
            this._dirty = true;
            trigger(this, "value");
          }
        },
      }
    );
  }
  get value() {
    track(this, "value");
    if (this._dirty) {
      this._dirty = false;
      this._value = this.cbk();
    }
    return this._value;
  }
}



function createComputedRef(fn: Function) {
  return new ComputedRefImpl(fn);
}
export function computed(fn: Function): any {
  return createComputedRef(fn);
}
