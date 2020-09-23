import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTask from './AddTask';

class Option extends Component {
    constructor(props){
        super(props)
        


        this.isShowForm = this.isShowForm.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    isShowForm(){
        this.props.showForm();
        
    }
    handleSort(e){
        this.props.sortBy(e.target.value)
    }
    handleSearch(e){
        this.props.search(e.target.value.trim().toLowerCase())
    }
    render() {
        return (
            <section>
                <div className="container">
                    <div className="container1">
                    <div className="row">
                        <div className="col-lg-6 col-sm-12 col-md-12 col-12">
                            <div className="input_search">
                                <input type="text" placeholder="Search..." maxLength={50} onChange={ (e)=>this.handleSearch(e) } />
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12 col-md-6 col-12">
                            <div className="new_task">
                                
                                <div className="input-group new__task">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="sortBy">Sort By : </span>
                                    </div>
                                    <div className="input-group-prepend">
                                        <select className="custom-select" defaultValue={this.props.sort} id="sortBy"  onChange={ (e)=> this.handleSort(e) }  >
                                            <option value="name-asc">Name ASC</option>
                                            <option value="name-desc">Name DESC</option>
                                            <option value="level-asc">Level ASC</option>
                                            <option value="level-desc">Level DESC</option>
                                            <option value="isComplete-asc">Status ASC</option>
                                            <option value="isComplete-desc">Status DESC</option>
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12 col-md-6 col-12">
                                <button className="btn btn-outline-info" onClick={this.isShowForm} >Add new task</button>
                        </div>
                    </div>
                    {
                        this.props.isShowForm == true ? <AddTask /> : null
                    }     
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProp(state){
    return{
        isShowForm : state.isShowForm,
        sort : state.sort
    }
}

function mapDispatchToProps(dispatch){
    return {
        showForm : () =>{
            dispatch({
                type: "IS_SHOW_FORM"
            })
        },
        sortBy : (sort)=>{
            dispatch({
                type: "SORT",
                sort: sort
            })
        },
        search : (key)=>{
            dispatch({
                type : 'SEARCH',
                search : key
            })
        }
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(Option);