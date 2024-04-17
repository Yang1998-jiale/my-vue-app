<!--
 * @Author: yjl
 * @Date: 2023-07-10 14:54:06
 * @LastEditors: yjl
 * @Description: 描述
-->
<template>
  <div class="three_page_3D" ref="three3DRef"></div>
</template>
<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import bottomImg from "@/assets/images/1.jpg";
import topImg from "@/assets/images/2.jpg";
import rightImg from "@/assets/images/3.jpg";
import backImg from "@/assets/images/4.jpg";
import leftImg from "@/assets/images/5.jpg";
import frontImg from "@/assets/images/6.jpg";
import sceneImg from "@/assets/images/scene.jpg";
import positionImg from "@/assets/images/position.png";
import { number } from "echarts";
// let imgList = import.meta.glob("@/assets/images/*.jpg");

const hotPoints = [
  {
    position: {
      x: 0,
      y: 0,
      z: -0.2,
    },
    detail: {
      title: "信息点1",
    },
  },
  {
    position: {
      x: -0.2,
      y: -0.05,
      z: 0.2,
    },
    detail: {
      title: "信息点2",
    },
  },
];
let three3DRef: any = ref("");
let state: any = {
  renderer: null, //renderer对象
  camera: null,
  scene: null,
};
onMounted(() => {
  init();
});

function init() {
  let width = three3DRef.value.clientWidth;
  let height = three3DRef.value.clientHeight;
  // 创建场景对象
  state.scene = new THREE.Scene();
  // 创建摄像头对象
  state.camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 100);
  state.camera.position.set(2, 2, 0.1);
  //创建渲染对象
  state.renderer = new THREE.WebGLRenderer();
  //设置画布大小
  state.renderer.setSize(width, height);
  three3DRef.value.appendChild(state.renderer.domElement);

  const controls = new OrbitControls(state.camera, state.renderer.domElement);
  // let { mesh } = createMesh();
  // mesh.geometry.scale(1, 1, -1);
  // state.scene.add(mesh);
  let { sphere } = createSphereMesh();
  sphere.geometry.scale(1, 1, -1);
  state.scene.add(sphere);
  loop();
}

function createMesh() {
  let materials: any = [];
  let texture_left = new THREE.TextureLoader().load(leftImg);
  materials.push(new THREE.MeshBasicMaterial({ map: texture_left }));
  let texture_right = new THREE.TextureLoader().load(rightImg);
  materials.push(new THREE.MeshBasicMaterial({ map: texture_right }));
  let texture_top = new THREE.TextureLoader().load(topImg);
  materials.push(new THREE.MeshBasicMaterial({ map: texture_top }));
  let texture_bottom = new THREE.TextureLoader().load(bottomImg);
  materials.push(new THREE.MeshBasicMaterial({ map: texture_bottom }));
  let texture_front = new THREE.TextureLoader().load(frontImg);
  materials.push(new THREE.MeshBasicMaterial({ map: texture_front }));
  let texture_back = new THREE.TextureLoader().load(backImg);
  materials.push(new THREE.MeshBasicMaterial({ map: texture_back }));

  let mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials);
  return { mesh };
}

function createSphereMesh() {
  let sphereGeometry = new THREE.SphereGeometry(
    1 /**半径 */
    // 50 /**垂直节点数量 */,
    // 50 /**水平节点数量 */
  );
  let texture = new THREE.TextureLoader().load(sceneImg);
  let sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.material.wireframe = false;
  return { sphere };
}

function loop() {
  requestAnimationFrame(loop);
  if (state.renderer != null) {
    state.renderer.render(state.scene, state.camera);
  } else {
    init();
  }
}
interface numberType {
  arg: () => number;
}
function test<T>(arg: T): T {
  return arg;
}
test<numberType>({ arg: () => 10 });
</script>
<style scoped lang="less">
.three_page_3D {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
