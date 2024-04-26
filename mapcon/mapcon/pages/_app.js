import '../styles/globals.css'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'leaflet/dist/leaflet.css';

import { SessionProvider } from 'next-auth/react'
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXTAUTH_URL;

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
