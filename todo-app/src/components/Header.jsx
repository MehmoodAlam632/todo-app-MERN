import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import React from 'react'
import { color } from '../constant/color';
import { fontFamily } from '../constant/fontFamily';
import CustomText from './CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Header = ({
    isBack,
    isAddTaskShow,
    title
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                {isBack && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}

                    >
                        <AntDesign name="arrowleft" style={{ fontSize: 26, color: color.white }} />
                    </TouchableOpacity>
                )}
            </View>


            <CustomText
                text={title}
                textStyle={styles.text}
                containerStyle={styles.textContainer}
            />
            <View style={styles.addButtonContainer}>
                {isAddTaskShow && (
                    <TouchableOpacity

                        onPress={() => navigation.navigate('AddTodo')}
                    >
                        <Text style={styles.textAdd}>Add</Text>
                    </TouchableOpacity>
                )}
            </View>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 55,
        backgroundColor: "#1f1f1f",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15
    },
    backButtonContainer: {
        width: "20%",
    },
    textContainer: {
        // width: "10%",
        // borderWidth: 1,
        // borderColor: color.white
    },
    text: {
        fontSize: 22,
        color: color.white,
        fontFamily: fontFamily.bold
    },
    addButtonContainer: {
        width: "20%",
        alignItems: "flex-end"
    },
    textAdd: {
        fontSize: 18,
        color: color.white,
        fontFamily: fontFamily.semiBold
    }
})