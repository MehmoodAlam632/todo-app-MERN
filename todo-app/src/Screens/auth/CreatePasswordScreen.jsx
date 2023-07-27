import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import CustomText from '../../components/CustomText';
import ForgotImage from '../../assets/images/forgot.png'
import { fontFamily } from '../../constant/fontFamily';
import AuthInputField from '../../components/AuthInputField';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color } from '../../constant/color';
import CustomButton from '../../components/CustomButton';
import BottomLine from '../../components/BottomLine';

const CreatePasswordScreen = ({ navigation, route }) => {

    const { userEmail } = route?.params ? route?.params : {};
    console.log('userEmail', userEmail)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const createPasswordHandler = () => {
        setLoader(true);
        if (password === "") {
            setPasswordErrorMessage("Password is required");
        } else if (password.length < 8) {
            setPasswordErrorMessage("Password must be at least 8 characters");
        } else {
            setPasswordErrorMessage("");
        };

        if (confirmPassword === "") {
            setConfirmPasswordErrorMessage("Confirm password is required");
        } else if (password !== confirmPassword) {
            setConfirmPasswordErrorMessage("Confirmation Password does not match");
        } else {
            setConfirmPasswordErrorMessage("");
        };

        if (password === "" || password.length < 8 || confirmPassword === "" || password !== confirmPassword) {
            return setLoader(false);
        } else {
            setLoader(true);
            const data = {
                password: password,
                confirmationPassword: confirmPassword
            };
            console.log('CreatePasswordScreen data', data);
            navigation.navigate('Login');
            setLoader(false);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: 70, height: 60, paddingLeft: 20, justifyContent: "center", }}
            >
                <AntDesign name="arrowleft" style={{ fontSize: 26, color: color.persian_Blue }} />
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={ForgotImage} style={styles.image} />
                </View>
                <View style={styles.loginAuthContainer}>
                    <CustomText
                        text="Reset Password"
                        textStyle={styles.heading}
                        containerStyle={styles.headingContainer}
                    />
                    <AuthInputField
                        fieldIcon={<SimpleLineIcons name="lock" style={{ fontSize: 20, color: color.persian_Blue, }} />}
                        placeHolder={"Password"}
                        onChange={(text) => setPassword(text)}
                        value={password}
                        on_Press={() => setIsShowPassword(!isShowPassword)}
                        secureTextEntry={isShowPassword}
                        icon2={<Ionicons name={isShowPassword ? "eye-off-outline" : "eye-outline"} style={{ fontSize: 25, color: color.persian_Blue, }} />}
                        isErrorText={passwordErrorMessage}
                    />
                    <AuthInputField
                        fieldIcon={<SimpleLineIcons name="lock" style={{ fontSize: 20, color: color.persian_Blue, }} />}
                        placeHolder={"Confirm Password"}
                        onChange={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        on_Press={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                        secureTextEntry={isShowConfirmPassword}
                        icon2={<Ionicons name={isShowConfirmPassword ? "eye-off-outline" : "eye-outline"} style={{ fontSize: 25, color: color.persian_Blue, }} />}
                        isErrorText={confirmPasswordErrorMessage}
                    />
                    <CustomButton
                        title={"Submit"}
                        containerStyle={{ marginTop: 45 }}
                        on_Press={createPasswordHandler}
                        isLoader={loader}
                    />
                </View>
            </ScrollView>
            <BottomLine containerStyle={{ marginBottom: 5 }} />
        </SafeAreaView>
    );
};

export default CreatePasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: color.white,
    },
    imageContainer: {
        alignSelf: "center",
        marginTop: -20,
    },
    image: {
        width: 350,
        height: 300,
        // resizeMode: "contain"
    },
    loginAuthContainer: {
        paddingHorizontal: 25,
    },
    headingContainer: {
        marginTop: 20,
        alignSelf: "center",
        marginBottom: 20
    },
    heading: {
        fontSize: 30,
        fontFamily: fontFamily.bold,
        lineHeight: 35,
        color: color.persian_Blue
    },
    forgotTextContainer: {
        marginVertical: 20
    },
    forgotText: {
        fontSize: 15,
        fontFamily: fontFamily.medium,
        color: color.shuttle_Gray,
        lineHeight: 18
    },
    lineStyle: {
        backgroundColor: color.slate_Gray,
        width: "40%",
        height: 0.5,
    },
    signupContainer: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        alignSelf: "center"
    },
    create_Ac_Text: {
        fontSize: 13,
        fontFamily: fontFamily.medium,
        color: color.slate_Gray
    },
    signupText: {
        fontSize: 15,
        fontFamily: fontFamily.medium,
        color: color.persian_Blue
    },
});