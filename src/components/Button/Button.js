import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import { memo } from 'react';

import { useContext } from 'react';
import { LogoutContext } from '~/layouts/components/Header';

// import { ThemeContext } from '~/components/ThemeColor';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    medium = false,
    large = false,
    children,
    className1,
    leftIcon,
    rightIcon,
    onClick,
    // onClick2,

    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,

        ...passProps,
    };

    //Remove event listener when btn is disabled, Đây là trường hợp mà khi ta F12 rồi tắt cái pointer-events thì khi ta ấn vào nó vẫn chạy câu lệnh alert
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') delete props[key];
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classes = cx('wrapper', {
        [className1]: className1,
        primary,
        outline,
        text,
        rounded,
        disabled,
        small,
        medium,
        large,
    });

    const logout = useContext(LogoutContext);

    const handleClick = () => {
        // if (children.props.children === 'Log out') {
        //     logout.handleLogout();
        //     console.log('bo me');
        // } else if (children.props.children === 'View profile') {
        //     logout.handleClickImage();
        //     logout.toggleSwitchPage();
        //     console.log('ngu l');
        // }
        // console.log(children.props);
        if (children.props) {
            if (children.props.children[0] === 'Log out') {
                logout.handleLogout();
            } else if (children.props.children[0] === 'View profile') {
                logout.handleClickImage();
                logout.toggleSwitchPage();
            }
        }
    };

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}

            <span className={cx('title')} onClick={handleClick}>
                {children}
            </span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className1: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default memo(Button);
