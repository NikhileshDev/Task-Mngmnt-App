// reducer.js

import { ADD_TASK, REMOVE_TASK, TOGGLE_TASK, EDIT_TASK, SET_CATEGORY } from "./action";

const initialState = {
    tasks: [],
    category: 'ALL',

};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TASK: 
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        
        case REMOVE_TASK: 
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };
        
        case TOGGLE_TASK:
            return {
                ...state,
                tasks: state.tasks.map (task => task.id === action.payload ? { ...task, completed: !task.completed } : task),
            };

        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map (task => task.id === action.payload.id ? {...task, ...action.payload} : task),
            };

        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload,
            };

        default:
            return state;
    };
};

export default taskReducer;