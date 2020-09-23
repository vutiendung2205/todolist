import React, { Component } from 'react'
import Task from './Task';
import { connect } from 'react-redux';
import { fetchDataRequest } from './actions/index'

class TaskList extends Component {

    componentDidMount(){
        this.props.fetchData()
    }

    render() {
        return (
            <section>
                <div className="container">
                    <div className="task">
                    <h2>Your task list here</h2>
                    <div style={{overflowX: 'auto'}}>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col" className="index">#</th>
                                <th scope="col" className="name">Name</th>
                                <th scope="col" className="level">Level</th>
                                <th scope="col" className="status">Status</th>
                                <th scope="col" className="action">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.data
                                    .sort( (a,b)=>{
                                        let sortBy = this.props.sort.split('-')[0],
                                            sortDir = this.props.sort.split('-')[1]
                                        if(sortDir == 'asc'){
                                            return a[sortBy] - b[sortBy]
                                        } else if(sortDir == 'desc'){
                                            return b[sortBy] -a[sortBy]
                                        }
                                    } )
                                    .filter( (task)=>{
                                        if(task.name.toLowerCase().indexOf(this.props.search) != -1){
                                            return task;
                                        }
                                    } )
                                    .map( (task,index)=>{
                                        return <Task
                                            key={index}
                                            num = {index}
                                            id ={task.id}
                                            name = {task.name}
                                            level = {task.level}
                                            isComplete = {task.isComplete}
                                        />
                                    } )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </section>


        )
    }
}

function mapStateToProps(state){
    return{
        data : state.data,
        sort : state.sort,
        search : state.search
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchData : () =>{
            dispatch(fetchDataRequest())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList)
