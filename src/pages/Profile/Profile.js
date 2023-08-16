import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { faCheckCircle, faEllipsis, faLock, faPlay, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

import Image from '~/components/Image';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Profile() {
    const location = useLocation();

    const [activeIndex, setActiveIndex] = useState(null);
    const videoRefs = useRef([]);

    const handleMouseEnter = (index) => {
        if (activeIndex !== null && activeIndex !== index) {
            const oldVideo = videoRefs.current[activeIndex];
            oldVideo.pause();
            oldVideo.currentTime = 0;
        }

        const video = videoRefs.current[index];
        video.play();
        setActiveIndex(index);
    };

    const handleMouseLeave = (index) => {
        if (activeIndex === index) {
            const video = videoRefs.current[index];
            video.play();
        }
    };

    if (location.state && location.state.data) {
        const data = location.state.data;

        return (
            <>
                <div className={cx('account')}>
                    <div className={cx('container')}>
                        <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />

                        <div className={cx('info')}>
                            <h2 className={cx('user_name')}>
                                {data.nickname}
                                {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                            </h2>
                            <p>{data.first_name + ' ' + data.last_name}</p>
                            <Button primary> Follow</Button>
                        </div>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon className={cx('icon_share')} icon={faShare} />
                            <FontAwesomeIcon className={cx('icon_share')} icon={faEllipsis} />
                        </div>
                    </div>

                    <div className={cx('account_info')}>
                        <div>
                            <strong>{data.followings_count}</strong>
                            <span> Đang follow</span>
                        </div>

                        <div>
                            <strong>{data.followers_count}</strong>
                            <span> Follower</span>
                        </div>

                        <div>
                            <strong>{data.likes_count}</strong>
                            <span> Thích</span>
                        </div>
                    </div>

                    <div className={cx('account_title')}>
                        <div>{data.bio}</div>
                    </div>
                </div>

                <div className={cx('videos')}>
                    <div className={cx('video_tab')}>
                        <span className={cx('video_tab_item')}> Video</span>
                        <span className={cx('video_tab_item')}>
                            <FontAwesomeIcon className={cx('icon_share')} icon={faLock} />
                            Đã thích
                        </span>
                    </div>

                    <div className={cx('video_list')}>
                        {data.videos.map((video, index) => (
                            <div className={cx('video_wrapper')} key={video.id}>
                                <video
                                    className={cx('video_item')}
                                    src={video.file_url}
                                    muted
                                    loop
                                    ref={(ref) => (videoRefs.current[index] = ref)}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                />
                                <span className={cx('video_views')}>
                                    <FontAwesomeIcon className={cx('icon_play')} icon={faPlay} />
                                    {video.views_count}
                                </span>

                                <span className={cx('video_description')}>{video.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}
export default Profile;