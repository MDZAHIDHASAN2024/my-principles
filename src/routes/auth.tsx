// import { createContext, useState, type ReactNode } from "react";

// type AuthContextType = {
//   user: User | null;
//   login: (user : User) => void;
//   logout: () => void;
// };

// export const AuthContext = createContext<AuthContextType | null |>(null)

// type AuthProviderProps = {
//   children: ReactNode;
// };

// type UserProps = {
//   name: string
// }
// export const AuthProvider = ({children}: AuthProviderProps) =>{
//   const [user, setUser] = useState<any>(null)

//   const login = (user: UserProps) =>{
//     setUser(user)
//   }

//   const logout = () =>{
//     setUser(null)
//   }
//   return(
//     <AuthContext.Provider value={{user, login, logout}}>
//         {children}
//     </AuthContext.Provider>
//   )
// }
