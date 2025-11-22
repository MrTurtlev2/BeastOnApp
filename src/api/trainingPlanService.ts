import api from './config';

export const addPlanAsync = async ({name, daysOfWeek, exercises}) => {
    try {
        const response = await api.post('/api/training-plans/add-plan', {name, daysOfWeek, exercises});
        if (response?.data) {
            console.log(response.data);
            return response.data;
        }
    } catch (err) {
        console.log(err);
    }
};
