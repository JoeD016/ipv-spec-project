import { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/styles/colors.css';

import { AnalysisProvider } from '@/context/analysis';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnalysisProvider>
      <Component {...pageProps} />
    </AnalysisProvider>
  );
}

export default MyApp;
