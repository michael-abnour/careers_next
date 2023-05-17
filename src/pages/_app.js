import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'
import { store } from 'src/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>

  <Component {...pageProps} />
    </Provider>
    )

}
