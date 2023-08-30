'use strict';

function generateCSSRules(themeName, theme, variables) {
  const processStyles = (selector, styles) => {
    const styleRules = [];
    const nestedRules = [];
    for (const [property, value] of Object.entries(styles)) {
      if (typeof value === "object" && !Array.isArray(value)) {
        const nestedSelector = property.startsWith("&") ? property.slice(1) : ` ${property}`;
        nestedRules.push(processStyles(`${selector}${nestedSelector}`, value));
      } else {
        const kebabProperty = camelCaseToKebabCase(property);
        const replacedValue = replaceVariables(value, variables);
        styleRules.push(`${kebabProperty}: ${replacedValue};`);
      }
    }
    const currentRule = `${selector} {${styleRules.join(" ")}}`;
    return [currentRule, ...nestedRules].join("\n");
  };
  let css = "";
  for (const [selector, styles] of Object.entries(theme)) {
    let prefixedSelector;
    if (selector === "body") {
      prefixedSelector = `body[data-dynamic-style]`;
    } else if (selector.startsWith(".") || selector.startsWith("#") || /^[a-zA-Z0-9]+$/.test(selector)) {
      prefixedSelector = `body[data-dynamic-style] ${selector}`;
    } else {
      prefixedSelector = `body[data-dynamic-style] .${themeName}-${selector}`;
    }
    css += processStyles(prefixedSelector, styles);
  }
  return css;
}
function applyGlobalStyles() {
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
function camelCaseToKebabCase(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}
function replaceVariables(value, variables) {
  return value.replace(/\$([a-zA-Z0-9]+(-[a-zA-Z0-9]+)?)/g, (_, varName) => variables[varName]);
}

const ThemeContext = (() => {
  let instance;
  function createInstance() {
    return {
      themes: {},
      currentTheme: null,
      styleElement: null,
      variables: {},
      loadTheme: function(themeName, theme) {
        if (!themeName || !theme) {
          console.error("Invalid arguments.");
          return;
        }
        this.themes[themeName] = theme;
      },
      setTheme: function(themeName) {
        if (!this.themes[themeName]) {
          console.error(`Theme '${themeName}' not found.`);
          return;
        }
        this.currentTheme = themeName;
        this.updateTheme();
      },
      updateTheme: function() {
        if (!this.currentTheme)
          return;
        applyGlobalStyles();
      },
      init: function(variables) {
        this.variables = variables;
      }
    };
  }
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

function themeFactory(themeJSON) {
  return themeJSON;
}

const StyleNTheme = (options) => {
  const themeContextInstance = ThemeContext.getInstance();
  themeContextInstance.init(options.variables || {});
  return {
    ThemeContext: themeContextInstance,
    loadThemeFromJSON: (themeName, themeJSON) => {
      const theme = themeFactory(themeJSON);
      themeContextInstance.loadTheme(themeName, theme);
    },
    on: (eventName, callback) => document.addEventListener(`StyleNTheme:${eventName}`, (e) => {
      if ("detail" in e) {
        callback(e.detail);
      }
    }),
    emit: (eventName, data) => document.dispatchEvent(new CustomEvent(`StyleNTheme:${eventName}`, { detail: data }))
  };
};
(function(global) {
  global.StyleNTheme = StyleNTheme;
  global.ThemeContext = ThemeContext;
})(window);

export default StyleNTheme;
//# sourceMappingURL=bundle.js.map
