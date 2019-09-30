import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {HeaderBar} from '../../components';
import logErrors from '../../utils/logErrors';
import {images} from '../../config';
import styles from './styles';

class RepostScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      image: props.navigation.getParam('image', null),
      string: props.navigation.getParam('url', ''),
    };
  }

  render() {
    const {string, image} = this.state;
    logErrors(string);
    return (
      <View style={styles.container}>
        <HeaderBar home repost url={string} />
        <Image style={styles.image} source={{uri: image}} />
        <TouchableOpacity
          onPress={() => Alert.alert('Repost feito com sucesso!')}
          style={styles.button}>
          <Image style={styles.icon} source={images.icon2} />
          <Text style={styles.text}>Repostar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RepostScreen;
