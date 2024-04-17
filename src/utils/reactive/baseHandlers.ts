/*
 * @Author: yjl
 * @Date: 2024-03-15 16:51:13
 * @LastEditors: yjl
 * @LastEditTime: 2024-03-18 10:04:39
 * @Description: 描述
 */
import {  track, trigger } from "./effect";
import { reactive } from "./reactive";

function get(target, key, receiver): any {
  track(target, key);
  let res = Reflect.get(target, key);
  if (Object.prototype.toString.call(res) == "[object Object]") {
    reactive(res);
  }
  return res;
}

function set(target, key, value): any {
  const res = Reflect.set(target, key, value);
  trigger(target, key);
  return res;
}

function deleteProperty(target, key): any {}

function has(target, key): any {}

export const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
};
