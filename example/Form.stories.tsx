import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { MaxLengthValidator } from '../src';
import { Form, FormHandle } from '../src/Form';
import { MinLengthValidator } from '../src/validators/MinLengthValidator';
import { RequiredValidator } from '../src/validators/RequiredValidator';
import { AsyncMinLengthValidator } from './AsyncMinLengthValidator';
import { Button } from './inputs/Button';
import { TextField } from './inputs/TextField';
import { FormError } from './inputs/base/FormErrors';

const meta: Meta<typeof Form> = {
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

const Template = () => {
  const [text, setText] = useState('');
  const [textAsync, setTextAsync] = useState('');
  const formHandle = useRef<FormHandle>(null);

  return (
    <>
      <Form
        ref={formHandle}
        onSubmit={(form) => {
          form.inputs.map((i) => i.errors);

          console.log(
            'SUBMIT',
            form.inputs.map((i) => i.errors)
          );
        }}
        className="flex flex-col gap-6"
      >
        <TextField
          label="Sync validators"
          value={text}
          onChange={(event) => setText(event.target.value)}
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />
        <TextField
          label="Async validators"
          value={textAsync}
          onChange={(event) => setTextAsync(event.target.value)}
          validators={[
            new RequiredValidator('Async field is required'),
            new AsyncMinLengthValidator(5, 'Async min length is 5'),
          ]}
        />

        <FormError />
        <Button type="submit">submit</Button>
      </Form>

      <Button type="button" onClick={() => formHandle.current?.submit()}>
        submit from outside the form
      </Button>
    </>
  );
};

export const Primary: Story = {
  render: Template,
};
