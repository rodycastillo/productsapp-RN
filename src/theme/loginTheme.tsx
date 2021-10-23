import { StyleSheet } from "react-native";



export const loginStyles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    inputField: {
        color: 'white',
        fontSize: 20,
    },
    inputFieldIOS: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100
    },
    buttonTxt: {
        fontSize: 18,
        color: 'white'
    },
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 50
    },
    buttonReturn: {
        position: 'absolute',
        top: 50,
        left: 20,
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 100
    }

});