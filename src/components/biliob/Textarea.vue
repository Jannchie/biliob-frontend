<template>
  <div class="wrapper">
    <VTextarea
      v-model="input"
      counter="100"
      solo
      style="font-size: 0.875rem;"
      auto-grow
      rows="1"
      class="regular-input"
      @keyup.ctrl.enter="$emit('submit')"
    />
    <EmojiPicker
      :search="search"
      @emoji="append"
    >
      <div
        slot="emoji-invoker"
        slot-scope="{ events: { click: clickEvent } }"
        class="emoji-invoker"
        @click.stop="clickEvent"
      >
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      </div>
      <div
        slot="emoji-picker"
        slot-scope="{ emojis, insert, display }"
      >
        <div
          class="emoji-picker"
          :style="{ top: display.y + 'px', left: display.x + 'px' }"
        >
          <div class="emoji-picker__search">
            <input
              v-model="search"
              v-focus
              type="text"
            >
          </div>
          <div>
            <div
              v-for="(emojiGroup, category) in emojis"
              :key="category"
            >
              <h5>{{ category }}</h5>
              <div class="emojis">
                <span
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  :title="emojiName"
                  @click="insert(emoji)"
                >{{ emoji }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmojiPicker>
  </div>
</template>
<style scoped>
/* Tailwind CSS-styled demo is available here: https://codepen.io/DCzajkowski/pen/Brxvzj */
.wrapper {
  position: relative;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.emoji-invoker {
  position: absolute;
  border-radius: 50%;
  top: 5px;
  right: 5px;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  margin-bottom: 5px;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  height: 200px;
  overflow-y: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
<script>
import EmojiPicker from "vue-emoji-picker";
export default {
  components: { EmojiPicker },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      input: "",
      search: ""
    };
  },
  watch: {
    input(val) {
      this.$emit("getText", val);
    }
  },
  methods: {
    append(emoji) {
      this.input += emoji;
    },
    clean() {
      this.input = "";
    }
  }
};
</script>
