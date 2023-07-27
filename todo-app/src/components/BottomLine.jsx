import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { color } from '../constant/color';

const BottomLine = ({
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
    </View>
  )
}

export default BottomLine

const styles = StyleSheet.create({
  container: {
    width: "40%",
    height: 5,
    backgroundColor: color.slate_Gray,
    borderRadius: 5,
    alignSelf: "center",
    // marginBottom: 20
    // justifyContent: "flex-end"

  }
})