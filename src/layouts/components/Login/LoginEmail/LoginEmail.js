// import Button from '~/components/Button';
import styles from './LoginEmail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { faChevronLeft, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import loginService from '~/services/loginService';
import { useContext } from 'react';
import { SwitchPageContext } from '~/layouts/components/Header';

const cx = classNames.bind(styles);

function LoginEmail({ onClickBack, onLoginData }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const SwitchLogin = useContext(SwitchPageContext);

    const handleClick = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDeleteNotifyError = () => {
        setShowError(false);
    };
    const isFormValid = email !== '' && password !== '';

    // const [, setLoginData] = useState([]);
    const handleSubmit = () => {
        if (email && password) {
            loginService({ email: email, password: password })
                .then((data) => {
                    onLoginData(data);
                    setLoginSuccess(true);
                    // setLoginData(data);
                })
                .catch((error) => {
                    setShowError(true);
                });
        }
    };

    if (loginSuccess) {
        setTimeout(() => {
            SwitchLogin();
        }, 4000);
    }

    return (
        <div className={cx('container')}>
            <FontAwesomeIcon icon={faChevronLeft} className={cx('icon_back')} onClick={onClickBack} />
            <h2 className={cx('title')}>Đăng nhập</h2>

            <div className={cx('form')}>
                <p className={cx('description')}>Email hoặc TikTok ID</p>

                <input
                    type="text"
                    placeholder="Email hoặc TikTok ID"
                    className={cx('input')}
                    name="email"
                    onChange={handleEmailChange}
                    onClick={handleDeleteNotifyError}
                />
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mật khẩu"
                    className={cx('input')}
                    name="password"
                    onChange={handlePasswordChange}
                    onClick={handleDeleteNotifyError}
                />
                <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className={cx('icon')}
                    onClick={handleClick}
                />
                <a href="/" className={cx('link')}>
                    Quên mật khẩu?
                </a>
                {/* <Button className1={cx('login')} disabled>
                    Đăng nhập
                </Button> */}
                {showError && (
                    <span className={cx('notify_error')}>
                        Mật khẩu hoặc email nhập không chính xác. Vui lòng thử lại.
                    </span>
                )}

                {/* <button className={cx('login', { active: isFormValid })} disabled={!isFormValid} onClick={handleSubmit}>
                    Đăng nhập
                </button> */}
                <button className={cx('login', { active: isFormValid })} onClick={handleSubmit}>
                    Đăng nhập
                </button>
            </div>

            {loginSuccess && <div className={cx('login_success')}>Đăng nhập thành công</div>}
        </div>
    );
}

export default LoginEmail;
