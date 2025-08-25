import {combineReducers} from 'redux';
import adminReducer from "./adminReducer";
import userReducer from "./userReducer"
import postReducer from "./postReducer"
import trabajadorReducer from "./trabajadorReducer"
import mensajeReducer from "./mensajeReducer"


const rootReducer = combineReducers({
    adminState: adminReducer,
    userState: userReducer,
    postState:postReducer,
    trabajoState:trabajadorReducer,
    mensajeState:mensajeReducer,
})



export default rootReducer;


