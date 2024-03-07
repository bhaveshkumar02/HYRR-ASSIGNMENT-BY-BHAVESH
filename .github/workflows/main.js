Email Verification for signup:

// server.js

// Required packages and setup...

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  res.status(200).json({ message: 'Signup successful. Verification email sent.' });
});

app.get('/verify-email', (req, res) => {
  const { email, token } = req.query;
  if (/* Token validation logic */) {
    res.status(200).json({ message: 'Email verification successful' });
  } else {
    res.status(400).json({ message: 'Invalid or expired verification token' });
  }
});


SignupForm Code: (Frontend React.js):

const SignupForm = () => {
  const [message, setMessage] = useState('');
  const handleSignup = async () => {
    try {
      const response = await axios.post('/signup', { /* Signup data */ });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Signup failed');
    }
  };
  
  return (
    <div>
      {/* Signup form fields */}
      <button onClick={handleSignup}>Sign Up</button>
      <p>{message}</p>
    </div>
  );
};


Backend (Node.js with Express.js):


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const passwordResetTokens = {};

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const token = generateToken();
  passwordResetTokens[email] = token;
  sendPasswordResetEmail(email, token);
  res.status(200).json({ message: 'Password reset email sent successfully' });
});

app.post('/reset-password', (req, res) => {
  const { email, token, newPassword } = req.body;
  if (passwordResetTokens[email] === token) {
    updateUserPassword(email, newPassword);
    delete passwordResetTokens[email];
    res.status(200).json({ message: 'Password reset successful' });
  } else {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function generateToken() {}
function sendPasswordResetEmail(email, token) {}
function updateUserPassword(email, newPassword) {}
