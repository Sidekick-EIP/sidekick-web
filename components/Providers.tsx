import React, { createContext, useContext, useState } from 'react'

export const FormContext = createContext({});

function Providers({ children }: any) {
  const value = useState({});
  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormState() {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error('useFormState must be used within a FormProvider')
  }

  return context;
}

export default Providers