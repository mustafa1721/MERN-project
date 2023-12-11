import React from 'react';
import { signInWithGoogle } from '../firebase';
import './login.css';
import { useHistory } from 'react-router-dom';


const Login = () => {

  const history = useHistory();
  const handleSignIn = async () => {
    try {
      const signInResponse = await signInWithGoogle();
      console.log(signInResponse)
      if (signInResponse === "SUCCESS") {

        history.push('/customer-list');
      } else {

      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Hii there, Let's get started...</h2>
      </div>
      <div className="content">
        <div className="button-section">
          <button onClick={handleSignIn} className="btn-google">
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
