import React from 'react';
import { create } from 'react-test-renderer';

// FIRST WAY, simple snapshot test

// function Button(props) {
//   return <button>Ain't no thang.</button>;
// }

// describe('Button component', () => {
//   test('Matches the snapshot', () => {
//     const button = create(<Button />);
//     expect(button.toJSON()).toMatchSnapshot();
//   });
// });

class Button extends React.Component {
  // oldskool!
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(() => {
      return { text: 'PROCEED TO CHECKOUT' };
    });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.text || this.props.text}
      </button>
    );
  }
}

// THIRD WAY: Not testing the implementation, testing what the user should see.
test('it shows the expected text when clicked (this is testing the better way)', () => {
  const component = create(<Button text="SUBSCRIBE TO FOO" />);
  const instance = component.root;
  const button = instance.findByType('button');
  button.props.onClick();
  expect(button.props.children).toBe('PROCEED TO CHECKOUT');
});

// SECOND WAY: Wrong way
/*describe('Button component', () => {
  test('it shows the expected text when clicked (this is testing the wrong way)', () => {
    // Why the wrong way?  We'll see.
    const component = create(<Button text="SUBSCRIBE TO FOO" />);
    const instance = component.getInstance();
    expect(instance.state.text).toBe('');
    instance.handleClick();
    // This is not a good test!  It doesn't explain whether or not the
    // Button text is changed, it just grabs the button's internal state!
    // You can't trust the internal implementation  of an object.  Must
    // test by keeping in mind what the user should see.
    expect(instance.state.text).toBe('PROCEED TO CHECKOUT');
  });
}); */

/**
 * create()
 * method for "mounting" the component
 *
 * toMatchSnapshot()
 * Does all of the heavy lifting under the hood.  It:
 *  *   Creates a snapshot of the component if there isn't one already
 *  *   Checks if the component matches the saved snapshot.abs
 *
 * If your component changes often, *avoid* snapshot testing.
 */
