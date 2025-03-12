import tokens from '../dist/json/brand-foo/variables.json';

interface DesignToken {
    value?: any;
    type?: string;
    comment?: string;
    name?: string;
    themeable?: boolean;
    attributes?: Record<string, unknown>;
    [key: string]: any;
}

const token: {
    globals: {
        schemes: {
            light: {
                [key: string]: DesignToken;
            }
        }
    };
} = {
    globals: {
        schemes: {
            light: tokens.schemes.light,
        },
    },
};

export default token