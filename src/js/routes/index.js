import React from 'react';
import AppContainer from 'containers/AppContainer';
import FeedContainer from 'containers/FeedContainer';

import { Route, Switch, Redirect } from 'react-router';

export const ROUTES = {
  root: {
    slug: '/'
  },
  feed: {
    base: '/feed',
    slug: '/feed/:roomId'
  },
};
export default function configureRoutes() {
  return (
    <Switch>
      <Route
        exact
        path={`${ROUTES.root.slug}`}
        component={AppContainer}
      />
      <Route
        path={`${ROUTES.feed.slug}`}
        component={FeedContainer}
      />
    </Switch>
  );
}
