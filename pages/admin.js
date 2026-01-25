import { useState, useEffect } from 'react';

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [results, setResults] = useState([]);

  function checkPassword() {
    if (password.trim() === "455admin") {
      setAuthorized(true);
    } else {
      alert("Incorrect admin password");
    }
  }

  useEffect(() => {
    if (!authorized) return;

    async function loadResults() {
      const res = await fetch('/api/getQuizResults');
      const data = await res.json();
      setResults(data);
    }

    loadResults();
  }, [authorized]);

  if (!authorized) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />
        <button onClick={checkPassword}>Enter</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Quiz Submissions</h1>

      {results.length === 0 && <p>No results yet.</p>}

      {results.length > 0 && (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', marginTop: 20 }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Timestamp</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.timestamp || "Unknown"}</td>
                <td>{r.q1}</td>
                <td>{r.q2}</td>
                <td>{r.q3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
