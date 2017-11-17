import React, { Component, PropTypes } from 'react';
import Logo from './Logo';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import Dimensions from 'Dimensions';
import UserInput from './UserInput';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';

import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	Text,
	TouchableOpacity,
	Image,
	Easing,	
	Animated
} from 'react-native';
const MARGIN = 40;
import spinner from '../images/loading.gif';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			press: false,
			isLoading: false,
		};
		this.showPass = this.showPass.bind(this);
		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
		this._onPress = this._onPress.bind(this);
	}
	_onPress() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });
		Animated.timing(
			this.buttonAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();

		setTimeout(() => {
			this._onGrow();
		}, 2000);

		setTimeout(() => {
			Actions.secondScreen();
			this.setState({ isLoading: false });
			this.buttonAnimated.setValue(0);
			this.growAnimated.setValue(0);
		}, 2300);
	}

	_onGrow() {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}
	showPass() {
		this.state.press === false ? this.setState({ showPass: false, press: true }) : this.setState({ showPass: true, press: false });
	}
	render() {
		const changeWidth = this.buttonAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
		  });
		  const changeScale = this.growAnimated.interpolate({
			inputRange: [0, 1],
			outputRange: [1, MARGIN]
		  });
		return (
			<Wallpaper>
				<Logo />
				<KeyboardAvoidingView behavior='padding'
					style={styles.container}>
					<UserInput source={usernameImg}
						placeholder='Username'
						autoCapitalize={'none'}
						returnKeyType={'done'}
						autoCorrect={false} />
					<UserInput source={passwordImg}
						secureTextEntry={this.state.showPass}
						placeholder='Password'
						returnKeyType={'done'}
						autoCapitalize={'none'}
						autoCorrect={false} />
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.btnEye}
						onPress={this.showPass}
					>
						<Image source={eyeImg} style={styles.iconEye} />
					</TouchableOpacity>
				</KeyboardAvoidingView>
				<View style={styles.sectionContainer}>
					<Text style={styles.text}>Create Account</Text>
					<Text style={styles.text}>Forgot Password?</Text>
				</View>
				<View style={styles.submitContainer}>
				<Animated.View style={{width: changeWidth}}>
					<TouchableOpacity style={styles.button}
						onPress={this._onPress}
						activeOpacity={1} >
							{this.state.isLoading ?
								<Image source={spinner} style={styles.image} />
								:
								<Text style={styles.text}>LOGIN</Text>
							}
					</TouchableOpacity>
					<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
				</Animated.View>
			</View>
			</Wallpaper>
		);
	}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	submitContainer: {
		flex: 1,
		top: -95,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	container: {
		flex: 1,
		alignItems: 'center',
	},
	btnEye: {
		position: 'absolute',
		top: 62,
		right: 28,
	},
	iconEye: {
		width: 25,
		height: 25,
		tintColor: 'rgba(0,0,0,0.2)',
	},
	sectionContainer: {
		flex: 1,
		top: 65,
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#F035E0',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#F035E0',
	},
	image: {
		width: 24,
		height: 24,
	},
});	
