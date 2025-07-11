import React, { useState, useEffect } from 'react';

function Qualifying() {
  const [results, setResults] = useState({ Q1: [], Q2: [], Q3: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/qualifying')
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <h1>Loading times...</h1>;
  }

  return (
    <div>
      <div className='Q1'>
        <h2>Q1 Results</h2>
      <ul>
        {results.Q1.map((driver, index) => (
          <ul key={index}>
            {driver.Abbreviation}: {driver.Q1}
          </ul>
        ))}
      </ul>
      </div>
      <div className='Q2'>
        <h2>Q2 Results</h2>
      <ul>
        {results.Q2.map((driver, index) => (
          <ul key={index}>
            {driver.Abbreviation}: {driver.Q2}
          </ul>
        ))}
      </ul>
      </div>
      <div className='Q3'>
        <h2>Q3 Results</h2>
      <ul>
        {results.Q3.map((driver, index) => (
          <ul key={index}>
            {driver.Abbreviation}: {driver.Q3}
          </ul>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Qualifying;
