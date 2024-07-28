import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST } from '../host';

type Todo = {
  _id: string;
  text: string;
};

const HomeScreen: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(HOST + '/api/todos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(HOST + '/api/todos', { text: newTodo }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="New Todo" value={newTodo} onChangeText={setNewTodo} />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
};

export default HomeScreen;
