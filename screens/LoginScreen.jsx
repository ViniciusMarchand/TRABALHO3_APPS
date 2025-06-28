import { useState } from 'react';
import { Text, View, Alert } from 'react-native';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/Button';
import { useAuth } from 'components/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  console.warn(process.env.EXPO_PUBLIC_API_URL);

  const handleLogin = () => {
    if (email && password) {
      login(email, password);
    } else {
      Alert.alert('Login falhou.', 'Email ou senha inválidos.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-4xl font-bold mb-8 text-gray-800">Entrar</Text>
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
      <CustomButton title="Entrar" onPress={handleLogin} />
      <CustomButton
        title="Ainda não tem uma conta? Registrar-se"
        color="transparent"
        textClassName="text-blue-500"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default LoginScreen;