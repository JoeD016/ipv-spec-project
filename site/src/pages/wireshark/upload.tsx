import React from 'react';

import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

export default function Upload() {
  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20 pb-10 text-black'>
            <h2 className='mt-8 text-2xl md:text-4xl'>Upload Data</h2>
            <p className='text-md my-2 text-gray-800'>
              First, we need to stop recording in Wireshark. To this press the
              red stop button directly next to the button you used to start
              recording. After this, we need to save the recording to a PCAP
              file. A demonstration of this flow is shown below:
            </p>
            <NextImage
              src='/images/wireshark.png'
              width='100%'
              height='100%'
              className='flex'
            />
            <p className='text-md my-2 text-gray-800'>
              Once you have your PCAP file, upload it here.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
