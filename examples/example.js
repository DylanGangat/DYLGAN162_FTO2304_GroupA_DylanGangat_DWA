// const counter = {
//   value: 1,
//   increase() {
//     counter.value += 1;
//   },
//   decrease() {
//     counter.value -= 1;
//   },
//   display() {
//     console.log(counter.value);
//   },
// };

// counter.increase();
// counter.increase();
// counter.value = 10; // This is the difference between factory function and object
// counter.display();

// factory function - Cant access value because of scope
// factory func starts with create[Name]

/**
 * @callback Modify
 * @param {number} [amount] - The amount to modify the value with
 */

/**
 * @callback EmptyFn
 */

/**
 * @typedef {object} Counter
 * @prop {Modify} increase
 * @prop {Modify} decrease
 * @prop {EmptyFn} display
 * @prop {string} label
 */

/**
 * @param {string} label = The actual value that is being measured
 * @returns {Counter}
 */
const createCounter = label => {
  let value = 1;
  let innerLabel = label;

  const increase = amount => {
    value += amount || 1;
  };
  const decrease = amount => {
    value -= amount || 1;
  };

  const display = () => {
    // eslint-disable-next-line no-console
    console.log(`${value} ${innerLabel}`);
  };

  return {
    display,
    increase,
    decrease,
    get label() {
      return innerLabel;
    },
    set label(newLabel) {
      innerLabel = `${newLabel} is the label`;
    },
  };
};

const temperature = createCounter('Celsius');
const humidity = createCounter('Humidity Factor');

humidity.increase(20);
temperature.decrease(3);
temperature.increase(10);

temperature.display();
humidity.display();

temperature.label = 'F';
