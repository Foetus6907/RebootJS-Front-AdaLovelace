import {IAppState} from "../../appReducer";
import {logout} from "../../api/methods";
import history from "../../history";
import {
	changeCurrentConversationAction,
	setAllConversationsAction
} from "../../messages/actions/messagesActions";
import {
	setNewUsersAction,
	setUsersListAction,
	updateConnectedProfileAction
} from "../../profile/actions/ProfileAndUserAction";
import {IProfile} from "../../profile/types";
import {makeStopSocket} from "../../socket/actions/makeStopSocket";

export function makeExitAppAction(): (dispatch: any, getState: () => IAppState) => void {
	return (dispatch: any, getState: () => IAppState) => {
		logout().then(res => {
			if (res===true) {

				// clear messages store
				dispatch(setAllConversationsAction([]));
				dispatch(makeStopSocket());
				dispatch(changeCurrentConversationAction(undefined));

				// clear profile store
				console.log('logout')

				dispatch(setUsersListAction([]));
				dispatch(setNewUsersAction([]));
				dispatch(updateConnectedProfileAction({} as IProfile));

				history.push('/login');
			}
		})
	}
}
