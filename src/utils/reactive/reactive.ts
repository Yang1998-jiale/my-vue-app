/*
 * @Author: yjl
 * @Date: 2024-03-15 16:41:02
 * @LastEditors: yjl
 * @LastEditTime: 2024-03-15 16:51:43
 * @Description: 描述
 */
import { mutableHandlers } from "./baseHandlers";

export function reactive(target: Object) {
  if (typeof target !== "object") {
    return target;
  }
  return new Proxy(target, mutableHandlers);
}
