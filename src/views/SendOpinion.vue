<template>
  <div class="container">
    <div class="home">
      <div class="first-line">
        <i class="fas fa-user-circle fa-3x icon"></i>
        <h4 class="name">User Name</h4>
        <div class="field-container">
          <label class="field-name">Difficulty</label>
          <multiselect
            class="dropdown"
            label="name"
            track-by="value"
            v-model="difficulty_value"
            :options="difficulty_options"
            placeholder="Pick a value"
          ></multiselect>
        </div>
        <div class="field-container">
          <label class="field-name">Cost</label>
          <multiselect
            class="dropdown"
            label="name"
            track-by="value"
            v-model="cost_value"
            :options="cost_options"
            placeholder="Pick a value"
          ></multiselect>
        </div>
        <div class="field-container">
          <label class="field-name">Choose a rating</label>
          <i
            v-bind:class="{ selected: card_data.rating }"
            class="far fa-star first-star"
            @click="clickedOne"
          ></i>
          <i
            v-bind:class="{
              selected: card_data.rating && card_data.rating > 1
            }"
            class="far fa-star star"
            @click="clickedTwo"
          ></i>
          <i
            v-bind:class="{
              selected: card_data.rating && card_data.rating > 2
            }"
            class="far fa-star star"
            @click="clickedThree"
          ></i>
          <i
            v-bind:class="{
              selected: card_data.rating && card_data.rating > 3
            }"
            class="far fa-star star"
            @click="clickedFour"
          ></i>
          <i
            v-bind:class="{
              selected: card_data.rating && card_data.rating > 4
            }"
            class="far fa-star star"
            @click="clickedFive"
          ></i>
        </div>
      </div>
      <div class="optional-part">
        <span v-if="error" class="error">{{ error }}</span>
        <div class="optional-container">
          <p class="field-name">
            Add a commentary
          </p>
          <i
            v-if="!show_commentary"
            class="fas fa-plus plus"
            @click="addCommentary"
          ></i>
          <i
            v-if="show_commentary"
            class="fas fa-minus plus"
            @click="removeCommentary"
          ></i>
        </div>
        <textarea
          v-show="show_commentary"
          name="commentary"
          v-model="card_data.commentary"
          id="commentary"
          cols="40"
          rows="5"
        ></textarea>
        <div class="optional-container">
          <p class="field-name">
            Add pictures
          </p>
          <i v-if="!show_image" class="fas fa-plus plus" @click="addImages"></i>
          <i
            v-if="show_image"
            class="fas fa-minus plus"
            @click="removeImages"
          ></i>
        </div>
        <VueDropify
          :key="refresh_images"
          id="image"
          v-show="show_image"
          height="100"
          width="200"
          @upload="uploadImage"
          removeIcon="null"
          accept="image/jpg,image/jpeg,image/png"
        />
        <span v-if="image_error" class="error">{{ image_error }}</span>
        <div class="optional-container">
          <p class="field-name">
            Add some tip
          </p>
          <i v-if="!show_tip" class="fas fa-plus plus" @click="addTip"></i>
          <i v-if="show_tip" class="fas fa-minus plus" @click="removeTip"></i>
        </div>
        <textarea
          v-show="show_tip"
          v-model="card_data.tip"
          name="tip"
          id="tip"
          cols="40"
          rows="5"
        ></textarea>
      </div>
      <div class="btn-container">
        <button @click="publish" class="publish-btn">
          <i
            v-if="submitted"
            class="fa fa-spinner fa-spin"
            @click="removeTip"
          ></i>
          &nbsp; Publish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import VueDropify from "vue-dropify";
// import axios from "axios";

export default {
  name: "Home",
  components: {
    Multiselect,
    VueDropify
  },
  data() {
    return {
      difficulty_options: [
        { name: "Easy", value: 0 },
        { name: "Normal", value: 1 },
        { name: "Difficult", value: 2 }
      ],
      cost_options: [
        { name: "Cheap", value: 0 },
        { name: "Normal", value: 1 },
        { name: "Expensive", value: 2 }
      ],
      difficulty_value: null,
      cost_value: null,
      card_data: {
        difficulty_value: null,
        cost_value: null,
        rating: null,
        commentary: "",
        images: [],
        tip: ""
      },
      show_commentary: false,
      show_image: false,
      show_tip: false,
      refresh_images: 1,
      error: null,
      image_error: null,
      submitted: false
    };
  },
  methods: {
    reset_card_data() {
      this.difficulty_value = null;
      this.cost_value = null;
      this.error = null;
      this.image_error = null;
      this.card_data.difficulty_value = null;
      this.card_data.cost_value = null;
      this.card_data.rating = null;
      this.card_data.commentary = "";
      this.card_data.images = [];
      this.card_data.tip = "";
      this.refresh_images++;
    },
    clickedOne() {
      this.card_data.rating = 1;
    },
    clickedTwo() {
      this.card_data.rating = 2;
    },
    clickedThree() {
      this.card_data.rating = 3;
    },
    clickedFour() {
      this.card_data.rating = 4;
    },
    clickedFive() {
      this.card_data.rating = 5;
    },
    addCommentary() {
      this.show_commentary = true;
    },
    addImages() {
      this.show_image = true;
    },
    addTip() {
      this.show_tip = true;
    },
    removeCommentary() {
      this.show_commentary = false;
      this.card_data.commentary = "";
    },
    removeImages() {
      this.show_image = false;
      this.card_data.images = [];
      this.refresh_images++;
    },
    removeTip() {
      this.show_tip = false;
      this.card_data.tip = "";
    },
    uploadImage(e) {
      if (e == "") {
        this.card_data.images = [];
      } else {
        if (this.card_data.images.length < 3) {
          this.card_data.images.push(e[0]);
        } else {
          this.image_error = "You cannot upload more than 3 images.";
        }
      }
    },
    publish() {
      if (
        this.difficulty_value == null ||
        this.cost_value == null ||
        this.card_data.rating == null
      ) {
        this.error = "Please completed first three fields.";
      } else {
        this.submitted = true;
        this.card_data.difficulty_value = this.difficulty_value.value;
        this.card_data.cost_value = this.cost_value.value;

        // Remove the comment from this block if you want axios to work, also line 147

        // axios({
        //   method: "post",
        //   url: "/url",
        //   data: this.card_data // this object contains all the values
        // })
        //   .then(() => {
        //     this.submitted = false
        //     this.reset_card_data();
        //   })
        //   .catch((this.error = "Error Submitting form."));

        // Remove this block from here to when axios done.

        console.log(
          "Difficulty:",
          this.card_data.difficulty_value,
          "Cost Value:",
          this.card_data.cost_value,
          "Rating:",
          this.card_data.rating,
          "Commentary:",
          this.card_data.commentary,
          "Images:",
          this.card_data.images,
          "Tip:",
          this.card_data.tip
        );
        setTimeout(() => {
          this.submitted = false;
          this.reset_card_data();
          alert("Card Published Successfully");
        }, 1000);

        // here
      }
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@fortawesome/fontawesome-free/css/all.css"></style>

<style scoped>
.container {
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
.home {
  margin: 0 20px;
  padding: 20px 40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.first-line {
  display: flex;
  padding-top: 10px;
}
.icon {
  margin-top: 5px;
  margin-right: 10px;
  color: #10b683;
}
.name {
  width: 150px;
  text-align: left;
}
.dropdown {
  margin-top: 10px;
  width: 100%;
}
.field-container {
  width: 250px;
  margin-left: 20px;
  margin-top: 20px;
}
.field-name {
  display: block;
  width: 170px;
  font-weight: bold;
}
.first-star {
  font-size: 24px;
  margin-top: 15px;
  cursor: pointer;
}
.star {
  font-size: 24px;
  margin-top: 15px;
  margin-left: 5px;
  cursor: pointer;
}
.selected {
  color: #10b683;
}
.optional-part {
  margin-left: 210px;
}
.optional-container {
  display: flex;
  margin-top: 10px;
  margin-bottom: -20px;
}
.plus {
  text-align: center;
  align-self: center;
  margin-top: 5px;
  font-size: 18px;
  cursor: pointer;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
}
.publish-btn {
  padding: 15px 30px;
  margin-left: 0px;
  margin-top: 15px;
  background-color: #10b683;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  outline: none;
}
#commentary,
#tip {
  margin-top: 15px;
  width: 100%;
}
#image {
  margin-top: 15px;
  width: 600px;
  height: 150px;
}
.error {
  display: block;
  margin-left: 5px;
  margin-top: 10px;
  font-size: 14px;
  color: red;
}
</style>
