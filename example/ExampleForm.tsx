import { useCallback, useRef, useState } from 'react';
import { MaxLengthValidator } from '../src';
import { Form, FormHandle } from '../src/Form';
import { MinLengthValidator } from '../src/validators/MinLengthValidator';
import { RequiredValidator } from '../src/validators/RequiredValidator';
import { AsyncMinLengthValidator } from './AsyncMinLengthValidator';
import { Button } from './inputs/Button';
import { TextField } from './inputs/TextField';
import { FormError } from './inputs/base/FormErrors';

export const ExampleForm = () => {
  const [state, _setState] = useState<Record<string, string | undefined>>({});

  const setState = useCallback((...args: Parameters<typeof _setState>) => {
    requestAnimationFrame(() => _setState(...args));
  }, []);

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
          label="Sync validators 1"
          id="text1"
          value={state.text1}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text1: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 2"
          id="text2"
          value={state.text2}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text2: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 3"
          id="text3"
          value={state.text3}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text3: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 4"
          id="text4"
          value={state.text4}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text4: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 5"
          id="text5"
          value={state.text5}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text5: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 6"
          id="text6"
          value={state.text6}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text6: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 7"
          id="text7"
          value={state.text7}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text7: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 8"
          id="text8"
          value={state.text8}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text8: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 9"
          id="text9"
          value={state.text9}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text9: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 10"
          id="text10"
          value={state.text10}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text10: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 11"
          id="text11"
          value={state.text11}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text11: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 12"
          id="text12"
          value={state.text12}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text12: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 13"
          id="text13"
          value={state.text13}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text13: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 14"
          id="text14"
          value={state.text14}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text14: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 15"
          id="text15"
          value={state.text15}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text15: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 16"
          id="text16"
          value={state.text16}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text16: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 17"
          id="text17"
          value={state.text17}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text17: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 18"
          id="text18"
          value={state.text18}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text18: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 19"
          id="text19"
          value={state.text19}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text19: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 20"
          id="text20"
          value={state.text20}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text20: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 21"
          id="text21"
          value={state.text21}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text21: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 22"
          id="text22"
          value={state.text22}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text22: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 23"
          id="text23"
          value={state.text23}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text23: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 24"
          id="text24"
          value={state.text24}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text24: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 25"
          id="text25"
          value={state.text25}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text25: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 26"
          id="text26"
          value={state.text26}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text26: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 27"
          id="text27"
          value={state.text27}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text27: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 28"
          id="text28"
          value={state.text28}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text28: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 29"
          id="text29"
          value={state.text29}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text29: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 30"
          id="text30"
          value={state.text30}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text30: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 31"
          id="text31"
          value={state.text31}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text31: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 32"
          id="text32"
          value={state.text32}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text32: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 33"
          id="text33"
          value={state.text33}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text33: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 34"
          id="text34"
          value={state.text34}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text34: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 35"
          id="text35"
          value={state.text35}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text35: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 36"
          id="text36"
          value={state.text36}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text36: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 37"
          id="text37"
          value={state.text37}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text37: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 38"
          id="text38"
          value={state.text38}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text38: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 39"
          id="text39"
          value={state.text39}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text39: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Sync validators 40"
          id="text40"
          value={state.text40}
          onChange={(event) =>
            setState((_state) => ({ ..._state, text40: event.target.value }))
          }
          validators={[
            new RequiredValidator('Sync field is required'),
            new MinLengthValidator(5, 'Sync min length is 5'),
            new MaxLengthValidator(10, 'Sync max length is 10'),
          ]}
        />

        <TextField
          label="Async validators"
          id="textAsync"
          value={state.textAsync}
          onChange={(event) =>
            setState((_state) => ({ ..._state, textAsync: event.target.value }))
          }
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
