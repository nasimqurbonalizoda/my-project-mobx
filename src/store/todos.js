import { makeAutoObservable } from "mobx";

class Todos {
    data = [
        { id: 1, name: "maga", status: false },
        { id: 2, name: "shoga", status: true },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    adduser(elem) {
        this.data.push({
            id: Date.now(),
            name: elem.name,
            status: false
        });
    }

    deleted(id) {
        this.data = this.data.filter((e) => e.id !== id);
    }

    edituser(elem) {
        this.data = this.data.map((item) =>
            item.id === elem.id ? { ...item, name: elem.name } : item
        );
    }

    chexbox(id) {
        this.data = this.data.map((item) =>
            item.id === id ? { ...item, status: !item.status } : item
        );
    }
}

export const todos = new Todos();