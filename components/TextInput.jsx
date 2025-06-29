import React from 'react';
import { TextInput, View } from 'react-native';

const CustomTextInput = ({ placeholder, ...otherProps }) => {
  return (
    <View className="bg-gray-100 rounded-lg flex-row w-full p-4 my-2 items-center">
      <TextInput
        placeholder={placeholder}
        className="flex-1 text-lg text-gray-800 border rounded-2xl py-2 px-4 border-gray-300"
        placeholderTextColor="#9ca3af"
        {...otherProps}
      />
    </View>
  );
};

export default CustomTextInput;