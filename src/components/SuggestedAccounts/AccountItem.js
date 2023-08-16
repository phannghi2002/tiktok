import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import * as httpRequest from '~/utils/httpRequest';

import Image from '~/components/Image';
import styles from './SuggestedAccounts.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '../Popper';
import AccountPreview from './AccountPreview';
import PropTypes from 'prop-types';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Profile from '~/pages/Profile';

import { SwitchPageContext } from '~/layouts/DefaultLayout/DefaultLayout';
import React, { useContext } from 'react';

// import { Routes, Route, Link } from 'react-router-dom';
// import Profile from '~/pages/Profile';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <div className={cx('preview')}>
                        <AccountPreview data5={data} />
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    // Tiếp theo, bạn có thể sử dụng `username` để gọi API và lấy thông tin tương ứng từ server
    // Ví dụ:

    const fetchProfile = async () => {
        try {
            const response = await httpRequest.get(`users/@${data.nickname}`);
            const profileData = response.data;

            return profileData;
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };

    const navigate = useNavigate();
    const toggleSwitchPage = useContext(SwitchPageContext);

    // // toggleSwitchPage();

    const handleClickAccountItem = async () => {
        toggleSwitchPage();
        const data = await fetchProfile();

        navigate('/profile67', { state: { data: data } });
        return <Link to="/profile67"></Link>;
    };
    <Routes>
        <Route path="/profile67" element={<Profile />} />
    </Routes>;
    // <Routes>
    //     <Route path="/profile" element={<Profile />} />
    // </Routes>;
    return (
        <div onClick={handleClickAccountItem}>
            <Tippy interactive delay={[800, 0]} placement="bottom" render={renderPreview} offset={[-20, 0]}>
                <div className={cx('account-item')}>
                    <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{data.first_name + data.last_name}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object,
};
export default AccountItem;
