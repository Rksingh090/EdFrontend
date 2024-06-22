let BACKEND_URL = "http://localhost:4000";
// let BACKEND_URL = "/";

let API = "http://192.168.0.108:4000/api/v1";
// let API = "http://localhost:4000/api/v1";


let WSURL = "ws://192.168.0.108:4000";
// let WSURL = "ws://localhost:4000";

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === "production"){
    API = "https://edtech-backend-08jx.onrender.com/api/v1";
    BACKEND_URL = "https://edtech-backend-08jx.onrender.com";
    WSURL = "wss://edtech-backend-08jx.onrender.com";
}


// to work with nodejs backend and cra build 
// let API =  window.location.protocol + "//" + window.location.host + "/api/v1";


export {
    API,
    BACKEND_URL,
    WSURL
}