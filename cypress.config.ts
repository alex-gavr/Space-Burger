import { defineConfig } from 'cypress';

export default defineConfig({
    component: {
        devServer: {
            framework: 'create-react-app',
            bundler: 'webpack',
        },
    },

    viewportWidth: 1566,
    viewportHeight: 1150,

    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        env: {
            email: 'sashadrug10@gmail.com',
            password: '12345',
        },
    },
});
