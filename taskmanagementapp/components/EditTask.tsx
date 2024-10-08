import React, { useState, useEffect } from 'react';
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

interface EditTaskProps {
  saveTask: (updatedTasks: Task[]) => void;
  navigation: any;
  route: any; 
}

const EditTask: React.FC<EditTaskProps> = ({ saveTask, navigation, route }) => {
  const { task } = route.params;

  console.log('Current Due Date:', task.dueDate);
  const formattedDueDate = task.dueDate.replace(/\//g, '-');

  const [name, setName] = useState(task.name);
  const [dueDate, setDueDate] = useState(formattedDueDate);
  const [status, setStatus] = useState(task.status);

  const { theme, toggleTheme } = useTheme(); 

  useEffect(() => {
    setDueDate(formattedDueDate);
  }, [task.dueDate]);

  const handleEditTask = () => {
    const updatedTask: Task = { ...task, name, dueDate, status };
    saveTask((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
    );
    navigation.goBack(); 
  };

  const onDateChange = (date: string) => {
    const today = new Date();
    const selectedDate = new Date(date);

    if (selectedDate <= today) {
      alert('Please select a future date.');
      return; 
    }

    setDueDate(date); 
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
          selected={task.dueDate}
          onDateChange={onDateChange} 
          options={{
            dateFormat: 'YYYY-MM-DD',
          }}
          style={styles.datePicker}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          style={styles.picker}
          onValueChange={(itemValue) => setStatus(itemValue)}>
          <Picker.Item label="To Do" value="To Do" />
          <Picker.Item label="In Progress" value="In Progress" />
          <Picker.Item label="Completed" value="Completed" />
        </Picker>
      </View>
      <Button title="Save Changes" onPress={handleEditTask} />
   
    </ScrollView>
  );
};

const createStyles = (theme: 'light' | 'dark' | null) =>
  StyleSheet.create({
    container: {
      padding: 20,
      flexGrow: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#000000' : '#000000',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#444444' : '#ccc',
      marginTop: 10,
      padding: 10,
      color: theme === 'dark' ? '#ffffff' : '#000000',
      backgroundColor: theme === 'dark' ? '#333333' : '#ffffff',
    },
    picker: {
      height: 50,
      marginBottom: 10,
    },
    datePicker: {
      marginBottom: 10,
    },
    dateTitle: {
      color: theme === 'dark' ? '#000000' : '#000000',
      marginBottom: 5,
    },
    toggleButton: {
      backgroundColor: '#6200ee',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    toggleButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default EditTask;
