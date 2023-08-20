import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import images from '~/assets/images/images';
import styles from './Image.module.scss';
import PropTypes from 'prop-types';

const Image = forwardRef(
    ({ src, alt, className5, fallBack1: customFallBack = images.noImage, onClickImage, ...props }, ref) => {
        //fallBack: customFallBack = images.noImage nghĩa là nếu ta truyền fallBack ở bên ngoài thì hình ảnh sẽ được lấy là fallBack ở bên ngoài
        // truyền vào, nhưng nếu ta không truyền ở bên ngoài vào thì nó sẽ lấy mặc định hình ảnh là images.noImage, này là cấu trúc trong ES6,
        // customFallback chẳng qua là đổi tên fallBack thành customFallback mà thôi
        const [fallBack, setFallback] = useState('');
        // console.log(customFallBack);
        const handleError = () => {
            //console.log('Error image');
            // setFallback(customFallBack);
            setFallback(customFallBack);
        };

        return (
            <img
                className={classNames(styles.wrapper, className5)}
                //Nghĩa là mặc định thì thẻ img này luôn có class là wrapper đều được sử dụng, nếu có className5 thì nó sẽ được thêm className này
                ref={ref}
                // src={src || fallBack}
                src={fallBack || src || customFallBack}
                //Ban đầu nó lấy fallBack thấy fallBack là chuỗi rỗng thì là false do đó nó sẽ lấy thằng src mà thấy src cũng sai luôn nên src bên
                //ngoài sẽ gặp lỗi do đó nó sẽ thực hiện hàm handleError trong onError, nếu có thằng fallBack mà ta đã nhập thông qua props thì nó
                //sẽ lấy ở bên ngoài truyền vào, còn nếu ko có thì nó sẽ lấy images.noImages. Nếu ra để src trước fallBack sẽ có 1 số lỗi như nếu
                //src bị lỗi thì nó sẽ lấy mặc định là ko có hình ảnh hiển thị chứ ko lấy từ fallBack ở ngoài hay là hình images.noImage
                alt={alt}
                {...props}
                onError={handleError}
                onClick={onClickImage}
            />
        );
        // onError là một hàm được thực thi vì img là element chứ không phải là component
        // phải sắp xếp src trước fallBack bởi nếu xếp trước thì nó sẽ có sự khác biệt, nếu fallBack trước thì khi nó là chuỗi rỗng thì
        // || với dấu hoặc này thì nó sẽ lấy src mà src bị lỗi ko hiển thị thì nó sẽ ko in ra gì cả.
        //Khi src bị lỗi là hình ảnh không chính xác hoặc đường dẫn không đúng thì hàm handleError sẽ được thực hiện
    },
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className5: PropTypes.string,
    fallBack: PropTypes.string,
};
export default Image;
