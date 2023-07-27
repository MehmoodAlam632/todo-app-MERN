import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../constant/color'
import { fontFamily } from '../constant/fontFamily'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.white
    },
    text: {
        fontSize: 18,
        fontFamily: fontFamily.semiBold,
        color: color.persian_Blue

    }
})