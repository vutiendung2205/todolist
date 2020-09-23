import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
// import { store } from './components/reducers/index';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'


const initState = {
  data :[],
  isShowForm : false,
  sort: 'name-asc',
  addTask: {
    id : '',
    name : '',
    level : '1',
    isComplete : 'false'
  },
  editTask : {
    id : '',
    name : '',
    level : '',
    isComplete : ''
  },
  changeStatus: '',
  search: ''
}

const reducer = ( state = initState , action ) =>{
switch (action.type) {
    case 'FETCH_DATA' : { 
      return {...state, data : action.data}
    };
    case 'DELETE_TASK' :{
      let taskAftDel = state.data.filter( (task)=> task.id !== action.id )
      return {...state,data: taskAftDel}
    };
    case 'IS_SHOW_FORM' :
        return {...state,isShowForm : !state.isShowForm};
    case 'CLOSE_FORM' : {
      return {...state, isShowForm : false}
    };
    case 'OPEN_FORM' : {
      return {...state, isShowForm : true}
    };
    case 'SORT' :{
      return {...state,sort: action.sort}
    };
    case "SEARCH" :{
      return {...state,search : action.search}
    }
    case 'ADD_TASK' : {
      return {...state,data : [{
        id : action.id,
        name : action.name,
        level: action.level,
        isComplete : action.isComplete
      },...state.data]  }
    };
    
    case 'GET_EDIT_TASK' : {
      let accEditTask = {
        id: action.id,
        name : action.name,
        level : action.level,
        isComplete : action.isComplete
      }
      return {...state, editTask : accEditTask}
    };
    case 'EDIT_TASK' : {
      let actionEditTask = state.data;
      loop1:
      for(let i = 0; i<actionEditTask.length;i++){
        if( actionEditTask[i].id == action.id){
          actionEditTask[i].name = action.name;
          actionEditTask[i].level = action.level;
          actionEditTask[i].isComplete = action.isComplete;
          break loop1;
        }
      }
      return {...state,data : [...actionEditTask]}
    }
    case 'RESET_EDITTASK':{
      return {...state,editTask : {
        id : '',
        name : '',
        level : '',
        isComplete : ''
      }}
    };
    case 'CHANGE_STATUS' :{
      let changeStatusTask = state.data.map( (task)=>{
        if(task.id == action.id){
          task.isComplete = task.isComplete == 'true' ? 'false' : 'true'
        }
        return task;
      } )
      return {...state,data : changeStatusTask}
    }
    default :
      return state;
}
}
const store = createStore(reducer, applyMiddleware(thunk))


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
