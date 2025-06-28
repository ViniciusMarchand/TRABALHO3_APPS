import  { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { getUsers } from 'api/UserApi';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers(page, limit);
      setUsers(prevUsers => [...prevUsers, ...response.users]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch users.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderUserItem = ({ item }) => (
    <View className="p-4 border-b border-gray-200 w-full bg-white my-1 rounded-lg shadow-sm">
      <Text className="text-xl font-semibold text-gray-800">{item.name}</Text>
      <Text className="text-base text-gray-600">{item.email}</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-3xl font-bold mb-6 mt-4 text-center text-gray-800">User List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => loading ? <ActivityIndicator size="large" className="my-4" /> : null}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      {/* <CustomButton
        title="Go to Home"
        color="transparent"
        textClassName="text-blue-500"
        onPress={() => Alert.alert('Navigation', 'Implement navigation to main app screen.')}
      /> */}
    </View>
  );
};

export default UserListScreen;