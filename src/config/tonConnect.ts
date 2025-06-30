interface TonConnectConfig {
  manifestUrl: string;
  redirectUrl?: string;
}

const getTonConnectConfig = (): TonConnectConfig => {
  const isDevelopment = import.meta.env.DEV;
  const isHttps = import.meta.env.VITE_HTTPS === 'true';
  
  if (isDevelopment) {
    return {
      manifestUrl: isHttps 
        ? 'https://localhost:5173/tonconnect-manifest.json'
        : 'http://localhost:5173/tonconnect-manifest.json',
      redirectUrl: isHttps 
        ? 'https://localhost:5173'
        : 'http://localhost:5173'
    };
  }
  
  // Production configuration
  return {
    manifestUrl: 'https://OQI24.github.io/tma_nek/tonconnect-manifest.json',
    redirectUrl: 'https://OQI24.github.io/tma_nek'
  };
};

export const tonConnectConfig = getTonConnectConfig(); 