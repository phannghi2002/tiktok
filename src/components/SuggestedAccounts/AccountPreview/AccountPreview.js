import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ data5 }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src={data5.avatar} alt={data5.nickname} />
                {data5.is_followed ? (
                    <Button primary className1={cx('follow-btn')}>
                        Follow
                    </Button>
                ) : (
                    <Button outline className1={cx('follow-btn')}>
                        Follow
                    </Button>
                )}
            </div>

            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{data5.nickname}</strong>
                    {data5.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </p>
                <p className={cx('name')}>{data5.first_name + data5.last_name}</p>

                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{data5.followers_count} </strong>
                    <span className={cx('label')}> Followers</span>

                    <strong className={cx('value')}>{data5.likes_count} </strong>
                    <span className={cx('label')}> Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
