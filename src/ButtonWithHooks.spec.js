import React, { useState } from 'react';
import { create, act } from 'react-test-renderer';

function Button(props) {
  const [text, setText] = useState('');
  function handleClick() {
    setText('PROCEED TO CHECKOUT');
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}

// Can we reuse the old test?  Nope!  It fails because the update was not wrapped in act!
// The test must use act() for any action that changes the component's state, like
// mounting or clicking on a function passed as a prop.
// test('it shows the expected text when clicked (this is testing the better way)', () => {
//   const component = create(<Button text="SUBSCRIBE TO FOO" />);
//   const instance = component.root;
//   const button = instance.findByType('button');
//   button.props.onClick();
//   expect(button.props.children).toBe('PROCEED TO CHECKOUT');
// });

// FOURTH WAY using act
// Notice that both the call to create and button.props.onClick() are
// wrapped in a callback passed to act()
describe('Button component', () => {
  test('it shows the expected text when clicked', () => {
    let component;
    act(() => {
      component = create(<Button text="SUBSCRIBE TO FOO" />);
    });
    const instance = component.root;
    const button = instance.findByType('button');
    act(() => button.props.onClick());
    expect(button.props.children).toBe('PROCEED TO CHECKOUT');
  });
});
