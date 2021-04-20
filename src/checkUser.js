import { Auth } from 'aws-amplify';

async const checkUser = (updateUser) => {

    try {
        const userData = await Auth.currentSession();

        console.log("checkUser", userData);

        //Nested object destructuring...
        const { idToken: { payload }} = userData;

        //INitialize a boolean whether or not the user is in the admin group
        const isAuthorized = payload['cognito:groups'] && payload['cognito:groups'].includes('Admin');
        updateUser({
            username: payload['cognito:username'],
            isAuthorized
        })
    }

    catch (err) {
        console.error(error);
        updateUser({});
    }
}

export default checkUser