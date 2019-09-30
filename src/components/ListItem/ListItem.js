import React from 'react';
import {withNavigation} from 'react-navigation';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

const ListItem = props => {
  const {image, user, description, url, navigation} = props;
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('REPOST', {image, url})}
        style={styles.contentContainer}>
        <View>
          <Image
            style={styles.image}
            resizeMode={'cover'}
            source={{uri: image}}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{user}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
    </>
  );
};

export default withNavigation(ListItem);
