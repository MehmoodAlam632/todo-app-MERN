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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color } from '../../constant/color';
import CustomButton from '../../components/CustomButton';
import BottomLine from '../../components/BottomLine';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordHandler } from '../../redux/slices/forgotPasswordSlice';
import Toast from 'react-native-simple-toast';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ForgotPasswordScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state?.forgotPasswordReducer?.loader);

    const [email, setEmail] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const forgotPasswordFormHandler = () => {
        if (email === "") {
            setEmailErrorMessage("Email is required");
        } else if (!emailRegex.test(email)) {
            setEmailErrorMessage("Invalid email");
        } else {
            setEmailErrorMessage("");
        };

        if (email === "" || !emailRegex.test(email)) {
            return;
        } else {
            const data = {
                email: email
            };
            dispatch(forgotPasswordHandler(data))
                .then(forgot_Response => {
                    console.log('forgot_Response', forgot_Response?.payload);
                    if (forgot_Response?.payload?.status === 200) {
                        Toast.show(forgot_Response?.payload?.message, Toast.SHORT, { backgroundColor: color.persian_Blue, });
                        navigation.navigate('OTPCode', { userEmail: email });
                    } else {
                        Toast.show(forgot_Response?.payload?.message, Toast.LONG, { backgroundColor: color.persian_Blue, });
                    };
                })
                .catch(error => console.log('Forgot error', error));
        };
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
                        text="Forgot Password?"
                        textStyle={styles.heading}
                        containerStyle={styles.headingContainer}
                    />
                    <CustomText
                        text="Don't worry! It happens. Please enter the address associated with your account."
                        textStyle={styles.forgotText}
                        containerStyle={styles.forgotTextContainer}
                    />
                    <AuthInputField
                        fieldIcon={<MaterialIcons name="alternate-email" size={23} color={color.persian_Blue} />}
                        keyboardType={"email-address"}
                        placeHolder={"Email ID"}
                        onChange={(text) => setEmail(text)}
                        value={email}
                        containerStyle={{ marginTop: 10 }}
                        isErrorText={emailErrorMessage}
                    />
                    <CustomButton
                        title={"Submit"}
                        containerStyle={{ marginTop: 45 }}
                        on_Press={forgotPasswordFormHandler}
                        isLoader={loader}
                    />
                </View>
            </ScrollView>
            <BottomLine containerStyle={{ marginBottom: 5 }} />
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white",
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
        alignSelf: "center"
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