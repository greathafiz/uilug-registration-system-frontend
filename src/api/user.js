const loginUser = async () => {
  try {
  } catch (error) {}
};

const getUserProfile = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL_PROD}/auth/profile`
    );
    return data;
  } catch (error) {
    console.error("An error occured while fetching user details.");
  }
};
