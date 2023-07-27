import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import CustomText from '../../components/CustomText';
import SignupImage from '../../assets/images/signup.png'
import { fontFamily } from '../../constant/fontFamily';
import AuthInputField from '../../components/AuthInputField';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { color } from '../../constant/color';
import CustomButton from '../../components/CustomButton';
import BottomLine from '../../components/BottomLine';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { signupHandler } from '../../redux/slices/signupSlice';

// const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const nameRegex = /^[A-Za-z ]+$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state?.signupReducer?.loader);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
  const [number, setNumber] = useState(0);
  const [visible, setVisible] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [country_code, set_country_code] = useState();
  // const [loader, setLoader] = useState(false);

  const checkUsernameSpace = (text) => {
    const splittedText = text.split(" ");
    return splittedText?.length > 0 && splittedText?.length < 2;
  };

  const signupFormHandler = async () => {
    if (userName === "") {
      setUserNameErrorMessage("User name is required");
    } else if (!nameRegex.test(userName)) {
      setUserNameErrorMessage("The name format is invalid.");
    } else {
      setUserNameErrorMessage("");
    };

    if (email === "") {
      setEmailErrorMessage("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailErrorMessage("Invalid email");
    } else {
      setEmailErrorMessage("");
    };

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
      setConfirmPasswordErrorMessage("Confirmation password does not match");
    } else {
      setConfirmPasswordErrorMessage("");
    };

    // if (number === 0) {
    //   setPhoneErrorMessage("Phone number is required");
    // } else if (number?.length < 8) {
    //   setPhoneErrorMessage("Number should be atleast the 8 characters long");
    // } else {
    //   setPhoneErrorMessage("");
    // };

    if (userName === "" || !nameRegex.test(userName) || email === "" || !emailRegex.test(email) || password === "" || password.length < 8 || confirmPassword === "" || password !== confirmPassword) {
      return;
    } else {
      const data = {
        name: userName,
        email: email,
        password: password,
        confirmation_password: confirmPassword,
        // countryCode: country_code?.callingCode[0],
        // phoneNumber: number,
      };

      dispatch(signupHandler(data))
        .then(signup_Response => {
          console.log('signup_Response', signup_Response?.payload);
          if (signup_Response?.payload?.status === 201) {
            Toast.show(signup_Response?.payload?.message, Toast.SHORT, { backgroundColor: color.persian_Blue, });
            navigation.navigate('Home');
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setIsShowPassword(true);
            setIsShowConfirmPassword(true);
          } else {
            Toast.show(signup_Response?.payload?.message?.email[0], Toast.LONG, { backgroundColor: color.persian_Blue, });
          };
        })
        .catch(error => console.log('Signup error', error));
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ width: 70, height: 60, marginLeft: 20, justifyContent: "center" }}
      >
        <AntDesign name="arrowleft" style={{ fontSize: 26, color: color.persian_Blue }} />
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={SignupImage} style={styles.image} />
        </View>
        <View style={styles.signupAuthContainer}>
          <CustomText
            text="Sign up"
            textStyle={styles.heading}
            containerStyle={styles.headingContainer}
          />
          <AuthInputField
            fieldIcon={<Entypo name="user" size={23} color={color.persian_Blue} />}
            placeHolder={"User Name"}
            onChange={(text) => setUserName(text)}
            value={userName}
            isErrorText={userNameErrorMessage}
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
          {/* <View style={styles.countryPicker_And_PhoneField}>
            <AuthInputField
              isShowCountryPicker={true}
              placeHolder={"Mobile"}
              onChange={(text) => setNumber(text)}
              value={number}
              keyboardType={"numeric"}
              onOpen_CountryPicker={() => setVisible(true)}
              isVisible={visible}
              onChangeCountry={(country) => set_country_code(country)}
              country_Data={country_code}
              onClose_CountryPicker={() => setVisible(false)}
              isErrorText={phoneErrorMessage}
            />
          </View> */}
          <CustomButton
            title={"Continue"}
            containerStyle={{ marginTop: 40 }}
            on_Press={signupFormHandler}
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
            <Text style={styles.create_Ac_Text}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
          <BottomLine containerStyle={{ marginTop: 30, marginBottom: 5 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: -30,
  },
  image: {
    width: 370,
    height: 310,
  },
  signupAuthContainer: {
    paddingHorizontal: 25,
  },
  headingContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center"
  },
  heading: {
    fontSize: 30,
    fontFamily: fontFamily.bold,
    color: color.persian_Blue
  },
  countryPicker_And_PhoneField: {
    flexDirection: "row",
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