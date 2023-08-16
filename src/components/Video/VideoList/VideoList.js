import classNames from 'classnames/bind';

import * as httpRequest from '~/utils/httpRequest';
import styles from './VideoList.module.scss';
import Image from '../../Image';
import VideoItem from '../VideoItem/VideoItem';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Profile from '~/pages/Profile';
import { SwitchPageContext } from '~/layouts/DefaultLayout/DefaultLayout';
import React, { useContext } from 'react';

const cx = classNames.bind(styles);
function VideoList({ data }) {
    const navigate = useNavigate();
    const toggleSwitchPage = useContext(SwitchPageContext);

    const handleClick = async (videoUser) => {
        console.log(videoUser.nickname);
        try {
            toggleSwitchPage();
            const profileData = await fetchProfile(videoUser.nickname);
            console.log(profileData);
            navigate('/profile67', { state: { data: profileData } });
            return <Link to="/profile67"></Link>;
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };
    <Routes>
        <Route path="/profile67" element={<Profile />} />
    </Routes>;

    const fetchProfile = async (nickname) => {
        try {
            const response = await httpRequest.get(`users/@${nickname}`);
            //return response.data then it just run
            const profileData = response.data;
            return profileData;
        } catch (error) {
            console.error('Error fetching profile details:', error);
            throw error; // Rethrow the error to be caught in the handleClick function
        }
    };

    return (
        <div className={cx('wrapper')}>
            {data.map((video) => (
                <div key={video.id} className={cx('content')}>
                    <div className={cx('field_avatar')} onClick={() => handleClick(video.user)}>
                        <Image src={video.user.avatar} className5={cx('avatar')} />
                    </div>
                    <VideoItem video={video} />
                </div>
            ))}
        </div>
    );
}

export default VideoList;
