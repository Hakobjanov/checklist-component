export default class Checklist extends EventTarget {

    constructor(tasks) {
        super()
        this.tasks = tasks
        this.render()
        this.assignHandlers()
    }

    appendTo(parent) {
        parent.append(this.el)
    }

    do(id) {
        this.setStatus(id, 1)
    }

    fail(id) {
        this.setStatus(id, 0)
    }

    undo(id) {
        this.setStatus(id, 2)
    }

    setStatus(id, status) {
        this.tasks.find(task => task.id == id).status = status
        this.render()
        this.dispatchEvent(new Event('change'))
        this.lastChange = {id, status}
    }

    assignHandlers() {
        this.el.addEventListener('click', e => {
            if (e.target.tagName == 'BUTTON') {
                const status = ['❌', '✔️', '↩️'].indexOf(e.target.innerText)
                const id = +e.target.closest('div').dataset.id
                this.setStatus(id, status)
            }
        })
    }

    render() {
        if (!this.el) this.el = document.createElement("ul")
        this.el.innerHTML = this.tasks.map(({ id, text, status }) => /* html */`
            <li class="${status == 2 ? '' : status == 1 ? 'done' : 'failed'}">
                <div data-id="${id}">
                    ${status == 2 ? '<button>✔️</button><button>❌</button>' : '<button>↩️</button>'}
                </div>
                <span>${text}</span>
            </li>
        `).join('')
    }

    update(tasks) {
        this.tasks = tasks
        this.render()
    }
}
