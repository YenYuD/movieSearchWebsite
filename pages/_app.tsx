import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Footer from "../components/movieWebSites/homePage/Footer"
import "@fontsource/antic-didone"
import Layout from '../components/Layouts/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';


export default function App({ Component, pageProps }: AppProps) {

  const client = new QueryClient();
  return (<><QueryClientProvider client={client}><Layout><Component {...pageProps} /><Footer /></Layout></QueryClientProvider ></>)
}
