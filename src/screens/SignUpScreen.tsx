import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<any, any>{}

export const SignUpScreen = ({ navigation }: Props) => {

    const { email, password, name, form, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    })

    const onRegister = () => {
        console.log({name, email, password});
        Keyboard.dismiss();
    }

    return (
        <>

            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: '#5856D6'
                }}
                behavior={(Platform.OS==='ios')? 'padding': 'height'}
            >

                <View style={ loginStyles.container }>

                    {/* KAV */}
                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Registrate:</Text>

                    <Text style={ loginStyles.label }>Nombre:</Text>
                    <TextInput
                        placeholder="Ingrese su nombre"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ loginStyles.inputField,
                            (Platform.OS === 'ios') &&  loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        onChangeText={ (value) => onChange(value, 'name') }
                        value={ name }
                        onSubmitEditing={ onRegister }
                        autoCapitalize="words"
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Email:</Text>
                    <TextInput
                        placeholder="Ingrese su email"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="email-address"
                        underlineColorAndroid="white"
                        style={[ loginStyles.inputField,
                            (Platform.OS === 'ios') &&  loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        onChangeText={ (value) => onChange(value, 'email') }
                        value={ email }
                        onSubmitEditing={ onRegister }
                        autoCapitalize="none"
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Password:</Text>
                    <TextInput
                        placeholder="Ingrese su password"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        secureTextEntry={ true }
                        style={[ loginStyles.inputField,
                            (Platform.OS === 'ios') &&  loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        onChangeText={ (value) => onChange(value, 'password') }
                        value={ password }
                        onSubmitEditing={ onRegister }
                        autoCapitalize="none"
                        autoCorrect={ false }
                    />

                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={ onRegister }
                        >
                            <Text style={ loginStyles.buttonTxt }> Crear Cuenta </Text>
                        </TouchableOpacity>
                    </View>

                    {/* new account */}

                    <View style={ loginStyles.newUserContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ () => navigation.replace('LoginScreen') }
                        >
                            <Text style={ loginStyles.buttonTxt }> Inicia Sesión </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        onPress={ () => navigation.replace('LoginScreen') }
                        style={ loginStyles.buttonReturn }
                    >
                        <Text style={ loginStyles.buttonTxt }> Login </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            
            
        </>
    )
}
