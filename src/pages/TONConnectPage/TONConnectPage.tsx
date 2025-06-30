import { openLink } from '@telegram-apps/sdk-react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import {
  Avatar,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
  Button,
  Spinner,
} from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { DisplayData } from '@/components/DisplayData/DisplayData.tsx';
import { Page } from '@/components/Page.tsx';
import { useWallet } from '@/components/WalletProvider/WalletProvider.tsx';
import { bem } from '@/css/bem.ts';

import './TONConnectPage.css';

const [, e] = bem('ton-connect-page');

export const TONConnectPage: FC = () => {
  const { wallet, connected, isLoading } = useWallet();
  const [tonConnectUI] = useTonConnectUI();

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect();
      console.log('Кошелек отключен');
    } catch (error) {
      console.error('Ошибка при отключении кошелька:', error);
    }
  };

  if (isLoading) {
    return (
      <Page>
        <div className={e('loading')}>
          <Spinner size="l" />
          <Text>Подключение к кошельку...</Text>
        </div>
      </Page>
    );
  }

  if (!connected || !wallet) {
    return (
      <Page>
        <Placeholder
          className={e('placeholder')}
          header="TON Connect"
          description={
            <>
              <Text>
                Для отображения данных, связанных с TON Connect, необходимо подключить ваш кошелек
              </Text>
              <TonConnectButton className={e('button')}/>
            </>
          }
        />
      </Page>
    );
  }

  const {
    account: { chain, publicKey, address },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features,
    },
  } = wallet;

  return (
    <Page>
      <List>
        {'imageUrl' in wallet && (
          <>
            <Section>
              <Cell
                before={
                  <Avatar src={wallet.imageUrl} alt="Provider logo" width={60} height={60}/>
                }
                after={<Navigation>О кошельке</Navigation>}
                subtitle={wallet.appName}
                onClick={(e) => {
                  e.preventDefault();
                  openLink(wallet.aboutUrl);
                }}
              >
                <Title level="3">{wallet.name}</Title>
              </Cell>
            </Section>
            <Section>
              <Button 
                className={e('disconnect-button')}
                onClick={handleDisconnect}
                mode="outline"
              >
                Отключить кошелек
              </Button>
            </Section>
          </>
        )}
        <DisplayData
          header="Аккаунт"
          rows={[
            { title: 'Адрес', value: address },
            { title: 'Сеть', value: chain },
            { title: 'Публичный ключ', value: publicKey },
          ]}
        />
        <DisplayData
          header="Устройство"
          rows={[
            { title: 'Название приложения', value: appName },
            { title: 'Версия приложения', value: appVersion },
            { title: 'Максимальная версия протокола', value: maxProtocolVersion },
            { title: 'Платформа', value: platform },
            {
              title: 'Возможности',
              value: features
                .map((f: any) => typeof f === 'object' ? f.name : undefined)
                .filter((v: any) => v)
                .join(', '),
            },
          ]}
        />
      </List>
    </Page>
  );
};
