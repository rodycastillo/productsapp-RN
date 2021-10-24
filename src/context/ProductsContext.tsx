import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: ( categoryId: string, productName: string ) => Promise<void>;
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    deleteProduct: ( id: string ) => Promise<void>;
    loadProductById: ( id: string ) => Promise<Producto>;
    uploadImage: ( data: any, id: string ) => Promise<void>; // TODO: cambiar ANY
}



export const ProductsContext = createContext({} as ProductsContextProps);



export const ProductsProvider = ({ children }: any ) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async() => {
        const resp = await api.get<ProductsResponse>('/productos')
        setProducts([...resp.data.productos]);
    }

    const addProduct = async( categoryId: string, productName: string ) => {
        
    }

    const updateProduct = async( categoryId: string, productName: string, productId: string ) =>{
        
    }

    const deleteProduct = async( id: string ) => {
        
    }

    const loadProductById = async( id: string ) => {
        throw new Error('Not implemented');
    };

    // TODO: cambiar ANY
    const uploadImage = async( data: any, id: string ) => {
        
    }

    return(
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
        }}>
            { children }
        </ProductsContext.Provider>
    )
}
