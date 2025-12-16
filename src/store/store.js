import { makeAutoObservable, runInAction } from "mobx";
const Api = "http://localhost:3000/users";

class Todos {
    data = [];
    constructor() {
        makeAutoObservable(this);
    }
    async getuser() {
        try {
            let res = await fetch(Api)
            let data = await res.json()
            runInAction(() => {
                this.data = data
            });
        } catch (error) {
            console.error(error);
        }
    }
    async deleteuser(id) {
        try {
            await fetch(`${Api}/${id}`, {
                method: "DELETE"
            })
            runInAction(() => {
                this.data = this.data.filter((el) => el.id !== id);
            });
        } catch (error) {
            console.error(error);
        }
    }
    async edituser(elem) {
        try {
            await fetch(`${Api}/${elem.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(elem)
            })
            runInAction(() => {
                const index = this.data.findIndex((el) => el.id === elem.id);
                if (index !== -1) {
                    this.data[index] = { ...this.data[index], ...elem };
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
    async adduser(elem) {
        try {
            await fetch(Api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(elem)
            })
            runInAction(() => {
                this.data.push(elem);
            });
        } catch (error) {
            console.error(error);
        }
    }
   async chexbox(elem) {
    const newStatus = !elem.status;  
    try {
        await fetch(`${Api}/${elem.id}`, {
            method: "PATCH",  
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })  
        });
        runInAction(() => {
            const index = this.data.findIndex((el) => el.id === elem.id);
            if (index !== -1) {
                this.data[index].status = newStatus;  
            }
        });
    } catch (error) {
        console.error(error);
    }
};

}

export const todos = new Todos();