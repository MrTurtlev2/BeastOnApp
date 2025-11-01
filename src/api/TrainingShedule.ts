import api from './config';

export const fetchTrainingPlansAsync = async () => {
    try {
        const response = await api.get('/api/training-plans/weekly-schedule');
        if (response?.data) {
            console.log(response.data);
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
};
