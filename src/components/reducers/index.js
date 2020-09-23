import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'

const initState = {
    data :[],
    isShowForm : false,
    sort: 'name-asc',
    search: ''
}
const reducer = ( state = initState , action ) =>{
  switch (action.type) {
      case 'FETCH_DATA' : { 
        return {...state, data : action.data}
      }
      case 'IS_SHOW_FORM' :
          return {...state,isShowForm : !state.isShowForm};
      case 'SORT' :{
        return {...state,sort: action.sort}
      };
      case "SEARCH" :{
        return {...state,search : action.search}
      }
      default :
        return state;
  }
}
const store = createStore(reducer, applyMiddleware)