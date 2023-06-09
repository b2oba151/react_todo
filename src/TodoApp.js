import React, { Component } from "react";
import './Todo.css';
export default class TodoApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { text: "Item #1", done: false, key: new Date().getMilliseconds() + "Item #1" },
                { text: "Item #2", done: false, key: new Date().getMilliseconds() + "Item #2" },
                { text: "Item #3", done: false, key: new Date().getMilliseconds() + "Item #3" },
                { text: "Item #4", done: false, key: new Date().getMilliseconds() + "Item #4" }
            ],
            input: ''
        }
    }

    move = (key) => {
        let filtered = this.state.items.map(item => {
            if (item.key == key) {
                item.done = !item.done;
            }
            return item;
        })
        this.setState({ items: filtered })
    }


    add = () => {
        let newItem = { text: this.state.input, done: false, key: new Date().getMilliseconds() }
        this.setState((state) => ({
            items: [newItem].concat(state.items)
        }))
    }


    handlerChange = (e) => {
        // console.log(e.target.value);
        this.setState({ input: e.target.value })
    }

    getUndone = ()=>{
        let undome = this.state.items.filter(item =>{
            return !item.done
        })
        if(!undome.length) {return}
        return undome.length
    }
    render() {
        return (<div className="container"><br />
            <div className="row">
                <div className="col-md-6">
                    <div className="todolist">
                        List Undone
                        <form onSubmit={(e) => { e.preventDefault(); this.add() }}>
                            <input placeholder="add todo" className="form-control form-control-lg" value={this.state.input} onChange={(e) => this.handlerChange(e)} />
                        </form>
                        <ul>
                            {
                                this.state.items.map(item => {
                                    if (!item.done) {
                                        return (<li key={item.key} onClick={() => this.move(item.key)}>{item.text}</li>)
                                    }
                                })
                            }
                        </ul>
                        <div className="todo-footer">
                            <span >{this.getUndone()}</span> Items restants
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="todolist">
                    List done
                    <ul>
                        {
                            this.state.items.map(item => {
                                if (item.done) {
                                    return (<li key={item.key} onClick={() => this.move(item.key)}>{item.text}</li>)
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
            </div>
        </div>)
    }
}