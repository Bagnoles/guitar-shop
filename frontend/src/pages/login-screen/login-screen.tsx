import { Link } from 'react-router-dom';
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { AppRoutes } from '../../const';
import { useState } from 'react';

function LoginScreen():JSX.Element {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleSubmitLoginForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">Hовый пользователь? <Link to={AppRoutes.Register} className="login__link">Зарегистрируйтесь</Link> прямо сейчас</p>
            <form method="post" action="/" onSubmit={handleSubmitLoginForm}>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="passwordLogin">Введите пароль</label><span>
                  <input
                    type="password"
                    placeholder="• • • • • • • • • • • •"
                    id="passwordLogin"
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}
                    pattern='^.{6,12}$'
                    title='Минимальная длина пароля 6 символов, максимальная - 12 символов'
                    required
                  />
                  <button className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button></span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium" type="submit">Войти</button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LoginScreen;
