import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTaskRequest,changeStatusRequest } from './actions/index'


class Task extends Component {
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEditTask = this.handleEditTask.bind(this)
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
    }


    handleDelete(id){
        this.props.deleteTask(id)
    }
    handleEditTask(id,name,level,isComplete){
        this.props.editTask(id,name,level,isComplete);
        this.props.openForm();
    }
    handleChangeStatus(id,name,level,isComplete){
        this.props.actchangeStatus(id,name,level,isComplete)
    }
    render() {
        let color,level;
        switch(this.props.level) {
            case '1' :{
                color = 'red';
                level = 'High';
                break;
            };
            case '2' :{
                color = 'orange';
                level = "Medium";
                break;
            };
            case '3' :{
                color = 'green';
                level = 'Low'
                break;
            }
        }
        return (
            <tr>
                <th scope="row" className="index">
                    {this.props.num+1}
                </th>
                <td className="name">
                    {this.props.name}
                </td>
                <td className="level">
                    <div className="level_dsc" style={{ backgroundColor: color }}>
                        {level}
                    </div>
                </td>
                <td className="status" onClick={ () =>this.handleChangeStatus(this.props.id, this.props.name, this.props.level, this.props.isComplete) }>
                    {
                        this.props.isComplete == 'true' ? <i className="fas fa-check" /> : <i className="fas fa-minus"></i>
                    }
                </td>
                <td className="action">
                    <div className="edit" onClick={ ()=> this.handleEditTask(this.props.id, this.props.name, this.props.level, this.props.isComplete) }>
                        <i className="fas fa-pen" />
                    </div>
                    <div className="delete" onClick={ ()=> this.handleDelete(this.props.id) }>
                        <i className="fas fa-trash" />
                    </div>
                </td>
            </tr>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        deleteTask : (id)=>{
            dispatch(deleteTaskRequest(id))
        },
        openForm : () =>{
            dispatch({
                type : 'OPEN_FORM'
            })
        },
        editTask : (id,name,level,isComplete) =>{
            dispatch({
                type : 'GET_EDIT_TASK', 
                id:id,
                name:name,
                level:level,
                isComplete:isComplete
            })
        },
        actchangeStatus : (id,name,level,isComplete) =>{
            dispatch(changeStatusRequest(id,name,level,isComplete))
        }
    }
}

export default connect(null,mapDispatchToProps)(Task)