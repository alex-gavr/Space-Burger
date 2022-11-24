/// <reference types="cypress" />
/// <reference path="../../../cypress/support/component.ts" />
import { Provider } from 'react-redux';
import Home from './home';
import { store } from '../../services/store';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { INGREDIENTS_URL } from '../../utils/config';
import App from '../../components/app/app';


