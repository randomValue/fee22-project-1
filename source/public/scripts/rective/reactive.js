const node = document.body

const buildVDom = (virtualNode, id, parentNode) => {
    const node = {...vNode}
    if (!id) {
        node.id = identifier
    } else {
        node.id = id
        identifier = id
    }
    mutables = {...mutables, [node.id]: node}
    node.state = []
    node.nextState = []
    node.children = []
    node.props = {...virtualNode.props}
    node.nextProps = {...virtualNode.props}

    let createdNode = {}
    if (typeof virtualNode === "function") {
        node.function = virtualNode
        createdNode = virtualNode()
    } else if (typeof virtualNode.type === "function") {
        node.function = virtualNode.type
        createdNode = virtualNode.type({...virtualNode.props, children: virtualNode.children})
    } else if (typeof virtualNode.type === 'string') {
        createdNode = virtualNode
    } else if (typeof virtualNode === 'string') {
        createdNode = virtualNode
    }
    let element
    if (createdNode.type) {
        element = document.createElement(createdNode.type)
    } else {
        element = document.createTextNode(createdNode)
    }
    createdNode.props && Object.entries(createdNode.props).forEach(([key, value]) => {
        element.setAttribute(key, value)
    })
    node.domNode = element

    parentNode.appendChild(element)

    createdNode?.children?.forEach((child, i) => {
        const childId = node.id + i + 1
        identifier = childId
        createdNode.children[i] = {id: childId, node: child}
        node.children[i] = childId
        buildVDom(child, childId, element)
    })
    return vDom
}


const render = (virtualDom, container) => {
    container.appendChild(virtualDom)
}

const CustomEl = ({isDisabled}) => {
    const [state, setState] = useState(0)
    const [next, setNext] = useState('You')

    useEffect(() => {
        setState(state + 1)
    }, [next])

    return createElement('div', {ariaDisabled: state}, createElement('h2', null, `${state} ${next}`))
}

const App = () => {
    const [state, setState] = useState('Drei')
    //setTimeout(() => {
    //    setState('Fünf')
    //}, 5000)
    //console.log(state)
    return createElement('div', {
        className: "black blue red",
        style: "background-color: red"
    }, createElement(CustomEl, {isDisabled: true}))
}

console.log(buildVDom(App, null, document.body))

