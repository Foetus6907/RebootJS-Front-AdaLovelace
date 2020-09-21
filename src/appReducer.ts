import {combineReducers} from "redux";
import { profil } from './profile/reducer'
import {layout} from "./layout/reducer";
import {messages} from "./messages/reducer";

export const appReducer = combineReducers({
	profil,
	layout,
	messages
})

export type IAppState = ReturnType<typeof appReducer>
