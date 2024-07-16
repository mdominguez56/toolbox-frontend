import React, { useEffect, useState } from 'react';
import { Container, Table, Navbar, Alert } from 'react-bootstrap';
import { fetchData } from './services/api';
import Loader from './components/Loader';
import SearchBar from './components/SearchBar';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyFileMessage, setEmptyFileMessage] = useState('');

  useEffect(() => {
    fetchData()
      .then(data => {
        setData(data);
        setLoading(false);
        if (data.length === 0) {
          setError('No files found.');
        }
      })
      .catch(() => {
        setError('No files found.');
        setLoading(false);
      });
  }, []);

  const handleSearch = (fileName) => {
    setLoading(true);
    setError(null);
    setEmptyFileMessage('');
    fetchData(fileName)
      .then(data => {
        setData(data);
        setLoading(false);
        if (data.length === 0) {
          setError('No files found.');
        } else if (data.length === 1 && data[0].lines.length === 0) {
          setEmptyFileMessage(`The file ${data[0].file} has no data.`);
        }
      })
      .catch(() => {
        setError('No files found.');
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar bg="danger" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Toolbox Frontend Challenge</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <div style={{ marginBottom: '30px' }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Loader />
          </div>
        ) : error ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Alert variant="danger">{error}</Alert>
          </div>
        ) : emptyFileMessage ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Alert variant="warning">{emptyFileMessage}</Alert>
          </div>
        ) : (
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
        )}
      </Container>
    </div>
  );
};

export default App;
