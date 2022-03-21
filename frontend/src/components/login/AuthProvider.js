import React, { useEffect, useState } from "react";
import { auth } from "../../auth/firebaseAuth";
import RegisterForm from "./RegisterForm";
import { axiosInstance } from "../../config/axiosConfig";

export const UserContext = React.createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerFormOpen, setRegisterFormOpen] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("token", "Bearer " + token);

        var res;
        try {
          res = await axiosInstance.get("/users/me");
          if (res.status === 200) {
            const user = await res;
            setUser(user);
          }
        } catch (e) {
          //에러발생 시
          if (e.response.status === 404) {
            if (e.response.data.code === "USER_NOT_FOUND") {
              setRegisterFormOpen(true);
            }
          }
        }
      } else {
        localStorage.clear();
        setUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {registerFormOpen ? (
        <RegisterForm setRegisterFormOpen={setRegisterFormOpen} />
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export default AuthProvider;
