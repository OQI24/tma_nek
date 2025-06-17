import { mockTelegramEnv, isTMA, emitEvent } from '@telegram-apps/sdk-react';

// Важно, чтобы окружение было смоделировано только для целей разработки. При сборке приложения
// import.meta.env.DEV станет false, и код внутри будет удален, так что вы не увидите его в
// финальном бандле.
if (import.meta.env.DEV) {
  if (!await isTMA('complete')) {
    const themeParams = {
      accent_text_color: '#6ab2f2',
      bg_color: '#17212b',
      button_color: '#5288c1',
      button_text_color: '#ffffff',
      destructive_text_color: '#ec3942',
      header_bg_color: '#17212b',
      hint_color: '#708499',
      link_color: '#6ab3f3',
      secondary_bg_color: '#232e3c',
      section_bg_color: '#17212b',
      section_header_text_color: '#6ab3f3',
      subtitle_text_color: '#708499',
      text_color: '#f5f5f5',
    } as const;
    const noInsets = { left: 0, top: 0, bottom: 0, right: 0 } as const;

    mockTelegramEnv({
      onEvent(e) {
        // Здесь вы можете писать свои обработчики для всех известных методов Telegram Mini Apps.
        if (e[0] === 'web_app_request_theme') {
          return emitEvent('theme_changed', { theme_params: themeParams });
        }
        if (e[0] === 'web_app_request_viewport') {
          return emitEvent('viewport_changed', {
            height: window.innerHeight,
            width: window.innerWidth,
            is_expanded: true,
            is_state_stable: true,
          });
        }
        if (e[0] === 'web_app_request_content_safe_area') {
          return emitEvent('content_safe_area_changed', noInsets);
        }
        if (e[0] === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', noInsets);
        }
      },
      launchParams: new URLSearchParams([
        // Узнайте больше о параметрах запуска:
        // https://docs.telegram-mini-apps.com/platform/launch-parameters#parameters-list
        ['tgWebAppThemeParams', JSON.stringify(themeParams)],
        // Ваши начальные данные здесь. Узнайте больше об этом здесь:
        // https://docs.telegram-mini-apps.com/platform/init-data#parameters-list
        //
        // Обратите внимание, что для того, чтобы убедиться, что вы используете действительные начальные данные,
        // вы должны передать их точно так, как они отправляются из приложения Telegram. Причина в том, что если вы
        // отсортируете его ключи (auth_date, hash, user и т.д.) или значения по-своему, проверка начальных данных
        // скорее всего не пройдет на вашей стороне сервера. Поэтому, чтобы убедиться, что вы работаете с
        // действительными начальными данными, лучше взять реальные из вашего приложения и вставить их здесь. Они
        // должны выглядеть примерно так (правильно закодированные параметры URL поиска):
        // ```
        // user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22...
        // ```
        // Но если вам действительно не нужны действительные начальные данные, используйте эти:
        ['tgWebAppData', new URLSearchParams([
          ['auth_date', (new Date().getTime() / 1000 | 0).toString()],
          ['hash', 'some-hash'],
          ['signature', 'some-signature'],
          ['user', JSON.stringify({ id: 1, first_name: 'Vladislav' })],
        ]).toString()],
        ['tgWebAppVersion', '8.4'],
        ['tgWebAppPlatform', 'tdesktop'],
      ]),
    });

    console.info(
      '⚠️ Поскольку текущее окружение не было признано основанным на Telegram, оно было смоделировано. Обратите внимание, что вы не должны делать это в производственной среде, и текущее поведение специфично только для процесса разработки. Моделирование окружения также применяется только в режиме разработки. Таким образом, после сборки приложения вы не увидите это поведение и связанное с ним предупреждение, что приведет к сбою приложения вне Telegram.',
    );
  }
}
