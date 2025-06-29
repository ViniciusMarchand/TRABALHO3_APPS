import React, { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/Button';
import { createUser } from 'api/UserApi';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {

    if (name && email && password) {
      try {
        await createUser({ name, email, password });
        Alert.alert('Registrado com sucesso!', `Bem-vindo, ${name}!`);
        navigation.navigate('Login');  
      } catch (error) {
        Alert.alert('Erro!', `Por favor, tente novamente!`);
      }
        
    } else {
      Alert.alert('Falha ao registrar', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-4xl font-bold mb-8 text-gray-800">Register</Text>
      <CustomTextInput
        placeholder="Nome"
        autoCapitalize="words"
        autoCorrect={false}
        value={name}
        onChangeText={setName}
      />
      <CustomTextInput
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <CustomTextInput
        placeholder="Senha"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton title="Register" onPress={handleRegister} />
      <CustomButton
        title="Já tem uma conta? Entrar"
        color="transparent"
        textClassName="text-blue-500"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default RegisterScreen;