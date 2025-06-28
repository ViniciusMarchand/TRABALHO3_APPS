import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import CustomButton from '../components/Button';
import { deletePost } from 'api/PostApi';

const DeletePostScreen = ({ navigation, route }) => {
  const { postId, postTitle } = route.params;
  const [loading, setLoading] = useState(false);


  const handleDeletePost = async () => {
    setLoading(true);
    try {
      await deletePost(postId);

      Alert.alert('Sucesso', `Post ID: ${postId} excluído com sucesso!`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', `Falha ao excluir post: ${error.message}`);
      console.error('Erro ao excluir post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gray-50">
      <Text className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Você está prestes a excluir o Post:
      </Text>
      <Text className="text-3xl font-extrabold text-red-600 mb-8">
       {postTitle}
      </Text>

      <CustomButton
        title={loading ? <ActivityIndicator color="#fff" /> : "Excluir Post Agora"}
        onPress={handleDeletePost}
        color="red"
        disabled={loading}
      />
      <CustomButton
        title="Cancelar"
        color="transparent"
        textClassName="text-blue-500"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default DeletePostScreen;