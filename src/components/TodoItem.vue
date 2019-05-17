<template>
  <li class="todo-item"
    :class="{done: isDone}"
  >
    <div class="todo-item-spring-wrapper">
      <div class="priority-indicator" :class="`priority--${info.priority}`"></div>
      <div class="hero">
        <div @click="toggleDone" class="done-checkbox"></div>
        <input
          class="title"
          v-model="taskTitle"
          @blur="updateTitle(index, taskTitle)"
          @keydown.enter="updateTitle(index, taskTitle)"
          placeholder="New Title"
        />
        <button class="more" @click="toggleOption" :class="{open: isOptionVisible}"></button>
      </div>
      <div class="option-wrapper"
        :style="{height: optionHeight}"
      >
        <div class="option">
          <div class="due-date">
            <p class="title" @click="setDueDate(true)">
              <span v-if="info.duedate">Due Date</span>
              <span v-else>Set Due Date</span>
            </p>
            <div class="date-select" v-if="info.duedate">
              <select
                v-model="dueYear"
                @change="setDueDate(true)"
              >
                <option v-for="i in 5" :key="`year-${i}`">{{ new Date().getFullYear() - i + 1 }}</option>
              </select>
              <select
                v-model="dueMonth"
                @change="setDueDate(true)"
              >
                <option v-for="i in 12" :key="`month-${i}`">{{ i }}</option>
              </select>
              <select
                v-model="dueDay"
                @change="setDueDate(true)"
              >
                <option v-for="i in numberOfDay" :key="`day-${i}`">{{ i }}</option>
              </select>
              <button class="no-duedate" @click="setDueDate(false)"></button>
            </div>
          </div>
          <div class="priority">
            <p class="title" @click="setPriority(true)">Priority</p>
            <div class="priority-select">
              <div class="input-wrapper">
                <input type="radio" value="1" @change="setPriority(true)" v-model="priority" class="p1">
              </div>
              <div class="input-wrapper">
                <input type="radio" value="2"  @change="setPriority(true)" v-model="priority" class="p2">
              </div>
              <div class="input-wrapper">
                <input type="radio" value="3"  @change="setPriority(true)" v-model="priority" class="p3">
              </div>
            </div>
          </div>
          <div class="delete-wrapper">
            <button class="delete" @click="$emit('delete')"></button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import ResizeSensor from 'resize-sensor'

export default {
  name: 'TodoItem',
  props: ['info', 'index'],
  data() {
    return {
      isOptionVisible: false,
      isDone: this.info.isDone,
      optionHeight: 0,
      isEditable: false,
      taskTitle: this.info.title,
      dueYear: null,
      dueMonth: null,
      dueDay: null,
      priority: null
    }
  },
  computed: {
    // get the number of day of the given YYYY-MM
    numberOfDay() {
      return new Date(this.dueYear, this.dueMonth, 0).getDate()
    }
  },
  watch: {
    isOptionVisible(newVal) {
      if (newVal) {
        this.rerenderOptionBox()
      } else {
        this.optionHeight = 0
      }
    }
  },
  methods: {
    toggleOption() {
      this.isOptionVisible = !this.isOptionVisible
    },
    toggleDone() {
      if (this.isDone) {
        this.isDone = false
        this.$emit('undone')
      } else {
        this.isDone = true
        this.$emit('done')
      }
    },
    // temprarily disable the expanding animation
    // since the height transition performance is not good
    rerenderOptionBox() {
      // if (this.isOptionVisible) {
      //   setTimeout(() => {
      //     this.$el.querySelector('.option').getBoundingClientRect().height
      //     this.optionHeight = this.$el.querySelector('.option').getBoundingClientRect().height + 'px'
      //   }, 4)
      // }
      this.optionHeight = 'auto'
    },
    // test code for flexible title box size
    // currently, title stays only in a single line
    adjustTitleBoxSize() {
      let title = this.$el.querySelector('textarea.title')
      console.log(title)
      title.style.height = title.scrollHeight + 'px'
    },
    // update title by emitting event to parent component,
    // then blur the title input
    updateTitle(index, newTitle) {
      this.$el.querySelector('.title').blur()
      this.$emit('updateTitle', index, newTitle)
    },
    // set duedate of the task
    // by emitting the event
    setDueDate(isSet) {
      if (isSet) {
        this.$emit('setDueDate', this.index, this.dueYear, this.dueMonth, this.dueDay)
      } else {
        this.$emit('setDueDate', this.index, false)
      }
    },
    // set priority of the task
    setPriority(isSet) {
      if (isSet) {
        this.$emit('setPriority', this.index, this.priority)
      }
    }
  },
  mounted() {
    // new ResizeSensor(this.$el.querySelector('.option'), () => {
    //   this.rerenderOptionBox()
    // })
  },
  // when the component is created,
  // set the default options using the data
  // fetched from the parent component
  created() {
    if (this.info.duedate) {
      let due = new Date(this.info.duedate)
      this.dueYear = due.getFullYear()
      this.dueMonth = due.getMonth() + 1
      this.dueDay = due.getDate()
    } else {
      let date = new Date(Date.now() + 24 * 3600 * 1000)
      this.dueYear = date.getFullYear()
      this.dueMonth = date.getMonth() + 1
      this.dueDay = date.getDate()
    }

    this.priority = this.info.priority
  }
}
</script>

<style lang="scss" scoped>
@import 'Styles/global-variables';
@import 'Styles/global-mixins';

.todo-item {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;

  .todo-item-spring-wrapper {
    width: 100%;
    background-color: $white;
    box-shadow: $shadow;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: opacity 300ms ease, box-shadow 300ms ease;
    opacity: 0;

    &.spring {
      animation: 1s springFadeUp linear;
      animation-fill-mode: forwards;
    }
  }

  &.indicating {
    
  }

  .priority-indicator {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0.3rem;
    pointer-events: none;
    border-radius: 0.5rem 0 0 0.5rem;

    &.priority--1 {
      background-color: #c1fa8c;
    }
    &.priority--2 {
      background-color: #ffd885;
    }
    &.priority--3 {
      background-color: #ff8989;
    }
  }

  .hero {
    display: flex;
    align-items: center;

    .done-checkbox {
      cursor: pointer;
      display: inline-block;
      margin-left: 1.2rem;
      $size: 1.5rem;
      min-width: $size;
      max-width: $size;
      min-height: $size;
      max-height: $size;
      border-radius: 50%;
      border: 3px solid #c5c5c5;
      @include bgImg('/assets/images/check_mark.svg', '70%', 'center');
      transition: border 300ms ease, background-color 300ms ease;
    }

    .title {
      resize: none;
      display: block;
      flex: 1;
      height: 2rem;
      min-width: 0;
      text-overflow: ellipsis;
      font-size: 1rem;
      font-weight: 500;
      padding: 0.5rem 0.5rem;
      margin: 0.5rem 0.5rem;
      margin-right: 0;
      transition: background-color 300ms ease;
      border-radius: 0.3rem;

      &:focus {
        background-color: darken($white-blue, 2%);
      }
    }

    .more {
      cursor: pointer;
      $size: 2rem;
      min-width: $size;
      max-width: $size;
      min-height: $size;
      max-height: $size;
      background-image: url('/assets/images/down_arrow.svg');
      background-size: 50%;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 0.7rem;
      transition: transform 300ms ease;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .option-wrapper {
    overflow: hidden;
    height: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    // transition: height 200ms;

    .option {
      padding: 1rem 0;
      margin: 0 1.2rem;
      border-top: 1px solid darken($white-blue, 5%);

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        cursor: pointer;
        user-select: none;

        &::before {
          content: '';
          margin-right: 0.3rem;
          display: inline-block;
          width: 1.3rem;
          height: 1.3rem;
        }

        &, & * {
          font-weight: 700;
        }
      }

      .due-date {
        .title {
          &::before {
            @include bgImg('/assets/images/duedate.svg', '100%', 'center');
          }
        }

        .date-select {
          margin-top: 1rem;
          display: flex;

          select {
            flex: 1;
            margin-right: 1rem;

            &:nth-child(3) {
              margin-right: 0;
            }
          }

          .no-duedate {
            cursor: pointer;
            width: 2rem;
            height: 2rem;
            @include bgImg('/assets/images/x.svg', '50%', 'right center');
          }
        }
      }

      .priority {
        padding: 1rem 0;
        margin-top: 1rem;
        border-top: 1px solid darken($white-blue, 1%);
        border-bottom: 1px solid darken($white-blue, 1%);

        .title {
          // color: #7123F4;

          &::before {
            @include bgImg('/assets/images/priority.svg', '100%', 'center');
          }
        }

        .priority-select {
          display: flex;
          max-width: 10rem;
          margin: auto;
          padding-top: 1rem;

          .input-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            input[type="radio"] {
              cursor: pointer;
              flex: 1;
              appearance: none;
              width: 100%;
              max-width: 2rem;
              height: 2rem;
              background: #fff6a5;
              border-radius: 0.3rem;
              transition: box-shadow 200ms ease;

              &.p1 {
                background-color: #dfffab;
              }
              &.p2 {
                background-color: #ffe19f;
              }
              &.p3 {
                background-color: #ffa5a5;
              }

              &:checked {
                box-shadow: 0 0 0 3px $gray;
              }
            }
          }
        }
      }
    }

    .delete-wrapper {
      text-align: center;
      margin-top: 1rem;

      .delete {
        cursor: pointer;
        width: 100%;
        max-width: 5rem;
        height: 2rem;
        background-color: #ffeff2;
        border-radius: $default-border-radius;
        @include bgImg('/assets/images/trashbin.svg', '1.3rem', 'center');
        background-image: url('/assets/images/trashbin.svg');
      }
    }
  }

  &.done {
    .todo-item-spring-wrapper {
      // opacity: 0.9;
      box-shadow: $shadow-opaque;
    }

    .hero {
      .done-checkbox {
        border-color: darken($green, 3%);
        background-color: $green;
      }
      
      .title {
        cursor: text;
        color: #969696;
        text-decoration: line-through;
      }
    }
  }
}
</style>
