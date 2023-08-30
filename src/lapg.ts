import { ThemeContext } from './ThemeContext'; // Make sure ThemeContext is defined correctly
import { themeFactory } from './ThemeFactory';

interface IThemeContext {
  variables: { [key: string]: string };
  updateTheme: () => void;
  loadTheme: (themeName: string, theme: any) => void;
  init: (variables: { [key: string]: string }) => void;
}

interface LapgOptions {
  variables?: { [key: string]: string };
}

declare global {
  interface Window {
    lapg: typeof lapg;
    ThemeContext: typeof ThemeContext;
  }
}


const lapg = (options: LapgOptions) => {
  const themeContextInstance = ThemeContext.getInstance() as IThemeContext; // Cast to the correct type
  themeContextInstance.init(options.variables || {});

  return {
    ThemeContext: themeContextInstance,
    loadThemeFromJSON: (themeName: string, themeJSON: any) => {
      const theme = themeFactory(themeJSON);
      themeContextInstance.loadTheme(themeName, theme);
    },
    on: (eventName: string, callback: Function) => document.addEventListener(`lapg:${eventName}`, (e: Event) => {
      if ('detail' in e) {
        callback((e as CustomEvent).detail);
      }
    }),
    emit: (eventName: string, data: any) => document.dispatchEvent(new CustomEvent(`lapg:${eventName}`, { detail: data })),
  };
};

// Attach to global scope
(function (global: Window) {
  global.lapg = lapg;
  global.ThemeContext = ThemeContext;
})(window);

export default lapg;
