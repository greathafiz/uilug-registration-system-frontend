const loginUser = async () => {
  try {
  } catch (error) {}
};

const getUserProfile = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/auth/profile"
    );
    return data;
  } catch (error) {
    console.error("An error occured while fetching user details.");
  }
};
