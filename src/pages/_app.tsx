import '../styles/globals.css'
import type { AppProps } from 'next/app'

// import {store} from '../app/store';
import { Provider } from 'react-redux';
import wrapper from '../app/store';

// export default function App({ Component, pageProps }: AppProps) {
//    return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   )
// }

function App({ Component, pageProps }: AppProps) {
  return (

     <Component {...pageProps} />
 )
}

export default wrapper.withRedux(App);
/* 
wrapper 로 App 컴포넌트를 감싸준다.
브라우저의 redux 상태 동기화는 물론, Provider store 까지 알아서 주입해준다.
*/