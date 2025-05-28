import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTodoStart, updateTodoSuccess, updateTodoFailure, deleteTodoStart, deleteTodoSuccess, deleteTodoFailure } from '../../store/slices/todoSlice';
import { updateTodo, deleteTodo } from '../../services/api';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = async () => {
    try {
      dispatch(updateTodoStart());
      const response = await updateTodo(todo._id, { completed: !todo.completed });
      dispatch(updateTodoSuccess(response.data));
    } catch (error) {
      dispatch(updateTodoFailure(error.response?.data?.message || 'Failed to update todo'));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      dispatch(deleteTodoStart());
      await deleteTodo(todo._id);
      dispatch(deleteTodoSuccess(todo._id));
    } catch (error) {
      dispatch(deleteTodoFailure(error.response?.data?.message || 'Failed to delete todo'));
    }
  };

  return (
    <div className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
      todo.completed 
        ? 'bg-gray-50 border border-gray-100' 
        : 'bg-white hover:bg-gray-50 border border-transparent hover:border-gray-100'
    }`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleToggleComplete}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent'
              : 'border-gray-300 hover:border-indigo-600'
          }`}
        >
          {todo.completed && (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <span className={`text-lg transition-all duration-200 ${
          todo.completed 
            ? 'text-gray-500 line-through' 
            : 'text-gray-900'
        }`}>
          {todo.title}
        </span>
      </div>
      
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors duration-200"
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem; 