import React from 'react';
import { Text, View } from 'react-native';
import { Router, Scene, Drawer, ActionConst } from 'react-native-router-flux';

// Views
import Signin from '../views/Signin/Signin';
import Signup from '../views/Signup/Signup';
import Main from '../views/Main/Main';

// Drawers
import DrawerContent from '../components/Drawer/DrawerContent';
import Feeds from '../views/Drawers/Feeds/Feeds';
import About from '../views/Drawers/About/About';
import Avatar from '../views/Drawers/Avatar/Avatar';

const Routes = () => {
    return(
        <Router>
            <Scene key="root">
                
                <Scene initial key="main" title="Main" component={Main} hideNavBar />
                <Scene key="signin" title="Signin" component={Signin} hideNavBar />
                <Scene key="signup" title="Signup" component={Signup} hideNavBar />
                
                <Drawer
                    key="drawer"
                    contentComponent={DrawerContent}
                    type={ActionConst.RESET}
                    hideNavBar>
                    
                    <Scene key="feeds" title="Feeds" component={Feeds} hideNavBar />
                    <Scene key="about" title="About" component={About} hideNavBar />

                </Drawer>

                <Scene key="avatar" title="Avatar" component={Avatar} hideNavBar />

            </Scene>
        </Router>
    )
};

export default Routes;