import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import CustomText from '../../components/CustomText';
import OTP_CodeImage from '../../assets/images/otp-code.png'
import { fontFamily } from '../../constant/fontFamily';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color } from '../../constant/color';
import CustomButton from '../../components/CustomButton';
import BottomLine from '../../components/BottomLine';
import CodeInput from 'react-native-code-input';
import { useDispatch, useSelector } from 'react-redux';
import { otpCodeHandler } from '../../redux/slices/otpCodeSlice';
import Toast from 'react-native-simple-toast';
import { forgotPasswordHandler } from '../../redux/slices/forgotPasswordSlice';

const OTPCodeScreen = ({ navigation, route }) => {
    const codeInputRef = useRef();
    const myInterval = useRef(null);

    const dispatch = useDispatch();
    const loader = useSelector(state => state?.otpCodeReducer?.loader);
    const resendLoader = useSelector(state => state?.forgotPasswordReducer?.loader);

    const { userEmail } = route?.params ? route?.params : {};

    const [otpCode, setOtpCode] = useState("");
    const [codeErrorMessage, setCodeErrorMessage] = useState("");
    const [counter, setCounter] = useState(14);
    const [isRunning, setIsRunning] = useState(false);

    let minutes = 0;
    let seconds = 0;
    if (counter) {
        minutes = Math.floor((counter % 3600) / 60);
        seconds = Math.floor(counter % 60);
    }

    useEffect(() => {
        return () => clearInterval(myInterval.current);
    }, []);

    useEffect(() => {
        if (isRunning && counter !== 0) {
            myInterval.current = setInterval(
                () => setCounter((counter) => counter - 1),
                1000
            );
        }
    }, [isRunning]);

    useEffect(() => {
        setIsRunning(true);
    }, [])

    useEffect(() => {
        if (counter === 0) {
            clearInterval(myInterval?.current);
            myInterval.current = null;
            setIsRunning(false);
        }
    }, [counter]);

    const otpCodeFormHandler = () => {
        if (otpCode === "") {
            setCodeErrorMessage("Please enter 6 digit code");
            return
        } else {
            setCodeErrorMessage("")
            const data = {
                otp_code: parseInt(otpCode),
                email: userEmail
            }

            dispatch(otpCodeHandler(data))
                .then(otpCode_Response => {
                    console.log('otpCode_Response', otpCode_Response);
                    if (otpCode_Response?.payload?.status === 202) {
                        Toast.show(otpCode_Response?.payload?.message, Toast.SHORT, { backgroundColor: color.persian_Blue, });
                        navigation.navigate('CreatePassword', { userEmail });
                        setOtpCode("");
                        codeInputRef.current.clear();
                    } else {
                        Toast.show(otpCode_Response?.payload?.message, Toast.LONG, { backgroundColor: color.persian_Blue, });
                        setOtpCode("");
                        codeInputRef.current.clear();
                    }
                })
                .catch(error => console.log('OTP code error', error))
        };
    };

    const resendHandler = () => {
        if (userEmail !== "") {
            const data = {
                email: userEmail
            };
            dispatch(forgotPasswordHandler(data))
                .then(forgot_Response => {
                    console.log('forgot_Response', forgot_Response?.payload);
                    if (forgot_Response?.payload?.status === 200) {
                        Toast.show(forgot_Response?.payload?.message, Toast.SHORT, { backgroundColor: color.persian_Blue, });
                        setCounter(299);
                        setIsRunning(true);
                        setOtpCode("");
                        codeInputRef.current.clear();
                    } else {
                        Toast.show(forgot_Response?.payload?.message, Toast.LONG, { backgroundColor: color.persian_Blue, });
                    };
                })
                .catch(error => console.log('Forgot error', error));
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: 70, height: 60, paddingLeft: 20, justifyContent: "center" }}
            >
                <AntDesign name="arrowleft" style={{ fontSize: 26, color: color.persian_Blue }} />
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={OTP_CodeImage} style={styles.image} />
                </View>
                <View style={styles.loginAuthContainer}>
                    <CustomText
                        text="Enter OTP"
                        textStyle={styles.heading}
                        containerStyle={styles.headingContainer}
                    />
                    <CustomText
                        text={`6 digit code has been sent to ${userEmail ? userEmail : ""} `}
                        textStyle={styles.forgotText}
                        containerStyle={styles.forgotTextContainer}
                    />

                    <CodeInput
                        ref={codeInputRef}
                        codeLength={6}
                        space={5}
                        onFulfill={(code) => setOtpCode(code)}
                        borderType={"square"}
                        cellBorderWidth={2}
                        activeColor={color.persian_Blue}
                        codeInputStyle={{ backgroundColor: "rgba(0, 25, 79, 0.08)", borderRadius: 10, color: color.shuttle_Gray, fontSize: 20 }}
                        size={50}
                        secureTextEntry={false}
                    />
                    {codeErrorMessage !== "" && (
                        <CustomText
                            text={codeErrorMessage}
                            textStyle={styles.errorText}
                            containerStyle={{ alignSelf: "center" }}
                        />
                    )}
                    {counter > 0 && (
                        <CustomText
                            text={counter && counter > 0 && `Code will expire in   ${minutes} : ${seconds}`}
                            textStyle={{
                                fontSize: 15,
                                color: counter > 10 ? color.persian_Blue : "red",
                                fontFamily: fontFamily.medium,
                            }}
                            containerStyle={{ marginTop: 10 }}
                        />
                    )}

                    <View style={styles.signupContainer} >
                        <Text style={styles.create_Ac_Text}>{counter === 0 ? "Your OTP code has been expired!" : "If you didn't recive a code?"}</Text>
                        <TouchableOpacity
                            disabled={resendLoader}
                            onPress={resendHandler}
                        >
                            <Text style={styles.signupText}>{resendLoader ? "Please wait..." : "Resend"} </Text>
                        </TouchableOpacity>
                    </View>


                    <CustomButton
                        title={"Enter"}
                        containerStyle={{ marginTop: 35, marginBottom: 35 }}
                        on_Press={otpCodeFormHandler}
                        isLoader={loader}
                    />
                </View>
            </ScrollView>
            <BottomLine containerStyle={{ marginBottom: 5 }} />
        </SafeAreaView>
    );
};

export default OTPCodeScreen;

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
        resizeMode: "contain"
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
        marginVertical: 20,
        width: 270,
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
        alignSelf: "center",
        marginTop: 35
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
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: fontFamily.medium,
        marginTop: 5
    },
    counterText: {

    }
});