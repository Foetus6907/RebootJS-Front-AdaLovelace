export type IDrawerContent = 'contacts' | 'conversations' | undefined;

export const CHANGE_DRAWER_CONTENT = 'CHANGE_DRAWER_CONTENT';
export interface IChangeDrawnerContentAction {
	type: typeof CHANGE_DRAWER_CONTENT;
	content: IDrawerContent
	showDrawer: boolean
}

export interface ILayoutState {
	drawerContent?: IDrawerContent,
	showDrawer: boolean
}

export type ILayoutAction = IChangeDrawnerContentAction // | sdsdAction ...
