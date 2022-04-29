import Head from 'next/head';
import React, { useEffect } from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

import { useAnalysis } from '@/context/analysis';

const BASE_URL = 'http://127.0.0.1:5000/';

export default function Analysis() {
  const { analysis } = useAnalysis();

  useEffect(() => {
    console.log({ analysis });
  }, [analysis]);

  return (
    <Layout>
      <Head>
        <title>Analysis</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20 pb-10 text-black'>
            <h2 className='mt-8 text-2xl md:text-4xl'>Analysis</h2>
            <h3 className='mt-8 text-xl md:text-2xl'>Duration Histogram</h3>
            <NextImage
              src={BASE_URL + analysis?.duration_histogram}
              width='100%'
              height='100%'
              className='flex'
            />
            <h3 className='mt-8 text-xl md:text-2xl'>
              Packet Sent and Received
            </h3>
            <NextImage
              src={BASE_URL + analysis?.packets_sent_and_received}
              width='100%'
              height='100%'
              className='flex'
            />
            <h3 className='mt-8 text-xl md:text-2xl'>Bandwidth Graph</h3>
            {Object.keys(analysis?.bandwidth_graph ?? {}).map(
              (address: string) => (
                <div key={address}>
                  <h4 className='text-md md:text-xl'>{address}</h4>
                  <p className='text-md my-2 text-gray-800'>
                    <NextImage
                      src={BASE_URL + analysis.bandwidth_graph[address]}
                      width='100%'
                      height='100%'
                      className='flex'
                    />
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
