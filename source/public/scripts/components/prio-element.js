import {createElement} from "../rective/create-element.js";

const prioArray = new Array(5).fill(1)

export const PrioElement = ({prio}) => {
    return createElement('div', null,
        prioArray.map((entry, index) => {
            return createElement('svg', {
                    width: "16",
                    height: "17",
                    viewBox: "0 0 16 17",
                    fill: "none",
                    class: index > prioArray.length - prio ? 'active-prio' : ''
                },
                createElement('path', {
                    d: "M7.99999 14.5C8.73637 14.5 9.33332 13.903 9.33332 13.1667C9.33332 12.4303 8.73637 11.8333 7.99999 11.8333C7.26361 11.8333 6.66666 12.4303 6.66666 13.1667C6.66666 13.903 7.26361 14.5 7.99999 14.5Z",
                    fill: "currentColor"
                }),
                createElement('path', {d: "M6.66666 2.5H9.33332V10.5H6.66666V2.5Z", fill: "currentColor"})
            )
        })
    )
}