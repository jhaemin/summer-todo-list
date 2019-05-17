<template>
  <div id="summer-todo-list-app">
    <Notification/>
    <TodoList/>
    <img src="/assets/images/summer@7x.png" alt="">
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
  img {
    position: fixed;
    left: 50%;
    transform: translateX(-50%) translateY(10vw);
    bottom: 0;
    width: 100%;
    z-index: -1;
    opacity: 0.3;
    min-width: 50rem;
  }
}
</style>
