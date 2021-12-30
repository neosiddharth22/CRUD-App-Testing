import React, { Component } from 'react'

export class TodoList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             tododata:[],
             taskinput:'',
             priorityinput: 'Low',
             status:'ADD',
             id:-1

        }
    }

    

    handler = e => {
        let name = e.target.name
        switch(name){
            case 'task':
                this.setState({taskinput:e.target.value})
                break

            case 'priority':
                this.setState({priorityinput:e.target.value})
                break

            default:
        }
    }

    addTask = e => {
        e.preventDefault()
        if(this.state.status==='ADD'){
            let form = {task:this.state.taskinput, priority:this.state.priorityinput}
            this.setState({tododata:this.state.tododata.concat(form),taskinput:'',priorityinput:'Low'})
        }
        else if(this.state.status==='UPDATE'){
            let data = this.state.tododata
            let id = this.state.id
            data[id].task = this.state.taskinput
            data[id].priority = this.state.priorityinput
            this.setState({tododata:data,status:'ADD',id:-1})
        }

    }
    
    deleteTask = (id) => {
        let data = this.state.tododata
        data.splice(id,1)
        this.setState({tododata:data})
    }

    updateTask = (id) => {
        let data = this.state.tododata
        this.setState({taskinput:data[id].task,priorityinput:data[id].priority,status:'UPDATE',id:id})
    }

    render() {
        let state = this.state
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1 heading">CRUD APP</span>
                    </div>
                </nav>

                <form onSubmit={e => this.addTask(e)} id="addtaskform" className='w-50 mx-auto mt-5 border border-1 border-info p-3 rounded'>
                    <h2 className='text-center my-2'>Add Task</h2>
                    <div className="input-group mb-3">
                        <span className="input-group-text" >Task</span>
                        <input type="text" id="taskinput" className="form-control" name="task" onChange={e => this.handler(e)} value={state.taskinput}   />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Priority</span>
                        <select id="priorityinput" className="form-select" name="priority" onChange={e => this.handler(e)} value={state.priorityinput} >
                            <option defaultValue value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <button className='btn btn-primary flex-end' type="submit">{this.state.status}</button>   
                </form>

                <table className='table table-dark w-50 mx-auto mt-5'>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Task</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tododata.map((val,id)=>(
                            <tr key={id}>
                                <td>{id+1}</td>
                                <td>{val.task}</td>
                                <td>{val.priority}</td>
                                <td><button onClick={()=> this.updateTask(id)} className='btn btn-warning'>Update</button>
                                    <button onClick={()=> this.deleteTask(id)} className='btn btn-danger mx-5'>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TodoList