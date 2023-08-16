import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Content.module.scss';
import * as videoService from '~/services/videoService';
import VideoList from '~/components/Video/VideoList/VideoList';

const cx = classNames.bind(styles);

function Content() {
    const [videoUsers, setVideoUsers] = useState([]);
    useEffect(() => {
        videoService
            .getVideo({ type: 'for-you', page: 1 })
            .then((data) => {
                setVideoUsers(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={cx('container')}>
            <VideoList data={videoUsers} />
        </div>
    );
}

export default Content;
