
import taskReducer, { addTask, removeTask, toggleTaskComplete, editTask } from "./taskSlice";
import dayjs from "dayjs";

describe('taskSlice', () => {

  const initialState = [
    { id: 1, text: 'Test Task', completed: false, description: '', dueDate: null },
    { id: 2, text: 'Another Task', completed: true, description: 'This is completed', dueDate: '2023-12-31' }
  ];

  it('should handle addTask', () => {
    const newTask = { text: 'New Task', completed: false, description: '', dueDate: null };
    const action = addTask(newTask);
    
    const state = taskReducer(initialState, action);
    
    expect(state.length).toBe(3); // After adding, the length should be 3
    expect(state[2].text).toBe('New Task'); // The new task text should match
  });

  it('should handle toggleTaskComplete', () => {
    const action = toggleTaskComplete(1); // Toggle completion of task with id 1
    const state = taskReducer(initialState, action);
    
    expect(state[0].completed).toBe(true); // The task with id 1 should now be marked as completed
  });

  it('should handle removeTask', () => {
    const action = removeTask(1); // Remove task with id 1
    const state = taskReducer(initialState, action);
    
    expect(state.length).toBe(1); // The length should reduce to 1
    expect(state[0].id).toBe(2); // Only task with id 2 should remain
  });

  it('should handle editTask', () => {
    const updatedTask = { 
      id: 1, 
      text: 'Updated Task', 
      description: 'Updated Description', 
      dueDate: dayjs('2023-12-25').format('YYYY-MM-DD') 
    };
    const action = editTask(updatedTask); // Edit task with id 1
    const state = taskReducer(initialState, action);
    
    expect(state[0].text).toBe('Updated Task'); // The text should be updated
    expect(state[0].description).toBe('Updated Description'); // The description should be updated
    expect(state[0].dueDate).toBe('2023-12-25'); // The due date should be updated
  });

});
