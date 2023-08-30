export class ThemeBuilder {
    private themeConfig: { [key: string]: any } = {};  // Define tu propia estructura aquí

    setColorScheme(colorScheme: string): ThemeBuilder {
        this.themeConfig.colorScheme = colorScheme;
        return this;
    }

    setFont(font: string): ThemeBuilder {
        this.themeConfig.font = font;
        return this;
    }

    build(): any {
        return this.themeConfig;
    }
}
