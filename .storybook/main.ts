import path from "path";
import type {StorybookConfig} from "@storybook/nextjs";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@storybook/addon-mdx-gfm",
        "@chromatic-com/storybook"
    ],

    framework: {
        name: "@storybook/nextjs",
        options: {},
    },

    docs: {},

    webpackFinal: async (config) => {
        config.resolve ??= {};
        config.resolve.alias = config.resolve.alias as Record<string, string>;
        config.resolve.alias["@"] = path.resolve(__dirname, "../src");
        return config;
    },

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};
export default config;
