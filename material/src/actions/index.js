import * as types from '../constants/ActionTypes';

export function toggleBoxedLayout(isLayoutBoxed) {
  return { type: types.TOGGLE_BOXED_LAYOUT, isLayoutBoxed };
}
export function toggleCollapsedNav(isNavCollapsed) {
  return { type: types.TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}
export function toggleNavBehind(isNavBehind) {
  return { type: types.TOGGLE_NAV_BEHIND, isNavBehind };
}
export function toggleFixedHeader(isFixedHeader) {
  return { type: types.TOGGLE_FIXED_HEADER, isFixedHeader };
}
export function changeSidebarWidth(sidebarWidth) {
  return { type: types.CHANGE_SIDEBAR_WIDTH, sidebarWidth };
}
export function changeColorOption(colorOption) {
  return { type: types.CHANGE_COLOR_OPTION, colorOption };
}
export function changeTheme(themeOption) {
  return { type: types.CHANGE_THEME, theme: themeOption };
}

/* Custom Actions */
export * from './auth';
export * from './programs';
export * from './users';
export * from './sedes';
export * from './privileges';
export * from './educators';
export * from './catalogs';
export * from './participants';
export * from './programActivations';
export * from './participantContacts';
export * from './courses';
export * from './grades';
export * from './workshops';
export * from './dashboard';
export * from './categories';
export * from './divisions';
export * from './sections';
export * from './programLocations';
export * from './programInstructors';
export * from './snackBar';
