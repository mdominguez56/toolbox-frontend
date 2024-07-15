import React, { useEffect, useState } from 'react';
import { Container, Table, Navbar } from 'react-bootstrap';
import { fetchData } from './services/api';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Navbar bg="danger" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Toolbox Frontend Challenge</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {data.map((file, index) => (
              file.lines.map((line, idx) => (
                <tr key={`${index}-${idx}`}>
                  <td>{file.file}</td>
                  <td>{line.text}</td>
                  <td>{line.number}</td>
                  <td>{line.hex}</td>
                </tr>
              ))
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default App;
