import React , { Component }from 'react';
import { Text, View, TouchableHighlight, Image, TextInput, AsyncStorage } from 'react-native';
import styles from './styles';
import images from './../../config/images.js';
import commonStyle from './../../config/commonStyle.js';
import common from './../../config/common.js';

import Loader  from './../../components/loader/loader';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

/* Actions */
import { getUserDetails, setUserType } from './../../actions/auth';

let self;

class PathSelection extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);

    self= this;
      this.state = {
          isTokenPresent: true,
          userDataReceived: false,
          userSelected: false,
      };

      this.setUserType = this.setUserType.bind(this);

  }

    async componentWillMount(){

        const token = await AsyncStorage.getItem('@Axle:token')

        if(token && !this.state.userDataReceived){
            this.setState({isTokenPresent: true});
            console.log("TOKEN IN STORAGE: ",token );

            let response = await this.props.actions.getUserDetails(token);

            if(response){
                this.setState({userDataReceived: true})
                this.props.navigation.navigate('PickUpHome')
            }
            else{
                this.setState({userDataReceived: false, isTokenPresent: false})
                await AsyncStorage.removeItem('@Axle:token')
            }

        }
        else if(this.state.isTokenPresent && this.state.userDataReceived){
            // do nothing
        }
        else{
            this.setState({isTokenPresent: false});
        }


    }

    setUserType(flag){
        this.setState({
            userSelected: true,
        });
        this.props.actions.setUserType(flag);
    }

  render(){
    const { navigate } = this.props.navigation;
    return (
    (!this.state.isTokenPresent)?
        (<View style={commonStyle.container}>
            <View style={[commonStyle.subContainer,commonStyle.contentCenter]}>
                <View style={commonStyle.contentCenter}>
                    <Image
                    style={{}}
                    source={images.splash_logo}
                  />
                </View>
                {
                (!this.state.userSelected)?
                    <View style={commonStyle.contentCenter}>
                        <TouchableHighlight onPress={() => this.setUserType(false)} underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,bottom:107}]}>
                            <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>COMPANY DRIVER</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.setUserType(true)} underlayColor={common.tuchableUnderlayWhiteColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.whiteColor,bottom:37,borderColor:common.blackColor,borderWidth:1}]}>
                            <Text style={[commonStyle.fontSize_14,{color:common.blackColor,fontFamily:'ProximaNova-Bold'}]}>OWNER</Text>
                        </TouchableHighlight>
                    </View>
                :
                    <View style={commonStyle.contentCenter}>
                        <TouchableHighlight onPress={() => navigate('Login')} underlayColor={common.tuchableUnderlayGreenColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.greenColor,bottom:107}]}>
                            <Text style={[commonStyle.fontSize_14,{fontFamily:'ProximaNova-Bold'}]}>LOGIN</Text>
                        </TouchableHighlight>

                        {
                            (this.props.auth.isOwner)?(
                                <TouchableHighlight onPress={() => navigate('SignUp')} underlayColor={common.tuchableUnderlayWhiteColor} style={[styles.btnLogin,commonStyle.contentCenter,{backgroundColor:common.whiteColor,bottom:37,borderColor:common.blackColor,borderWidth:1}]}>
                                    <Text style={[commonStyle.fontSize_14,{color:common.blackColor,fontFamily:'ProximaNova-Bold'}]}>SIGN UP</Text>
                                </TouchableHighlight>
                            ):null
                        }
                    </View>
                }
                </View>
          </View>
        )
        :<Loader />
    )
  }
  //************************************** Render end*****************************//
};

/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators({
            getUserDetails,
            setUserType
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(PathSelection)