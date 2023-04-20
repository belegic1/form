import React, { useState } from 'react'
import { FormContext, useForm } from './FormContext';
import { FieldValues } from './types/formTypes';
interface FormProps {
  initialValues: FieldValues;
  onSubmit: (value: FieldValues) => void;
  children: React.ReactNode;
}


export const Form: React.FC<FormProps> = ({
  initialValues,
  onSubmit,
  children,
}) => {
  const [data, setValue] = useState<FieldValues>(initialValues);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [propertyName, subPropertyName] = e.target.name.split('.');

    setValue((prevState: FieldValues) => {
      if (subPropertyName) {
        return {
          ...prevState,
          [propertyName]: {
            ...prevState[propertyName],
            [subPropertyName]: e.target.value,
          },
        };
      } else {
        return {
          ...prevState,
          [propertyName]: e.target.value,
        };
      }
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
    console.log(data);
  };
  return (
    <FormContext.Provider value={{ data, handleChange }}>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div
          className="
        bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4
        "
        >
          {children}
        </div>
      </form>
    </FormContext.Provider>
  );
};
 Form




interface FormInputProps {
  type?: string;
  name?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  name,
  required,
  placeholder,
  value
}) => {
  const { data, handleChange } = useForm();
  if (type === "submit") {
    return (
      <div className="mb-4">
        <button
          type="submit"
          className="shadow
          bg-purple-800
          hover:bg-purple-600
          focus:shadow-outline
          focus:outline-none
          text-white
          font-bold
          py-2
          px-4
          w-full
          rounded"
        >
          {value}
        </button>
      </div>
    );
  }
  return (
    <div className="mb-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        placeholder={
          placeholder ||
          name?.split('.').reduce((acc: string, val: string) => val)
        }
        value={
          value ||
          name
            ?.split('.')
            .reduce((val: any, propName: string) => val[propName], data)
        }
        onChange={(e) => handleChange(e)}
        type={type}
        name={name}
        required={required}
      />
    </div>
  );
};