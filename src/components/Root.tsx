import { TonConnectUIProvider } from '@tonconnect/ui-react';

import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { WalletProvider } from '@/components/WalletProvider/WalletProvider.tsx';
import { tonConnectConfig } from '@/config/tonConnect.ts';

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider
        manifestUrl={tonConnectConfig.manifestUrl}
      >
        <WalletProvider>
          <App/>
        </WalletProvider>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
