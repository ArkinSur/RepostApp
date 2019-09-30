import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, View} from 'react-native';
import styles from './styles';
import {colors} from '../../config';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
    const {navigation} = this.props;
    AsyncStorage.getItem('@user')
      .then(skip => {
        navigation.navigate(skip ? 'Stack' : 'Auth');
      })
      .catch(err => console.log(err));
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.primary} size={'large'} />
        <StatusBar hidden barStyle={'default'} />
      </View>
    );
  }
}
