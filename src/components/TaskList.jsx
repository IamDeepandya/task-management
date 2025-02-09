"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TaskList = ({ tasks = [], fetchTasks }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Toggle between add and edit mode
  const [currentTask, setCurrentTask] = useState({ id: '', title: '', description: '', status: '' });
  // Handle open modal for editing a task
  const openModalForEdit = (task) => {
    setIsEditMode(true);
    setCurrentTask(task);
    setModalVisible(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (for both adding and editing tasks)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/tasks/update/${currentTask?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(currentTask),
    });
    if (response.ok) {
      const data = await response.json();
      toast.success("Task updated successfully");
      fetchTasks();
    }
    closeModal();
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/tasks/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });

    if (response.ok) {
      const data = await response.json();
      toast.success(data?.message);
    }
    fetchTasks();
    closeModal();
  };

  return (
    <div className="mt-6 ml-5 space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <div
              className={`mt-2 inline-block px-3 py-1 text-sm rounded-full 
                ${task.status === 'To Do' ? 'bg-blue-100 text-blue-800' :
                  task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}
            >
              {task.status}
            </div>
            <div className="w-full mt-5 flex items-center gap-x-2">
              <button onClick={() => openModalForEdit(task)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all">
                Edit
              </button>
              <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentTask.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={currentTask.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={currentTask.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
