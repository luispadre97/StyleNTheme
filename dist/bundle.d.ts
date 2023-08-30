type Theme = {
    [key: string]: any;
};
interface IThemeContextInstance {
    themes: {
        [key: string]: Theme;
    };
    currentTheme: string | null;
    styleElement: HTMLStyleElement | null;
    variables: {
        [key: string]: string;
    };
    loadTheme: (themeName: string, theme: Theme) => void;
    setTheme: (themeName: string) => void;
    updateTheme: () => void;
    init: (variables: {
        [key: string]: string;
    }) => void;
}
declare const ThemeContext: {
    getInstance: () => IThemeContextInstance;
};

interface IThemeContext {
    variables: {
        [key: string]: string;
    };
    updateTheme: () => void;
    loadTheme: (themeName: string, theme: any) => void;
    init: (variables: {
        [key: string]: string;
    }) => void;
}
interface LapgOptions {
    variables?: {
        [key: string]: string;
    };
}
declare global {
    interface Window {
        lapg: typeof lapg;
        ThemeContext: typeof ThemeContext;
    }
}
declare const lapg: (options: LapgOptions) => {
    ThemeContext: IThemeContext;
    loadThemeFromJSON: (themeName: string, themeJSON: any) => void;
    on: (eventName: string, callback: Function) => void;
    emit: (eventName: string, data: any) => boolean;
};

export { lapg as default };
