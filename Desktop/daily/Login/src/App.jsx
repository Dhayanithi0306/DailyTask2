import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [marks, setMarks] = useState({
    chemistry: '',
    maths: '',
    physics: '',
    computing: '',
    electronics: ''
  });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submittedMarks, setSubmittedMarks] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedMarks = JSON.parse(localStorage.getItem('submittedMarks'));
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (storedMarks) setSubmittedMarks(storedMarks);
    if (storedUsername) setUsername(storedUsername);
    if (storedPassword) setPassword(storedPassword);

    // Reset marks state after page refresh
    setMarks({
      chemistry: '',
      maths: '',
      physics: '',
      computing: '',
      electronics: ''
    });
  }, []);

  // Save submittedMarks to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('submittedMarks', JSON.stringify(submittedMarks));
  }, [submittedMarks]);

  // Save username and password to localStorage on login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
// Check if username and password are correct
    if (username.trim() === '' || password.trim() === '') {
      setError('Both username and password are required.');
    } else if (username === 'user' && password === 'pass') {
      // Check if the entered credentials are correct
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      setError('');
      setIsLoggedIn(true);
    } else {
      // If the credentials don't match, show an error
      setError('Invalid username or password.');
    }
  };

  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setMarks({ ...marks, [name]: value });
  };

  const handleAddMarks = (e) => {
    e.preventDefault();
    const newMarks = { studentName, marks };
    const updatedMarks = [...submittedMarks, newMarks];
    setSubmittedMarks(updatedMarks);

    // Reset the marks input fields for further entries
    setMarks({
      chemistry: '',
      maths: '',
      physics: '',
      computing: '',
      electronics: ''
    });
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('submittedMarks');
    setIsLoggedIn(false);
    setSubmittedMarks([]); // Clear submitted marks
  };

  return (
    <div className="app">
      {/* Render login page only if not logged in */}
      {!isLoggedIn ? (
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-container">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label id="p">Password:</label>
              <input
                type="password" // Changed to "password" for security
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p className="error">{error}</p>} {/* Show custom error */}
        </div>
      ) : (
        <div className="subjects-container">
          <h2 class="s">Enter Marks for Subjects</h2>
          <form className="marks-form">
            <div className="marks-container">
              <div>
                <label class="s"><h3>Student Name:</h3></label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div>
                <label class="s" >Chemistry:</label>
                <input
                  type="number"
                  name="chemistry"
                  value={marks.chemistry}
                  onChange={handleMarksChange}
                />
              </div>
              <div>
                <label class="s" >Maths:</label>
                <input
                  type="number"
                  name="maths"
                  value={marks.maths}
                  onChange={handleMarksChange}
                />
              </div>
              <div>
                <label class="s" >Physics:</label>
                <input
                  type="number"
                  name="physics"
                  value={marks.physics}
                  onChange={handleMarksChange}
                />
              </div>
              <div>
                <label class="s"  >Science:</label>
                <input
                  type="number"
                  name="computing"
                  value={marks.computing}
                  onChange={handleMarksChange}
                />
              </div>
              <div>
                <label class="s" >Social:</label>
                <input
                  type="number"
                  name="electronics"
                  value={marks.electronics}
                  onChange={handleMarksChange}
                />
              </div>
            </div>
            <button type="button" onClick={handleAddMarks}>
              Add Marks
            </button>
          </form>

          {/* Display Submitted Marks in Table */}
          <h3>Marks for {studentName || username}:</h3>
          {submittedMarks.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Chemistry</th>
                  <th>Maths</th>
                  <th>Physics</th>
                  <th>Computing</th>
                  <th>Electronics</th>
                </tr>
              </thead>
              <tbody>
                {submittedMarks.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.studentName}</td>
                    <td>{entry.marks.chemistry}</td>
                    <td>{entry.marks.maths}</td>
                    <td>{entry.marks.physics}</td>
                    <td>{entry.marks.computing}</td>
                    <td>{entry.marks.electronics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No marks</p>
          )}

          {/* Logout button */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}


export default App
