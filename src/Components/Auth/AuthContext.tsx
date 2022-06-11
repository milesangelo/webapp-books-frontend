import React, { ReactNode, useState, createContext, useContext } from "react";

export interface User {
    firstName: string,
    lastName: string,
    email: string
}

export type AuthUser = {
    email: string,
    name: string,
    token: string
}

type UserContextProviderProps = {
    children: ReactNode
};

type UserContextType = {
    user: AuthUser | null,
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

export const UserContext = createContext<UserContextType | null>(null!);

export const UserContextProvider = ({children}: UserContextProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null)

    return <UserContext.Provider value={{ user, setUser }} >
        {children}
    </UserContext.Provider>
}

const useUserContext = () => {
    return useContext(UserContext)
}

export { useUserContext }
// export const defaultAuthContent: AuthContent = {
//     user: {
//         firstName: '',
//         lastName: '',
//         email: ''
//     },
//     password: '',
//     roles: '',
//     accessToken: ''
// };

// const AuthContext = createContext<AuthContent>(defaultAuthContent);
// AuthContext.displayName = 'AuthContext';

// export const AuthProvider = ({ children } : {children: ReactNode}) => {
//     const [auth, setAuth] = useState(defaultAuthContent);
//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// const useAuth = (): AuthContent=>  {
//     const context = React.useContext(AuthContext)
//     if (context === undefined) {
//       throw new Error(`useAuth must be used within a AuthProvider`)
//     }
//     return context;
//   }

// export default { AuthContext, useAuth };