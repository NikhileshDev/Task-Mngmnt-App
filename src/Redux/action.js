// action.js

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TOGGLE_TASK = 'tOGGLE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const SET_CATEGORY = 'SET_CATEGORY';

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const removeTask = (id) => ({
    type: REMOVE_TASK,
    payload: id,
});

export const toggleTaskCompletion = (id) => ({
    type: TOGGLE_TASK,
    payload: id,
});

export const editTask = (task) => ({
    type: EDIT_TASK,
    payload: task,
});

export const setCategory = (category) => ({
    type: SET_CATEGORY,
    payload: category,
});