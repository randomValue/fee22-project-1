import { mutables } from './mutables.js'
import { isSame } from './is-same.js'
import { loopThroughChildren } from './loop-through-children.js'
import { createAttributes } from './create-attributes.js'
import { createEvents } from './create-events.js'
import { domNode } from './dom-node.js'
import { loopThroughStates } from './loop-through-states.js'

export const vNode = {
  state: undefined,
  nextState: undefined,
  cachedIndex: 0,
  id: undefined,
  props: undefined,
  nextProps: undefined,
  node: undefined,
  domNode: undefined,
  children: undefined,
  function: undefined,
  prevDeps: undefined,
  cachedEffects: 0,
  doneRendering: false,
  render(Comp) {
    this.doneRendering = false
    mutables.identifier = this.id
    const sameState = isSame(this.state, this.nextState)
    const sameProps = isSame(this.props, this.nextProps)
    let sameNode = true
    if (typeof Comp !== 'function') {
      Comp.children = Comp.children.filter((child) => !!child)
      sameNode = isSame(this.node, Comp)
    }
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
      this.cachedIndex = 0
      this.cachedEffects = 0
      this.props = this.nextProps
      let composition
      if (typeof Comp === 'function') {
        composition = Comp(this.props)
      } else if (typeof Comp.type === 'function') {
        composition = Comp.type(Comp.props)
      } else {
        composition = Comp
      }
      this.doneRendering = true
      composition.children = composition.children.filter((child) => !!child)

      if (this.node.type !== composition.type) {
        const { parentNode } = this.domNode
        const { element } = domNode(composition)
        parentNode.insertBefore(element, this.domNode)
        parentNode.removeChild(this.domNode)
        this.domNode = element
        this.children.forEach((child) => {
          delete mutables.Dom[child]
        })
      }

      createAttributes(composition.props, this.domNode)
      createEvents(composition.synth, this.domNode, this.node)

      loopThroughChildren(composition, this)
      this.node = composition
      loopThroughStates()
    }
    this.doneRendering = true
    this.cachedIndex = 0
  },
}