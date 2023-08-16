import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, data = [] }) {
    const [displayCount, setDisplayCount] = useState(5);

    const handleClickSeeAll = () => {
        setDisplayCount(data.length);
    };
    const handleClickSeeLess = () => {
        setDisplayCount(5);
    };

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}> {label}</p>

            {data.slice(0, displayCount).map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            {displayCount < data.length && (
                <p className={cx('more-btn')} onClick={handleClickSeeAll}>
                    See all
                </p>
            )}
            {data.length !== 5 && displayCount === data.length && (
                <p className={cx('more-btn')} onClick={handleClickSeeLess}>
                    See less
                </p>
            )}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SuggestedAccounts;
