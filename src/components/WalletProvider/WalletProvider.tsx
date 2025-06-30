import { useTonWallet } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

import { WalletContext as WalletContextType, WalletProviderProps } from './types';

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const wallet = useTonWallet();
  const [isLoading, setIsLoading] = useState(false);

  const connected = !!wallet;
  const account = wallet?.account;

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
    <WalletContextType.Provider value={contextValue}>
      {children}
    </WalletContextType.Provider>
  );
}; 