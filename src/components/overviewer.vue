<script setup>
import { Overviewer } from "../api/overviewer";
import { onMounted, onUnmounted, ref, reactive } from "vue";

const timer = ref();
const viewer = reactive({
  production_line: 0,
  cameras: 0,
  pcbs: 0,
  defects: 0,
});

function GetOverviewer() {
  Overviewer()
    .then((result) => {
      viewer.production_line = result.message.production_line;
      viewer.cameras = result.message.cameras;
      viewer.pcbs = result.message.pcbs;
      viewer.defects = result.message.defects;
      viewer.msg = result.msg;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  GetOverviewer();
  timer.value = setInterval(() => {
    GetOverviewer();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = "";
});
</script>

<template>
  <div class="column">
    <div class="overview panel">
      <div class="inner">
        <div class="item">
          <h4>{{ viewer.production_line }}</h4>
          <span>
            <i class="icon-dot" style="color: #006cff"></i>
            产线总数
          </span>
        </div>
        <div class="item">
          <h4>{{ viewer.cameras }}</h4>
          <span>
            <i class="icon-dot" style="color: #6acca3"></i>
            相机数量
          </span>
        </div>
        <div class="item">
          <h4>{{ viewer.pcbs }}</h4>
          <span>
            <i class="icon-dot" style="color: #6acca3"></i>
            PCB板总数
          </span>
        </div>
        <div class="item">
          <h4>{{ viewer.defects }}</h4>
          <span>
            <i class="icon-dot" style="color: #ed3f35"></i>
            异常板数量
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
