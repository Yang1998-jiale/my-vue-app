<!--
 * @Author: yjl
 * @Date: 2023-07-07 15:51:26
 * @LastEditors: yjl
 * @Description: 描述
-->
<template>
  <div class="three_page" ref="threeBoxRef"></div>
</template>
<script lang="ts" setup>
import * as THREE from "three";
import { reactive, onMounted, ref } from "vue";
let threeBoxRef: any = ref("");
let state = reactive<any>({
  renderer: null,
});
function init(options) {
  state.renderer = new THREE.WebGLRenderer(); //创建render对象
  state.renderer.setSize(options.width, options.height); //设置画布大小
  // const { scene, mesh } = createScene();
  const { scene, line } = createSceneLine();
  const { camera } = createCamera();
  state.renderer.render(scene, camera);
  threeBoxRef.value.appendChild(state.renderer.domElement);
  function animate() {
    window.requestAnimationFrame(animate);

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;

    state.renderer.render(scene, camera);
  }
  animate();
}

/**
 * 创建三维场景对象scene
 */
function createScene() {
  //创建三维场景scene
  const scene = new THREE.Scene();
  //创建长方体
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  //创建材质对象
  const material = new THREE.MeshBasicMaterial({
    color: "red",
    clearColor: "#fff",
  });
  //创建网格模型
  const mesh: any = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 10, 0);

  scene.add(mesh);
  return { scene, mesh };
}

function createCamera(mesh: any = undefined) {
  const camera: any = new THREE.PerspectiveCamera();
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);
  if (mesh) {
    camera.lookAt(mesh.position);
  }
  return { camera };
}
onMounted(() => {
  init({ width: 500, height: 500 });
});

function createSceneLine() {
  //创建三维场景scene
  const scene = new THREE.Scene();
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const points: any = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, material);
  scene.add(line);
  return { scene, line };
}

</script>
<style scoped lang="less">
.three_page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
