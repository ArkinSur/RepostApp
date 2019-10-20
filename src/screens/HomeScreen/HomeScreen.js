import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Clipboard,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import {firebaseLogout, postsRef} from '../../firebase';
import {HeaderBar, ListItem} from '../../components';
import styles from './styles';

class HomeScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    postsRef.orderBy('time', 'desc').onSnapshot(querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        data.push(doc.data());
      });
      this.setState({data});
    });
  }

  readFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    axios
      .get(`https://api.instagram.com/oembed?url=${clipboardContent}`)
      .then(response => {
        const {thumbnail_url, author_name, title} = response.data;
        postsRef
          .add({
            image: thumbnail_url,
            user: author_name,
            description: title,
            time: moment()
              .locale('pt-br')
              .format('LLL'),
            url: clipboardContent,
          })
          .catch(error => console.log(error));
      });
  };

  _clear = () => {
    postsRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        postsRef.doc(doc.id).delete();
      });
    });
    this.setState({data: []});
  };

  _renderItem = ({item}) => (
    <ListItem
      image={item.image}
      user={item.user}
      description={item.description}
      url={item.url}
    />
  );

  _renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Como Usar</Text>
      <Text style={styles.textEmpty}>1. Entre no Instagram</Text>
      <Text style={styles.textEmpty}>
        2. Clique nos 3 pontinhos de uma publicação não privada
      </Text>
      <Text style={styles.textEmpty}>4. Copiar Link</Text>
      <Text style={styles.textEmpty}>5. Cole no botão abaixo</Text>
    </View>
  );

  _renderButtons = () => (
    <>
      <TouchableOpacity style={styles.paste} onPress={this.readFromClipboard}>
        <Text style={styles.pasteButton}>Colar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.exitButton} onPress={this._signOut}>
        <Text style={styles.exitText}>Sair</Text>
      </TouchableOpacity>
    </>
  );

  _signOut = async () => {
    const {navigation} = this.props;
    await AsyncStorage.removeItem('@user');
    firebaseLogout();
    navigation.navigate('Auth');
  };

  render() {
    const {data} = this.state;
    return (
      <View style={styles.container}>
        <HeaderBar home url={'https://www.instagram.com/'} />
        {data.length > 0 && (
          <View>
            <TouchableOpacity style={styles.button} onPress={this._clear}>
              <Text style={styles.clean}>Limpar</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={data}
          ListFooterComponent={this._renderButtons}
          ListEmptyComponent={this._renderEmpty}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

export default HomeScreen;
