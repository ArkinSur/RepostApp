import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {HomeScreen, LoginScreen, RepostScreen, AuthLoading} from './screens';

const authStack = createStackNavigator({
  LOGIN: LoginScreen,
});

const appStack = createStackNavigator(
  {
    HOME: HomeScreen,
    REPOST: RepostScreen,
  },
  {
    initialRouteName: 'HOME',
  },
);

const appNavigator = createSwitchNavigator(
  {
    AuthLoading,
    Auth: authStack,
    Stack: appStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const Router = createAppContainer(appNavigator);

export default Router;
