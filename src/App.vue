<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import header_vue from "./components/header.vue";
import overviewer from "./components/overviewer.vue";
import monitor from "./components/monitor_viewer.vue";
import top_viewer from "./components/top_viewer.vue";
import times_data_viewer from "./components/times_data_viewer.vue";
import trend_viewer from "./components/trend_viewer.vue";
import distribute_viewer from "./components/distribute_viewer.vue";
import statistics_viewer from "./components/statistics_viewer.vue";
import middle_viewer from "./components/middle_viewer.vue";

</script>

<template>
  <div>
    <a-layout>
      <a-layout-header>
        <header_vue />
      </a-layout-header>
      <a-layout-content>
        <a-row>
          <a-col :span="7">
            <overviewer />
            <statistics_viewer />
            <monitor />
          </a-col>
          <a-col :span="10">
            <middle_viewer />
          </a-col>
          <a-col :span="6">
            <times_data_viewer />
            <trend_viewer />
            <distribute_viewer />
            <top_viewer />
          </a-col>
        </a-row>

      </a-layout-content>
    </a-layout>
  </div>
</template>

<style>
#app {
  height: 100%;
  font-size: 0.9rem;
  background-color: #101129;
}
.ant-layout {
  width: 100%;
  min-height: 100%;
  line-height: 1.15;
  font-size: 0.5rem;
  margin: 0;
  background-repeat: no-repeat;
  background-position: 0 0 / cover;
}
.ant-layout-header {
  width: 100%;
  height: auto;
}

.ant-layout-content {
  background-color: #101129;
  height: auto;
}

.left-side {
    width: 240px;
    position: absolute;
    top: 0;
    left: 0;
}

.sticky-left-side {
    position: fixed;
    height: 100%;
    overflow-y: auto;
    z-index: 100;
}


.sticky-left-side .custom-nav {
    margin-top: 50px;
}

.left-side-collapsed .sticky-left-side {
    overflow-y: visible;
}

.logo {
    padding-top: 5px;
    height: 50px;
}

.logo a {
    font-size: 28px;
    color: #fff;
    margin: 0 0 0 20px;
    text-decoration: none;
    display: inline-block;
}

.logo-icon {
    display: none;
}

.left-side-collapsed .logo-icon {
    height: 45px;
    margin-top: -48px;
    display: block !important;
}

.left-side-inner {
    padding: 0px;
    margin-bottom: 50px;
}

.left-side .searchform {
    display: none;
}

.left-side .searchform::after {
    content: '';
    display: block;
    clear: both;
}

.left-side .searchform input {
    padding: 10px;
    width: 90%;
    margin: 0 0 20px 12px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    border: none;
}

.left-side .logged-user {
    padding: 0 0 15px 12px;
    margin: 0 0 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: none;
}

.left-side .logged-user .media-object {
    width: 45px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    float: left;
}

.left-side .logged-user .media-body {
    margin-left: 60px;
    color: #d7d7d7;
}

.left-side .logged-user .media-body h4 {
    font-size: 15px;
    margin: 5px 0 0 0;
}

.left-side .logged-user .media-body h4 a {
    color: #fff;
}

.left-side .logged-user .media-body span {
    font-style: italic;
    font-size: 11px;
    opacity: 0.5;
}

.custom-nav {
    margin-bottom: 10px;
}

.custom-nav > li > a {
    color: #fff;
    padding: 12px 20px;
    border-radius: 0;
    -webkit-border-radius: 0;
}

.custom-nav > li > a:hover,
.custom-nav > li > a:active {
    background-color: #353f4f;
    color: #65cea7;
    border-radius: 0;
    -webkit-border-radius: 0;
}

.custom-nav > li.menu-list > a {
    background: transparent url(../images/plus-white.png) no-repeat 93% center;
}

.custom-nav > li.menu-list > a:hover {
    background-color: #353f4f;
    background-image: url(../images/plus.png);
}

.custom-nav > li.nav-active > a {
    background-color: #353f4f;
    background-image: url(../images/minus.png);
    color: #65cea7;
}

.custom-nav > li.nav-active > ul{
    display: block;
}

.custom-nav > li.nav-active > a:hover {
    background-image: url(../images/minus.png);
}

.custom-nav > li.active > a,
.custom-nav > li.active > a:hover,
.custom-nav > li.active > a:focus {
    background-color: #353f4f;
    color: #65cea7;
}


.custom-nav > li.menu-list.active > a {
    background-image: url(../images/plus.png);
}

.custom-nav > li.nav-active.active > a {
    background-image: url(../images/minus.png);
}

.custom-nav > li.nav-active.active > a:hover {
    background-image: url(../images/minus.png);
}

.custom-nav li .fa {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 10px;
    width: 16px;
    text-align: center;
}

/* .custom-nav .sub-menu-list {
    list-style: none;
    display: none;
    margin: 0;
    padding: 0;
    background: #353f4f;
} */


.custom-nav .sub-menu-list > li > a {
    color: #fff;
    font-size: 13px;
    display: block;
    padding: 10px 5px 10px 50px;
    -moz-transition: all 0.2s ease-out 0s;
    -webkit-transition: all 0.2s ease-out 0s;
    transition: all 0.2s ease-out 0s;
}

.custom-nav .sub-menu-list > li > a:hover,
.custom-nav .sub-menu-list > li > a:active,
.custom-nav .sub-menu-list > li > a:focus {
    text-decoration: none;
    color: #65cea7;
    background: #2a323f;
}

.custom-nav .sub-menu-list > li .fa {
    font-size: 12px;
    opacity: 0.5;
    margin-right: 5px;
    text-align: left;
    width: auto;
    vertical-align: baseline;
}

.custom-nav .sub-menu-list > li.active > a {
    color: #65CEA7;
    background-color: #2A323F;
}

.custom-nav .sub-menu-list ul {
    margin-left: 12px;
    border: 0;
}

.custom-nav .menu-list.active ul {
    display: block;
}



/*------------------------------------------
            LEFT SIDE COLLAPSE
-------------------------------------------*/

.left-side-collapsed .logo {
    display: none;
}

.left-side-collapsed .header-section {
    margin-left: 0px;
}

.left-side-collapsed .left-side {
    width: 52px;
    top: 52px;
}

.left-side-collapsed .left-side-inner {
    padding: 0;
}

h5.left-nav-title {
    margin-left: 10px;
    color: #fff;
}

.left-side-collapsed .custom-nav {
    margin: 2px 0 20px 0;
}

.left-side-collapsed .custom-nav li a {
    text-align: center;
    padding: 10px;
    position: relative;
}

.left-side-collapsed .custom-nav > li.menu-list > a {
    background-image: none;
}

.left-side-collapsed .custom-nav li a span {
    position: absolute;
    background: #65CEA7;
    padding: 10px;
    left: 52px;
    top: 0;
    min-width: 173px;
    text-align: left;
    z-index: 100;
    display: none;
}

.left-side-collapsed .custom-nav li a span:after {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(0, 0, 0, 0);
    border-right-color: #65CEA7;
    border-width: 6px;
    margin-top: -6px;
}

.left-side-collapsed .custom-nav li.active a span {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
}

.left-side-collapsed .custom-nav ul,
.left-side-collapsed .custom-nav .menu-list.nav-active ul {
    display: none;
}

.left-side-collapsed .custom-nav .menu-list.nav-hover ul {
    display: block;
}

.left-side-collapsed .custom-nav > li.nav-hover > a,
.left-side-collapsed .custom-nav > li.nav-hover.active > a {
    background: #fff;
    color: #424F63;
}

.left-side-collapsed .custom-nav li.nav-hover a span {
    display: block;
    color: #fff;
}

.left-side-collapsed .custom-nav li.nav-hover.active a span {
    background: #65CEA7;
    color: #fff;
}

.left-side-collapsed .custom-nav li.nav-hover ul {
    display: block;
    position: absolute;
    top: 40px;
    left: 53px;
    margin: 0;
    min-width: 172px;
    background: #353F4F;
    z-index: 100;
    -moz-border-radius: 0 0 2px 0;
    -webkit-border-radius: 0 0 2px 0;
    border-radius: 0 0 2px 0;
}

.left-side-collapsed .custom-nav ul a {
    text-align: left;
    padding: 6px 10px;
    padding-left: 10px;
}

.left-side-collapsed .custom-nav ul a:hover {
    background: #2A323F;
}

.left-side-collapsed .custom-nav li a i {
    margin-right: 0;
}

.left-side-collapsed .main-content {
    margin-left: 52px;
}


.left-side-collapsed .left-side{
    overflow: visible !important;
}
</style>
