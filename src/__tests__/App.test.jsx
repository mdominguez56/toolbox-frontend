import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import { act } from 'react'; // Importar act desde react

const mock = new MockAdapter(axios);

describe('App component tests cases', () => {
  afterEach(() => {
    mock.reset();
  });

  test('fetches data from backend and displays table rows', async () => {
    const data = [
      {
        file: 'file1.csv',
        lines: [
          { text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' }
        ]
      }
    ];

    mock.onGet('http://localhost:5000/files/data').reply(200, data);

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => expect(screen.getByText('file1.csv')).toBeInTheDocument());
    expect(screen.getByText('RgTya')).toBeInTheDocument();
    expect(screen.getByText('64075909')).toBeInTheDocument();
    expect(screen.getByText('70ad29aacf0b690b0467fe2b2767f765')).toBeInTheDocument();
  });

  test('at least one row is complete in the table', async () => {
    const data = [
      {
        file: 'file1.csv',
        lines: [
          { text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' }
        ]
      }
    ];

    mock.onGet('http://localhost:5000/files/data').reply(200, data);

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => expect(screen.getByText('file1.csv')).toBeInTheDocument());

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(1);

    const firstRow = rows[1];
    const cells = firstRow.querySelectorAll('td');
    expect(cells.length).toBe(4);
    cells.forEach(cell => expect(cell).not.toBeEmptyDOMElement());
  });
});
