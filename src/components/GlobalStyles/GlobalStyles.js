import PropTypes from 'prop-types';
//import React from 'react';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    //Trong trường hợp mà chỉ muốn nhận 1 children duy nhất thì ta thêm thư viện React và return về thế này
    // return React.Children.only(children);
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
