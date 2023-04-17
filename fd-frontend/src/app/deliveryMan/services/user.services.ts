import axios from "axios";

export const GetUsers = async (email: string, password: string) => {
  const url = "http://localhost:8080/auth/signIn";
  return axios
    .post("http://localhost:8080/auth/signIn", { email, password }, { withCredentials: true })
    .then((response) => {
      console.log(response);
    });
};
