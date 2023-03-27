import axios from 'axios';

const saveAccountApplication = async (user_data) => {
    var result = await axios.post('/api/account-application/save-application', {user_data: user_data});
    return result.data.result;
}

export default saveAccountApplication;