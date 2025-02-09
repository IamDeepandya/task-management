"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ tasks = []}) => {
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
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
