import { TonConnect } from '@tonconnect/sdk';

export interface TransactionRequest {
  to: string;
  amount: string;
  payload?: string;
}

export interface WalletBalance {
  address: string;
  balance: string;
  currency: string;
}

/**
 * Отправка транзакции через TON Connect
 */
export const sendTransaction = async (
  tonConnect: TonConnect,
  transaction: TransactionRequest
): Promise<any> => {
  try {
    const result = await tonConnect.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 секунд
      messages: [
        {
          address: transaction.to,
          amount: transaction.amount,
          payload: transaction.payload || '',
        },
      ],
    });

    console.log('Транзакция отправлена:', result);
    return result;
  } catch (error) {
    console.error('Ошибка при отправке транзакции:', error);
    throw error;
  }
};

/**
 * Получение баланса кошелька
 */
export const getWalletBalance = async (
  address: string
): Promise<WalletBalance> => {
  try {
    // Здесь можно интегрировать с TON API для получения баланса
    // Пока возвращаем заглушку
    const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
    const data = await response.json();
    
    return {
      address,
      balance: data.result || '0',
      currency: 'TON'
    };
  } catch (error) {
    console.error('Ошибка при получении баланса:', error);
    return {
      address,
      balance: '0',
      currency: 'TON'
    };
  }
};

/**
 * Проверка валидности TON адреса
 */
export const isValidTonAddress = (address: string): boolean => {
  const tonAddressRegex = /^[0-9a-zA-Z_-]{48}$/;
  return tonAddressRegex.test(address);
};

/**
 * Форматирование адреса для отображения
 */
export const formatAddress = (address: string): string => {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Конвертация TON в наноТОН
 */
export const tonToNano = (ton: string): string => {
  return (parseFloat(ton) * 1000000000).toString();
};

/**
 * Конвертация наноТОН в TON
 */
export const nanoToTon = (nano: string): string => {
  return (parseFloat(nano) / 1000000000).toFixed(9);
}; 