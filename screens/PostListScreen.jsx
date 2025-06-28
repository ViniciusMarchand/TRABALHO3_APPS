import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getPosts } from 'api/PostApi';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PostListScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    const { navigate } = useNavigation();

    const fetchPosts = async () => {
        if (!hasMore && page !== 1) {
            setLoading(false);
            return;
        }
        if (loading && page > 1) return;

        setLoading(true);
        try {
            const response = await getPosts(page, limit);
            setPosts(prevPosts => [...prevPosts, ...response.posts]);

            if (response.posts.length < limit) {
                setHasMore(false);
            } else if (posts.length + response.posts.length >= response.total) {
                setHasMore(false);
            }
        } catch (error) {
            Alert.alert('Error', `Failed to fetch posts: ${error.message}`);
            console.error(error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };
    
    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [page]) 
    );

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const renderPostItem = ({ item }) => (
        <View className="p-4 border-b border-gray-200 w-full bg-white my-2 rounded-lg shadow-md">
            <View className='w-full flex justify-end items-end'>
                <TouchableOpacity onPress={() => navigation.navigate('DeletePost', { postId: item.id, postTitle: item.title })} >
                    <FontAwesome name="trash-o" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text className="text-xl font-bold mb-2 text-gray-900">{item.title}</Text>
            {item.imageUrl && (
                <Image 
                    source={{ uri: "https://tads-2025-apps.s3.us-east-1.amazonaws.com/164b76473ae5a56af566ee9290c89bf6.jpg" }}
                    className="w-full h-48 rounded-md mb-3"
                    resizeMode="cover"
                    onError={() => console.warn('Image failed to load')}
                /> 
            )}
            <Text className="text-base text-gray-700 mb-2">{item.content}</Text>
            <Text className="text-sm text-gray-500">By: {item.author.name} | {new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50 p-4">
            <Text className="text-3xl font-bold mb-6 text-center text-gray-800">Posts</Text>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderPostItem}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => loading ? <ActivityIndicator size="large" className="my-4" /> : null}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            <CustomButton
                title="Ir para a lista de usuários"
                color="transparent"
                textClassName="text-blue-500"
                onPress={() => navigate('UserListScreen')}
            />
            <TouchableOpacity className='bg-green-600 w-[50px] h-[50px] absolute bottom-[60px] right-[20px] flex items-center justify-center rounded-[100px]' onPress={() => navigate('CreatePost')}>
                <AntDesign name="plus" size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default PostListScreen;