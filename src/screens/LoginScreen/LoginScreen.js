import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Modal,
} from 'react-native';
import {HeaderBar} from '../../components';
import {images} from '../../config';
import {firebaseLogin} from '../../firebase';
import styles from './styles';

class LoginScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      code: '',
      confirmResult: null,
      modalVisible: false,
    };
  }

  _setModalVisible = value => {
    this.setState({modalVisible: value});
  };

  _signIn = number => {
    const {text} = this.state;
    firebaseLogin(`+55${text}`)
      .then(confirmResult => {
        this._setModalVisible(true);
        this.setState({confirmResult});
        Alert.alert(`Código enviado para o número ${text}`);
      })
      .catch(error => Alert.alert(error));
  };

  _confirm = () => {
    const {code, confirmResult} = this.state;
    const {navigation} = this.props;
    console.log(confirmResult, code);

    if (confirmResult && code.length) {
      confirmResult
        .confirm(code)
        .then(user => {
          Alert.alert('Código confirmado!');
          console.log(user);
          AsyncStorage.setItem('@user', JSON.stringify(true));
          navigation.navigate('Stack');
        })
        .catch(error => Alert.alert(error));
    }
  };

  render() {
    const {text, code, modalVisible} = this.state;
    return (
      <View style={styles.container}>
        <HeaderBar />
        <Modal
          animationType={'fade'}
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            this._setModalVisible(false);
          }}>
          <View style={styles.containerModal}>
            <View style={styles.modal}>
              <Text style={styles.title}>Insira o código de verificação</Text>
              <TextInput
                style={styles.numberInput}
                value={code}
                placeholder={'Código'}
                keyboardType={'numeric'}
                onChangeText={number => {
                  this.setState({code: number});
                }}
              />
              <TouchableOpacity onPress={this._confirm} style={styles.ok}>
                <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tryAgain}
                onPress={() => this._setModalVisible(false)}>
                <Text style={styles.tryAgainText}>Tentar Novamente</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={images.icon1}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleContent}>Faça seu login via SMS</Text>
          <TextInput
            style={styles.codeInput}
            value={text}
            placeholder={'Número de telefone com DDD'}
            keyboardType={'numeric'}
            onChangeText={number => {
              this.setState({text: number});
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => this._signIn(text)}
          style={styles.button}>
          <Text style={styles.textButton}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginScreen;
