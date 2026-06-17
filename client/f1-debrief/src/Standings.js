import React, { useState, useEffect } from 'react';

function Standings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/standings')
      .then(response => response.json())
      .then(data => {
        setStandings(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>Placeholder</div>
  );
}

export default Standings;
