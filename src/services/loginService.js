import * as httpRequest from '~/utils/httpRequest';

const loginService = async ({ email, password }) => {
    try {
        const res = await httpRequest.post('auth/login', {
            //I pass through equal param don't get data althought email and password correctly
            // params: {
            email: email,
            password: password,
            // },
        });
        return res;
    } catch (error) {
        //console.log(error);

        //Hàm này dùng để ném lỗi ra bên ngoài để kiểm tra và xử lý nó, nghĩa là hàm nào gọi nó thì được in lỗi ở file đó.
        throw error;
    }
};

export default loginService;
