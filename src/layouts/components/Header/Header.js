//import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
    faMoon,
    faClose,
} from '@fortawesome/free-solid-svg-icons';
//Lỗi thư viện này sẽ giúp ta hover 1 lần và hiển thị mãi mãi luôn
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Search from '../Search';
import config from '~/config';
import { useState, createContext } from 'react';

import Login from '~/layouts/components/Login';
// import VideoList from '~/components/Video/VideoList/VideoList';

import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Profile from '~/pages/Profile';

const cx = classNames.bind(styles);

export const SwitchPageContext = createContext();
export const LogoutContext = createContext();
// export const ProfileContext = createContext();

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Vietnamese',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header({ toggleSwitchPageContent }) {
    //Handle logic
    // console.log(toggleSwitchPageContent);
    // const handleMenuChange = (menuItem) => {
    //     switch (menuItem.type) {
    //         case 'language': {
    //             // Handle change to language

    //             break;
    //         }
    //         default: {
    //         }
    //     }
    // };

    //let currentUser = true;
    const [currentUser, setCurrentUser] = useState(false);

    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const handleLogout = () => {
        // console.log('hehe');

        setLogoutSuccess(true);
        setTimeout(() => {
            setCurrentUser(false);
            setLogoutSuccess(false);
        }, 4000);
    };
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/profiles',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coins',
        },

        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faMoon} />,
            title: 'Dark mode',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
            // onClick2: handleLogout,
        },
    ];

    const handleSwitch = () => {
        console.log(currentUser);
        return currentUser ? setCurrentUser(false) : setCurrentUser(true);
        // setCurrentUser(!currentUser);
    };
    const [showLogin, setShowLogin] = useState(false);

    const handleClickLogIn = () => {
        setShowLogin(true);
    };

    const handleClickClose = () => {
        setShowLogin(false);
    };

    //Get data in login
    const [loginData, setLoginData] = useState(null);
    <Routes>
        <Route path="/profile67" element={<Profile />} />
    </Routes>;

    const handleLoginData = (data) => {
        setLoginData(data);
        //console.log('Received login data:', data);
        console.log('Received login data:', loginData);

        // setTimeout(() => {
        //     setCurrentUser(true);
        // }, 6000);
    };

    let items = currentUser ? userMenu : MENU_ITEMS;

    // const [profile, setProfile] = useState[false];

    const navigate = useNavigate();
    const handleClickImage = () => {
        console.log('hehe bị ngu rồi');
        console.log(loginData);
        // navigate('/profile67');
        navigate('/profile67', { state: { data: loginData.data } });

        return <Link to="/profile67"></Link>;
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')} onClick={toggleSwitchPageContent}>
                    <img src={images.logo.default} alt="TikTok" />
                </Link>
                {/* console.log(images.logo) để biết nó in ra cái gì còn làm việc */}

                {/* Search */}
                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            {/* trigger="click" thêm này vào để F12 thêm thuận tiện*/}
                            <Tippy
                                content={<span className={cx('upload-text')}>Upload video</span>}
                                placement="bottom"
                                delay={[0, 100]}
                            >
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>

                            <Tippy content="Message" placement="bottom" delay={[0, 100]}>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>

                            <Tippy content="Inbox" placement="bottom" delay={[0, 100]}>
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('action-btn-inbox')}>20</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text onClick={handleClickLogIn}>
                                Upload
                            </Button>
                            {/* <Button primary disabled onClick={() => alert('Clickec!')} onMouseUp={() => {}}>
                        Log in
                    </Button> */}
                            {/* Icon
                    <Button
                       // leftIcon={<FontAwesomeIcon icon={faSignIn} />}
                        primary
                        //rightIcon={<FontAwesomeIcon icon={faSignal} />}
                    >
                        Log in
                    </Button> */}
                            <Button primary onClick={handleClickLogIn}>
                                Log in
                            </Button>

                            <SwitchPageContext.Provider value={handleSwitch}>
                                {showLogin && (
                                    <div className={cx('modal_overlay')}>
                                        <div className={cx('modal_content')}>
                                            <div className={cx('close')} onClick={handleClickClose}>
                                                <FontAwesomeIcon icon={faClose} />
                                            </div>
                                            <Login onLoginData={handleLoginData} />
                                        </div>
                                    </div>
                                )}
                            </SwitchPageContext.Provider>
                            {/*Custom riêng cho từng button bằng cách thêm className1
                    <Button rounded className1={cx('custom-login')}>
                     class trong trường hợp này là một object vì thế khi ta muốn truy cập đến phần tử cx('custom-login') thì phải dùng : trong file Button  
                        Get app
                    </Button> */}
                            {/* <Button rounded>Get app</Button> */}
                        </>
                    )}
                    {/* <Button outline onClick={handleSwitch}>
                        Switch
                    </Button> */}

                    <LogoutContext.Provider value={{ handleLogout, handleClickImage }}>
                        <Menu
                            items={items}
                            // onChange={handleMenuChange}
                        >
                            {currentUser ? (
                                // <Image
                                //     className5={cx('user-avatar')}
                                //     fallBack1="https://i.pinimg.com/736x/74/b1/10/74b110781d66cd3b501bc85c469f93be.jpg"
                                //     alt="Đào Lê Phương Hoa"
                                //     src="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-3.jpg"
                                // />

                                // <ProfileContext.Provider>
                                <Image
                                    className5={cx('user-avatar')}
                                    fallBack1="https://1.bp.blogspot.com/-uSNd2HxD-jQ/V95VOtKD-NI/AAAAAAAAGAg/dtIlfYKiuNIWaoXzs2DBhKvDDGTc33U7gCEw/s1600/11.%2BRenge%2B%2528Non%2Bnon%2Bbiyori%2529%2BTopTenHazy%2BTop%2B15%2Bnh%25C3%25A2n%2Bv%25E1%25BA%25ADt%2Bloli%2B%25C4%2591%25E1%25BA%25B7c%2Bs%25E1%25BA%25AFc%2Bnh%25E1%25BA%25A5t%2Btrong%2Banime.jpg"
                                    alt={loginData.data.nickname}
                                    src={loginData.data.avatar}
                                    onClickImage={handleClickImage}
                                />
                            ) : (
                                // </ProfileContext.Provider>
                                // Phải tạo ra components Image chứ không lấy trực tiếp img bởi vì thẻ img ta khó có thể chỉnh sửa màu ảnh hay nhiều thuộc tính khác nên ta dùng
                                // component để truyền từ bên ngoài thông qua props sẽ được sử dụng lại nhiều cho hình ảnh và có thế chỉnh sửa tùy thích
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    </LogoutContext.Provider>
                </div>
            </div>

            {logoutSuccess && <div className={cx('logout')}>Đăng xuất thành công</div>}

            {/* {profile && <Profile dataImage={loginData} />} */}
        </header>
    );
}

export default Header;
