import axios from "axios";
import { createContext, useState } from "react";


export const UserContext = createContext()


export default function UserContextProvider(props){

    const [userToken, setUserToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    
    function forgetPassword(email){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , {email})
        .then(response => response)
        .catch(err=>err)
    }
    function verifyResetCode(resetCode){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , {resetCode})
        .then(response => response)
        .catch(err=>err)
    }
    function resetPassword(email , newPassword){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , {email , newPassword})
        .then(response=>response)
        .catch(err=>err)
    }

    return <UserContext.Provider value={{userToken  , verifyResetCode , forgetPassword , resetPassword,setUserToken  , userData, setUserData , userEmail, setUserEmail}}>
        {props.children}
    </UserContext.Provider>
}