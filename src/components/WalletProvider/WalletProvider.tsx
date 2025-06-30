import { useTonWallet, useTonConnect } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const wallet = useTonWallet();
  const { connected, account } = useTonConnect();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (connected && wallet) {
      console.log('Кошелек подключен:', {
        address: wallet.account.address,
        chain: wallet.account.chain,
        device: wallet.device.appName
      });
    }
  }, [connected, wallet]);

  const contextValue = {
    wallet,
    connected,
    account,
    isLoading,
    setIsLoading
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

// Создаем контекст для доступа к данным кошелька
import { createContext, useContext } from 'react';

interface WalletContextType {
  wallet: any;
  connected: boolean;
  account: any;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet должен использоваться внутри WalletProvider');
  }
  return context;
}; 