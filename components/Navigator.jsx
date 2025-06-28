import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from './AuthContext';
import UserListScreen from 'screens/ListUser';
import PostListScreen from 'screens/PostListScreen';
import CreatePostScreen from 'screens/CreatePostScreen';
import { TouchableOpacity } from 'react-native';
import DeletePostScreen from 'screens/DeletePostScreen';

const Stack = createStackNavigator();

export default function Navigator() {

    const { user } = useAuth();

    return (
        <NavigationContainer>
            {
                user ?
                    <Stack.Navigator initialRouteName="PostList">
                        <Stack.Screen
                            name="PostList"
                            component={PostListScreen}   
                             options={{
                                headerShown: true,
                                title: 'Lista de posts',
                                headerBackTitleVisible: false,
                                headerStyle: {
                                    backgroundColor: '#fff',
                                },
                                headerTintColor: '#333',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                                                     
                        />
                        <Stack.Screen
                            name="CreatePost"
                            component={CreatePostScreen}
                            options={{
                                headerShown: true,
                                title: 'Novo Post',
                                headerBackTitleVisible: false,
                                headerStyle: {
                                    backgroundColor: '#fff',
                                },
                                headerTintColor: '#333',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                        <Stack.Screen
                            name="DeletePost"
                            component={DeletePostScreen}
                            options={{
                                headerShown: true,
                                title: 'Excluir Post',
                                headerBackTitleVisible: false,
                                headerStyle: {
                                backgroundColor: '#fff',
                                },
                                headerTintColor: '#333',
                                headerTitleStyle: {
                                fontWeight: 'bold',
                                },
                            }}
                            />
                        <Stack.Screen name="UserListScreen" component={UserListScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>

                    :
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

                    </Stack.Navigator>


            }
        </NavigationContainer>
    )
}