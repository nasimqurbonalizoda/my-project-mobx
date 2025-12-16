import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { todos } from "../store/todos";

const SyncMobx = observer(() => {
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    const [editmodal, setEditmodal] = useState(false);
    const [editname, setEditname] = useState("");
    const [editid, setEditid] = useState(null);
    const [infomodal, setInfomodal] = useState(false);
    const [infoname, setInfoname] = useState("");
    const [filtered, setfiltered] = useState("all");

    const openmodal = (el) => {
        setEditname(el.name);
        setEditid(el.id);
        setEditmodal(true);
    };

    const info = (el) => {
        setInfoname(el.name);
        setInfomodal(true);
    };

    const edited = () => {
        todos.edituser({ id: editid, name: editname });
        setEditmodal(false);
    };

    return (
        <div style={{ padding: "20px" }}>
            <input
                type="text"
                placeholder="name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button
                onClick={() => {
                    if (name.trim()) {
                        todos.adduser({ name });
                        setName("");
                    }
                }}
            >
                adduser
            </button>

            <input
                placeholder="search..."
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginLeft: "10px" }}
            />
            <select value={filtered} onChange={(el)=> setfiltered(el.target.value)}>
              <option value="all">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            {editmodal && (
                <dialog open>
                    <input
                        type="text"
                        value={editname}
                        onChange={(e) => setEditname(e.target.value)}
                    />
                    <button onClick={edited}>edit</button>
                    <button onClick={() => setEditmodal(false)}>cancel</button>
                </dialog>
            )}

            {infomodal && (
                <dialog open>
                    <p>{infoname}</p>
                    <button onClick={() => setInfomodal(false)}>cancel</button>
                </dialog>
            )}

            {todos.data
            .filter((el)=>{
              if(filtered==="all")return true;
              if(filtered==="true")return el.status===true;
              if(filtered==="false")return el.status===false;
               return true;
            })
                .filter((e) =>
                    e.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((el) => (
                    <div key={el.id} style={{ margin: "15px 0", padding: "10px", border: "1px solid #aaa" }}>
                        <h1>{el.name}</h1>
                        <h3 style={{ color: el.status ? "green" : "red" }}>
                            {el.status ? "active" : "inactive"}
                        </h3>
                        <button onClick={() => todos.deleted(el.id)}>delete</button>
                        <button onClick={() => openmodal(el)}>edit</button>
                        <button onClick={() => todos.chexbox(el.id)}>chexbox</button>
                        <button onClick={() => info(el)}>info</button>
                    </div>
                ))}
        </div>
    );
});

export default SyncMobx;