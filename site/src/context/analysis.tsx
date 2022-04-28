import React, { useContext, useState } from 'react';

import { uploadFile } from '@/lib/api';

// export interface IAnalysis {
//   // this is a general type, will be specific when it has more clarity
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   results?: string;
// }

export interface IInputData {
  macAddressCSV?: string;
  networkActivityCSV?: File;
}

export type AnalysisContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysis: any;
  setMacAddressCSV: (macAddressCSV: string) => void;
  setNetworkActivityCSV: (networkActivityCSV?: File) => void;
  submitDataForAnalysis: () => Promise<void>;
  isSubmittingDataForAnalysis: boolean;
  inputData: IInputData;
};

export const AnalysisContext = React.createContext<AnalysisContextType>({
  analysis: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMacAddressCSV: (_: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNetworkActivityCSV: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  submitDataForAnalysis: async () => {},
  isSubmittingDataForAnalysis: false,
  inputData: {},
});

export const useAnalysis = (): AnalysisContextType =>
  useContext(AnalysisContext);

export const AnalysisProvider: React.FC = ({ children }) => {
  const [analysis, setAnalysis] = useState({});
  const [inputData, setInputData] = useState<IInputData>({});
  const [isSubmittingDataForAnalysis, setIsSubmittingDataforAnalysis] =
    useState(false);

  const setMacAddressCSV = async (macAddressCSV: string) => {
    // response from api
    setInputData((prevInputData) => ({
      ...prevInputData,
      macAddressCSV,
    }));
  };

  const setNetworkActivityCSV = async (networkActivityCSV?: File) => {
    setInputData((prevInputData) => ({
      ...prevInputData,
      networkActivityCSV,
    }));
  };

  const submitDataForAnalysis = async () => {
    if (
      inputData?.networkActivityCSV &&
      // same validation performed on backend, just to improve upload UX
      inputData?.networkActivityCSV.name.endsWith('.csv') &&
      inputData?.networkActivityCSV.size < 1024 * 1024 * 256
    ) {
      setIsSubmittingDataforAnalysis(true);
      const analysis = uploadFile(inputData);
      setAnalysis(analysis);
      console.log({ analysis });
      setIsSubmittingDataforAnalysis(false);
    }
  };

  return (
    <AnalysisContext.Provider
      // you could use a useMemo here to only re-render if the user changes
      value={{
        analysis,
        setMacAddressCSV,
        setNetworkActivityCSV,
        submitDataForAnalysis,
        isSubmittingDataForAnalysis,
        inputData,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};
