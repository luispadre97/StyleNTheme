import { generateCSSRules, /*applyStyles*/applyGlobalStyles } from './HelperFunctions';  // Asegúrate de importar desde la ubicación correcta

type Theme = { [key: string]: any };  // Define tu propia estructura de tema aquí

interface IThemeContextInstance {
    themes: { [key: string]: Theme };
    currentTheme: string | null;
    styleElement: HTMLStyleElement | null;
    variables: { [key: string]: string };
    loadTheme: (themeName: string, theme: Theme) => void;
    setTheme: (themeName: string) => void;
    updateTheme: () => void;
    init: (variables: { [key: string]: string }) => void;
}

export const ThemeContext = (() => {
    let instance: IThemeContextInstance;

    function createInstance(): IThemeContextInstance {
        return {
            themes: {} as { [key: string]: Theme },
            currentTheme: null as string | null,
            styleElement: null as HTMLStyleElement | null,
            variables: {} as { [key: string]: string },
            loadTheme: function (themeName: string, theme: Theme) {
                if (!themeName || !theme) {
                    console.error('Invalid arguments.');
                    return;
                }
                this.themes[themeName] = theme;
            },
            setTheme: function (themeName: string) {
                if (!this.themes[themeName]) {
                    console.error(`Theme '${themeName}' not found.`);
                    return;
                }
                this.currentTheme = themeName;
                this.updateTheme();
            },
            updateTheme: function () {
                if (!this.currentTheme) return;
                applyGlobalStyles();

                // const theme = this.themes[this.currentTheme];
                // const css = generateCSSRules(this.currentTheme, theme, this.variables);
                // if (!this.styleElement) {
                //     this.styleElement = document.createElement('style');
                //     this.styleElement.setAttribute('data-lazy', 'true');
                //     document.head.appendChild(this.styleElement);
                // }
                // this.styleElement.textContent = css;
                // applyStyles();
            },
            init: function (variables: any) {
                this.variables = variables;
            },
        };
    }

    return {
        getInstance: function () :IThemeContextInstance{
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();
