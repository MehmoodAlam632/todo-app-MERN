import {
    StyleSheet,
    TouchableOpacity,
    View,
    ActivityIndicator
} from 'react-native';
import React from 'react';
import { color } from '../constant/color';
import CustomText from './CustomText';
import Feather from 'react-native-vector-icons/Feather';

const ProfileCardButton = ({
    isEditable,
    on_Press,
    isLoader,
    isUpdateUser,
    containerStyle,
}) => {
    console.log('isLoader', isLoader)
    return (
        <>
            {isUpdateUser && (
                <TouchableOpacity
                    disabled={isLoader}
                    onPress={on_Press}
                    style={[styles.container, containerStyle]}
                >
                    {isLoader ? (
                        <ActivityIndicator size="small" color={color.persian_Blue} />
                    ) : (
                        <Feather name="check-square" style={styles.font} />
                    )}
                </TouchableOpacity>
            )}
            {!isUpdateUser && (
                <TouchableOpacity
                    onPress={isEditable}
                    style={[styles.container, containerStyle]}
                >
                    <Feather name="edit" style={styles.font} />
                </TouchableOpacity>
            )}
        </>
    )
}

export default ProfileCardButton

const styles = StyleSheet.create({
    container: {
    },
    font: {
        fontSize: 22,
        color: color.persian_Blue,
    }
})