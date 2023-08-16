import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import Tippy from '@tippyjs/react';
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 500);
    /*thứ tự thực hiện biến debounced như sau:
    1.Giả sử ban đầu ta ấn vào ô search =>debounced=searchValue= ''
    Hàm useDebounce có giá trị debouncedValue = ''
    => return về debouncedValue và nó được đưa vào useEffect ở dưới có !debounced.trim() = '' nên nó sẽ ko fetch API
    2.Khi ta ấn chữ 'h vào nó thì debounced lúc này sẽ có giá trị là '' bởi vì searchValue là 'h' và debouncedValue cũng
    có giá trị là 'h' nhưng bởi vì hàm setTimeout sau 500ms mới cập nhật sự thay đổi nên lúc này nó sẽ return về về chuỗi '' 
    3.Tương tự với 'ho'
    4.Với 'hoa' và sau đó ta đã dừng lại ko nhập nữa quá 500ms thì lúc này debounced = 'hoa', debouncedValue = ''
    và vượt quá 500ms thì nó sẽ cập nhật lại setDebouncedValue(value) là ứng với debouncedValue = 'hoa' và lúc này 
    !debounced.trim() là sai nên nó sẽ thực hiện các hàm phía dưới và hiển thị ra màn hình
    */

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    //Hàm này xử lý cái ô nhập vào ô search nếu đầu tiên là dấu cách thì sẽ không cho nhập
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) setSearchValue(searchValue);
    };

    useEffect(() => {
        //điều kiện này để khi searchValue là chuỗi rỗng hoặc là toàn dấu cách thì nó sẽ thoát ra ngoài để không phải fetch API,
        //theo F12 network thì nếu searchValue mà không có gì thì sẽ bị lỗi nên ta dùng cách này để tránh bị lỗi, nghĩa là
        // trong ô search mà có giá trị thì nó mới thực hiện các hàm ở dưới này
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        //Fetch Promise
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        //     //encodeURIComponent dùng để tránh trường hợp mà searchValue là các giá trị đặc biệt thì nó sẽ mã hóa thành dạng khác
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     })

        //     .catch(() => {
        //         setLoading(false);
        //     });

        //Async await

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debouncedValue);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();

        // const fetchApi = async () => {
        //     try {
        //         const res = await request.get('users/search', {
        //             params: {
        //                 q: debounced,
        //                 type: 'less',
        //             },
        //         });
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     } catch (error) {
        //         setLoading(false);
        //     }
        // };

        // fetchApi();

        //Này là dùng promises với async
        // //console.log(request) sẽ thấy toàn bộ phương thức của request
        // //console.log(request.get);
        // request
        //     .get('users/search', {
        //         params: {
        //             q: debounced,
        //             type: 'less',
        //         },
        //     })
        //     //encodeURIComponent dùng để tránh trường hợp mà searchValue là các giá trị đặc biệt thì nó sẽ mã hóa thành dạng khác

        //     .then((res) => {
        //         // console.log(res);
        //         //res ở đây ứng với dữ liệu trả về của request.get
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     })

        //     .catch(() => {
        //         setLoading(false);
        //     });
    }, [debouncedValue]);

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadlessTippy
                interactive // giúp ta có thể tương tác được với nó
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>

                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {/* spellCheck dùng để loại bỏ dấu gạch đỏ ở dưới */}

                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <Tippy content="Tìm kiếm" placement="right">
                        <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                            <SearchIcon />
                        </button>
                    </Tippy>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
