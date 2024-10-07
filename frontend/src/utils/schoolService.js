const API_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools';
const API_KEY = 'J7dekQddCX1b9JKeOyd1rZxuYjdH3W4Xp7mbiKHD';

// Fetch schools with search term
export const fetchSchools = async (searchTerm = '') => {
  try {
    const response = await fetch(
      `${API_URL}?api_key=${API_KEY}&school.name=${encodeURIComponent(
        searchTerm
      )}&fields=id,school.name&per_page=50`
    );
    const data = await response.json();
    const schools = data.results.map((school) => school['school.name']);
    return schools;
  } catch (error) {
    console.error('Error fetching schools:', error);
    return [];
  }
};

// Fetch majors for selected school
export const fetchMajors = async (schoolName) => {
  try {
    const response = await fetch(
      `${API_URL}?api_key=${API_KEY}&school.name=${encodeURIComponent(
        schoolName
      )}&fields=latest.academics.program_percentage&per_page=1`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const majorsData = data.results[0]['latest.academics.program_percentage'];
      const majors = Object.keys(majorsData);
      return majors;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching majors:', error);
    return [];
  }
};
