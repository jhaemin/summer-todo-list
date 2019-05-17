<template>
  <div>
    <transition name="slide-left">
      <div id="notification" v-show="show">
        <button class="close" @click="show = false"></button>
        <div class="hero">
          <h1 class="title">Notification</h1>
          <p class="manifesto" v-if="expiredList.length > 0">The following tasks are out of date.</p>
          <p class="manifesto" v-else>All tasks are within each duedate.</p>
        </div>
        <div class="expired-task-container">
          <div class="expired-task" v-for="task in expiredList" :key="task.title + task.createdAt">
            <div class="due">{{ getDateString(task.duedate) }}</div>
            <div>{{ task.title }}</div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-left">
      <button class="notification-badge" v-show="!show" @click="show = true">
        <div class="counter" v-if="expiredList.length > 0">{{ expiredList.length }}</div>
      </button>
    </transition>
  </div>
</template>

<script>
import Storage from 'Modules/Storage'
import DateForm from 'Modules/DateForm'

export default {
  data() {
    return {
      expiredList: [],
      show: null
    }
  },
  watch: {
    show(val) {
      if (val) {
        document.body.classList.add('modal-active')
      } else {
        document.body.classList.remove('modal-active')
      }
    }
  },
  methods: {
    // compare the duedate with current time
    // and notify the passed task
    checkTaskDuedate() {
      let todoList = Storage.loadList()
      let currentTime = Date.now()
      let el = []

      todoList.forEach((task, index) => {
        if (!task.isDone && task.duedate && task.duedate < currentTime) {
          el.push(task)
        }
      })

      this.expiredList = el
    },
    // milliseconds to human-readable date string
    // using custom DateForm class
    getDateString(ms) {
      return DateForm.toString(ms)
    }
  },
  mounted() {
    // check out of date tasks every 1 second
    window.setInterval(this.checkTaskDuedate, 1000)
  }
}
</script>

<style lang="scss" scoped>
@import 'Styles/global-variables';
@import 'Styles/global-mixins';
@import 'Styles/simplebar-custom.scss';

.slide-left-enter-active, .slide-left-leave-active {
  transition: opacity 500ms ease, transform 500ms ease;
  opacity: 1;
  transform: translateX(0);
}
.slide-left-enter, .slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

#notification {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  padding: 1rem 0.7rem;
  width: calc(100% - 3rem);
  max-width: 15rem;
  max-height: calc(100% - 3rem);
  z-index: 9999;
  background-color: rgb(29, 101, 226);
  box-shadow: 0 0.5rem 2rem rgba(0,0,0,0.2);
  border-radius: 0.5rem;
  color: $white;
  overflow-y: auto;
  will-change: transform, opacity;

  .close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 1.2rem;
    height: 1.2rem;
    @include bgImg('/assets/images/arrow_right.svg', '100%', 'center');
  }

  .hero {
    padding: 0 $default-border-radius;

    .title {
      padding-top: 1.4rem;
      font-size: 1.5rem;
      font-family: $font-text;
      font-weight: 700;
    }

    .manifesto {
      font-size: 0.9rem;
      font-family: $font-text;
      font-weight: 500;
      line-height: 1.2;
      margin-top: 0.5rem;
    }
  }

  .expired-task-container {
    margin-top: 1rem;

    .expired-task {
      &, & * {
        font-family: $font-text;
        font-size: 0.9rem;
        line-height: 1;
      }

      cursor: pointer;
      background-color: rgba(#000, 0.1);
      padding: 0.7rem;
      margin-bottom: 0.5rem;
      border-radius: $default-border-radius;

      .due {
        font-weight: 500;
        margin-bottom: 0.5rem;
        opacity: 0.7;
      }
    }
  }
}

.notification-badge {
  position: fixed;
  z-index: 9999;
  right: 1.5rem;
  bottom: 1.5rem;
  box-shadow: $shadow;
  width: 3rem;
  height: 3rem;
  background-color: rgb(29, 101, 226);
  border-radius: 50%;
  @include bgImg('/assets/images/notification.svg', '1.5rem', 'center 55%');

  .counter {
    background-color: $red;
    padding: 0 0.5rem;
    min-width: 1.5rem;
    min-height: 1.5rem;
    border-radius: 50px;
    position: absolute;
    right: calc(50% + 0.2rem);
    top: -0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    font-family: $font-text;
    font-size: 0.9rem;
    font-weight: 700;
  }
}
</style>

