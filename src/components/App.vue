<template>
  <div id="summer-togo-list-app">
    <Notification/>
    <TodoList/>
  </div>
</template>

<script>
import TodoList from 'Components/TodoList'
import Notification from 'Components/Notification'

export default {
  name: 'App',
  components: { TodoList, Notification }
}
</script>

<style lang="scss" scoped>
#summer-todo-list-app {

}
</style>
