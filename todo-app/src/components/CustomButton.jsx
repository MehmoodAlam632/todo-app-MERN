import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import React from 'react';
import { color } from '../constant/color';
import { fontFamily } from '../constant/fontFamily';

const CustomButton = ({
    containerStyle,
    title,
    on_Press,
    isLoader,
    textStyle
}) => {
    return (
        <TouchableOpacity
            disabled={isLoader}
            onPress={on_Press}
            style={[styles.container, containerStyle]}
        >
            {isLoader && (
                <ActivityIndicator size="small" color={color.white} />
            )}
            {title && (
                <Text style={[styles.text, textStyle]}>{isLoader ? "Submitting..." : title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 45,
        borderRadius: 8,
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: color.persian_Blue,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    textContainer: {
        flexDirection: "row"
    },
    text: {
        fontSize: 17,
        fontFamily: fontFamily.bold,
        color: color.white,
    },
});
