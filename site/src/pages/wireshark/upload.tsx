import React, { ChangeEvent, useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmittingToBackend, setIsSubmittingToBackend] = useState(false);

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const submitToBackend = async () => {
    if (uploadedFile) {
      setIsSubmittingToBackend(true);
      const formData = new FormData();
      formData.append('file', uploadedFile);
      // upload here
      setIsSubmittingToBackend(false);
    }
  };

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
            <div className='relative border border-dashed border-gray-500'>
              <input
                type='file'
                multiple
                onChange={uploadFile}
                className='relative z-50 block h-full w-full cursor-pointer p-20 opacity-0'
              />
              <div className='absolute top-0 right-0 left-0 m-auto p-10 text-center'>
                <h4>
                  Drop files anywhere to upload
                  <br />
                  or
                </h4>
                <p className=''>Select Files</p>
              </div>
            </div>
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
