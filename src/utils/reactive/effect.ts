/*
 * @Author: yjl
 * @Date: 2024-03-15 16:59:44
 * @LastEditors: yjl
 * @LastEditTime: 2024-03-18 14:45:56
 * @Description: 描述
 */
interface EffectFn<T = any> {
  scheduler: any;
  (): T;
}
//模拟effect执行的作用栈集合
const effectStack: EffectFn<any>[] = [];

export function effect(fn: () => any, option?: any): EffectFn {
  const effectFn: EffectFn = function () {
    //判断当前要执行的副作用函数是否在在effect栈中
    if (!effectStack.includes(effectFn)) {
      // 如果不在,添加到effectStack中
      effectStack.push(effectFn);
      let res = fn();
      //执行完推出栈
      effectStack.pop();
      return res;
    }
  };

  //是否延迟执行
  if (!option?.lazy) {
    effectFn();
  }
  effectFn.scheduler = option?.scheduler;
  return effectFn;
}

//获取effectStack堆顶的effectFn
function getCurrentEffect() {
  if ((effectStack as any)?.at) {
    return (effectStack as any).at(-1);
  }
  return effectStack[effectStack.length - 1];
}

const targetMap = new WeakMap();

export type ObjKeyType = any;

export function track(target, key: ObjKeyType) {
  if (effectStack.length === 0) return;

  if (!targetMap.has(target)) {
    targetMap.set(target, new Map());
  }

  if (!targetMap.get(target)?.has(key)) {
    targetMap.get(target).set(key, new Set<EffectFn>());
  }
  targetMap.get(target).get(key).add(getCurrentEffect());
}

export function trigger(target: any, key: ObjKeyType) {
  if (targetMap.get(target)?.has(key)) {
    targetMap
      .get(target)
      ?.get(key)
      .forEach((efn: EffectFn) => {
        if (efn.scheduler) {
          efn.scheduler();
        } else {
          efn();
        }
      });
  }
}
