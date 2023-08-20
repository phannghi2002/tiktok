import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { memo } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn, hideOnClick = false }) {
    // const [history, setHistory] = useState([{ data: items }]); // dùng 1 lần rồi không dùng nữa

    const [history, setHistory] = useState([{ data: items }]); // dùng 1 lần rồi không dùng nữa

    const current = history[history.length - 1];
    //console.log(items); // lấy giá trị ban đầu và phần tử ta thêm vào cuối
    // console.log(current); //chỉ lấy phần tử cuối cùng để in ra màn hình

    useEffect(() => {
        setHistory([{ data: items }]);
    }, [items]);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children; //chuyển nó thành true / false

            // console.log(item.onClick2);
            return (
                <MenuItem
                    key={index}
                    data={item}
                    clicked={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);

                            // prev là Lấy giá trị phần tử trước đó là history( ứng với items) rồi thêm phần tử item.children vào cuối mảng => đó là lý do ta in ra phần tử cuối mảng
                        } else {
                            onChange(item); //onChange ở đây ứng với hàm handleMenuItem và item ứng với menuItem
                        }
                    }}
                    // onClick2={item.onClick2}
                />
            );
        });
    };
    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1)); // dùng để loại bỏ phần tử cuối ra khỏi mảng
    };
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                {history.length > 1 && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
                {/* thẻ div này giúp ta tạo thanh scroll thì phần header không bị kéo đi */}
            </PopperWrapper>
        </div>
    );

    //Mấy hàm có từ bắt đầu bằng on thì ta nên đặt tên hàm bắt đầu bằng handle
    const handleResetMenu = () => setHistory((prev) => prev.slice(0, 1));

    return (
        <Tippy
            interactive
            delay={[0, 800]}
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={renderResult}
            onHide={handleResetMenu} //Khi ẩn thì sẽ đưa về trang nhất của trang Menu
        >
            {children}
        </Tippy>
    );
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    onChange: PropTypes.func,
    hideOnClick: PropTypes.bool,
};
export default memo(Menu);
