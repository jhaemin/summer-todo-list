<template>
  <li class="todo-item"
    :class="{done: isDone}"
  >
    <div class="hero">
      <div @click="toggleDone" class="done-checkbox"></div>
      <input
        class="title"
        v-model="taskTitle"
        @blur="updateTitle(index, taskTitle)"
        @keydown.enter="updateTitle(index, taskTitle)"
        @focus="isOptionVisible = false"
        :style="{transform: 'sacle(1)'}"
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
        <div class="delete-wrapper">
          <button class="delete" @click="$emit('delete')"></button>
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
      dueDay: null
    }
  },
  computed: {
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
    rerenderOptionBox() {
      if (this.isOptionVisible) {
        setTimeout(() => {
          this.$el.querySelector('.option').getBoundingClientRect().height
          this.optionHeight = this.$el.querySelector('.option').getBoundingClientRect().height + 'px'
        }, 4)
      }
    },
    adjustTitleBoxSize() {
      console.log('adjust')
      let title = this.$el.querySelector('textarea.title')
      console.log(title)
      title.style.height = title.scrollHeight + 'px'
    },
    updateTitle(index, newTitle) {
      this.$el.querySelector('.title').blur()
      this.$emit('updateTitle', index, newTitle)
    },
    setDueDate(isSet) {
      this.isDueSet = isSet
      if (isSet) {
        this.$emit('setDueDate', this.index, this.dueYear, this.dueMonth, this.dueDay)
      } else {
        this.$emit('setDueDate', this.index, false)
      }
    }
  },
  mounted() {
    new ResizeSensor(this.$el.querySelector('.option'), () => {
      this.rerenderOptionBox()
    })
  },
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
  }
}
</script>

<style lang="scss" scoped>
@import 'Styles/global-variables';
@import 'Styles/global-mixins';

.todo-item {
  background-color: $white;
  box-shadow: $shadow;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: opacity 300ms ease;

  &.indicating {
    
  }

  .hero {
    display: flex;
    align-items: center;

    .done-checkbox {
      cursor: pointer;
      display: inline-block;
      margin-left: 1.2rem;
      $size: 1.3rem;
      min-width: $size;
      max-width: $size;
      min-height: $size;
      max-height: $size;
      border-radius: 50%;
      border: 3px solid #c5c5c5;
      transition: border 300ms ease, background-color 300ms ease;
    }

    .title {
      resize: none;
      display: block;
      flex: 1;
      height: 2rem;
      min-width: 0;
      line-height: 1;
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
    transition: height 300ms;

    .option {
      padding: 1rem 0;
      margin: 0 1.2rem;
      border-top: 1px solid darken($white-blue, 5%);

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        cursor: pointer;
        user-select: none;

        * {
          font-weight: 700;
        }

        &::before {
          content: '';
          margin-right: 0.3rem;
          display: inline-block;
          width: 1.2rem;
          height: 1.2rem;
          background-image: url('/assets/images/duedate.svg');
          background-repeat: no-repeat;
          background-size: 1.2rem;
          background-position: center;
        }
      }

      .due-date {
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
    }

    .delete-wrapper {
      text-align: center;
      margin-top: 1.5rem;

      .delete {
        cursor: pointer;
        width: 100%;
        max-width: 5rem;
        height: 2rem;
        background-color: #ffeff2;
        border-radius: $default-border-radius;
        background-image: url('/assets/images/trashbin.svg');
        background-repeat: no-repeat;
        background-size: 1.2rem;
        background-position: center;
      }
    }
  }

  &.done {
    opacity: 0.7;
    box-shadow: $shadow-opaque;

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
