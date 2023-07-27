import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomText from '../../components/CustomText';
import LoginImage from '../../assets/images/login.png'
import { fontFamily } from '../../constant/fontFamily';
import AuthInputField from '../../components/AuthInputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { color } from '../../constant/color';
import CustomButton from '../../components/CustomButton';
import BottomLine from '../../components/BottomLine';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginHandler } from '../../redux/slices/loginSlice';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state?.loginReducer?.loader);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    // const [loader, setLoader] = useState(false);

    const loginFormHandler = async () => {

        if (email === "") {
            setEmailErrorMessage("Email is required");
        } else if (!emailRegex.test(email)) {
            setEmailErrorMessage("Invalid email");
        } else {
            setEmailErrorMessage("");
        }

        if (password === "") {
            setPasswordErrorMessage("Password is required");
        } else if (password.length < 8) {
            setPasswordErrorMessage("Password must be at least 8 characters");
        } else {
            setPasswordErrorMessage("");
        }

        if (email === "" || !emailRegex.test(email) || password === "" || password.length < 8) {
            return;
        } else {
            const data = {
                email: email,
                password: password
            };
            dispatch(loginHandler(data))
                .then(res => {
                    console.log('Login response === ', res)
                    if (res?.payload?.status === 200) {
                        Toast.show(res?.payload?.message, Toast.SHORT, { backgroundColor: color.persian_Blue, });
                        navigation.navigate('Home');
                        setEmail("");
                        setPassword("");
                        setIsShowPassword(true);
                    } else {
                        Toast.show(res?.payload?.message, Toast.LONG, { backgroundColor: color.persian_Blue, });
                    }
                })
                .catch(error => console.log('error', error));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image source={LoginImage} style={styles.image} />
                </View>
                <View style={styles.loginAuthContainer}>
                    <CustomText
                        text="Login"
                        textStyle={styles.heading}
                        containerStyle={styles.headingContainer}
                    />
                    <AuthInputField
                        fieldIcon={<MaterialIcons name="alternate-email" size={23} color={color.persian_Blue} />}
                        keyboardType={"email-address"}
                        placeHolder={"Email ID"}
                        onChange={(text) => setEmail(text)}
                        value={email}
                        isErrorText={emailErrorMessage}
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
                    <TouchableOpacity
                        style={styles.forgotTextContainer}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <CustomButton
                        title={"Login"}
                        on_Press={loginFormHandler}
                        isLoader={loader}
                    />

                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginVertical: 20 }}>
                        <View style={styles.lineStyle} />
                        <Text style={{
                            color: color.slate_Gray,
                            alignItems: "center"
                        }}>OR</Text>
                        <View style={styles.lineStyle} />
                    </View>

                    <View style={styles.signupContainer} >
                        <Text style={styles.create_Ac_Text}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signupText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <BottomLine containerStyle={{ marginTop: 30 }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: color.white,
    },
    imageContainer: {
        alignSelf: "center"
    },
    image: {
        width: 350,
        height: 300,
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
        color: color.persian_Blue
    },
    forgotTextContainer: {
        alignSelf: "flex-end",
        marginVertical: 20
    },
    forgotText: {
        fontSize: 16,
        fontFamily: fontFamily.semiBold,
        color: color.persian_Blue,
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