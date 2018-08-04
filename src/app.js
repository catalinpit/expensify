import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/ConfigureStore';
import { addExpense } from './actions/Expenses';
import { setTextFilter} from './actions/Filters';
import getVisibleExpenses from './selectors/Expenses';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 599 }));
store.dispatch(addExpense({ description: 'Gas bill', amount: 350, createdAt: 100 }));
store.dispatch(addExpense({ description: 'Rent bill', amount: 2500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));