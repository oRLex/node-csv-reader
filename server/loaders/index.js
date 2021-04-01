import expressLoader from './expressLoader';


/**
 * @desc Loader app
 **/
export default async function({config, app}) {

    await expressLoader({app, config});
    console.log('✌ Express loaded.');


}
