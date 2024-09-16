import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MaxLengthValidator } from '../src';
import { Form } from '../src/Form';
import { MinLengthValidator } from '../src/validators/MinLengthValidator';
import { RequiredValidator } from '../src/validators/RequiredValidator';
import { AsyncMinLengthValidator } from './AsyncMinLengthValidator';
import { Button } from './inputs/Button';
import { TextField } from './inputs/TextField';

const meta: Meta<typeof Form> = {
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

const Template = () => {
  const [text, setText] = useState('');
  const [textAsync, setTextAsync] = useState('');

  return (
    <Form
      onSubmit={(form) => {
        form.inputs.map((i) => i.errors);

        console.log(form.inputs.map((i) => i.errors));
      }}
      className="flex flex-col gap-6"
    >
      <TextField
        label="Sync validators"
        value={text}
        onChange={(event) => setText(event.target.value)}
        validators={[
          new RequiredValidator('Field is required'),
          new MinLengthValidator(5, 'Min length is 5'),
          new MaxLengthValidator(10, 'Max length is 10'),
        ]}
      />
      <TextField
        label="Async validators"
        value={textAsync}
        onChange={(event) => setTextAsync(event.target.value)}
        validators={[
          new RequiredValidator('Field is required'),
          new AsyncMinLengthValidator(5, 'Min length is 5'),
        ]}
      />
      <Button type="submit">submit</Button>
    </Form>
  );
};

export const Primary: Story = {
  render: Template,
};
