import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import styles from './styles';
import {images} from '../../config';

const HeaderBar = props => {
  const title = 'Repost App';

  const {home, url, repost, navigation} = props;
  const image = repost ? images.share : images.instagram;
  const paddingLeft = repost ? {paddingLeft: 16} : {paddingLeft: 0};

  if (!home) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.home, paddingLeft]}>
      {repost && (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Image style={styles.back} source={images.back} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.instagram}>
        <TouchableWithoutFeedback
          onPress={() => {
            Linking.openURL(url);
          }}>
          <Image style={styles.icon} resizeMode={'contain'} source={image} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default withNavigation(HeaderBar);
