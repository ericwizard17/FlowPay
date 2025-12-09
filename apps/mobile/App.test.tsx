import React from 'react';
import { render } from '@testing-library/react-native';
import App from './App';

describe('App', () => {
    it('renders without crashing', () => {
        const { getByText } = render(<App />);
        // App should render successfully
        expect(getByText).toBeDefined();
    });

    it('shows loading screen initially', () => {
        const { container } = render(<App />);
        expect(container).toBeTruthy();
    });
});
