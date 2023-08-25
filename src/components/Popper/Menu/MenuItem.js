import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';

import { useContext } from 'react';
import { ThemeContext } from '~/components/ThemeColor';
const cx = classNames.bind(styles);

function MenuItem({ data, clicked, onClick2 }) {
    const theme = useContext(ThemeContext);

    const classes = cx('menu-item', {
        separate1: data.separate,
    });
    // console.log(data);
    // if (data.iconOn) console.log('dit me m');
    return (
        <Button
            className1={classes}
            leftIcon={data.icon}
            to={data.to}
            onClick={clicked}
            // onClick2={onClick2}
        >
            <div className={cx('title')}>
                {data.title}
                {(data.iconOff || data.iconOn) && (
                    <span className={cx('dark')} onClick={theme.toggleDarkMode}>
                        {!theme.theme ? data.iconOff : data.iconOn}
                    </span>
                )}
            </div>
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    clicked: PropTypes.func,
};

export default MenuItem;
