import Head from 'next/head';
import React, { ChangeEvent, useState } from 'react';

import { uploadFile } from '@/lib/api';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmittingToBackend, setIsSubmittingToBackend] = useState(false);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const submitToBackend = async () => {
    if (
      uploadedFile &&
      // same validation performed on backend, just to improve upload UX
      uploadedFile.name.endsWith('.csv') &&
      uploadedFile.size < 1024 * 1024 * 256
    ) {
      setIsSubmittingToBackend(true);
      uploadFile(uploadedFile);
      setIsSubmittingToBackend(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Upload</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='layout min-h-screen py-20 pb-10 text-black'>
            <h2 className='mt-8 text-2xl md:text-4xl'>Upload Data</h2>
            <p className='text-md my-2 text-gray-800'>
              First, we need to stop recording in Wireshark. To this press the
              red stop button directly next to the button you used to start
              recording. After this, we need to save the recording to a CSV
              file. To do this, go to File, click Export Packet Dissections, and
              export as a csv. A demonstration of this flow is shown below:
            </p>
            <NextImage
              // TODO make gif displaying workflow
              src='/images/wireshark.png'
              width='100%'
              height='100%'
              className='flex'
            />
            <p className='text-md my-2 text-gray-800'>
              Once you have your CSV file, upload it here.
            </p>
            {uploadedFile ? (
              <div>
                <h4 className='text-md my-2 text-gray-800'>
                  {uploadedFile.name}{' '}
                  <button
                    className='inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700'
                    onClick={() => setUploadedFile(null)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                </h4>
                {uploadedFile.name.endsWith('.csv') ? null : (
                  <p className='text-red-500'>File must be a CSV</p>
                )}
              </div>
            ) : (
              <div className='relative rounded-lg bg-gradient-to-r from-slate-100 to-cyan-200'>
                <input
                  type='file'
                  multiple
                  onChange={onUpload}
                  className='relative z-50 block h-full w-full cursor-pointer p-10 opacity-0'
                />
                <div className='absolute top-0 right-0 left-0 pt-5 text-center'>
                  <h4 className='text-lg text-gray-800'>
                    Drop files to upload
                  </h4>
                  <p className='text-md text-gray-800'>
                    or <br /> Select Files
                  </p>
                </div>
              </div>
            )}
            <Button
              {...(uploadedFile ? {} : { disabled: true })}
              {...(isSubmittingToBackend ? { loading: true } : {})}
              variant='primary'
              className='mt-4'
              onClick={submitToBackend}
            >
              Submit for Analysis
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
