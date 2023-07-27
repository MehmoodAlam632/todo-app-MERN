import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import { color } from '../constant/color';

const CustomCountryPicker = ({
    countryCode,
    isVisible,
    onClose_CountryPicker,
    onOpen_CountryPicker,
    onChangeCountry,
    country_Data

}) => {
    return (
        <View style={styles.container}>
            <View style={styles.showPasswordIconContainer2}>
                <CountryPicker
                    countryCode={countryCode}
                    visible={isVisible}
                    withFlag
                    withCallingCode
                    withAlphaFilter
                    onClose={onClose_CountryPicker}
                    onOpen={onOpen_CountryPicker}
                    onSelect={onChangeCountry}
                />
            </View>
            <Text style={styles.code}>{country_Data?.callingCode[0] ? `+${country_Data?.callingCode[0]}` : `+${1}`}</Text>
            {/* <Entypo name="chevron-down" size={23} color={color.nile_Blue} /> */}
        </View>
    )
}

export default CustomCountryPicker

const styles = StyleSheet.create({
    container: {
        // width: "100%",
        flexDirection: "row",
        gap: 2,
        alignItems: "center"
    },
    showPasswordIconContainer2: {
        // backgroundColor: "red",
    },
    code: {
        // backgroundColor: "green"
    }
})