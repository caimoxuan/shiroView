<template>
    <div id="wrapper">
      <div class="overlay"></div>

      <!-- Sidebar -->
      <nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">
        <ul class="nav sidebar-nav">
          <li class="sidebar-brand">
            <a href="#">
              Bootstrap 3
            </a>
          </li>
          <li>
            <router-link to="/"><a href="#"><i class="fa fa-fw fa-home"></i> Home</a></router-link>
          </li>
          <li>
            <router-link to="/fileController"><a href="#"><i class="fa fa-fw fa-tint"></i> Page one</a></router-link>
          </li>
          <li>
            <router-link to="/homePage"><a href="#"><i class="fa fa-fw fa-file-o"></i> Second page</a></router-link>
          </li>
          <li>
            <a href="#"><i class="fa fa-fw fa-cog"></i> Third page</a>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-fw fa-plus"></i> Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li><a href="#">Separated link</a></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
          <li class = "active">
            <a href="#"><i class="fa fa-fw fa-bank"></i> Page four</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-fw fa-dropbox"></i> Page 5</a>
          </li>
          <li>
            <a href="#"><i class="fa fa-fw fa-twitter"></i> Last page</a>
          </li>
        </ul>
      </nav>
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <button type="button" class="hamburger is-closed animated fadeInLeft" data-toggle="offcanvas">
          <span class="hamb-top"></span>
          <span class="hamb-middle"></span>
          <span class="hamb-bottom"></span>
        </button>
      </div>
      <div class="content">
        <transition name="move" mode="out-in"><router-view></router-view></transition>
      </div>
    </div>
</template>

<script type="text/javascript" src="../../static/js/menu.js"></script>

<style>
  @import "../../static/css/style.css";
</style>
