import {IAppState} from "../../appReducer"
import {setNewUsersAction, setUsersListAction} from "./ProfileAndUserAction";
import {getUsers} from "../../api/methods";
import {IProfile} from "../types";

export function makeFetchUsersAction(): (dispatch: any, getState: () => IAppState) => Promise<void> {
	return async (dispatch: any, getState: () => IAppState) => {
		try {
			// fetch à l'API
			const users = await fetchUsers();
			// si besoin du store : const store = getState();
			const newUsers: IProfile[] = []
			users.forEach((user) => {
				getState().profil.users.forEach(userState => {
					if (userState._id === user._id) {
						newUsers.push(user);
					}
				})
			});

			// dispatch action redux
			dispatch(setUsersListAction(users))
			//dispatch(retrieveNewUsers)
			dispatch(setNewUsersAction(newUsers))
			return
		} catch (e) {
			console.log("Error fetching users", e);
			return
		}
	}
}
async function fetchUsers(): Promise<IProfile[]> {
	try {
		return await getUsers()
	} catch (e) {
		return []
	}

}
