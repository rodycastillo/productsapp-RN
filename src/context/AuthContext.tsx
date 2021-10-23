import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api/api';
import { Usuario, LoginResponse, LoginData, renoveJWT, RegisterData, RegisterResponse } from '../interfaces/AppInterfaces';
import { authReducer, AuthState } from './AuthReducer';


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {

    const [ state, dispatch ] = useReducer(authReducer, authInitialState)

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');

        if( !token ) return dispatch({ type: 'notAuthenticated' })

        const { data, status }  = await api.get<renoveJWT>('/auth');
        if( status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' })
        }
        await AsyncStorage.setItem('token', data.token);
        dispatch({
            type: 'signUp',
            payload: {
                token: data.token,
                user: data.usuario
            }
        })

    }

    const signIn=  async({ correo, password }: LoginData) => {
        try {
            const { data } = await api.post<LoginResponse>('/auth/login', {correo, password});
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            await AsyncStorage.setItem('token', data.token);
            
        } catch (error) {
            dispatch({ 
                type: 'addError',
                payload: error.response.data.msg || 'Informacion incorrecta'
            })
        }
    }
    const signUp = async({ correo, password, nombre }: RegisterData) => {
        try {
            const { data } = await api.post<RegisterResponse>('/usuarios',{ correo, password, nombre })
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })
            await AsyncStorage.setItem('token', data.token);

        } catch (error) {
            dispatch({ 
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Revise la información'
            })
        }
    }

    const logOut =  async() => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'logout'})
    }

    const removeError =  () => {
        dispatch({type: 'removeError'});
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signUp,
                signIn,
                logOut,
                removeError,
            }}
        >
            { children }
        </AuthContext.Provider>
    )

}