// JavaScript Cheatsheet – Explanation Style
// Each page = readable notes (not just syntax)

export const cheatsheet = {

  // =================================================
  // BASIC JAVASCRIPT
  // =================================================
  basic: {
    title: "Basic JavaScript",

    pages: [

      {
        slug: "variables-and-types",
        title: "Variables and Data Types",

        content: `
Variables are used to store data in memory. JavaScript provides three ways to declare variables: let, const, and var.

let and const are modern and recommended. var is old and should generally be avoided.

Declaring Variables
-------------------

let age = 21
const name = "Ishika"

Use const when the value should not change. Use let when reassignment is needed.

Data Types
-------------------
JavaScript has primitive types:

string      → "hello"
number      → 10, 3.14
boolean     → true/false
null        → empty value
undefined   → not assigned
bigint      → very large numbers
symbol      → unique identifiers

Type Checking
-------------------

typeof 5        // "number"
typeof "hi"     // "string"

Tip:
JavaScript is dynamically typed. You don’t declare types manually.
`
      },

      {
        slug: "operators",
        title: "Operators",

        content: `
Operators allow you to perform operations on values.

Arithmetic
-------------------
+  -  *  /  %

let sum = 5 + 2

Comparison
-------------------
===  !==  >  <  >=  <=

Always prefer === instead of ==

Logical
-------------------
&&   AND
||   OR
!    NOT

Ternary Operator
-------------------
Short if-else:

age > 18 ? "Adult" : "Minor"

Nullish Coalescing
-------------------
value ?? "default"

Returns default only if value is null or undefined.
`
      },

      {
        slug: "control-flow",
        title: "Control Flow (Conditions and Loops)",

        content: `
Control flow determines how your program runs step-by-step.

If / Else
-------------------

if (age >= 18) {
  console.log("Adult")
} else {
  console.log("Minor")
}

Switch
-------------------
Useful for multiple cases:

switch(day) {
  case "Mon":
    break
  default:
    break
}

Loops
-------------------

for loop:
for (let i = 0; i < 5; i++) {}

while loop:
while(x < 5) {}

for...of (values):
for (const item of arr) {}

for...in (object keys):
for (const key in obj) {}

Tip:
Use for...of for arrays. Avoid for...in with arrays.
`
      }

    ]
  },


  // =================================================
  // ARRAYS
  // =================================================
  arrays: {
    title: "Arrays",

    pages: [

      {
        slug: "array-basics",
        title: "Array Basics",

        content: `
Arrays store multiple values inside a single variable.

Creating Arrays
-------------------

const fruits = ["apple", "banana", "orange"]

Accessing Elements
-------------------

fruits[0]      // apple
fruits.length  // 3

Adding Elements
-------------------

fruits.push("mango")     // add at end
fruits.unshift("grape")  // add at beginning

Removing Elements
-------------------

fruits.pop()    // remove last
fruits.shift()  // remove first

Iterating
-------------------

for (const fruit of fruits) {
  console.log(fruit)
}

Tip:
Arrays in JavaScript are dynamic. They can grow or shrink anytime.
`
      },

      {
        slug: "array-methods",
        title: "Common Array Methods",

        content: `
JavaScript provides powerful built-in methods to work with arrays.

map()
-------------------
Transforms each element and returns a new array.

nums.map(n => n * 2)

filter()
-------------------
Keeps only matching elements.

nums.filter(n => n % 2 === 0)

reduce()
-------------------
Combines all elements into one value.

nums.reduce((a,b) => a + b, 0)

forEach()
-------------------
Loops over items (does not return anything).

arr.forEach(x => console.log(x))

slice()
-------------------
Copies part of array.

arr.slice(1, 3)

splice()
-------------------
Add/remove elements in place.

arr.splice(1, 2)

Tip:
map/filter/reduce are heavily used in interviews and real projects.
`
      }

    ]
  },


  // =================================================
  // FUNCTIONS
  // =================================================
  functions: {
    title: "Functions",

    pages: [

      {
        slug: "function-basics",
        title: "Functions Basics",

        content: `
Functions group reusable code.

Regular Function
-------------------

function add(a, b) {
  return a + b
}

Calling:
add(2, 3)

Function Expression
-------------------

const add = function(a,b){}

Arrow Function
-------------------

const add = (a,b) => a + b

Arrow functions are shorter and commonly used in modern JavaScript.
`
      },

      {
        slug: "scope-closures",
        title: "Scope, this, and Closures",

        content: `
Scope
-------------------
Scope defines where variables are accessible.

Types:
- Global
- Function
- Block

this
-------------------
Refers to the object calling the function.

const user = {
  name: "Ishika",
  greet() {
    console.log(this.name)
  }
}

Closures
-------------------
A function remembers variables from its outer scope.

function counter(){
  let count = 0
  return () => ++count
}

This is very important for interviews.
`
      }

    ]
  },


  // =================================================
  // ASYNC + ADVANCED
  // =================================================
  advanced: {
    title: "Advanced JavaScript",

    pages: [

      {
        slug: "promises-async",
        title: "Promises and Async/Await",

        content: `
JavaScript handles time-consuming tasks asynchronously.

Promises
-------------------

fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))

Async / Await
-------------------

async function load() {
  const res = await fetch(url)
  const data = await res.json()
}

This makes async code look synchronous and easier to read.

Always use try/catch for errors.
`
      },

      {
        slug: "event-loop",
        title: "Call Stack and Event Loop",

        content: `
JavaScript is single-threaded.

Only one task runs at a time.

Call Stack
-------------------
Tracks currently running functions.

Web APIs
-------------------
Handle async work like timers or fetch.

Callback Queue
-------------------
Stores completed tasks.

Event Loop
-------------------
Moves tasks to stack when ready.

Understanding this explains how setTimeout and promises work.
`
      }

    ]
  }
}
