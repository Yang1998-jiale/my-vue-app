<!--
 * @Author: yjl
 * @Date: 2023-02-26 13:33:09
 * @LastEditors: yjl
 * @Description: 描述
-->
<script setup lang="ts">
import { ref, onMounted, nextTick, reactive } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
const state = reactive<any>({
  files: [],
  filesPath: [],
  a: 0,
});
onMounted(() => {
  nextTick(() => {
    document.addEventListener("dragover", function (e) {
      e.preventDefault();
      return false;
    });
    document.addEventListener("drop", function (e) {
      e.preventDefault();
      return false;
    });
  });
});
function dropFun(e: any) {
  state.files = [];
  state.filesPath = [];
  const items = e.dataTransfer.items;
  console.log(items);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.kind == "file") {
      let entry = item.webkitGetAsEntry();
      if (!entry.isDirectory) {
        count.value++;
        entry.file(
          (file: any) => {
            file.filePath = entry.fullPath.slice(1);
            state.files.push(file);
          },
          (err: any) => {
            console.log(1, err);
          }
        );
      } else {
        getCount(entry);
        setTimeout(() => {
          getFilesFromEntry(entry);
          //   console.log(files);
          // entry.childen = [];
        }, 300);
      }
      state.filesPath.push(entry);
      //递归解析文件夹
    }
  }
  formatFun(state.filesPath);
  nextTick(() => {
    console.log(state.filesPath);
  });
}
function getCount(entry: any) {
  if (entry.isFile) {
    entry.file(
      (file: any) => {
        count.value++;
      },
      (err: any) => {
        console.log(err);
      }
    );
  } else {
    const entryReader = entry.createReader();
    entryReader.readEntries(
      (results: any) => {
        results.forEach((result: any) => {
          getCount(result);
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
function getFilesFromEntry(entry: any) {
  if (entry.isFile) {
    entry.file(
      (file: any) => {
        file.filePath = entry.fullPath.slice(1);
        state.files.push(file);
        if (state.files.length == count.value) {
          // console.log(state.files);
        }
      },
      (err: any) => {
        console.log(1, err);
      }
    );
  } else {
    const entryReader = entry.createReader();
    entryReader.readEntries(
      (results: any) => {
        results.forEach((result: any) => {
          getFilesFromEntry(result);
        });
      },
      (error: any) => {
        console.log(2, error);
      }
    );
  }
}
async function formatFun(arr) {
  arr.forEach(async (entry) => {
    if (entry.isDirectory && !entry.isFile) {
      const entryReader = entry.createReader();
      await entryReader.readEntries(
        async (results: any) => {
          entry.childen = [...results];
          await formatFun(results);
        },
        (error: any) => {
          console.log(2, error);
        }
      );
    }
  });
}
</script>

<template>
  <div id="drop" @drop="dropFun">
    <input type="file" id="file_input" name="folder" webkitdirectory />
  </div>
</template>

<style scoped>
#drop {
  width: 500px;
  height: 500px;
  border: 1px solid black;
  float: left;
}
</style>
