<template>
  <footer id="footer">
    <p id="line1">IG3  -  音楽  -  2022</p>
    <p id="line2">By Guilhem Cros®</p>
    <div class="socials">
      <a href="https://www.linkedin.com/in/guilhem-cros-8a2b67171/" id="linkedin" target="_blank">
        <img class="socialLogo" src="../assets/linkedin.png" alt="linkedin_logo">
      </a>
      <a href="https://github.com/guilhem-cros" id="linkedin">
        <img class="socialLogo" src="../assets/github.png" alt="github_logo" target="_blank">
      </a>
    </div>
  </footer>
</template>

<style>
.socialLogo{
  width: 30px;
  margin-right : 10%;
}
footer{
  margin-top:auto; 
  background-color: #1B1B19;
  color : white;
  bottom : 0;
  height: 70px;
  padding-bottom: 10px;
  display: grid;
  width: 50%;
  padding-left: 25%;
  padding-right: 25%;
  grid-auto-columns: minmax(0, 1fr);
}
#line1{
  grid-column: 2;
}
#line2{
  grid-column: 2;
}
.socials{
  grid-column: 3;
}
footer>p{
  margin-bottom: 0;
  font-size: 15px;
}

@media screen and (max-width: 750px) {
  footer{
    padding-left: 10%;
    padding-right: 10%;
    width: 80%;
  }
}

@media screen and (max-width: 500px) {
  footer{
    padding-left: 0%;
    padding-right: 0%;
    width: 100%;
  }
}

</style>