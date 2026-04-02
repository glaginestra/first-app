import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create(
    persist(
        (set) =>({
            //Variables universales
            isLogged: false,
            user: null,
            isLoading: true,

            //Funciones
            login: (usuario) => {usuario && set({isLogged: true, user: usuario})},
            logout: () => set({isLogged: false, user: null}),
            setIsLoading: (valor) => set({isLoading: valor})

        }),
        {
            name:'auth-storage',
            storage:{
                //Funciones get, set, remove
                getItem: async (name) =>{
                    const value = await AsyncStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async(name, value) =>{
                    await AsyncStorage.setItem(name , JSON.stringify(value));
                },
                removeItem: async (name) =>{
                    await AsyncStorage.removeItem(name);
                }
            }

        },
    )
);