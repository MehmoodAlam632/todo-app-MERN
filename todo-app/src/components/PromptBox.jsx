import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import CustomText from './CustomText';
import { color } from '../constant/color';
import { fontFamily } from '../constant/fontFamily';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PromptBox = ({
    containerStyle,
    content,
    title,
    deleteAble,
    editAble,
}) => {

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.titleAndTwoIconsContainer}>
                {title && <Text style={styles.titleStyle}>{title}</Text>}
                <View style={styles.twoIconContainer}>
                    <TouchableOpacity
                        onPress={deleteAble}
                        style={styles.iconContainer}
                    >
                        <AntDesign name="delete" style={{ fontSize: 23, color: "red" }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.iconContainer,]}
                        onPress={editAble}
                    >
                        <AntDesign name="edit" style={{ fontSize: 26, color: color.mineShaft }} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.contentStyle}>{content}</Text>

            <View
                style={{
                    paddingHorizontal: 10,
                    alignItems: 'flex-end',
                }}>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        marginHorizontal: 15,
        marginTop: 10
    },
    titleAndTwoIconsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    titleStyle: {
        fontSize: 17,
        fontFamily: fontFamily.bold,
        color: color.mineShaft
    },
    contentStyle: {
        color: color.slate_Gray,
        fontSize: 12,
        fontFamily: fontFamily.medium,
        lineHeight: 15,
        marginTop: 5,
    },
    twoIconContainer: {
        flexDirection: "row",
        // gap: 20,
        alignItems: "center",
    },
    iconContainer: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1
    }

});

export default PromptBox;
