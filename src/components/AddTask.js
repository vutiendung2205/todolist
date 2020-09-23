import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTaskRequest, editTaskRequest } from './actions/index'

class AddTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name: '',
            level: '1',
            isComplete: 'false',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleCancel(){
        this.props.isShowForm();
        this.props.resetTaskForm();
        this.props.resetEditTask()
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.editTask.id != prevState.id){
            return {
                id : nextProps.editTask.id,
                name : nextProps.editTask.name,
                level : nextProps.editTask.level,
                isComplete : nextProps.editTask.isComplete
            }
        }
    }


    handleSubmit(e){
        e.preventDefault();
        if(this.state.id == ''){
            // add task
            this.props.addTask( this.state.name, this.state.level ,this.state.isComplete )
            this.props.resetTaskForm();
            this.setState({
                name: '',
                level: '1',
                isComplete: 'false',
            })
        }else{
            // edit task
            this.props.acteditTask(this.state.id,this.state.name, this.state.level ,this.state.isComplete);
            this.props.resetEditTask()
        }
        this.props.isShowForm()
    }



    render() {
        return (
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <div className="form-group task_name" >
                    <label htmlFor="task_name">Task name</label>
                    <input type="text" className="form-control"
                    id="task_name" placeholder="Enter your task..."
                    name="name"
                    value={this.state.name}
                    onChange={ (e)=>this.handleChange(e)} />
                </div>
                <div className="form-group level">
                    <label htmlFor="level">Level</label>
                    <select className="custom-select"
                        value={this.state.level}
                        id="level" name="level"
                        onChange={ (e)=>this.handleChange(e) }>
                            <option value="1">High</option>
                            <option value="2">Medium</option>
                            <option value="3">Low</option>
                    </select>
                </div>
                <div className="form-group isComplete">
                    <label htmlFor="isComplete">Status</label>
                    <select className="custom-select"
                         id="isComplete" value={this.state.isComplete}
                         name="isComplete"
                         onChange={ (e)=>this.handleChange(e)} >
                        <option value="true">Completed</option>
                        <option value="false">Incompleted</option>
                    </select>
                </div>
                <div className="form-group button_submit">
                    <button type='submit' className="btn btn-outline-info"  >Submit</button>
                </div>
                <div className="form-group cancel">
                    <button type="button" className="btn btn-outline-info" onClick={this.handleCancel} >Cancel</button>
                </div>
            </form>
        )
    }
}



function mapStateToProps(state){
    return {
        data : state.data,
        addTask : state.addTask,
        editTask : state.editTask
    }
}
function mapDispatchToProps(dispatch){
    return {
        addTask : (name, level,isComplete) =>{
            dispatch(addTaskRequest(name,level,isComplete))
        },
        resetTaskForm : () =>{
            dispatch({
                type : "RESET_TASK_FORM"
            })
        },
        isShowForm : () =>{
            dispatch({
                type : 'IS_SHOW_FORM'
            })
        },
        acteditTask : (id,name, level,isComplete) => {
            dispatch(editTaskRequest(id,name,level,isComplete))
        },
        resetEditTask : () =>{
            dispatch({
                type : 'RESET_EDITTASK'
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddTask)