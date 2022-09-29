import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';

export default function Record() {
  const [time, setTime] = useState(119); // 2 minutes
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => {
        time = time - 1;
        if (time === 0) {
          clearInterval(interval);
          setIsReady(true);
        }
        return time;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Record</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20 pb-10 text-black'>
            <h2 className='mt-8 text-2xl md:text-4xl'>
              {isReady ? 'Done Recording' : 'Recording...'}
            </h2>
            <p className='text-md my-2 text-gray-800'>
              To get enough data to get some meaningful analysis, we recommend
              letting Wireshark run for ~2 minutes. For your convenience, we
              have added a timer.
            </p>
            {isReady ? (
              <ButtonLink href='/wireshark/upload' variant='primary'>
                Continue
              </ButtonLink>
            ) : (
              <>
                <h3 className='mt-3'>
                  {new Date(time * 1000).toISOString().substring(15, 19)}{' '}
                  seconds remaining
                </h3>
                <h2 className='mt-3'>Manually finding hidden devices</h2>
                <p className='text-md my-8 text-gray-800'>
                  While waiting, check out{' '}
                  <UnderlineLink href='https://www.wikihow.com/Find-Hidden-Cameras'>
                    this guide on manual heuristics
                  </UnderlineLink>{' '}
                  for finding hidden devices.
                </p>
                <ButtonLink
                  href='/wireshark/upload'
                  variant='primary'
                  className='red mt-5'
                >
                  Continue Anyways
                </ButtonLink>
              </>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
