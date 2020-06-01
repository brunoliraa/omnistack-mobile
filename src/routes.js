import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';
//as rotas não são configuradas no formada de componente igual na parte web

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main
    })
);


