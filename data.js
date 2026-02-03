// JavaScript Cheatsheet – Explanation Style
// Each page = readable notes (not just syntax)

window.cheatsheetData = {

  // =================================================
  // BASIC JAVASCRIPT
  // =================================================
  basic: {
    title: "Basic JavaScript",

    pages: [

      {
        slug: "variables-and-types",
        title: "Variables and Data Types",

        content: "Variables are used to store data in memory. JavaScript provides three ways to declare variables: let, const, and var.\n\nlet and const are modern and recommended. var is old and should generally be avoided.\n\nDeclaring Variables\n-------------------\n\nlet age = 21\nconst name = \"Ishika\"\n\nUse const when the value should not change. Use let when reassignment is needed.\n\nData Types\n-------------------\nJavaScript has primitive types:\n\nstring      → \"hello\"\nnumber      → 10, 3.14\nboolean     → true/false\nnull        → empty value\nundefined   → not assigned\nbigint      → very large numbers\nsymbol      → unique identifiers\n\nType Checking\n-------------------\n\ntypeof 5        // \"number\"\ntypeof \"hi\"     // \"string\"\n\nTip:\nJavaScript is dynamically typed. You don't declare types manually."
      },

      {
        slug: "operators",
        title: "Operators",

        content: "Operators allow you to perform operations on values.\n\nArithmetic\n-------------------\n+  -  *  /  %\n\nlet sum = 5 + 2\n\nComparison\n-------------------\n===  !==  >  <  >=  <=\n\nAlways prefer === instead of ==\n\nLogical\n-------------------\n&&   AND\n||   OR\n!    NOT\n\nTernary Operator\n-------------------\nShort if-else:\n\nage > 18 ? \"Adult\" : \"Minor\"\n\nNullish Coalescing\n-------------------\nvalue ?? \"default\"\n\nReturns default only if value is null or undefined."
      },

      {
        slug: "control-flow",
        title: "Control Flow (Conditions and Loops)",

        content: "Control flow determines how your program runs step-by-step.\n\nIf / Else\n-------------------\n\nif (age >= 18) {\n  console.log(\"Adult\")\n} else {\n  console.log(\"Minor\")\n}\n\nSwitch\n-------------------\nUseful for multiple cases:\n\nswitch(day) {\n  case \"Mon\":\n    break\n  default:\n    break\n}\n\nLoops\n-------------------\n\nfor loop:\nfor (let i = 0; i < 5; i++) {}\n\nwhile loop:\nwhile(x < 5) {}\n\nfor...of (values):\nfor (const item of arr) {}\n\nfor...in (object keys):\nfor (const key in obj) {}\n\nTip:\nUse for...of for arrays. Avoid for...in with arrays."
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

        content: "Arrays store multiple values inside a single variable.\n\nCreating Arrays\n-------------------\n\nconst fruits = [\"apple\", \"banana\", \"orange\"]\n\nAccessing Elements\n-------------------\n\nfruits[0]      // apple\nfruits.length  // 3\n\nAdding Elements\n-------------------\n\nfruits.push(\"mango\")     // add at end\nfruits.unshift(\"grape\")  // add at beginning\n\nRemoving Elements\n-------------------\n\nfruits.pop()    // remove last\nfruits.shift()  // remove first\n\nIterating\n-------------------\n\nfor (const fruit of fruits) {\n  console.log(fruit)\n}\n\nTip:\nArrays in JavaScript are dynamic. They can grow or shrink anytime."
      },

      {
        slug: "array-methods",
        title: "Common Array Methods",

        content: "JavaScript provides powerful built-in methods to work with arrays.\n\nmap()\n-------------------\nTransforms each element and returns a new array.\n\nnums.map(n => n * 2)\n\nfilter()\n-------------------\nKeeps only matching elements.\n\nnums.filter(n => n % 2 === 0)\n\nreduce()\n-------------------\nCombines all elements into one value.\n\nnums.reduce((a,b) => a + b, 0)\n\nforEach()\n-------------------\nLoops over items (does not return anything).\n\narr.forEach(x => console.log(x))\n\nslice()\n-------------------\nCopies part of array.\n\narr.slice(1, 3)\n\nsplice()\n-------------------\nAdd/remove elements in place.\n\narr.splice(1, 2)\n\nTip:\nmap/filter/reduce are heavily used in interviews and real projects."
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

        content: "Functions group reusable code.\n\nRegular Function\n-------------------\n\nfunction add(a, b) {\n  return a + b\n}\n\nCalling:\nadd(2, 3)\n\nFunction Expression\n-------------------\n\nconst add = function(a,b){}\n\nArrow Function\n-------------------\n\nconst add = (a,b) => a + b\n\nArrow functions are shorter and commonly used in modern JavaScript."
      },

      {
        slug: "scope-closures",
        title: "Scope, this, and Closures",

        content: "Scope\n-------------------\nScope defines where variables are accessible.\n\nTypes:\n- Global\n- Function\n- Block\n\nthis\n-------------------\nRefers to the object calling the function.\n\nconst user = {\n  name: \"Ishika\",\n  greet() {\n    console.log(this.name)\n  }\n}\n\nClosures\n-------------------\nA function remembers variables from its outer scope.\n\nfunction counter(){\n  let count = 0\n  return () => ++count\n}\n\nThis is very important for interviews."
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

        content: "JavaScript handles time-consuming tasks asynchronously.\n\nPromises\n-------------------\n\nfetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err))\n\nAsync / Await\n-------------------\n\nasync function load() {\n  const res = await fetch(url)\n  const data = await res.json()\n}\n\nThis makes async code look synchronous and easier to read.\n\nAlways use try/catch for errors."
      },

      {
        slug: "event-loop",
        title: "Call Stack and Event Loop",

        content: "JavaScript is single-threaded.\n\nOnly one task runs at a time.\n\nCall Stack\n-------------------\nTracks currently running functions.\n\nWeb APIs\n-------------------\nHandle async work like timers or fetch.\n\nCallback Queue\n-------------------\nStores completed tasks.\n\nEvent Loop\n-------------------\nMoves tasks to stack when ready.\n\nUnderstanding this explains how setTimeout and promises work."
      }

    ]
  }
};
