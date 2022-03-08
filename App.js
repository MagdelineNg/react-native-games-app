import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
 
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
 
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};
 
export default function App() {
  const [userNumber, setUserNumber] = useState();
 
  const [fontLoaded, setFontLoaded] = useState(false);
 
  const configureNewGameHandler = () => {
    setGameRounds(0);
    setUserNumber(null);
  };
 
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
 
  const [guessRounds, setGameRounds] = useState(0);
 
  const gameOverHandler = (numOfRounds) => {
    setGameRounds(numOfRounds);
  };
 
  let content = <StartGameScreen onStartGame={startGameHandler} />;
 
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  } else {
    return (
      <View style={styles.screen}>
        <Header title="Guess a Number" />
        {content}
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
 