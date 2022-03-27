<template>
  <div class="home">
    <covers-slideshow-vue id="homeSlide"/>
    <h1>Our trends</h1>
    <div class="trendsBox">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/hPdnhft_z9g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trends"></iframe>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/9xht4JIOfjU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trends"></iframe>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/G9BwHA13jJc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trends"></iframe>
    </div>

  </div>
</template>

<script>
import CoversSlideshowVue from "@/components/CoversSlideshow.vue"


export default {
  name: 'HomeView',
  components: { CoversSlideshowVue

  }
}
</script>

<style>
#homeSlide{
  margin-top: 2%;
}

.trendsBox{
  align-items: center;
  display: flex;
  flex-direction: column;
  margin : auto;
}

.trends{
  margin-bottom: 2%;
}

@media screen and (max-width: 650px){
  .trends{
    width: 426px;
    height: 240px;
  }
}

@media screen and (max-width: 450px){
    .trends{
    width: 260px;
    height: 140px;
    margin-bottom: 5%;
  }
}

</style>
