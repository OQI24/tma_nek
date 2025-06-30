import { createContext, useContext } from 'react';

export interface WalletProviderProps {
  children: React.ReactNode;
}

export interface WalletContextType {
  wallet: any;
  connected: boolean;
  account: any;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet должен использоваться внутри WalletProvider');
  }
  return context;
}; 