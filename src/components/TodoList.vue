<template>
  <div class="todo-container">
    <h1 class="summer-todolist-title">Summer TODO List</h1>
    <div class="new-todo">
      <input type="text" class="input-title" placeholder="Add a new task"
        @keyup.enter="addTask"
        v-model="newTaskTitle"
      >
    </div>
    <ol id="todo-list" v-if="todoList.length > 0">
      <TodoItem
        v-for="(item, i) in todoList"
        :key="item.title + item.createdAt"
        :info="item"
        :index="i"
        @delete="deleteTask(i)"
        @done="doneTask(i, true)"
        @undone="doneTask(i, false)"
        @updateTitle="updateTttle"
        @setDueDate="setDueDate"
      />
    </ol>
    <div class="empty-todo-list" v-else>
      <p class="title">No Task Yet</p>
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
    addTask() {
      // do nothing when the string is empty
      if (this.newTaskTitle.trim().length === 0) {
        return
      }

      let newTask = {
        title: this.newTaskTitle,
        createdAt: Date.now(),
        duedate: null,
        isDone: false
      }

      // clear input field and defocus
      this.newTaskTitle = ''

      // insert new item to the first
      this.todoList.unshift(newTask)

      // stores modified data
      Storage.storeList(this.todoList)
    },
    doneTask(index, isDone) {
      this.todoList[index].isDone = isDone
      Storage.storeList(this.todoList)
    },
    updateTttle(index, newTitle) {
      this.todoList[index].title = newTitle
      Storage.storeList(this.todoList)
    },
    setDueDate(index, year, month, day) {
      if (year === false) {
        this.todoList[index].duedate = null
      } else {
        this.todoList[index].duedate = new Date(year, month - 1, day).getTime()
      }

      Storage.storeList(this.todoList)
    },
    deleteTask(index) {
      this.todoList.splice(index, 1)
      Storage.storeList(this.todoList)
    }
  },
  created() {
    // load saved todo list
    this.todoList = Storage.loadList()
  }
}
</script>

<style lang="scss" scoped>
@import 'Styles/global-variables';

.todo-container {
  width: calc(100% - 3rem);
  max-width: 30rem;
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
      width: 100%;
      padding: 1rem 1.2rem;
      font-size: 1rem;
      font-weight: 500;
      font-family: $font-text;
      margin-top: 1.5rem;
      // border-bottom: 1px solid darken($white-blue, 10%);
    }
  }

  #todo-list {
    margin-top: 2rem;
  }

  .empty-todo-list {
    font-family: $font-text;
    font-size: 1rem;
    margin-top: 2rem;
    padding: 1.5rem;
    text-align: center;
    color: $gray;
    background-color: darken($white-blue, 3%);
    border-radius: $default-border-radius;

    .title {
      font-weight: 700;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid darken($white-blue, 10%);
    }

    .manifesto {
      margin-top: 1.5rem;
      font-size: 0.8rem;
      line-height: 1.3;
      font-weight: 500;
    }
  }
}
</style>
