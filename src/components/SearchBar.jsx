import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [fileName, setFileName] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(fileName);
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" variant="primary">Search</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
