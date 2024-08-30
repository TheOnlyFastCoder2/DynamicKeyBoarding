import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './store'
import Game from './game'

import 'styles/bundler.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Game />
  </Provider>
  // </React.StrictMode>,
)
