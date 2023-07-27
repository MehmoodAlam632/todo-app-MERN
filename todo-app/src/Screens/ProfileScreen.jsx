import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { color } from '../constant/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UserIcon from '../assets/images/user.png';
import CustomText from '../components/CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import { fontFamily } from '../constant/fontFamily';
import AuthInputField from '../components/AuthInputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileCardButton from '../components/ProfileCardButton';
import LinearGradient from 'react-native-linear-gradient';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ProfileScreen = ({ navigation }) => {
    const [userName, setUserName] = useState("User");
    const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
    const [isUserNameEditable, setIsUserNameEditable] = useState(false);
    const [email, setEmail] = useState("testing@gmail.com");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [isUserEmailEditable, setIsUserEmailEditable] = useState(false);
    const [number, setNumber] = useState("3203358338");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [isShowCountryPicker, setIsShowCountryPicker] = useState(false);
    const [country_code, set_country_code] = useState();
    const [isUserNumberEditable, setIsUserNumberEditable] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isUserPasswordEditable, setIsUserPasswordEditable] = useState(false);
    const [loader, setLoader] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

    const checkUsernameSpace = (text) => {
        const splittedText = text.split(" ");
        return splittedText?.length > 0 && splittedText?.length < 2;
    };

    const profileUpdateHandler = (type) => {
        console.log('type', type)
        setLoader(true);
        if (type === "UserName") {
            if (userName === "") {
                setUserNameErrorMessage("User name is required");
            } else if (!checkUsernameSpace(userName)) {
                setUserNameErrorMessage("Please remove spaces from your username");
            } else {
                setUserNameErrorMessage("");
            };
        } else if (type === "Email") {
            if (email === "") {
                setEmailErrorMessage("Email is required");
            } else if (!emailRegex.test(email)) {
                setEmailErrorMessage("Invalid email");
            } else {
                setEmailErrorMessage("");
            };
        } else if (type === "Phone") {
            if (number === 0) {
                setPhoneErrorMessage("Phone number is required");
            } else if (number?.length < 8) {
                setPhoneErrorMessage("Number should be atleast the 8 characters long except country code");
            } else {
                setPhoneErrorMessage("");
            };
        } else if (type === "Password") {
            if (password.length > 1 || password.length < 8) {
                setPasswordErrorMessage("Password must be at least 8 characters");
            } else {
                setPasswordErrorMessage("");
            }
        }
        if (userName === "" || !checkUsernameSpace(userName) || email === "" || !emailRegex.test(email) || number === 0 || number?.length < 8 || password.length > 1 || password.length < 8) {
            return setLoader(false);
        } else {
            console.log("Every thing is perfect");
            const data = {
                userName: userName,
                userEmail: email,
                userPassword: password,
                confirmPassword: confirmPassword,
                countryCode: country_code?.callingCode[0] ? country_code?.callingCode[0] : 1,
                phoneNumber: number,
            };
            console.log('profileUpdateHandler data', data);
            setIsUserNameEditable(false);
            setIsUserEmailEditable(false);
            setIsUserNumberEditable(false);
            setIsUserPasswordEditable(false);
            setLoader(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{ width: 70, height: 60, marginLeft: 20, justifyContent: "center" }}
            >
                <AntDesign name="arrowleft" style={{ fontSize: 26, color: color.persian_Blue }} />
            </TouchableOpacity>
            <ScrollView style={styles.scrollViewContainer}>
                <LinearGradient
                    colors={['#8000FF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#00FFFF']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.5, y: 1.0 }}
                    style={{ marginVertical: 70, borderRadius: 8, padding: 2 }}
                >
                    <View style={{ backgroundColor: color.white, borderRadius: 6, paddingHorizontal: 10, paddingBottom: 15 }}>
                        <View style={styles.userContainer}>
                            <Image source={UserIcon} style={styles.user} />
                        </View>
                        <CustomText text={userName}
                            textStyle={{ fontSize: 18, fontFamily: fontFamily.semiBold, color: color.persian_Blue }}
                            containerStyle={{ alignSelf: "center", marginBottom: 0 }}
                        />
                        <CustomText text={email}
                            textStyle={{ fontSize: 12, fontFamily: fontFamily.semiBold, color: color.shuttle_Gray }}
                            containerStyle={{ alignSelf: "center", marginBottom: 2 }}
                        />
                        <CustomText text={"+92 "}
                            textStyle={{ fontSize: 15, fontFamily: fontFamily.semiBold, color: color.shuttle_Gray }}
                            containerStyle={{ alignSelf: "center", marginBottom: 20 }}
                        />
                        <View style={styles.inputFieldContainer}>
                            <AuthInputField
                                placeHolder={"User Name"}
                                onChange={(text) => setUserName(text)}
                                value={userName}
                                isErrorText={""}
                                containerStyle={styles.mainInputContainer}
                                inputAndErrorMessageProps={styles.inputAndIcon2Container}
                                editable={isUserNameEditable}
                            />

                            <ProfileCardButton
                                isEditable={() => setIsUserNameEditable(true)}
                                on_Press={() => profileUpdateHandler("UserName")}
                                isUpdateUser={isUserNameEditable}
                                isLoader={loader}
                            />
                        </View>
                        {userNameErrorMessage && (
                            <CustomText text={userNameErrorMessage} textStyle={styles.errorText} />
                        )}
                        <View style={styles.inputFieldContainer}>
                            <AuthInputField
                                placeHolder={"Email ID"}
                                keyboardType={"email-address"}
                                onChange={(text) => setEmail(text)}
                                value={email}
                                isErrorText={""}
                                containerStyle={styles.mainInputContainer}
                                inputAndErrorMessageProps={styles.inputAndIcon2Container}
                                editable={isUserEmailEditable}
                            />
                            <ProfileCardButton
                                isEditable={() => setIsUserEmailEditable(true)}
                                on_Press={() => profileUpdateHandler("Email")}
                                isUpdateUser={isUserEmailEditable}
                            />
                        </View>
                        {emailErrorMessage && (
                            <CustomText text={emailErrorMessage} textStyle={styles.errorText} />
                        )}
                        <View style={styles.inputFieldContainer}>
                            {!isUserNumberEditable ? (
                                <>
                                    <CustomText
                                        text={`+${country_code?.callingCode[0] ? country_code?.callingCode[0] : "1"} ${number} `}
                                        containerStyle={{ marginTop: 0 }}
                                    />
                                    <ProfileCardButton
                                        isEditable={() => {
                                            setIsUserNumberEditable(true)
                                            setIsShowCountryPicker(true);
                                        }}
                                        isUpdateUser={isUserNumberEditable}
                                    />
                                </>
                            ) : (
                                <>
                                    <AuthInputField
                                        placeHolder={"Mobile"}
                                        onChange={(text) => setNumber(text)}
                                        value={number}
                                        isErrorText={""}
                                        containerStyle={styles.mainInputContainer}
                                        inputAndErrorMessageProps={styles.inputAndIcon2Container}
                                        editable={isUserNumberEditable}
                                        isShowCountryPicker={isShowCountryPicker}
                                        keyboardType={"numeric"}
                                        onOpen_CountryPicker={() => setVisible(true)}
                                        isVisible={visible}
                                        onChangeCountry={(country) => set_country_code(country)}
                                        country_Data={country_code}
                                        onClose_CountryPicker={() => setVisible(false)}
                                        countryPickerStyleProps={{ marginTop: -2 }}
                                    />
                                    <ProfileCardButton
                                        on_Press={() => profileUpdateHandler("Phone")}
                                        isUpdateUser={isUserNumberEditable}
                                    />
                                </>
                            )}
                        </View>
                        {phoneErrorMessage && (
                            <CustomText text={phoneErrorMessage} textStyle={styles.errorText} />
                        )}
                        <View style={styles.inputFieldContainer}>
                            {!isUserPasswordEditable ? (
                                <>
                                    <CustomText
                                        text={"********"}
                                        containerStyle={{ marginTop: 5 }}
                                    />
                                    <ProfileCardButton
                                        isEditable={() => setIsUserPasswordEditable(true)}
                                        // on_Press={() => setIsUserPasswordEditable(false)}
                                        isUpdateUser={isUserPasswordEditable}
                                    />
                                </>
                            ) : (
                                <>
                                    <AuthInputField
                                        placeHolder={"Password"}
                                        onChange={(text) => setPassword(text)}
                                        value={password}
                                        isErrorText={""}
                                        containerStyle={styles.mainInputContainer}
                                        inputAndErrorMessageProps={styles.inputAndIcon2Container}
                                        editable={isUserPasswordEditable}
                                        on_Press={() => setIsShowPassword(!isShowPassword)}
                                        secureTextEntry={isShowPassword}
                                        icon2={<Ionicons name={isShowPassword ? "eye-off-outline" : "eye-outline"} style={{ fontSize: 25, color: color.persian_Blue, }} />}
                                        showPasswordIconContainerProps={{ width: "13%" }}
                                    />
                                    <ProfileCardButton
                                        // isEditable={() => setIsUserPasswordEditable(true)}
                                        on_Press={() => profileUpdateHandler("Password")}
                                        isUpdateUser={isUserPasswordEditable}
                                    />
                                </>
                            )}
                        </View>
                        {passwordErrorMessage && (
                            <CustomText text={passwordErrorMessage} textStyle={styles.errorText} />
                        )}
                    </View>

                </LinearGradient>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: color.white,
    },
    scrollViewContainer: {
        paddingHorizontal: 15,
    },
    userContainer: {
        alignSelf: "center",
        marginTop: -70
        // position: "absolute",
        // top: 20
    },
    user: {
        width: 115,
        height: 115,
    },
    inputFieldContainer: {
        width: "100%",
        height: 50,
        // borderWidth: 1,
        // borderColor: color.slate_Gray,
        borderRadius: 8,
        backgroundColor: color.iron,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        marginTop: 5,
    },
    mainInputContainer: {
        width: "90%",
        marginTop: 0
    },
    inputAndIcon2Container: {
        alignItems: "center",
        borderBottomWidth: 0,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        fontFamily: fontFamily.medium,
        marginLeft: 10,
        marginBottom: 8,
    },
});