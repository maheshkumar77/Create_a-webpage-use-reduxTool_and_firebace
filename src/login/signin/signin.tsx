import React, { useState } from 'react';
import { Input } from "@heroui/input";
import { useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword, doGoogleAuthProvider } from '../../firebase/createUser/Usercreate';
import { useAuth } from '../../firebase/authContext/Context';

const Signin = () => {
  const { UserLoggedIn } = useAuth();
  const navigate = useNavigate(); // Add navigation hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [address, setAddress] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      setIsLogin(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (err) {
        setError(err.message);
        setIsLogin(false);
      }
    }
  };

  const signinwithGoogle = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      setIsLogin(true);
      try {
        await doGoogleAuthProvider();
      } catch (err) {
        setError(err.message);
        setIsLogin(false);
      }
    }
  };

  if (UserLoggedIn) {
    navigate("/", { replace: true }); // Redirect to home if user is logged in
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-[400px]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={submit} className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Input
              label="Phone Number"
              type="text"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Input
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-6"
            disabled={isLogin}
          >
            {isLogin ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="w-full flex flex-row gap-x-2 justify-center items-center mt-4">
          <button
            onClick={signinwithGoogle}
            className="text-indigo-600 hover:underline"
            disabled={isLogin}
          >
            Sign In with Google
          </button>
          <p>Don't have an account? <a href="#" className="text-indigo-600 hover:underline">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
