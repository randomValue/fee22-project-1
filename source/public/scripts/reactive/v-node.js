import { mutables } from './mutables.js'
import { isSame } from './is-same.js'
import { loopThroughChildren } from './loop-through-children.js'
import { createAttributes } from './create-attributes.js'
import { createEvents } from './create-events.js'
import { domNode } from './dom-node.js'
import { loopThroughStates } from './loop-through-states.js'
import { createRef } from './create-ref.js'

export const vNode = {
  state: undefined,
  nextState: undefined,
  memos: undefined,
  cachedIndex: 0,
  id: undefined,
  props: undefined,
  nextProps: undefined,
  node: undefined,
  domNode: undefined,
  oldDomNode: undefined,
  children: undefined,
  function: undefined,
  prevDeps: undefined,
  prevMemoDeps: undefined,
  cachedEffects: 0,
  cachedMemos: 0,
  cachedRefs: 0,
  refs: undefined,
  doneRendering: false,
  render(Comp) {
    this.doneRendering = false
    mutables.identifier = this.id
    const sameState = isSame(this.state, this.nextState)
    const sameProps = isSame(this.props, this.nextProps)
    let sameNode = true
    if (typeof Comp !== 'function' && !!Comp) {
      Comp.children = Comp.children.filter((child) => !!child)
      sameNode = isSame(this.node, Comp)
    }
    if (!Comp) {
      Comp = this.node
      Comp.props = this.nextProps
    }
    this.cachedIndex = 0
    this.cachedEffects = 0
    this.cachedMemos = 0
    this.cachedRefs = 0
    if (Comp && (!sameState || !sameProps || !sameNode)) {
      this.nextState.forEach((entry, index) => {
        if (Array.isArray(entry)) {
          this.state[index] = [...entry]
          return
        }
        if (typeof entry === 'object' && !Array.isArray(entry) && entry !== null) {
          this.state[index] = { ...entry }
          return
        }
        this.state[index] = entry
      })

      this.props = this.nextProps
      let composition
      if (typeof Comp === 'function') {
        composition = Comp(this.props)
        this.function = Comp
      } else if (typeof Comp.type === 'function') {
        composition = Comp.type(Comp.props)
        this.function = Comp.type
      } else {
        composition = Comp
      }

      this.doneRendering = true
      composition.children = composition.children.filter((child) => !!child)

      if (
        this.node.type !== composition.type ||
        this.node.children.length !== composition.children.length
      ) {
        const { parentNode } = this.domNode
        const { element } = domNode(composition)
        parentNode.insertBefore(element, this.domNode)
        parentNode.removeChild(this.domNode)
        this.oldDomNode = this.domNode
        this.domNode = element
        this.children.forEach((child) => {
          delete mutables.Dom[child]
        })
      }
      createRef(composition, this.domNode)
      createAttributes(composition.props, this.domNode)
      createEvents(composition.synth, this.domNode, this.id, this.node)

      this.node = composition
      loopThroughChildren(composition, this)
      loopThroughStates(this.id)
    }
    this.doneRendering = true
    this.cachedIndex = 0
    this.cachedRefs = 0
  },
}
