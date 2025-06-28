import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ title, onPress, color = 'blue', textClassName = '' }) => {
  const colorClassMap = {
    blue: 'bg-blue-500',
    transparent: 'bg-transparent',
  };

  const textColorClassMap = {
    blue: 'text-white',
    transparent: 'text-blue-500',
  };

  return (
    <TouchableOpacity
      className={`rounded-lg justify-center items-center p-4 w-full my-2 ${colorClassMap[color] || 'bg-blue-500'}`}
      onPress={onPress}
    >
      <Text className={`text-lg uppercase font-bold ${textColorClassMap[color] || 'text-white'} ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;