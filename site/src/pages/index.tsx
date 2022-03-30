import React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';

export default function HomePage() {
  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center pb-10 text-center'>
            <h1 className='mt-4'>IPV Spec Project</h1>
            <p className='text-md mt-2 text-gray-800'>
              A toolkit for analyzing local networks tailored towarded
              identifing and preventing intimate partner violence.
            </p>
            <p className='text-md mt-2 text-gray-700'>
              <ArrowLink href=''>
                For more info, visit the CETA website
              </ArrowLink>
            </p>
            <ButtonLink
              className='mt-6'
              href='/wireshark/requirements'
              variant='primary'
            >
              Get Started
            </ButtonLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
