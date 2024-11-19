/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import { AuthProvider } from './src/context/auth';


export default function Main () {
    return (
        <NavigationContainer>
            <PaperProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </PaperProvider>
        </NavigationContainer>
    )
}

AppRegistry.registerComponent(appName, () => Main);
