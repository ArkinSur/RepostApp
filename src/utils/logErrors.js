import Reactotron from 'reactotron-react-native';

const logErrors = error => {
  if (__DEV__) {
    Reactotron.log(error);
    console.log(error);
  }
};

export default logErrors;
