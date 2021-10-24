import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

import { Picker } from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({route, navigation}: Props) => {

    const { id = '', name = '' } = route.params;

    const [tempURI, setTempURI] = useState<string>()

    const { categories } = useCategories();
    const { loadProductById, addProduct, updateProduct, uploadImage } = useContext( ProductsContext );

    const { _id, categoryId, nameProduct, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoryId: '',
        nameProduct: name,
        img: ''
    });

    const takePhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.5
        },(resp) => {
            console.log(resp);
            if(resp.didCancel) return;
            if(!resp.assets?.[0].uri) return;
            setTempURI(resp.assets?.[0].uri);
            uploadImage(resp, _id)
        });
    }
    const uploadFromGallery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        },(resp) => {
            console.log(resp);
            if(resp.didCancel) return;
            if(!resp.assets?.[0].uri) return;
            setTempURI(resp.assets?.[0].uri);
            uploadImage(resp, _id)
        });
    }
    

    useEffect(() => {
        navigation.setOptions({
            title: (nameProduct) ? nameProduct : 'Nombre del Producto'
        });
    }, [nameProduct])

    useEffect(() => {
        loadProduct()
    }, [])


    const loadProduct = async () => {
        if ( id.length === 0 ) return;
        const product = await loadProductById( id )
        setFormValue({
            _id: id,
            categoryId: product.categoria._id,
            nameProduct: name,
            img: product.img || ''
        })
    }

    const saveOrUpdate = async () => {
        if(id.length > 0) {
            updateProduct(categoryId, nameProduct, id)
        } else {
            const tempCategoryId = categoryId || categories[0]._id
            const newProduct = await addProduct(tempCategoryId, nameProduct)
            onChange( newProduct._id, '_id' )
        }
    }

    return (
        
        <View style={ styles.container }>
            <ScrollView>

                <Text style={ styles.label }>{id} {name}</Text>
                <TextInput
                    placeholder="Producto"
                    style={ styles.txtInput }
                    value={ nameProduct }
                    onChangeText={ ( value ) => onChange( value, 'nameProduct' ) }
                />
                {/* Picker */}
                <Text style={ styles.label }>Categoría:</Text>
                <Picker
                    selectedValue={categoryId}
                    onValueChange={(itemValue) => onChange(itemValue, 'categoryId')}
                >
                    {
                        categories.map((c)=>(
                            <Picker.Item label={ c.nombre } value={ c._id } key={ c._id } />
                        ))
                    }
                    
                </Picker>

                <Button
                    title="Guardar"
                    onPress={ saveOrUpdate }
                    color="#5856D6"
                />

                {
                    (_id.length > 0) && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <Button
                            title="Cámara"
                            onPress={ takePhoto }
                            color="#5856D6"
                        />

                        <View style={{ width:10 }}/>

                        <Button
                            title="Galería"
                            onPress={uploadFromGallery}
                            color="#5856D6"
                        />
                    </View>
                    )
                }

                
                
                {
                    ( img.length > 0 && !tempURI) && (
                        <Image
                            source={{uri: img}}
                            style={{
                                marginTop: 20,
                                width: '100%',
                                height: 250
                            }}
                        />
                    )
                }

                {/* Show temporary img */}

                {
                    ( tempURI ) && (
                        <Image
                            source={{uri: tempURI}}
                            style={{
                                marginTop: 20,
                                width: '100%',
                                height: 250
                            }}
                        />
                    )
                }

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20,
        marginBottom: 50
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    txtInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
        marginVertical: 15
    }
})
