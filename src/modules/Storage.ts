// define todo item data structure
interface TodoItem {
  title: string,
  createdAt: string, // milliseconds
  duedate: string|null, // milliseconds
  priority: 1|2|3,
  isDone: boolean
}

// Storage manages data
export default class Storage {
  constructor() {}

  // load todo items list from loaclStorage
  static loadList(): [TodoItem] {
    let list: string = window.localStorage.getItem('summer-todo-list')
    
    // if there is no list yet,
    // init it with an empty array
    if (!list) {
      list = JSON.stringify(new Array())
      window.localStorage.setItem('summer-todo-list', list)
    }

    console.log(JSON.stringify(JSON.parse(list), null, 2))
    
    return JSON.parse(list)
  }

  // stores list
  static storeList(list: TodoItem) {
    console.log(JSON.stringify(list, null, 2))
    window.localStorage.setItem('summer-todo-list', JSON.stringify(list))
  }
}