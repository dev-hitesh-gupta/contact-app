import axios from 'axios';
import store from '../reducers';
import actionTypes from './types';

const API_URL = 'http://localhost:5000/api/users/';


// export function getUsers() {
//   axios.get(API_URL)
//     .then(response => {
//       //     console.log(response);
//       store.dispatch({
//         type: 'GET',
//         payload: response.data.data
//       });
//       store.dispatch({
//         type: 'NO'
//       });
//     });
//   return {
//     type: "YES",
//   }
// }

// export function postUser(user) {
//   axios
//     .post(API_URL, user)
//     .then(() =>
//       axios.get(API_URL)
//         .then(response => {
//           store.dispatch({
//             type: 'GET',
//             payload: response.data.data
//           });
//           store.dispatch({
//             type: 'NO'
//           });
//         })
//     )
//   return {
//     type: "YES",
//   }
// }

// export function updateUser(user, id) {
//   axios
//     .put(API_URL + id, user)
//     .then(() =>
//       axios.get(API_URL)
//         .then(response => {
//           store.dispatch({
//             type: 'GET',
//             payload: response.data.data
//           });
//           store.dispatch({
//             type: 'NEW'
//           })
//           store.dispatch({
//             type: 'NO'
//           });
//         }))
//   return {
//     type: "YES",
//   }
// }

// export function deleteUser(id) {
//   axios
//     .delete(API_URL + id)
//     .then(() =>
//       axios.get(API_URL)
//         .then(response => {
//           store.dispatch({
//             type: 'GET',
//             payload: response.data.data
//           });
//           store.dispatch({
//             type: 'NO'
//           });
//         }))
//   return {
//     type: "YES",
//   }
// }


export function apiCall({ method = 'get', user, id }) {
  let req_obj = { 
    method,
    url: API_URL
   };
  if (method === 'post') {
    req_obj = {
      ...req_obj,
      method: 'post',
      data: user
    }
  }
  if (method === 'put') {
    req_obj = {
      method: 'put',
      url: API_URL + id,
      data: user
    }
  }
  if (method === 'delete') {
    req_obj = {
      method: 'delete',
      url: API_URL + id
    }
  }
  console.log(req_obj);
  axios(req_obj)
    .then(response => {
      //console.log(response);
      if (method === 'get')
        store.dispatch({
          type: actionTypes.SET_USERS,
          payload: response.data.data
        })
        store.dispatch({
          type: actionTypes.FALSE_POST
        })

      if (method !== 'get')
        store.dispatch({
          type: actionTypes.POST_SUCCESS
        })

      store.dispatch({
        type: actionTypes.NEW_USER
      })

      store.dispatch({
        type: actionTypes.FINISH_LOADING
      })
    })
    // .catch(error => {
    //   console.log(error);
    //   store.dispatch({
    //     type: actionTypes.POST_ERROR,
    //     payload: error
    //   })
    // });

  return {
    type: actionTypes.YES_LOADING,
  }
}