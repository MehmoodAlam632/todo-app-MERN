import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fontFamily } from '../constant/fontFamily';
import { color } from '../constant/color';

const CustomText = ({
    containerStyle,
    textStyle,
    text,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </View>
    );
};

export default CustomText

const styles = StyleSheet.create({
    container: {

    },
    text: {
        color: color.nile_Blue,
        fontFamily: fontFamily.medium,
        fontSize: 15,
    }
})