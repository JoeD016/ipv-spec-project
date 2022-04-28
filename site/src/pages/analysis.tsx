import Head from 'next/head';
import React, { ChangeEvent } from 'react';
import ReactPlayer from 'react-player';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';

import { useAnalysis } from '@/context/analysis';

export default function Analysis() {
  const { analysis } = useAnalysis();

  return (
    <Layout>
      <Head>
        <title>Analysis</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20 pb-10 text-black'>
            <h2 className='mt-8 text-2xl md:text-4xl'>Analysis</h2>
          </div>
        </section>
      </main>
    </Layout>
  );
}
