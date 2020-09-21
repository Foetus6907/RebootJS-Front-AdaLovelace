import {IChangeDrawnerContentAction, ILayoutState} from "../types";

export function changeDrawerContentCase(state: ILayoutState, action: IChangeDrawnerContentAction) : ILayoutState {
	return {
		...state,
		drawerContent: action.content,
		showDrawer: action.showDrawer
	}
}
