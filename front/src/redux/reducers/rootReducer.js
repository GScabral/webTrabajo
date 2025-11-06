import { combineReducers } from 'redux';
import adminReducer from "./adminReducer";
import userReducer from "./userReducer"
import postReducer from "./postReducer"
import trabajadorReducer from "./trabajadorReducer"
import mensajeReducer from "./mensajeReducer"
import notificationReducer from './notificationReducer';
import badgesReducer from './badgeReducer';
import favReduce from "./favReducer"

const rootReducer = combineReducers({
    adminState: adminReducer,
    userState: userReducer,
    postState: postReducer,
    trabajoState: trabajadorReducer,
    mensajeState: mensajeReducer,
    notificationState: notificationReducer,
    favState: favReduce,
    badgeState: badgesReducer,
})



export default rootReducer;


