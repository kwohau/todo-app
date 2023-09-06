import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(cookies);

  // untuk menentukan status login user dan juga show error
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  // handle submit form untuk memastikan apakah email dan password sudah benar
  const handleSubmit = async (e, endPoint) => {
    e.preventDefault();
    // jika isLogin false/signup password dan confirm password harus sama agar dapat lanjut
    if (!isLogin && password !== confirmPassword) {
      setError('Pastikan Password sama dengan Confirm Password');
      return;
    }
    //endpoint akan berubah menjadi login atau signup tergantung dengan button submit yang di klick oleh user dibawah
    // bila endpoint bervalue login, makan akan membuka page login, jika tidak maka akan membuka page signup
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endPoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);

      window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          {/* bila isLogin true maka tampilkan form login */}
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <input
            type="email"
            placeholder="Email"
            // state email akan berganti sesuai dengan yang ada event target value / yang diisi user
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            // state password akan berganti sesuai dengan yang ada event target value / yang diisi user
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* jika isLogin false maka tampilkan input confirm password */}
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              // state confirm password akan berganti sesuai dengan yang ada event target value / yang diisi user
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            //endpoint akan melihat bahwa isLogin true makan endpoint akan berubah menjadi login, jika tidak maka endpoint akan bernilai signup
            onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}
          />
          {/* jika ada error maka paragraf error akan muncul */}
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          {/* bila isLogin false maka button sign up berwarna abu abu */}
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
            }}
          >
            Sign Up
          </button>
          {/* bila isLogin true maka button button login berwarna abu abu */}
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
