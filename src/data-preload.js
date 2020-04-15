export default async function (routeComponents, route, store) {
  const childComponents = []
  const cachedKeys = []
  const componentRecursion = (component, key) => {

    if (cachedKeys.indexOf(key) !== -1)
      return

    if (routeComponents.indexOf(component) === -1)
      childComponents.push(component)

    cachedKeys.push(key)

    if (component.components) {

      Object.keys(component.components).forEach(key => {
        componentRecursion(component.components[key], key)
      })
    }
  }

  routeComponents.forEach(component => componentRecursion(
    component,
    component.name
  ))

  // initial mutations (routes)
  const routeInitialMutations = routeComponents.map(
    component => component.initialMutations
  ).filter(
    mutations => Array.isArray(mutations)
  )

  // invoke initial mutations (routes)
  routeInitialMutations.forEach(
    mutations => mutations.forEach(
      mutation => store.commit(mutation)
    )
  )

  // async data hooks (routes)
  const routeAsyncDataHooks = routeComponents.map(
    component => component.asyncData
  ).filter(
    callable => typeof callable === 'function'
  )


  // async data promises (routes)
  const routeAsyncDataPromises = routeAsyncDataHooks.map(
    callable => callable({
      store,
      route,
    })
  )

  // waiting (routes)
  await Promise.all(routeAsyncDataPromises)

  // initial mutations (children)
  const childInitialMutations = childComponents.map(
    component => component.initialMutations
  ).filter(
    mutations => Array.isArray(mutations)
  )

  // invoke initial mutations (children)
  childInitialMutations.forEach(
    mutations => mutations.forEach(
      mutation => store.commit(mutation)
    )
  )

  // async data hooks (children)
  const childAsyncDataHooks = childComponents.map(
    component => component.asyncData
  ).filter(
    callable => typeof callable === 'function'
  )

  // async data promises (children)
  const childAsyncDataPromises = childAsyncDataHooks.map(
    callable => callable({
      store,
      route,
    })
  )

  // waiting (children)
  await Promise.all(childAsyncDataPromises)
}
