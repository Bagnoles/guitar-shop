import { useState } from 'react';
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { useAppDispatch } from '../../hooks/store-hooks';
import { loginAction, registerAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../const';


function RegisterScreen():JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleSubmitRegisterForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(registerAction({name, email, password}))
      .then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(loginAction({email, password}));
          navigate(AppRoutes.List);
        }
      })
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <section className="login">
            <h1 className="login__title">Регистрация</h1>
            <form method="post" action="/" onSubmit={handleSubmitRegisterForm}>
              <div className="input-login">
                <label htmlFor="name">Введите имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="off"
                  value={name}
                  onChange={handleNameChange}
                  pattern='^.{1,15}$'
                  title='Минимальная длина имени 1 символ, максимальная - 15 символов'
                  required
                />
                <p className="input-login__error">Заполните поле</p>
              </div>
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
                <label htmlFor="password">Придумайте пароль</label><span>
                  <input
                    type="password"
                    placeholder="• • • • • • • • • • • •"
                    id="password"
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
              <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RegisterScreen;
