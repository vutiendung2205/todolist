import { callApi } from './../callAPI/apiCaller';
// get data while start
export const fetchDataRequest = () => {
    return (dispatch) =>{
        return callApi( 'data', 'GET', null ).then( (res) =>{
            dispatch(fetchData(res.data))
        } );
    };
}
export const fetchData = (data) => {
    return {
        type : 'FETCH_DATA',
        data : data
    }
}


// delete task while have id'task
export const deleteTaskRequest = (id) =>{
    return (dispatch) =>{
        return callApi(`data/${id}`, 'DELETE', null).then( (res)=>{
            dispatch(deleteTask(id))
        } )
    }
}
export const deleteTask =  (id) =>{
    return{
        type : 'DELETE_TASK',
        id
    }
}

//  add new task
export const addTaskRequest = (name, level, isComplete) =>{
    return (dispatch) =>{
        return callApi('data', 'POST',{
            name: name,
            level : level,
            isComplete : isComplete
        }).then( (res) =>{
            let data = res.data;
            dispatch(addTask( data.id, data.name, data.level, data.isComplete ))
        } )
    }
}
export const addTask = (id,name,level,isComplete) =>{
    return{
        type : 'ADD_TASK',
        id : id,
        name:name,
        level:level,
        isComplete:isComplete
    }
}


//  change task
export const editTaskRequest = (id,name,level,isComplete) =>{
    return (dispatch) =>{
        return callApi( `data/${id}`, 'PUT',{
            name : name,
            level : level,
            isComplete : isComplete
        } ).then( (res) =>{
            dispatch(editTask(res.data.id,res.data.name,res.data.level,res.data.isComplete))
        } )
    }
}


export const editTask = (id,name,level,isComplete) =>{
    return {
        type: 'EDIT_TASK', 
        id : id,
        name: name,
        level: level,
        isComplete : isComplete
    }
}

// change status
export const changeStatusRequest = (id,name,level,isComplete) =>{
    return (dispatch) =>{
        return callApi( `data/${id}`, 'PUT',{
            name : name,
            level : level,
            isComplete : isComplete == 'true' ? 'false' : 'true',
        } ).then( (res) =>{
            dispatch(changeStatus(res.data.id,res.data.name,res.data.level,res.data.isComplete))
        } )
    }
}


export const changeStatus = (id,name,level,isComplete) =>{
    return {
        type: 'CHANGE_STATUS', 
        id : id,
        name: name,
        level: level,
        isComplete : isComplete
    }
}