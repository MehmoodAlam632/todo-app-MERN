import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { color } from '../constant/color';
import Header from '../components/Header';
import { fontFamily } from '../constant/fontFamily';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { LOCAL_TODO_URL } from '../constant/apiUrl';

const AddTodoScreen = ({ navigation, route }) => {

    const { editable, todo_description, todo_title, task_id } = route?.params ? route?.params : {};

    const [title, setTitle] = useState(todo_title ? todo_title : "");
    const [titleErrorMessage, setTitleErrorMessage] = useState("");
    const [description, setDescription] = useState(todo_description ? todo_description : "");
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const addTaskHandler = async () => {
        setLoader(true);
        if (title === "") {
            setTitleErrorMessage("Please enter tittle!");
        } else {
            setTitleErrorMessage("");
        };
        if (description === "") {
            setDescriptionErrorMessage("Please enter Description!");
        } else {
            setDescriptionErrorMessage("");
        };

        if (title === "" || description === "") {
            return setLoader(false);
        } else {
            const data = {
                todo_description: description,
                todo_title: title,
                todo_priority: "High",
                todo_completed: false
            };
            console.log('data', data);
            try {
                const response = await axios.post("http://192.168.100.62:5000/todos/add", data);
                console.log('response', response);
                if (response?.data?.status === 201) {
                    setLoader(false);
                    Toast.show(response?.data?.message, Toast.SHORT, { backgroundColor: color.mineShaft, });
                    navigation.navigate('Home');
                } else {
                    null;
                }
            } catch (error) {
                console.log('error', error);
                setLoader(false);
                Toast.show("Try again!", Toast.LONG, { backgroundColor: color.persian_Blue, });
            }
        };
    };

    const updateTaskHandler = async () => {
        setLoader(true);
        if (title === "") {
            setTitleErrorMessage("Please enter tittle!");
        } else {
            setTitleErrorMessage("");
        };
        if (description === "") {
            setDescriptionErrorMessage("Please enter Description!");
        } else {
            setDescriptionErrorMessage("");
        };

        if (title === "" || description === "") {
            return setLoader(false);
        } else {
            const data = {
                todo_description: description,
                todo_title: title,
                todo_priority: "High",
                todo_completed: false
            };
            try {
                const response = await axios.post(`${LOCAL_TODO_URL}/update/${task_id}`, data);
                console.log('Update response', response);
                if (response?.status === 200) {
                    Toast.show(response?.data?.message, Toast.SHORT, { backgroundColor: color.mineShaft, });
                    navigation.navigate('Home');
                }
                setLoader(false);
            } catch (error) {
                console.log('Update task error', error);
                Toast.show("Try again!", Toast.LONG, { backgroundColor: color.persian_Blue, });
            };
        };
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                isBack={true}
                title={editable ? "Update Task" : "Add Task"}
            />
            <ScrollView style={styles.scrollViewContainer}>
                <CustomText text={"Tittle"}
                    textStyle={styles.headingText}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCorrect={true}
                        placeholder={"Enter Tittle"}
                        placeholderTextColor={color.slate_Gray}
                        cursorColor={color.nile_Blue}
                        style={styles.textInput}
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                    />
                </View>
                {titleErrorMessage !== "" && (
                    <CustomText text={titleErrorMessage} textStyle={styles.errorText} />
                )}
                <CustomText text={"Description"}
                    textStyle={styles.headingText}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCorrect={true}
                        placeholder={"Enter Description"}
                        placeholderTextColor={color.slate_Gray}
                        cursorColor={color.nile_Blue}
                        style={styles.textInput}
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                    />
                </View>
                {descriptionErrorMessage !== "" && (
                    <CustomText text={descriptionErrorMessage} textStyle={styles.errorText} />
                )}
                {editable ? (
                    <CustomButton
                        title={"Update"}
                        containerStyle={styles.buttonContainer}
                        on_Press={updateTaskHandler}
                        isLoader={loader}
                    />
                ) : (
                    <CustomButton
                        title={"Submit"}
                        containerStyle={styles.buttonContainer}
                        on_Press={addTaskHandler}
                        isLoader={loader}
                    />
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

export default AddTodoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: color.white,
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
        paddingTop: 20,

    },
    headingText: {
        fontSize: 16,
        fontFamily: fontFamily.semiBold,
        color: color.mineShaft,
        marginBottom: 5,
        marginLeft: 10,
        marginTop: 40
    },
    inputContainer: {
        borderWidth: 1,
        width: "100%",
        height: 50,
        borderRadius: 10,
        borderColor: color.shuttle_Gray,
        justifyContent: "center",
        paddingLeft: 12
    },
    textInput: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        color: color.shuttle_Gray,
        height: 40,
    },
    buttonContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "#37373d",
        marginTop: 50
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: fontFamily.medium,
        marginLeft: 17,
        marginTop: 5,
    },
})