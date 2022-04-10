import Head from 'next/head';
import React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';

export default function RecordInstructions() {
  return (
    <Layout>
      <Head>
        <title>Record Instructions</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20 pb-10 text-black'>
            <h2 className='mt-8 text-2xl md:text-4xl'>Record Data</h2>
            <p className='text-md my-2 text-gray-800'>
              To best understand the IoT devices on the local network, we will
              record data through Wireshark. To get started, open Wireshark.
            </p>
            <p className='text-md my-2 text-gray-800'>
              To start recording data, press the blue shark fin icon in the top
              left of the screen as displayed here.
            </p>
            <NextImage
              src='/images/wireshark.png'
              width='100%'
              height='100%'
              className='flex'
            />
            <p className='text-md my-2 text-gray-800'>
              Let us know when you are recording. You should a bunch of data
              flashing on your screen.
            </p>
            <ButtonLink href='/wireshark/record' variant='primary'>
              {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
              {"I'm Recording"}
            </ButtonLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
