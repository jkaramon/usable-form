// @ts-nocheck
import * as React from 'react';
import { mount } from 'enzyme';
import { useForm } from '../index';
import { act } from 'react-dom/test-utils';

function TestForm(props = { initialValues: { firstName: '' }, values: {} }) {
  const { initialValues } = props;

  const { setupField, setValues, formValues } = useForm({ initialValues });
  return (
    <form>
      <input {...setupField('firstName')} />
      <button
        id="set-values"
        onClick={() => {
          act(() => {
            setValues(props.values);
          });
        }}
      />
      <div id="form-values">{JSON.stringify(formValues)}</div>
    </form>
  );
}

describe('setValues', () => {
  it('setValues should merge values', () => {
    const wrapper = mount(
      <TestForm initialValues={{ firstName: 'Ken' }} values={{ firstName: 'Joe' }} />
    );
    expect(wrapper.find('#firstName').prop('value')).toEqual('Ken');
    expect(wrapper.prop('initialValues')).toEqual({
      firstName: 'Ken'
    });
    wrapper.find('#set-values').prop('onClick')();
    wrapper.update();
    expect(wrapper.find('#firstName').prop('value')).toEqual('Joe');
  });

  it('setValues should work with values not set', () => {
    const wrapper = mount(<TestForm initialValues={null} values={null} />);
    expect(wrapper.find('#firstName').prop('value')).toEqual(undefined);
    wrapper.find('#set-values').prop('onClick')();
    wrapper.update();
    expect(wrapper.find('#firstName').prop('value')).toEqual(undefined);
  });
});
