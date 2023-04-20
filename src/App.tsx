import React, { useState } from "react";
import { Form, FormInput } from "./form/Form";
import { FieldValues } from "./form/types/formTypes";

export const PageWithForm = () => {
  // Example
  const [userInfo, setUserInfo] = useState<FieldValues>({
    email: "example@alea.com",
    age: 30,
    name: "John Doe",
    phone: {
      ext: "00387",
      number: "65/123-456",
    },
  });

  return (
    <div className="w-[100vw] flex justify-center">
      <Form initialValues={userInfo} onSubmit={setUserInfo}>
        <FormInput
          type="email"
          required
          name="email"
          placeholder="your@email.com"
        />
        <FormInput type="number" name="age" />
        <FormInput type="text" required name="name" />
        <FormInput type="text" name="phone.ext" />
        <FormInput type="text" name="phone.number" />
        <FormInput type="submit" value="Submit" />
      </Form>
    </div>
  );
};
