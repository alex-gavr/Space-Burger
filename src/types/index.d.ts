import { Cypress } from 'cypress';
export {};

declare global {
    interface Window {
        Cypress: Cypress;
        store:any;
    }
}