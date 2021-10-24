import React,{ useState, useEffect } from 'react'
import api from '../api/api';
import { Categoria, CategoriesResponse } from '../interfaces/AppInterfaces';

export const useCategories = () => {

    const [loading, setLoading] = useState(true)
    const [categories, setCategories] = useState<Categoria[]>([])

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async()=> {
        const response = await api.get<CategoriesResponse>('/categorias')
        setCategories( response.data.categorias )
        setLoading(false)
    }

    return {
        categories,
        loading
    }
}
