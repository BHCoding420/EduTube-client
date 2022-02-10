import jwtDecode from "jwt-decode";

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    //console.log(token);
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function log_out() {
  try {
    const token = localStorage.removeItem("token");
    //console.log(token);
    window.location.reload();
  } catch (error) {
    return null;
  }
}
