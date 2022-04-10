import Head from 'next/head';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';

export default function NotFoundPage() {
  return (
    <Layout>
      <Head>
        <title>404: Page Not Found</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
            <ArrowLink className='mt-4 md:text-lg' href='/'>
              Back to Home
            </ArrowLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
