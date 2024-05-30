import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Form } from '../src/Form';
import { MinLengthValidator } from '../src/validators/MinLengthValidator';
import { TextField } from './TextField';

const meta: Meta<typeof Form> = {
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

const Template = () => {
  const [text, setText] = useState('');

  return (
    <Form
      onSubmit={(form) => {
        form.inputs.map((i) => i.errors);
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <label>Sync validators</label>
      <TextField
        value={text}
        onChange={setText}
        validators={[new MinLengthValidator(5, 'Min length is 5')]}
      />
      {/* <label>Async validators</label>
      <TextField
        value={text}
        onChange={setText}
        validators={[new AsyncMinLengthValidator(5, 'Min length is 5')]}
      /> */}
      <button type="submit">submit</button>
    </Form>
  );
};

export const Primary: Story = {
  render: Template,
};
