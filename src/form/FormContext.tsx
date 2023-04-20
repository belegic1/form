import { createContext, useContext, useState } from 'react';

export const FormContext = createContext<any | null>(null);

export const useForm = () => useContext(FormContext);