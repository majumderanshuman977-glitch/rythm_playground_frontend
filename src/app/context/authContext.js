"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState(null);
  const [endpoint, setEndpoint] = useState("");

  // Load token when app loads
  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Update endpoint automatically when route changes
  useEffect(() => {
    if (pathname) {
      const cleanPath = pathname.startsWith("/")
        ? pathname.slice(1)
        : pathname;
      setEndpoint(cleanPath || "");
    }
  }, [pathname]);

  // Login function
  const login = (tokenValue) => {
    sessionStorage.setItem("token", tokenValue);
    setToken(tokenValue);
    window.dispatchEvent(new Event("auth-change"));

    router.push("/");
  };

  // Register function
const register = (tokenValue) => {
  sessionStorage.setItem("token", tokenValue);
  setToken(tokenValue);
  window.dispatchEvent(new Event("auth-change"));
  router.push("/");
};
  // Logout function
  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  

  return (
    <AuthContext.Provider value={{ token, endpoint, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}



// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [token, setToken] = useState(null);
//   const [endpoint, setEndpoint] = useState("");

//   // Load token when app loads
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//     }
//   }, []);

//   // Update endpoint automatically when route changes
//   useEffect(() => {
//     if (pathname) {
//       const cleanPath = pathname.startsWith("/")
//         ? pathname.slice(1)
//         : pathname;
//       setEndpoint(cleanPath || "");
//     }
//   }, [pathname]);

//   // Login function
//   const login = (tokenValue) => {
//     localStorage.setItem("token", tokenValue);
//     setToken(tokenValue);
//     router.push("/");
//   };

//   // Register function
//   const register = (tokenValue) => {
//     localStorage.setItem("token", tokenValue);
//     setToken(tokenValue);
//     router.push("/");
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     router.push("/");
//   };

  

//   return (
//     <AuthContext.Provider value={{ token, endpoint, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
