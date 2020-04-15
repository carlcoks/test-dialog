export default {};

export const createAsyncDataGuard = (store, router, bar) => (async (to, from, next) => {
  const matched = router.getMatchedComponents(to);
  const prevMatched = router.getMatchedComponents(from);
  let diffed = false;

  const activated = matched.filter((c, i) => {
    const isActivated = diffed || (diffed = (prevMatched[i] !== c));
    return isActivated;
  });

  if (!activated.length) {
    activated.push(matched[matched.length - 1]);
  }

  const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
  if (!asyncDataHooks.length) {
    bar.done();
    store.dispatch('setErrorResponse');
    return next();
  }

  try {
    const hooks = asyncDataHooks
      .map(hook => hook({ store, route: to, from }))
      .filter(_ => _);

    if (hooks.length) {
      if (bar.show && bar.progress === 100) {
        let unwatch;
        await new Promise(resolve => {
          unwatch = bar.$watch('show', resolve);
        });
        unwatch();
      }
      bar.start();
    }
    await Promise.all(hooks);
    setTimeout(bar.done);

    // Clean error layout
    store.dispatch('setErrorResponse');
    next();
  } catch (error) {
    bar.fail();
    console.warn(error);

    store.dispatch('setErrorResponse', error);
    next();
  }
});
