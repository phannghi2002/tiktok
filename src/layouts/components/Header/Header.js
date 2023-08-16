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
} from '@fortawesome/free-solid-svg-icons';

//Lỗi thư viện này sẽ giúp ta hover 1 lần và hiển thị mãi mãi luôn
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Search from '../Search';
import config from '~/config';
import { useState } from 'react';

const cx = classNames.bind(styles);

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
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language': {
                // Handle change to language

                break;
            }
            default: {
            }
        }
    };

    //let currentUser = true;
    const [currentUser, setCurrentUser] = useState(true);
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
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    const handleSwitch = () => {
        return currentUser ? setCurrentUser(false) : setCurrentUser(true);
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
                            <Button text>Upload</Button>
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

                            <Button primary onClick={handleSwitch}>
                                Log in
                            </Button>
                            {/*Custom riêng cho từng button bằng cách thêm className1
                    <Button rounded className1={cx('custom-login')}>
                     class trong trường hợp này là một object vì thế khi ta muốn truy cập đến phần tử cx('custom-login') thì phải dùng : trong file Button  
                        Get app
                    </Button> */}
                            {/* <Button rounded>Get app</Button> */}
                        </>
                    )}
                    <Button outline onClick={handleSwitch}>
                        Switch
                    </Button>

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className5={cx('user-avatar')}
                                fallBack1="https://i.pinimg.com/736x/74/b1/10/74b110781d66cd3b501bc85c469f93be.jpg"
                                alt="Đào Lê Phương Hoa"
                                src="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-3.jpg"
                            />
                        ) : (
                            // Phải tạo ra components Image chứ không lấy trực tiếp img bởi vì thẻ img ta khó có thể chỉnh sửa màu ảnh hay nhiều thuộc tính khác nên ta dùng
                            // component để truyền từ bên ngoài thông qua props sẽ được sử dụng lại nhiều cho hình ảnh và có thế chỉnh sửa tùy thích
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
