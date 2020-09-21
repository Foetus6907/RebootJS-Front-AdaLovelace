import {CHANGE_DRAWER_CONTENT, IChangeDrawnerContentAction, IDrawerContent} from "../types";

export function changeDrawerContentAction(content?: IDrawerContent, showDrawer: boolean = true): IChangeDrawnerContentAction {
	return {
		type: CHANGE_DRAWER_CONTENT,
		content: content,
		showDrawer: showDrawer
	}
}
