<template >
  <div>
    <div name="fade" tag="div">
      <img class="sliding" :src="currImg" alt=""/>
    </div>
  </div>

</template>

<script>

//SlideShow

export default {
  name: "CoversSlideshow",
  data() {
    return {
      images: [ //path to the images in the slideShow
        require("../assets/covers/astroworld.jpg"),
        require("../assets/covers/damn.jpg"),
        require("../assets/covers/Vreel3.jpg"),
      ],
      currentIndex: 0, //index of the current image
      currImg : "", //path to the current img
    };
  },
  //launch the slideshow
  mounted: function() {
    this.startSlide();
  },
  methods: {
    //make change the path to the displayed image every 5 secs
    async startSlide() {
      this.currImg = this.currentImg;
      if(this.currentIndex>=2){
        this.currentIndex = 0
      }
      else{ this.currentIndex++; }
      await this.sleep(5000);
      this.startSlide();
    },
    //make the program wait a certain time of ms
    sleep : function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  computed: {
    currentImg: function() {
      return this.images[this.currentIndex]; //currently displayed image
    }
  }
}
</script>

<style>

.sliding {
  width: 250px;
  padding: 1%;
  background-color: #FFE469;
}

</style>