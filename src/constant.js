// let API = "http://192.168.1.17:4000/api/v1";
let API = "http://172.20.10.3:4000/api/v1";

let FRONTEND_DOMAIN = "https://ed-frontend-kohl.vercel.app";
// let API = "http://localhost:4000/api/v1";

if(process.env.NODE_ENV === "production"){
    FRONTEND_DOMAIN = window.location.protocol + "//" + window.location.host;
    API = "https://edtech-backend-08jx.onrender.com/api/v1";
}

export {
    FRONTEND_DOMAIN,
    API
}