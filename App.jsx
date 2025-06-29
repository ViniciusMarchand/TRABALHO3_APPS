import 'react-native-gesture-handler';
import { AuthProvider } from './components/AuthContext';

import './global.css';
import Navigator from 'components/Navigator';

export default function App() {
  return (
    <AuthProvider>
      <Navigator/>
    </AuthProvider>
  );
}