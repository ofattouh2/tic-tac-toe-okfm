import React from 'react';
import AppContextProvider from './context/AppContext';
import AppContainer from './AppContainer';

const App = () => (
  <AppContextProvider>
    <AppContainer />
  </AppContextProvider>
);

export default App;

// package.json
// expo install react-navigation react-navigation-stack react-navigation-tabs
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// expo install lottie-react-native
// npm install styled-components