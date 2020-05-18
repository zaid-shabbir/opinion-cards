<template>
  <div class="container">
    <div class="inner-container">
      <div class="first-line">
        <div class="block">
          <i class="fas fa-user-circle fa-3x icon"></i>
          <div class="name-date-block">
            <span class="name">{{ username }}</span>
            <span class="date">{{ dateToDisplay }}</span>
          </div>
        </div>

        <div class="rating-block">
          <span class="rate">
            {{ rating }}/5&nbsp;
            <i class="far fa-star star"></i>
          </span>
        </div>
      </div>
      <hr />
      <div class="second-line">
        <div class="difficulty">
          <i class="fas fa-signal icon"></i>
          <span>{{ difficulty }}</span>
        </div>
        <div class="cost">
          <i class="fas fa-euro-sign icon"></i>
          <span>{{ cost }}</span>
        </div>
      </div>
      <hr />
      <div class="content">
        <p v-if="!more" class="text">{{ commentary.slice(0, 135) }}...</p>
        <p v-if="more" class="text">{{ commentary }}</p>
        <div v-if="!more" class="see-more" @click="see_more">See more</div>
        <span v-if="more" class="see-more" @click="see_less">See less</span>
      </div>

      <div class="footer">
        <div class="images">
          <img
            :src="pictures[0]"
            alt="images"
            @click="
              openModal();
              currentSlide(1);
            "
            class="hover-shadow cursor image"
          />
        </div>
        <div id="myModal" class="modal" @click="exit">
          <span class="close cursor" @click="closeModal">&times;</span>
          <div class="modal-content">
            <div v-for="(picture, index) in pictures" :key="index">
              <div class="mySlides">
                <div class="numbertext">{{ index + 1 }} / 3</div>
                <img class="moda-img" :src="picture" />
              </div>
            </div>
            <a class="prev" @click="plusSlides(-1)">&#10094;</a>
            <a class="next" @click="plusSlides(1)">&#10095;</a>
          </div>
        </div>

        <div>
          <button class="btn tooltip">
            Useful
            <span v-if="isUseful" class="tooltiptext use-ful"> Yes </span>
            <span v-else class="tooltiptext use-ful"> No</span>
          </button>
          <button class="btn tooltip">
            Tip
            <span class="tooltiptext">{{ tip }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// import axios from "axios";

export default {
  name: "SeeOpinion",
  props: {
    username: {
      type: String,
      default: "User Name"
    },
    date: {
      type: String,
      default: "2018-04-23T10:26:00.996Z"
    },
    rating: {
      type: Number,
      default: 5
    },
    difficulty: {
      type: String,
      default: "Easy"
    },
    cost: {
      type: String,
      default: "Cheap"
    },
    commentary: {
      type: String,
      default: `Lorem ipsum dolor sit amet consectetur sicing elit. Sint illo rem
          porro, suscipit inventore que aperiam delectus sequi sit est
          itaque necessitatibus nam dolore quia error repellendus ratione nulla
          assumenda autem! Obcaecati officia ipsam id at fugit, rerum culpa
          quae.`
    },
    pictures: {
      type: Array,
      default: () => [
        `/img/img1.5ae99eaa.jpg`,
        `/img/img2.0f78169d.jpg`,
        `/img/img3.53f3dd9b.jpg`
      ]
    },
    tip: {
      type: String,
      default: "Here's your tip! SMILE :)"
    }
  },
  data() {
    return {
      id: null,
      more: false,
      slideIndex: 1,
      isUseful: true,
      dateToDisplay: moment(this.date).format("DD MMM YYYY")
    };
  },
  mounted() {
    // axios({
    //   method: "put",
    //   url: "/opinion/" + id
    // })
    //   .then(res => {
    //     this.isUseful = res.data;
    //   })
    //   .catch({});
  },
  methods: {
    see_more() {
      this.more = true;
    },
    see_less() {
      this.more = false;
    },
    openModal() {
      document.getElementById("myModal").style.display = "block";
    },
    closeModal() {
      document.getElementById("myModal").style.display = "none";
    },
    currentSlide() {
      this.showSlides(this.slideIndex);
    },
    plusSlides(n) {
      this.showSlides((this.slideIndex += n));
    },
    showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[this.slideIndex - 1].style.display = "block";
    },
    exit(e) {
      var modal = document.getElementById("myModal");
      if (e.target == modal) {
        modal.style.display = "none";
      }
    }
  }
};
</script>
<style src="@fortawesome/fontawesome-free/css/all.css"></style>

<style scoped>
.container {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 23rem;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
}
.inner-container {
  margin: 0 5px;
}
.first-line {
  display: flex;
  justify-content: space-between;
  padding: 7px 0px;
}
.block {
  display: flex;
}
.icon {
  margin-top: 5px;
  margin-right: 10px;
  color: #10b683;
}
.name-date-block {
  width: 200px;
  align-self: center;
  margin-left: 2px;
}
.name {
  font-size: 18px;
  font-weight: bold;
}
.date {
  display: block;
  margin-top: 2px;
  color: lightslategray;
  font-weight: 600;
}
.rating-block {
  margin-top: 5px;
}
.rate {
  color: #10b683;
  font-weight: bolder;
  font-size: 18px;
}
.star {
  font-size: 22px;
  color: #10b683;
  margin-left: 5px;
}
hr {
  border: 0.5px solid #d4ddc9;
}
.second-line {
  display: flex;
  padding: 7px 0px;
  justify-content: space-between;
}
.difficulty {
  color: #10b683;
  font-weight: bold;
  font-size: 17px;
  align-self: center;
}
.cost {
  color: #10b683;
  font-weight: bold;
  font-size: 17px;
  align-self: center;
}
.content {
  padding: 10px 0px;
}
.text {
  font-size: 15px;
  font-weight: bolder;
  margin: 0;
}
.see-more {
  padding-top: 5px;
  color: #10b683;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
}
.footer {
  display: flex;
  justify-content: space-between;
}
.image {
  height: 60px;
  width: 70px;
}
.btn {
  padding: 15px 25px;
  margin-left: 15px;
  margin-top: 15px;
  background-color: #10b683;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  outline: none;
  /* width: 100px;
  height: 50px; */
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  width: 600px;
  height: 400px;
  max-width: 1200px;
}

/* The Close Button */
.close {
  color: white;
  position: absolute;
  top: 10px;
  right: 25px;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #999;
  text-decoration: none;
  cursor: pointer;
}

.mySlides {
  display: none;
}

.cursor {
  cursor: pointer;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -30px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}
.moda-img {
  width: 600px;
  height: 420px;
}
img.hover-shadow {
  transition: 0.3s;
}
.hover-shadow:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 100px;
  background-color: black;
  font-size: 12px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -50px;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.use-ful {
  width: 60px !important;
  margin-left: -30px !important;
}
</style>
