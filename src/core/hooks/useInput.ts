import { useState } from "react"

export const useInput = (initialValue: string) => {
   const [value, setValue] = useState(initialValue);

   const handleChange = (value:string) => {
      setValue(value);
    };
  
    return {
      value,
      onChange: handleChange,
      clear: () => setValue('')
    };
}