import express, {Router} from 'express';
import multer from 'multer';
const upload = multer({ inMemory: true})

import {SendFileController} from './controller'


const route = Router();

export default mainRoute => {
    // Prefix  /file
    mainRoute.use('/file', route);

    /**
     * @route   GET  /user/:userID
     * @desc    Return single User
     * @access  Public
     */
    route.post('/sendfile',upload.single('csvfile'),  SendFileController);




};
