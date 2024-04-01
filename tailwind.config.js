/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/tailwind", "./index.html"],
  theme: {
    extend: {
      colors: {
        fore: {
          500: "#28292b",
        },
        or: {
          500: "#eed974",
        },
      },

      fontSize: {
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    ({ addVariant }) => {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    ({ addVariant, e, postcss }) => {
      addVariant("hover", ({ container, separator }) => {
        const hoverRule = postcss.atRule({ name: "media", params: "(hover: hover)" });
        hoverRule.append(container.nodes);
        container.append(hoverRule);
        hoverRule.walkRules((rule) => {
          rule.selector = `.${e(`hover${separator}${rule.selector.slice(1)}`)}:hover`;
        });
      });
    },
    ({ addBase, theme }) => {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }

      addBase({
        ":root": extractColorVars(theme("colors")),
      });
    },
  ],
};
