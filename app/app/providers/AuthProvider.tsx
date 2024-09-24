import * as SplashScreen from 'expo-splash-screen'
import {
    FC,
    PropsWithChildren,
    createContext,
    useEffect,
    useState
} from 'react'

import { getAccessToken, getUserFromStorage } from '@/services/auth/auth.helper'

import { IContext, TypeUserState } from './auth-provider.interface'

export const  AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
    const [ user, setUser ] = useState<TypeUserState>(null)
    
    useEffect(() => {
        let isMounted = true

        const checkAcessToken = async () => {
            try {
                const acessToken = await getAccessToken()

                if( acessToken) {
                    const user = await getUserFromStorage()
                    if (isMounted) setUser(user)
                }
            } catch {
            }   finally {
                await SplashScreen.hideAsync()
            }
        }
        
        let ignore = checkAcessToken()

        return () => {
            isMounted = false
        }
    },[])
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider