import classNames from 'classnames/bind';
import styles from './VideoItem.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import {
    faPlay,
    faPause,
    faVolumeXmark,
    faHeart,
    faComment,
    faBookmark,
    faShare,
    faVolumeHigh,
    faVolumeLow,
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function VideoItem({ video }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <div className={cx('preview')}>
                        <AccountPreview data5={video.user} />
                    </div>
                </PopperWrapper>
            </div>
        );
    };

    const videoRef = useRef(null);
    const inputRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [videoRect, setVideoRect] = useState();
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const rect = videoRef.current.getBoundingClientRect();
            setIsVisible(rect.top < window.innerHeight && rect.bottom >= 0);
            setVideoRect(rect);

            //Khi video đang phát thì set lại nó để cập nhật icon
            !videoRef.current.paused ? setIsPlay(false) : setIsPlay(true);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [videoRef]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoError, setIsVideoError] = useState(false);

    useEffect(() => {
        if (!isPlaying && isVisible && videoRect) {
            if (videoRect.top > 50 && videoRect.bottom < window.innerHeight + 100) {
                videoRef.current.play().catch((error) => {
                    // Handle play error
                    setIsVideoError(true);
                    console.error('Failed to play video:', error);
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying, isVisible, videoRect]);

    // const [time, setTime] = useState('');

    // useEffect(() => {
    //     if (isVisible) {
    //         let duration = Math.round(videoRef.current.duration);
    //         let formattedTime;
    //         console.log(duration);

    //         if (duration < 60) {
    //             formattedTime = `00:${duration}`;
    //             if (duration < 10) formattedTime = `00:0${duration}`;
    //         } else {
    //             const minute = Math.floor(duration / 60);
    //             const second = duration % 60;
    //             let secondString, minuteString;
    //             //if(second<10 && minute < 10) formattedTime = `0${minute}:0${second}` ; else if(minute < 10 ) formattedTime = `0${minute}:${second}`
    //             if (second < 10) secondString = `0${second}`;
    //             if (minute < 10) minuteString = `0${minute}`;
    //             formattedTime = `${minuteString}:${secondString}`;
    //         }

    //         setTime(formattedTime);
    //     }
    // }, [videoRef, isVisible]);

    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (videoRef.current && videoRef.current.currentTime) {
                setCurrentTime(videoRef.current.currentTime);
            }
        }, 1000); // Update every second

        return () => {
            clearInterval(intervalId); // Clean up the interval on component unmount
        };
    }, [videoRef]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const formattedSeconds = Math.floor(seconds % 60)
            .toString()
            .padStart(2, '0');

        return `${minutes}:${formattedSeconds}`;
    }

    const handleClick = () => {
        setIsPlaying((prevValue) => !prevValue);
        setIsPlay((prevValue) => !prevValue);
        isPlay ? videoRef.current.play() : videoRef.current.pause();
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };
    useEffect(() => {
        const currentVideoRef = videoRef.current;

        videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            if (currentVideoRef) {
                currentVideoRef.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);
    //Slider time bar
    const handleChangeTime = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        videoRef.current.currentTime = newTime;
    };

    const mySlider = inputRef.current;

    // eslint-disable-next-line no-unused-vars
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (mySlider) => {
        if (mySlider) {
            const valPercent = (mySlider.value / mySlider.max) * 100;

            mySlider.style.background = `linear-gradient(to right, #ffffff ${valPercent}%, #a4a5a8 ${valPercent}%)`;
            setSliderValue(mySlider.value);
        }
    };
    useEffect(() => {
        handleSliderChange(mySlider);
    }, [currentTime, mySlider]);

    // Slider volume bar
    const [volume, setVolume] = useState(0);
    const inputVolumeRef = useRef(null);

    useEffect(() => {
        videoRef.current.volume = volume;
        handleSliderChange(inputVolumeRef.current);
    }, [volume]);

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
    };

    const returnVolume = () => {
        if (volume === 0) {
            return <FontAwesomeIcon icon={faVolumeXmark} />;
        } else if (volume === 1) {
            return <FontAwesomeIcon icon={faVolumeHigh} />;
        } else {
            return <FontAwesomeIcon icon={faVolumeLow} className={cx('volume_low')} />;
        }
    };

    const [prevVolume, setPreVolume] = useState(volume);
    const handleClickVolume = () => {
        if (volume === 0) setVolume(prevVolume);
        else {
            setPreVolume(volume);
            setVolume(0);
        }
    };

    return (
        <div>
            <header>
                <Tippy interactive delay={[800, 0]} placement="bottom" render={renderPreview} offset={[-20, 0]}>
                    <div>
                        <span className={cx('nickname')}> {video.user.nickname}</span>
                        <span className={cx('bio')}>{video.user.bio}</span>
                    </div>
                </Tippy>
                <div className={cx('description')}>{video.description}</div>
            </header>

            <div className={cx('video-wrapper')}>
                <video
                    ref={videoRef}
                    className={cx('video')}
                    src={video.file_url}
                    autoPlay
                    muted={volume === 0}
                    playsInline
                    loop
                />
                {isVideoError && <span className={cx('error')}>404 File error</span>}

                <div className={cx('action')}>
                    <button className={cx('icon_action')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                        <span className={cx('quantity')}>{video.likes_count}</span>
                    </button>

                    <button className={cx('icon_action')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                        <span className={cx('quantity')}>{video.comments_count}</span>
                    </button>

                    <button className={cx('icon_action')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </span>
                        <span className={cx('quantity')}>{video.views_count}</span>
                    </button>

                    <button className={cx('icon_action')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faShare} />
                        </span>
                        <span className={cx('quantity')}>{video.shares_count}</span>
                    </button>
                </div>

                <div className={cx('control')}>
                    {isPlay ? (
                        <span className={cx('play')} onClick={handleClick}>
                            <FontAwesomeIcon icon={faPlay} />
                        </span>
                    ) : (
                        <span className={cx('pause')} onClick={handleClick}>
                            <FontAwesomeIcon icon={faPause} />
                        </span>
                    )}

                    <span className={cx('volume')}>
                        <div onClick={handleClickVolume}>{returnVolume()}</div>

                        <div className={cx('volume1')}>
                            <input
                                ref={inputVolumeRef}
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className={cx('volume2')}
                            />
                        </div>
                    </span>
                </div>

                <div className={cx('duration')}>
                    {isVisible && (
                        <>
                            <div className={cx('slider')}>
                                <input
                                    id="progress"
                                    ref={inputRef}
                                    className={cx('progress')}
                                    type="range"
                                    step="1"
                                    min="0"
                                    // max="100" nếu để 100 thì khi ta thay đổi thời gian nó lại quay về 0
                                    max={videoRef.current?.duration || 0}
                                    // value={(currentTime / videoRef.current?.duration) * 100 || 0}
                                    value={currentTime}
                                    // value={sliderValue}
                                    onChange={handleChangeTime}
                                ></input>
                            </div>

                            <span className={cx('time')}>
                                0{formatTime(currentTime)}/0{video.meta.playtime_string}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* {isVisible && (
                <div>
                    <p>Video top: {videoRect.top}px</p>
                    <p>Video bottom: {videoRect.bottom}px</p>
                </div>
            )} */}
        </div>
    );
}

export default VideoItem;
