<template>
  <div class="todo-container">
    <h1 class="summer-todolist-title">Summer TODO List</h1>
    <div class="new-todo">
      <input type="text" class="input-title" placeholder="Add a new task"
        @keyup.enter="addTask"
        v-model="newTaskTitle"
      >
    </div>
    <!-- <ol id="todo-list" v-if="todoList.length > 0"> -->
    <transition-group name="list-complete" tag="ol" id="todo-list" v-if="todoList.length > 0">
      <TodoItem
        class="list-complete-item"
        v-for="(item, i) in todoList"
        :key="item.createdAt"
        :info="item"
        :index="i"
        @delete="deleteTask(i)"
        @done="doneTask(i, true)"
        @undone="doneTask(i, false)"
        @updateTitle="updateTitle"
        @setDueDate="setDueDate"
        @setPriority="setPriority"
      />
    </transition-group>
    <!-- </ol> -->
    <div class="empty-todo-list" v-else>
      <p class="title">No Task Yet<br><button class="example" @click="loadSample">Load Samples</button></p>
      <p class="manifesto">
        Designed and Developed<br>
        by Jang Haemin(<a target="_" href="https://github.com/jhaemin">@jhaemin</a>)
      </p>
    </div>
  </div>
</template>

<script>
import TodoItem from 'Components/TodoItem'
import Storage from 'Modules/Storage'
import DateForm from 'Modules/DateForm'

export default {
  name: 'TodoList',
  components: { TodoItem },
  data() {
    return {
      newTaskTitle: '',
      todoList: [],
      itemId: 0
    }
  },
  methods: {
    // add task and update the task list data
    // to the localStorage
    addTask() {
      // do nothing when the string is empty
      if (this.newTaskTitle.trim().length === 0) {
        return
      }

      let newTask = {
        title: this.newTaskTitle,
        createdAt: Date.now(),
        duedate: null,
        priority: 1,
        isDone: false
      }

      // clear input field and defocus
      this.newTaskTitle = ''
      this.$el.querySelector('.input-title').blur()

      // insert new item to the first
      this.todoList.unshift(newTask)

      // stores modified data
      Storage.storeList(this.todoList)
      this.animateOnFirstLoad()
    },
    // set the task done status
    doneTask(index, isDone) {
      this.todoList[index].isDone = isDone
      Storage.storeList(this.todoList)
    },
    // update the title
    updateTitle(index, newTitle) {
      this.todoList[index].title = newTitle
      Storage.storeList(this.todoList)
    },
    // set duedate
    setDueDate(index, year, month, day) {
      if (year === false) {
        this.todoList[index].duedate = null
      } else {
        this.todoList[index].duedate = new Date(year, month - 1, day).getTime()
      }

      Storage.storeList(this.todoList)
    },
    // set priority
    setPriority(index, priority) {
      this.todoList[index].priority = priority
      Storage.storeList(this.todoList)
    },
    // delete the task
    deleteTask(index) {
      this.todoList.splice(index, 1)
      Storage.storeList(this.todoList)
    },
    // load the sample date
    loadSample() {
      Storage.generateSamples()
      this.todoList = Storage.loadList()
      this.animateOnFirstLoad()
    },
    // spring animation when the list is loaded
    animateOnFirstLoad() {
      console.log('animation called')
      setTimeout(() => {
        let items = this.$el.querySelectorAll('.todo-item-spring-wrapper:not(.spring)')
        let i = 0
        let interval = window.setInterval(() => {
          if (!items[i] || i >= items.length) {
            window.clearInterval(interval)
            return
          }
          items[i].classList.add('spring')
          i++
        }, 50)
      }, 10)
    }
  },
  mounted() {
    // load saved todo list
    this.todoList = Storage.loadList()
    this.animateOnFirstLoad()
  }
}
</script>

<style lang="scss" scoped>
@import 'Styles/global-variables';

.list-complete-item {
  transition: transform 800ms cubic-bezier(.43,.18,.17,1.09), opacity 200ms ease;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0 !important;
  transform: scale(0.9) !important;
}
.list-complete-leave-active {
  position: absolute !important;
  // width: 100% !important;
}

.cool-enter-active, .cool-leave-active {
  transition: opacity 300ms ease !important;
  opacity: 1 !important;
}
.cool-enter, .cool-leave-to {
  opacity: 0 !important;
}

.todo-container {
  width: calc(100% - 3rem);
  max-width: 30rem;
  min-height: 120vh;
  margin: auto;
  padding-bottom: 5rem;

  .summer-todolist-title {
    font-size: 2rem;
    text-align: center;
    color: darken($white-blue, 70%);
    padding-top: 3rem;
  }

  .new-todo {
    .input-title {
      text-align: center;
      display: block;
      width: calc(100% - 1rem);
      padding: 1rem 1.2rem 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      font-family: $font-text;
      margin-top: 1.5rem;
      margin: 1.5rem 0.5rem 0;
      border-bottom: 1px solid darken($white-blue, 10%);
    }
  }

  #todo-list {
    margin-top: 2rem;
    position: relative;
  }

  .empty-todo-list {
    margin-top: 2rem;
    padding: 1.5rem;
    text-align: center;
    
    background-color: darken($white-blue, 3%);
    border-radius: $default-border-radius;

    &, & * {
      font-family: $font-text;
      font-size: 1rem;
      color: $gray;
    }

    .title {
      &, & * {
        font-weight: 700;
      }
      padding-bottom: 1.5rem;
      border-bottom: 1px solid darken($white-blue, 10%);

      .example {
        color: $blue;
        margin-top: 0.3rem;
      }
    }

    .manifesto {
      margin-top: 1.5rem;
      font-size: 0.9rem;
      line-height: 1.3;
      font-weight: 500;
    }
  }
}
</style>
