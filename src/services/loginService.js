import * as httpRequest from '~/utils/httpRequest';

export const getVideo = async ({ type, page }) => {
    try {
        const res = await httpRequest.get('auth/login', {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
