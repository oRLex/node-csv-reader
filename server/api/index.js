import {Router} from 'express';

import file from './routes/file';

export default () => {
    const router = Router();

    file(router)
    return router;
}
