import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { color } from '../constant/color';
import { fontFamily } from '../constant/fontFamily';
import CustomCountryPicker from './CustomCountryPicker';
import CustomText from './CustomText';

const AuthInputField = ({
    containerStyle,
    fieldIcon,
    textInputStyles,
    icon2,
    placeHolder,
    keyboardType,
    onChange,
    value,
    on_Press,
    secureTextEntry,
    isShowCountryPicker,
    onOpen_CountryPicker,
    isVisible,
    onChangeCountry,
    country_Data,
    onClose_CountryPicker,
    isErrorText,
    inputAndErrorMessageProps,
    editable,
    showPasswordIconContainerProps,
    countryPickerStyleProps
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.fieldIcon_inputAndIcon2_Container}>
                {fieldIcon && (
                    <View style={styles.fieldIconContainer}>
                        {fieldIcon && fieldIcon}
                    </View>
                )}
                {isShowCountryPicker && (
                    <View style={[styles.countryPickerStyle, countryPickerStyleProps]}>
                        <CustomCountryPicker
                            countryCode={country_Data?.cca2 ? country_Data?.cca2 : "US"}
                            onOpen_CountryPicker={onOpen_CountryPicker}
                            isVisible={isVisible}
                            onChangeCountry={onChangeCountry}
                            country_Data={country_Data}
                            onClose_CountryPicker={onClose_CountryPicker}
                        />
                    </View>
                )}
                <View style={[styles.inputAndErrorMessage, inputAndErrorMessageProps,
                { width: isShowCountryPicker ? "81%" : "85%", }
                ]}>
                    {/* {isShowCountryPicker && (
                        <CustomText text={country_Data?.callingCode[0] ? `+${country_Data?.callingCode[0]}` : `+${1}`} />
                    )} */}
                    <TextInput
                        // autoFocus={autoFocus}
                        autoCorrect={true}
                        keyboardType={keyboardType}
                        placeholder={placeHolder}
                        placeholderTextColor={color.slate_Gray}
                        cursorColor={color.nile_Blue}
                        style={[styles.textInput,
                        { width: icon2 ? "90%" : "100%" },
                            textInputStyles]}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={secureTextEntry}
                        editable={editable}
                    />
                    {icon2 &&
                        <TouchableOpacity
                            onPress={on_Press}
                            style={[styles.showPasswordIconContainer, showPasswordIconContainerProps]}
                        >
                            {icon2}
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {isErrorText !== "" && <CustomText text={isErrorText} textStyle={styles.errorText} />}
        </View >
    )
}

export default AuthInputField

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 10,
    },
    fieldIcon_inputAndIcon2_Container: {
        flexDirection: "row",
        alignItems: "center"
    },
    fieldIconContainer: {
        width: "15%",
    },
    countryPickerStyle: { marginTop: 5 },
    inputAndErrorMessage: {
        width: "85%",
        borderBottomWidth: 1,
        borderColor: color.iron,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    textInput: {
        fontSize: 15,
        fontFamily: fontFamily.medium,
        color: color.nile_Blue,
        height: 40,
    },
    showPasswordIconContainer: {
        width: "10%",
        height: 40,
        justifyContent: "center",
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: fontFamily.medium,
        marginLeft: 50,
        marginTop: 5,
    },
});

//https://expo.dev/artifacts/eas/jCtARNggAvtZoiNEhLRjfU.apk