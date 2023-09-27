<script setup>
import { Image } from "../api/overviewer";
import { onMounted, onUnmounted, ref, reactive, onUpdated } from "vue";

const timer = ref();
const data = reactive({
  images: [],
  msg: "",
  index:1
});

function GetImage() {
  data.index = data.index + 1;
  console.log("开始输出data.index")
  console.log(data.index)
  Image()
    .then((result) => {
      for (var i = 0; i < result.images.length; i++) {
        data.images.push("data:image/png;base64," + result.images[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  GetImage();
    timer.value = setInterval(() => {
    GetImage();
    if(data.index == 24){
      clearInterval(timer.value);
      timer.value = "";
    }
  }, 5000);
});

onUpdated(() =>{
  if(data.index == 3){
    clearInterval(timer.value);
    timer.value = "";
  }
});

onUnmounted(() => {
  clearInterval(timer.value);
  timer.value = "";
});
</script>

<template>
      <div class="mydiv" >
        <a-carousel arrows autoplay>
          <template #prevArrow>
            <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
              <left-circle-outlined />
            </div>
          </template>

          <div
            v-for="(image, index) in data.images"
            :key="index"
            class="divImg"
          >
            <img :src="image" class="img" />
          </div>
          <!-- <template #customPaging="props">
      <a>
        <img :src="getImgUrl(props.i)" />
      </a>
    </template> -->

          <template #nextArrow>
            <div class="custom-slick-arrow" style="right: 10px">
              <right-circle-outlined />
            </div>
          </template>
          <!-- <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div> -->
        </a-carousel>
        <h3 class="title">pcb缺陷检测图</h3>
      </div>
  <!-- <div>
    <ul>
      <li v-for="(image,index) in data.images" :key="index">
        <img :src="image" class="img">
      </li>
    </ul>
  </div> -->
</template>


<style scoped>
.title {
  margin-top: 10px;
  color: white;
  font-size: 30px;
  text-align: center;
  letter-spacing: 0;
  text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
    0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
    0px 8px 7px #001135;
}
/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 400px;
  line-height: 400px;
  overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: flexbox;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
.mydiv {
  widows: 200px;
  height: 500px;
  font-size: 100%;
  text-align: center;
  color: red;
  margin-top: 50px;
}
.divImg {
  text-align: center;
  margin-left: 100px;
}
.img {
  width: 400px;
  height: 400px;
}


</style>
