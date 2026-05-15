import api from './config';

export const addPlanAsync = async ({uuid, name, exercises, dayOfWeek, lastModified}) => {
    try {
        const response = await api.post('/api/training-plans/add-plan', {
            uuid,
            name,
            exercises,
            dayOfWeek,
            lastModified,
        });

        return response.data;
    } catch (err) {
        throw err;
    }
};
