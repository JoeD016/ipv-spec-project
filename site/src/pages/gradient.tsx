/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef } from 'react';

import Gradient from '@/components/helper/gradient';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  const gradient = useRef(null);

  useEffect(() => {
    // @ts-ignore
    document.body.style = 'background: #091121';
    const G = new Gradient();
    // @ts-ignore
    gradient.current = G;
    // @ts-ignore
    gradient.current.initGradient('#gradient-canvas');
    // @ts-ignore
    return () => gradient.current?.disconnect && gradient.current?.disconnect();
  });
  return (
    <Layout>
      <Seo />

      <main>
        <div>
          <canvas id='gradient-canvas' />
          <main className='flex min-h-screen flex-1 flex-col items-center justify-center bg-grid-slate-100'>
            <div className='max-w-3xl self-center pb-8'>
              <h2
                className='m-0 text-center text-5xl'
                style={{ color: 'white' }}
              >
                Geniverse
              </h2>
              <p
                className='my-8 mx-8 text-center text-xl'
                style={{ color: 'white' }}
              >
                Making generative art accessible
              </p>
              <div className='items-centers flex justify-center'>
                <button
                  type='button'
                  className='text-md mr-2 mb-2 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800'
                >
                  Sign Up
                </button>
              </div>
            </div>
          </main>
        </div>
      </main>
    </Layout>
  );
}
