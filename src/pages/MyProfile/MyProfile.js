import classNames from 'classnames/bind';
import styles from '../Profile/Profile.module.scss';
import { faCheckCircle, faEllipsis, faLock, faPlay, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';

import Image from '~/components/Image';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MyProfile({ dataImage }) {
    console.log('fix mai khong duoc');

    console.log(dataImage);

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

    const [like, setLike] = useState(false);
    const [opacity, setOpacity] = useState(true);
    const handleClickLike = () => {
        setLike(true);
        setOpacity(false);
    };
    const handleClickVideo = () => {
        setLike(false);
        setOpacity(true);
    };

    if (dataImage) {
        console.log('chết chưa');
        return (
            <>
                <div className={cx('account')}>
                    <div className={cx('container')}>
                        <Image className={cx('avatar')} src={dataImage.data.avatar} alt={dataImage.data.nickname} />

                        <div className={cx('info')}>
                            <h2 className={cx('user_name')}>
                                {dataImage.data.nickname}
                                {dataImage.data.tick && (
                                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                                )}
                            </h2>
                            <p>{dataImage.data.first_name + ' ' + dataImage.data.last_name}</p>
                            <Button primary> Follow</Button>
                        </div>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon className={cx('icon_share')} icon={faShare} />
                            <FontAwesomeIcon className={cx('icon_share')} icon={faEllipsis} />
                        </div>
                    </div>

                    <div className={cx('account_info')}>
                        <div>
                            <strong>{dataImage.data.followings_count}</strong>
                            <span> Đang follow</span>
                        </div>

                        <div>
                            <strong>{dataImage.data.followers_count}</strong>
                            <span> Follower</span>
                        </div>

                        <div>
                            <strong>{dataImage.data.likes_count}</strong>
                            <span> Thích</span>
                        </div>
                    </div>

                    <div className={cx('account_title')}>
                        <div>{dataImage.data.bio}</div>
                    </div>
                </div>

                <div className={cx('videos')}>
                    <div className={cx('video_tab')}>
                        <span
                            className={cx(
                                'video_tab_item',
                                // , { active: activeItem === 0 }
                                { opacity: !opacity },
                            )}
                            // onMouseEnter={() => handleHover(0)}
                            // onMouseLeave={() => handleHover(0)}
                            onClick={handleClickVideo}
                        >
                            Video
                        </span>
                        <span
                            className={cx(
                                'video_tab_item',
                                // , { active: activeItem === 1 }
                                'no_active',
                                { opacity: opacity },
                            )}
                            onClick={handleClickLike}
                        >
                            <FontAwesomeIcon className={cx('icon_share')} icon={faLock} />
                            Đã thích
                        </span>

                        <div className={cx('scroll_bar')}></div>
                    </div>
                    {!like && (
                        <div className={cx('video_list')}>
                            {dataImage.data.videos.map((video, index) => (
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
                    )}

                    {like && (
                        <div className={cx('private')}>
                            <div className={cx('icon_private')}>
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <h2 className={cx('title')}>This user's liked videos are private</h2>
                            <p className={cx('description')}>Videos liked by gavintoeic are currently hidden</p>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default MyProfile;
