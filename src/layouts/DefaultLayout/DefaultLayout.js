import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import Content from '~/layouts/components/Content';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';
import { useState, createContext } from 'react';
import Profile from '~/pages/Profile';

const cx = classNames.bind(styles);

export const SwitchPageContext = createContext();

function DefaultLayout({ children }) {
    //console.log(switchPage);
    const [switchPage, setSwitchPage] = useState(true);
    const toggleSwitchPage = () => {
        //console.log('ao nhi');
        setSwitchPage(false);
    };

    const toggleSwitchPageContent = () => {
        setSwitchPage(true);
    };
    // console.log(switchPage);
    return (
        <div className={cx('wrapper')}>
            <Header toggleSwitchPageContent={toggleSwitchPageContent} />

            <div className={cx('container')}>
                <SwitchPageContext.Provider value={toggleSwitchPage}>
                    <Sidebar />

                    <div className={cx('content')}>{switchPage ? <Content /> : <Profile />}</div>
                </SwitchPageContext.Provider>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
