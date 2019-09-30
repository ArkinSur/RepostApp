import {Platform} from 'react-native';

const styles = {
  container: {
    height: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: '#F8F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  home: {
    height: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: '#F8F8FF',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  instagram: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  icon: {
    height: 30,
    width: 30,
  },
  back: {
    height: 25,
    width: 28,
  },
};

export default styles;
