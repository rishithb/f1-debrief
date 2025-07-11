import React, { useState, useEffect } from 'react';

function Race() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/race')
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {results.map((driver, index) => (
        <div key={index}>
          <h3>{driver.BroadcastName} (#{driver.DriverNumber}) - {driver.Points} points</h3>
          <ul>Finished: {driver.Position}</ul>
          <ul>Started: {driver.GridPosition}</ul>
          <ul>Time: {driver.Time}</ul>
        </div>
      ))}
    </div>
  );
}

export default Race;
