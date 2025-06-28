import React, { useState } from 'react';
import { Text, View, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import CustomTextInput from '../components/TextInput';
import CustomButton from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from 'api/PostApi';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Desculpe, precisamos de permissão para acessar a galeria de fotos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreatePost = async () => {
    if (!title || !content || !image) {
      Alert.alert('Informações faltando!', 'Por favor, preencha todos os campos.');
      return;
    }
    
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    
    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`; 

    formData.append('foto', { 
      uri: image,
      name: filename,
      type, 
    });

    console.warn("TESTE======");
    try {
      await createPost(formData);
      
      Alert.alert('Sucesso!', 'Post criado com sucesso!');
      
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      Alert.alert('Error', `Failed to create post: ${error.message}`);
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1  p-5">
      <Text className="text-3xl font-bold mb-6 text-center text-gray-800">Criar novo post</Text>
      
      <CustomTextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        autoCorrect={false}
      />
      <CustomTextInput
        placeholder="Descrição"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={4}
        className="h-32 text-top"
      />

      <TouchableOpacity
        onPress={pickImage}
        className="w-full p-4 my-2 bg-blue-100 rounded-lg items-center border border-blue-300"
      >
        <Text className="text-blue-700 text-lg font-semibold">
          {image ? 'Troque a Imagem' : 'Selecione a Imagem'}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} className="w-full h-48 rounded-lg mt-3 mb-5" resizeMode="cover" />
      )}

      <CustomButton
        title={loading ? <ActivityIndicator color="#fff" /> : "Criar Post"}
        onPress={handleCreatePost}
        disabled={loading}
      />

      <CustomButton
        title="Cancelar"
        color="transparent"
        textClassName="text-red-500"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
export default CreatePostScreen;