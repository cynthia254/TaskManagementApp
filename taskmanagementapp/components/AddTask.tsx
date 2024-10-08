import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Task } from '../src/text'; 
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import { useTheme } from '../context/ThemeContext';

interface AddTaskProps {
  saveTask: (newTask: Task) => void;
  navigation: any; 
}

const AddTask: React.FC<AddTaskProps> = ({ saveTask, navigation }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Completed'>('To Do');
  
  const { theme, toggleTheme } = useTheme(); 

  const isValidDate = (dateString: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(dateString);
    inputDate.setHours(0, 0, 0, 0); 

    return inputDate > today && !isNaN(inputDate.getTime());
  };

  const handleAddTask = () => {
    if (!name) {
      alert('Task name cannot be empty.');
      return;
    }
    if (!dueDate || !isValidDate(dueDate)) {
      alert('Please enter a valid future date in YYYY-MM-DD format.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      name,
      dueDate,
      status,
    };

    saveTask(newTask); 
    setName('');
    setDueDate('');
    setStatus('To Do');
    navigation.goBack(); 
  };

  const styles = createStyles(theme); 

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Text style={styles.toggleButtonText}>Toggle Theme</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <View style={styles.container}>
        <Text style={styles.dateTitle}>Due Date</Text>
        <DatePicker
          mode="calendar"
          date={dueDate} 
          onDateChange={(date) => setDueDate(date)}
          options={{
            dateFormat: 'YYYY-MM-DD',
          }}
          style={styles.datePicker}
        />
      </View>
      <Picker
        selectedValue={status}
        style={styles.picker}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="To Do" value="To Do" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Completed" value="Completed" />
      </Picker>
      <Button title="Add Task" onPress={handleAddTask} />
    </ScrollView>
  );
};

const createStyles = (colorScheme: 'light' | 'dark' | null) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flexGrow: 1,
      backgroundColor: colorScheme === 'dark' ? '#121212' : '#ffffff',
    },
    input: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#444444' : '#ccc',
      marginBottom: 10,
      padding: 10,
      color: colorScheme === 'dark' ? '#ffffff' : '#000000',
      backgroundColor: colorScheme === 'dark' ? '#333333' : '#ffffff',
    },
    picker: {
      height: 50,
      marginBottom: 10,
      color: colorScheme === 'dark' ? '#000000' : '#000000',
    },
    datePicker: {
      marginBottom: 10,
    },
    dateTitle: {
      color: colorScheme === 'dark' ? '#000000' : '#000000',
      marginBottom: 5,
    },
    toggleButton: {
      backgroundColor: colorScheme === 'dark' ? '#6200ee' : '#6200ee',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 20,
    },
    toggleButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default AddTask;
