import {
  StyleSheet,
  Alert,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { color } from '../constant/color';
import { fontFamily } from '../constant/fontFamily';
import PromptBox from '../components/PromptBox';
import axios from 'axios';
import Header from '../components/Header';
import CustomText from '../components/CustomText';
import { useIsFocused } from '@react-navigation/native';
import { LOCAL_TODO_URL } from '../constant/apiUrl';
import Toast from 'react-native-simple-toast';

const HomeScreen = ({ navigation }) => {

  const isFocused = useIsFocused();
  const [todosData, setTodosData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // console.log('todosData', todosData)

  const getTodosData = async () => {
    setLoader(true);
    try {
      const response = await axios.get("http://192.168.100.62:5000/todos");
      // console.log('response', response?.data);
      setLoader(false);
      return setTodosData(response?.data);
    } catch (error) {
      setLoader(false)
      console.log("Error", error);
    };
  };

  useEffect(() => {
    if (isFocused) {
      getTodosData();
    }
  }, [isFocused]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    getTodosData();
    setIsRefreshing(false);
  }

  const deleteHandler = (id) => {
    console.log('id', id);
    Alert.alert('Alert', 'Are you sure you want to delete this task?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes', onPress: async () => {
          try {
            const response = await axios.post(`${LOCAL_TODO_URL}/delete/${id}`);
            console.log('Delete response', response);
            if (response?.data?.status === 200) {
              Toast.show(response?.data?.message, Toast.SHORT, { backgroundColor: color.mineShaft, });
            }
            getTodosData();
          } catch (error) {
            console.log('Delete error', error);
            Toast.show("Please try again!", Toast.LONG, { backgroundColor: color.mineShaft, });
          }
        }
      },
    ]);
  };

  const editHandler = (task) => {
    console.log('task', task)
    navigation.navigate('AddTodo', {
      editable: true,
      todo_title: task?.todo_title,
      todo_description: task?.todo_description,
      task_id: task?._id
    })
  }

  return (
    <>
      {loader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={color.mineShaft} />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <Header
            isAddTaskShow={true}
            title="Tasker"
          />
          {!todosData?.data?.length ? (
            <CustomText
              text={"No Task Available"}
              textStyle={{ fontSize: 19, color: color.shuttle_Gray, marginBottom: 55 }}
              containerStyle={{ alignItems: "center", justifyContent: "center", width: "100%", height: "100%", }}
            />
          ) : (
            <View style={styles.listContainer}>
              <FlatList
                data={todosData?.data.reverse()}
                keyExtractor={item => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                  />}
                contentContainerStyle={{ paddingBottom: 120 }}
                renderItem={({ item }) => {
                  // console.log('item', item);
                  return (
                    <PromptBox
                      title={item?.todo_title ? item?.todo_title : "Tittle"}
                      content={item?.todo_description ? item?.todo_description : ""}
                      deleteAble={() => deleteHandler(item?._id)}
                      editAble={() => editHandler(item)}
                    />
                  )
                }}
              />

            </View>
          )}

        </SafeAreaView>
      )}

    </>

  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: color.white,
  },
  loaderContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: color.mineShaft
  },
  listContainer: {
    // paddingHorizontal: 15,
    paddingTop: 15
  }
})