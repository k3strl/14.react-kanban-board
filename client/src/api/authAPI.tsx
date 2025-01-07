import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // make a POST request to the login route
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    // If response not ok, throw error
    if (!response.ok) {

      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }
    // Parse response as json
    const loginData = await response.json();

    return loginData;

    // Error handling
  } catch (err) {
    console.log(`Error during login:`, err);
    return Promise.reject(`Check login info`);
  }
}

export { login };
