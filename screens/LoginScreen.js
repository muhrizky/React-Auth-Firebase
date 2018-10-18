import React from 'react';
import {View, Button, Text} from 'react-native';
import * as firebase from 'firebase';
import MianTabNavigator from '../navigation/MainTabNavigator';
import {StacNavigator} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
 
 
// Dibawah Ini Merupakan inisialisasi Firebase dari Website
firebase.initializeApp({
    apiKey: "AIzaSyA-MpWCzXPMgAslC9iWTuLKxF9yQr8KBas",
    authDomain: "project-baru-rizky.firebaseapp.com",
    databaseURL: "https://project-baru-rizky.firebaseio.com",
    projectId: "project-baru-rizky",
    storageBucket: "project-baru-rizky.appspot.com",
    messagingSenderId: "431109133597"
});
 
export default class login extends React.Component{
    constructor(props){
        super(props);
        this.state = {email:'', password:'', error:'', loading:false};
 
    }
 
    onLoginPress(){
        this.setState({error:'', loading:true});
        
        const{email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error:'', loading:false});
            this.props.navigation.navigate('Main');
        })
        .catch(() => {
            this.setState({error:'Authentication Failed', loading:false});
        })
 
    }
 
    onSignUpPress(){
        this.setState({error:'', loading:true});
        
        const{email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error:'', loading:false});
            this.props.navigation.navigate('Main');
        })
        .catch(() => {
            this.setState({error:'Authentication Failed', loading:false});
        })
 
    }
 
    renderButtonOrLoading(){
        if (this.state.loading) {
            return <Text> Loading </Text>
        }
 
        return <View>
            <Button 
            onPress={this.onLoginPress.bind(this)} 
            title= 'Login'/>
            
            <Button 
            onPress={this.onSignUpPress.bind(this)} 
            title='Sign Up'/>
        </View>
    }
 
    render(){
        return(
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput 
                value = {this.state.email}
                onChangeText={email => this.setState({email})}
                placeholder='email@domain.com'
                />
 
                <FormLabel>Password</FormLabel>
                <FormInput 
                value = {this.state.password}
                secureTextEntry
                placeholder='*********'
                onChangeText={password => this.setState({password})}/>
                <Text>{this.state.error}</Text>
                {this.renderButtonOrLoading()}
            </View>
        )
    }
}