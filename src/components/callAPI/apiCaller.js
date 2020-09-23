import axios from 'axios';
import { URL_CALL_API } from './../constants/index'

export const callApi = ( URL , method='GET' ,data ) =>{
    return axios({
        method : method,
        url: `${URL_CALL_API}/${URL}`,
        data: data
    }).catch( (err)=>{
        console.log(err);
    } )
}