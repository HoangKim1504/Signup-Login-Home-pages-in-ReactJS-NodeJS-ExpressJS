import Cookies from "js-cookie";

// Function to check if the user is logged in or not
const isLogged = () => {
  if (Cookies.get("access_token")) {
    return true;
  }
  return false;
};
// console.log(isLogged);

export default isLogged;
