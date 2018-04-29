import { applyMiddleware, compose, createStore } from 'redux';
import Reducers from 'reducers';
import rootSaga from 'sagas';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(options = {}) {
  const { initialState = {}, browserHistory = {} } = options;

  const middlewares = [];

  const sagaMiddleware = createSagaMiddleware({
    logger: () => {}
  });

  middlewares.push(
    routerMiddleware(browserHistory),
    sagaMiddleware
  );

  if (process.env.DEV) {
    middlewares.push(createLogger());
  }

  const store = createStore(
    connectRouter(browserHistory)(Reducers),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
