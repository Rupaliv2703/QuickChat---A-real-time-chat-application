import { createContext } from "react";
import axios from "axios";
import { useState , useEffect } from "react";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

// const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim() || "http://localhost:5000";
// axios.defaults.baseURL = backendUrl ;
const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim() || "http://127.0.0.1:5000";

axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

const [token, settoken] = useState(localStorage.getItem("token"));
const [authUser, setauthUser] = useState(null) ;
const [onlineUsers, setonlineUsers] = useState([]);
const [socket, setsocket] = useState(null);
const [loading, setLoading] = useState(true);

//Check if user is authenticated and is so , set the user data and connect the socket 
const checkAuth = async ()=>{
    try{
const {data} = await axios.get("/api/auth/check" ,{
    headers: {
        token: localStorage.getItem("token")
      }
});
  if(data.success){
    setauthUser(data.user)
    connectSocket(data.user)
  }
  else {
    //   setauthUser(null);
    //   localStorage.removeItem("token");
      console.log("AUTH FAILED:", data.message);
    }
    }
    catch(error){
// toast.error(error.message) ;
//check
console.log("CHECK AUTH ERROR:", error.response?.data || error.message);
    setauthUser(null);
    }
    finally {
    setLoading(false);
  }
}


//login function to handle user authetication and socket connection
const login = async (state , Credentials)=>{
    try{
        const {data} = await axios.post (`/api/auth/${state}` , Credentials);
        console.log("Signup/Login response:", data);
        if(data.success){
            setauthUser(data.userData);
            connectSocket(data.userData);
            axios.defaults.headers.common["token"]= data.token ;
          settoken(data.token);
          localStorage.setItem ("token" ,data.token)
          toast.success(data.message)
        }
        else{
           toast.error(data.message)
        }
    }

    catch(error){
toast.error(error.response?.data?.message || error.message)
    }
    
}

//logout function to handle user logout and socket disconnection

const logout = async ()=>{
    localStorage.removeItem('token');
    settoken(null);
    setauthUser(null);
    setonlineUsers([]);
    axios.defaults.headers.common['token']=null ;
    toast.success("Logged out successfully");
    socket.disconnect();
}

//update profile function to handle user profile updates
const updateProfile = async (body)=>{
    try{
    const {data} = await axios.put("/api/auth/update-profile" , body);
    if(data.success){
        setauthUser(data.user);
        toast.success("Profile updates successfully")
    }
}
    catch(error){
   toast.error(error.message)
    }
}

 //connect socket function to handle socket connection and online users updates 
 const connectSocket = (userData)=>{
    if(!userData || socket?.connected) return ;
    const newSocket = io(backendUrl , {
        query:{
            userId : userData._id ,
        }
    });
    newSocket.connect();
    setsocket(newSocket);

    newSocket.on("setonlineUsers" , (userIds)=>{
        setonlineUsers(userIds);
    })
    
 }

useEffect (()=>{
    if(token){
      axios.defaults.headers.common['token']=token ;
    }
    checkAuth()
} , [])


    const value ={
  axios,
authUser ,
onlineUsers ,
socket ,
login ,
logout ,
updateProfile ,
 loading

    }


    return (
        <AuthContext.Provider  value={value}>
            {children}
        </AuthContext.Provider>
    )
}


