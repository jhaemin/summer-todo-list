// define todo item data structure
interface TodoItem {
  title: string,
  createdAt: number, // milliseconds
  duedate: number|null, // milliseconds
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

    // console.log(JSON.stringify(JSON.parse(list), null, 2))
    
    return JSON.parse(list)
  }

  // stores list
  static storeList(list: TodoItem) {
    // console.log(JSON.stringify(list, null, 2))
    window.localStorage.setItem('summer-todo-list', JSON.stringify(list))
  }

  static generateSamples() {
    let sample: Array<TodoItem> = [
      {
        title: 'Email team for  updates',
        createdAt: 1558082653426,
        duedate: 1564412400000,
        priority: 3,
        isDone: false
      },
      {
        title: 'Book conference room',
        createdAt: 1558082653426,
        duedate: null,
        priority: 1,
        isDone: false
      },
      {
        title: 'Send out meeting request',
        createdAt: 1558082653426,
        duedate: null,
        priority: 2,
        isDone: false
      },
      {
        title: 'Make a presentation for next meeting',
        createdAt: 1558082653426,
        duedate: 1563548400000,
        priority: 2,
        isDone: false
      },
      {
        title: 'Create meeting agenda',
        createdAt: 1558082653426,
        duedate: null,
        priority: 1,
        isDone: false
      },
      {
        title: 'Update project plan',
        createdAt: 1558082653426,
        duedate: null,
        priority: 2,
        isDone: false
      },
      {
        title: 'Verify project budget',
        createdAt: 1558082653426,
        duedate: 1563548400000,
        priority: 3,
        isDone: true
      },
      {
        title: 'Contact service center',
        createdAt: 1558082653426,
        duedate: null,
        priority: 1,
        isDone: true
      }
    ]

    window.localStorage.setItem('summer-todo-list', JSON.stringify(sample))
  }
}