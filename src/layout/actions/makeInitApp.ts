import {IAppState} from "../../appReducer";
import {getConnectedProfile} from "../../api/methods";
import {updateConnectedProfileAction} from "../../profile/actions/ProfileAndUserAction";
import {makeFetchUsersAction} from "../../profile/actions/makeFetchUsersAction";
import {makeFetchConversationsAction} from "../../messages/actions/makeFetchConversationsAction";
import {makeStartSocket} from "../../socket/actions/makeStartSocket";

export function makeInitAppAction(): (dispatch: any, getState: () => IAppState) => void {
	return async (dispatch: any, getState: () => IAppState) => {
		if (getState().profil.connectedProfile === undefined) {
			const connectedProfile = await getConnectedProfile();
				if(connectedProfile) {
					dispatch(updateConnectedProfileAction(connectedProfile));
				}
		}

		if (getState().profil.connectedProfile) {
			dispatch(makeFetchUsersAction());
			dispatch(makeFetchConversationsAction())
			dispatch(makeStartSocket())
		}
	}
}
