"use client"
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'
import React, { useEffect, useState } from 'react'

const Homepage = () => {

  const [tasks, setTasks] = useState([]);
  // Fetch tasks when component mounts
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks/get-tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(()=>{
    fetchTasks();
  },[])

  return (
    <div className='max-w-6xl flex items-starts justify-between gap-x-2 w-full mx-auto p-4'>
      <TaskForm fetchTasks={fetchTasks} />
      <div className='w-full'>
        <h1 className='text-center text-3xl font-semibold mb-10'>List of the tasks</h1>
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    </div>
  )
}

export default Homepage
