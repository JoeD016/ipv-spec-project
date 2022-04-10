import Head from 'next/head';
import React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

export default function Requirements() {
  return (
    <Layout>
      <Head>
        <title>Requirements</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center pb-10 text-center text-black'>
            <h2 className='mt-8 text-2xl md:text-4xl'> Requirements</h2>
            <p className='text-md mt-2 text-gray-800'>
              To use this tool, you need to have Wireshark installed.
            </p>
            <div className='layout mt-4 flex flex-row items-center justify-center gap-4'>
              <ButtonLink
                variant='outline'
                href='https://www.wireshark.org/#download'
                target='_blank'
              >
                Download Wireshark
              </ButtonLink>
              <ButtonLink
                variant='primary'
                href='/wireshark/record-instructions'
              >
                Continue (I have Wireshark Downloaded)
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
