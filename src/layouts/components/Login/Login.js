import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { faPhone, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faApple, faFacebook, faGoogle, faInstagram, faLine, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import LoginEmail from './LoginEmail';

const cx = classNames.bind(styles);

function Login({ onLoginData }) {
    const [showLoginEmail, setShowLoginEmail] = useState(false);

    const handleClick = () => {
        setShowLoginEmail(true);
    };
    const handleClickBack = () => {
        setShowLoginEmail(false);
    };

    return (
        <div className={cx('modal')}>
            {!showLoginEmail && (
                <>
                    <div className={cx('container')}>
                        <header className={cx('header')}>
                            <h1> Đăng nhập vào TikTok</h1>
                        </header>
                        <div className={cx('option')}>
                            <button className={cx('option_button')} disabled>
                                <span className={cx('icon_qr')}>
                                    <FontAwesomeIcon icon={faQrcode} />
                                </span>
                                <span> Sử dụng mã QR</span>
                            </button>

                            <button className={cx('option_button', 'option_active')}>
                                <span className={cx('icon_qr')}>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <span onClick={handleClick}> Số điện thoại / Email / TikTok ID</span>
                            </button>

                            <button className={cx('option_button')} disabled>
                                <span className={cx('icon_qr')}>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </span>
                                <span> Tiếp tục với Facebook</span>
                            </button>

                            <button className={cx('option_button')} disabled>
                                <span className={cx('icon_qr')}>
                                    <FontAwesomeIcon icon={faGoogle} />
                                </span>
                                <span> Tiếp tục với Google</span>
                            </button>

                            <button className={cx('option_button')} disabled>
                                <span className={cx('icon_qr')}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </span>
                                <span> Tiếp tục với Twitter</span>
                            </button>

                            <button className={cx('option_button')} disabled>
                                <span className={cx('icon_qr')}>
                                    <FontAwesomeIcon icon={faLine} />
                                </span>
                                <span> Tiếp tục với LINE</span>
                            </button>

                            <button className={cx('option_button')} disabled>
                                <span className={cx('icon_qr')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                <span> Tiếp tục với KakaoTalk</span>
                            </button>

                            <button className={cx('option_button')} disabled>
                                <span className={cx('icon_qr')}>
                                    <FontAwesomeIcon icon={faApple} />
                                </span>
                                <span> Tiếp tục với Apple</span>
                            </button>

                            <button className={cx('option_button')} disabled>
                                <span className={cx('icon_qr')}>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </span>
                                <span> Tiếp tục với Instagram</span>
                            </button>
                        </div>
                    </div>

                    <div className={cx('policy')}>
                        <p className={cx('policy_confirm')}>
                            Bằng cách tiếp, bạn đồng ý với{' '}
                            <a
                                href="https://www.tiktok.com/legal/page/row/terms-of-service/en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Điều khoản sử dụng
                            </a>{' '}
                            của TikTok và xác nhận rằng bạn đã đọc hiểu
                            <a
                                href="https://www.tiktok.com/legal/page/row/privacy-policy/en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {' '}
                                Chính sách Quyền riêng tư
                            </a>{' '}
                            của TikTok
                        </p>
                    </div>
                </>
            )}

            <div className={cx('footer')}>
                Bạn không có tài khoản?{' '}
                <a href="/" className={cx('register')}>
                    {' '}
                    Đăng ký
                </a>
            </div>

            {showLoginEmail && <LoginEmail onClickBack={handleClickBack} onLoginData={onLoginData} />}

            {/* <div className={cx('close')}>
                <FontAwesomeIcon icon={faClose} />
            </div> */}
        </div>
    );
}

export default Login;
