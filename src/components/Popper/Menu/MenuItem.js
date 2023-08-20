import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function MenuItem({ data, clicked, onClick2 }) {
    const classes = cx('menu-item', {
        separate1: data.separate,
    });
    return (
        <Button
            className1={classes}
            leftIcon={data.icon}
            to={data.to}
            onClick={clicked}
            // onClick2={onClick2}
        >
            {data.title}
        </Button>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    clicked: PropTypes.func,
};

export default MenuItem;
