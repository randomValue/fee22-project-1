import {createElement} from "../rective/create-element.js";
import {SearchContainer} from "./search-container.js";

export const SideNav = ({props}) => {
    return createElement('div', {class: 'side-nav'}, createElement(SearchContainer, null))
}