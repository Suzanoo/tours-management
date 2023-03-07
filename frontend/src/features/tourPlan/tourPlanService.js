import axios from 'axios';

const API_URL = 'api/v1/text-gen';

const fetchFirst = () => {
  localStorage.setItem('plan', null);
};

// Generate tour plan from OpenAI API
const generatePlan = async (tourData) => {
  const response = await axios.post(API_URL + '/', tourData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.data) {
    localStorage.setItem('plan', JSON.stringify(response.data));
    // console.log(response.data);
    return response.data;
  }
};

const tourPlanService = {
  fetchFirst,
  generatePlan,
};

export default tourPlanService;
