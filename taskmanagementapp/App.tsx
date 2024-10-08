import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import { Task } from './src/text'; 
import { useColorScheme } from 'react-native';
import { ThemeProvider } from './context/ThemeContext'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const colorScheme = useColorScheme(); 

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks); 
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleAddTask = (newTask: Task) => {
    saveTasks([...tasks, newTask]);
  };

  return (
    <ThemeProvider value={colorScheme}> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Task List">
            {(props) => <TaskList {...props} tasks={tasks} setTasks={setTasks} />}
          </Stack.Screen>
          <Stack.Screen name="Add Task">
            {(props) => <AddTask {...props} saveTask={handleAddTask} />}
          </Stack.Screen>
          <Stack.Screen name="Edit Task">
            {(props) => <EditTask {...props} saveTask={saveTasks} tasks={tasks} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
