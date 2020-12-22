import Checklist from './checklist.js'

const tasks = [
    { id: 1, text: 'some1', status: 2 },
    { id: 2, text: 'some2', status: 2 },
    { id: 3, text: 'some3', status: 2 },
]

const checklist = window.checklist = new Checklist(tasks)

checklist.appendTo(document.querySelector('.wrapper'))
checklist.do(2)
checklist.fail(3)

checklist.addEventListener('change', () => console.log(checklist.lastChange)) 
