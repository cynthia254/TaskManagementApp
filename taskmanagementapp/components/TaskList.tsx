import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../src/text';
import { useTheme } from '../context/ThemeContext'; 

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  navigation: any;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
  const { theme, toggleTheme } = useTheme(); 

  const statusColors: { [key: string]: string } = {
    'To Do': '#ffcccb',
    'In Progress': '#ffe4b5',
    Completed: '#90ee90',
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const randomQuote = data[0]; 
      setQuote({ text: randomQuote.q, author: randomQuote.a });
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id.toString() !== id);
    setTasks(newTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(newTasks))
      .then(() => console.log('Tasks deleted successfully'))
      .catch((error) => console.error('Error deleting tasks:', error));
  };

  const filteredTasks = tasks.filter((task) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      task.name.toLowerCase().includes(lowerCaseTerm) ||
      task.dueDate.includes(lowerCaseTerm) ||
      task.status.toLowerCase().includes(lowerCaseTerm)
    );
  });

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {quote && (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.quoteAuthor}>- {quote.author || 'Unknown'}</Text>
        </View>
      )}
       <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Text style={styles.toggleButtonText}>Toggle Theme</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by name, due date, or status..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Add Task')}
        >
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

     

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskItem,
              { backgroundColor: statusColors[item.status] },
            ]}
          >
            <Text style={styles.taskName}>{item.name}</Text>
            <Text>{item.dueDate}</Text>
            <Text style={styles.statusText}>{item.status}</Text>
            <View style={styles.innerButtonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('Edit Task', { task: item })}
              >
                <Text style={styles.innerButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.innerButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={filteredTasks.length === 0 ? styles.emptyList : {}}
      />
    </View>
  );
};

const createStyles = (theme: 'light' | 'dark' | null) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
    },
    quoteContainer: {
      padding: 15,
      backgroundColor: theme === 'dark' ? '#333' : '#f9f9f9',
      borderRadius: 5,
      marginBottom: 20,
    },
    quoteText: {
      fontSize: 16,
      fontStyle: 'italic',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    quoteAuthor: {
      textAlign: 'right',
      fontWeight: 'bold',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    buttonContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    taskItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      flexDirection: 'column',
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: theme === 'dark' ? '#444444' : '#f9f9f9',
    },
    taskName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme === 'dark' ? '#000000' : '#000000',
    },
    statusText: {
      marginTop: 5,
      fontStyle: 'italic',
      color: theme === 'dark' ? '#000000' : '#000000',
    },
    innerButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    addButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 20,
      width: '80%',
      alignItems: 'center',
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    innerButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    editButton: {
      backgroundColor: '#007bff',
      borderRadius: 5,
      padding: 10,
      width: '30%',
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: '#ff4d4d',
      borderRadius: 5,
      padding: 10,
      width: '30%',
      alignItems: 'center',
    },
    toggleButton: {
      backgroundColor: '#6200ee',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 20,
    },
    toggleButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    emptyList: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default TaskList;
