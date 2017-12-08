import {HTTP} from './../utils/HTTP';

import {
  GROUPS_ADD_REQUEST,
  GROUPS_ADD_SUCCESS,
  GROUPS_ADD_FAIL,
  GROUPS_DELETE_FAIL,
  GROUPS_DELETE_REQUEST,
  GROUPS_DELETE_SUCCESS,
  GROUPS_GET_FAIL,
  GROUPS_GET_REQUEST,
  GROUPS_GET_SUCCESS,
  GROUPS_UPDATE_FAIL,
  GROUPS_UPDATE_REQUEST,
  GROUPS_UPDATE_SUCCESS,
  PROGRESS_ADD_REQUEST,
  PROGRESS_REMOVE_REQUEST,
  SNACKBAR_REMOVE,
  SNACKBAR_SHOW
} from './../constants/ActionTypes';
import snackBarMessages from '../constants/SnackBarMessages';

export function groupsGetRequest(number, size) {
  let params = {};
  params.page = number;
  params.size = size;
  params.type = 2;

  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/group/', null, {authorization: localStorage.getItem('@fnovella:token')}, params)
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: GROUPS_GET_SUCCESS,
                data: response.data.data
              });
              // console.log(response.data.data);
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: GROUPS_GET_FAIL,
              error: error
            });
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function groupsAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('post', '/group/', data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: GROUPS_ADD_SUCCESS,
                data: response.data.data
              });
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: snackBarMessages.ENTITY_ADDED
                }
              });
              resolve(response.data);
            } else {
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: "Error: " + response.data.errors.join(', ')
                }
              });
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ERROR
              }
            });
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function groupsUpdateRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('patch', '/group/' + data.id, data, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: GROUPS_UPDATE_SUCCESS,
                data: response.data.data
              });
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: snackBarMessages.ENTITY_UPDATED
                }
              });
              resolve(response.data);
            } else {
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: "Error: " + response.data.errors.join(', ')
                }
              });
              reject(response.data);
            }

          })
          .catch(error => {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ERROR
              }
            });
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function groupsDeleteRequest(id) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('delete', '/group/' + id, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              dispatch({
                type: GROUPS_DELETE_SUCCESS,
                data: {
                  id
                }
              });
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: snackBarMessages.ENTITY_DELETED
                }
              });
              resolve(response.data);
            } else {
              dispatch({
                type: SNACKBAR_SHOW,
                data: {
                  message: "Error: " + response.data.errors.join(', ')
                }
              });
              reject(response.data);
            }
          })
          .catch(error => {
            dispatch({
              type: SNACKBAR_SHOW,
              data: {
                message: snackBarMessages.ERROR
              }
            });
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function groupGetByIdRequest(groupId) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/group/' + groupId, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function evaluationAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/evaluation/', data, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function evaluationActivityAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/evaluation_activity/', data, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}

export function evaluationRangeAddRequest(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      {
        dispatch({
          type: PROGRESS_ADD_REQUEST
        });
        // API
        HTTP('get', '/evaluation_range/', data, null, {authorization: localStorage.getItem('@fnovella:token')})
          .then(function (response) {
            if (response.data.errors === null) {
              resolve(response.data);
            } else {
              reject(response.data);
            }
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: PROGRESS_REMOVE_REQUEST
            });
          })
      }
    })
  }
}
