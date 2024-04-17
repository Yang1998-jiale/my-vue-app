/*
 * @Author: yjl
 * @Date: 2024-03-18 09:57:27
 * @LastEditors: yjl
 * @LastEditTime: 2024-03-18 10:50:01
 * @Description: 描述
 */
import { ref } from "./ref";
import { reactive } from "./reactive";
import { effect } from "./effect";
import { computed } from "./computed";

export const myReactive = reactive;
export const myRef = ref;
export const myEffect = effect;
export const myComputed= computed;
