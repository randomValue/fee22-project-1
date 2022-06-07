import { create } from './store.js'
import { useEffect } from './use-effect.js'

const createQueries = () => {
  const queries = window.location.pathname.split(/\//g)
  queries.splice(0, 1)
  return queries
}
const routerSetter = []
const routerStore = create({
  pathName: window.location.pathname,
  queries: createQueries(),
})
export const useRouter = () => {
  const [router, setRouter] = routerStore()
  const push = (url) => {
    window.history.pushState('', '', url)

    setRouter((state) => ({
      ...state,
      pathName: window.location.pathname,
      queries: createQueries(),
    }))
  }
  useEffect(() => {
    if (routerSetter.length === 0) {
      routerSetter.push(setRouter)
    }
  }, [])

  return { push, ...router }
}
window.addEventListener('popstate', () => {
  routerSetter[0]((state) => ({
    ...state,
    pathName: window.location.pathname,
    queries: createQueries(),
  }))
})
