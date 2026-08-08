import { createContext, useContext, useEffect } from "react";


interface ThemeContextType {

  theme: "light";

  toggleTheme: () => void;

}


const ThemeContext = createContext<ThemeContextType | null>(null);





export const ThemeProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {



  useEffect(() => {


    

    document.body.classList.remove(
      "dark",
      "light"
    );


    

    document.body.classList.add(
      "light"
    );


    

    localStorage.removeItem(
      "theme"
    );


  }, []);





  const toggleTheme = () => {

  

    return;

  };





  return (

    <ThemeContext.Provider

      value={{

        theme:"light",

        toggleTheme

      }}

    >

      {children}

    </ThemeContext.Provider>

  );

};





export const useTheme = () => {


  const context = useContext(
    ThemeContext
  );


  if(!context){

    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );

  }


  return context;


};