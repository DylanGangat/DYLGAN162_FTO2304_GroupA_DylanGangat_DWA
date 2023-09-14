const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

// Use forEach to console log each name to the console. 
// You are allowed to call console.log seven times.

names.forEach(person => console.log(person));

// Use forEach to console log each name with a matching province (for example Ashwin (Western Cape). 
//Note that you are only allowed to call console.log seven times.

names.forEach((person, index) => console.log(`${person} (${provinces[index]})`));

// Using map loop over all province names and turn the string to all uppercase. 
// Log the new array to the console.

const upperCaseProvinces = provinces.map(province => province.toUpperCase());
console.log('upperCaseProvinces: ', upperCaseProvinces);

// Create a new array with map that has the amount of characters in each name. 
// The result should be: [6, 9, 11, 5, 7, 7]

const characters = names.map(name => name.length);
console.log('characters: ', characters);

// Using toSorted to sort all provinces alphabetically.

console.log("provinces sorted: ", provinces.toSorted());

// Use filter to remove all provinces that have the word Cape in them. 
// After filtering the array, return the amount of provinces left. The final value should be 3

const filteredProvincesLength = provinces.filter(province => !province.includes("Cape")).length;
console.log('filteredProvincesLength: ', filteredProvincesLength);

// Create a boolean array by using map and some to determine whether a name contains an S character. 
// The result should be [true, true, false, true, true, false]

const booleanArray = names.map(name => name.toLowerCase().includes("s"));
console.log('booleanArray: ', booleanArray);

// Using only reduce, turn the above into an object that indicates the province of an individual. 
// In other words: 
// {
//  Ashwin: 'Western Cape',
// 	Sibongile: 'Gauteng',
//  'Jan-Hendrik': 'Northern Cape',
// 	Sifso: 'Eastern Cape',
// 	Shailen: 'KwaZulu-Natal',
// 	Frikkie: 'Free State',
// }

const individualsProvince = names.reduce((provinceObj, name, index) => {
    provinceObj[name] = provinces[index];
    return provinceObj;
}, {});

console.log('individualsProvince: ', individualsProvince);

// Additional Exercise

const products = [
  { product: 'banana', price: "2" },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: "8" },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
];

// Use forEach to console.log each product name to the console.

products.forEach(({product}) => console.log(product));

// Use filter to filter out products that have a name longer than 5 characters

const productsFiltered = products.filter(({product}) => product.length < 5);

// Using both filter and map. Convert all prices that are strings to numbers, 
// and remove all products from the array that do not have prices. 
// After this has been done then use reduce to calculate the combined price of all remaining products.

const totalPrice = products
    .filter(({price}) => parseInt(price))
    .map(({price}) => parseInt(price))
    .reduce((total, cur) => total + cur, 0);

// Use reduce to concatenate all product names to create the following string:
// banana, mango, potato, avocado, coffee and tea.

const concatenateNames = products.reduce((sentence, {product}, index) => {
    if(index === 0) {
        sentence = sentence + `${product}`;
    } else if (index === products.length - 1){
        sentence = sentence + ` and ${product}.`;
    } else {
        sentence = sentence + `, ${product}`;
    }
    return sentence;
}, ''); 

// Use reduce to calculate both the highest and lowest-priced items. 
// The names should be returned as the following string: Highest: coffee. Lowest: banana.


// Using only Object.entries and reduce recreate the object with the exact same values. 
// However, the following object keys should be changed in the new array:
//     product should be changed to name
//     price should be changed to cost

const recreatedProducts = products.reduce((acc, cur) => {
    const {product: name, price: cost} = cur;
    const newProperty = {name, cost};
    acc.push(newProperty);
    return acc;
}, []);

console.log(
    'productsFiltered: ', productsFiltered,
    'totalPrice: ', totalPrice,
    'concatenateNames: ', concatenateNames,
    'recreatedProducts: ', recreatedProducts);