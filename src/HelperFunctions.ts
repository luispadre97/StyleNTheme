// Ficticio: Asegúrate de importar esto desde donde realmente se defina.
import { ThemeContext } from './ThemeContext';

interface Style {
  [key: string]: string | Style;
}

interface Variables {
  [key: string]: string;
}

export function generateCSSRules(themeName: string, theme: Style, variables: Variables): string {
  const processStyles = (selector: string, styles: Style): string => {
    const styleRules: string[] = [];
    const nestedRules: string[] = [];

    for (const [property, value] of Object.entries(styles)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const nestedSelector = property.startsWith('&') ? property.slice(1) : ` ${property}`;
        nestedRules.push(processStyles(`${selector}${nestedSelector}`, value as Style));
      } else {
        const kebabProperty = camelCaseToKebabCase(property);
        const replacedValue = replaceVariables(value as string, variables);
        styleRules.push(`${kebabProperty}: ${replacedValue};`);
      }
    }

    const currentRule = `${selector} {${styleRules.join(" ")}}`;
    return [currentRule, ...nestedRules].join("\n");
  };

  let css = '';
  for (const [selector, styles] of Object.entries(theme)) {
    let prefixedSelector;

    if (selector === 'body') {
      prefixedSelector = `body[data-dynamic-style]`;
    } else if (selector.startsWith('.') || selector.startsWith('#') || /^[a-zA-Z0-9]+$/.test(selector)) {
      prefixedSelector = `body[data-dynamic-style] ${selector}`;
    } else {
      prefixedSelector = `body[data-dynamic-style] .${themeName}-${selector}`;
    }

    css += processStyles(prefixedSelector, styles);
  }

  return css;
}

// export function applyStyles(): void {
//   const themeContextInstance = ThemeContext.getInstance();
//   const elements = document.querySelectorAll('[data-dynamic-style]');

//   elements.forEach((element: Element) => {
//     const themeName = element.getAttribute('data-theme') || themeContextInstance.currentTheme;
//     const css = generateCSSRules(themeName, themeContextInstance.themes[themeName], themeContextInstance.variables);
//     if (!element.hasOwnProperty('_styleElement')) {
//       (element as any)._styleElement = document.createElement('style');
//       (element as any)._styleElement.setAttribute('data-lazy', 'true');
//       document.head.appendChild((element as any)._styleElement);
//     }
//     (element as any)._styleElement.textContent = css;
//   });
// }
export function applyGlobalStyles(): void {
  const themeContextInstance = ThemeContext.getInstance();
  const themeName = themeContextInstance.currentTheme;
  const css = generateCSSRules(themeName, themeContextInstance.themes[themeName], themeContextInstance.variables);

  if (!themeContextInstance.styleElement) {
    themeContextInstance.styleElement = document.createElement("style");
    themeContextInstance.styleElement.setAttribute("data-lazy", "true");
    document.head.appendChild(themeContextInstance.styleElement);
  }

  themeContextInstance.styleElement.textContent = css;
}

export function camelCaseToKebabCase(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

export function replaceVariables(value: string, variables: Variables): string {
  return value.replace(/\$([a-zA-Z0-9]+(-[a-zA-Z0-9]+)?)/g, (_, varName) => variables[varName]);
}

