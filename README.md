# Racci

A lightweight search engine for Node.js, Chinese supported.

[DEMO](https://github.com/cogons/music-racci)

# Feature

- Support two search mode: full-text search and field search

- Support Chinese query

- Customize field weight in full-text search

# Usage

It is extremly simple. 

### Step 1: require racci

```js
npm i racci --save

var racci = require('racci')
```

### Step 2: import corpus 

```js
var docs = {
"1":{"singer":"Jay Chou",
		"composer":"Jay Chou"},
"2":{"singer":"Jay Chou",
		"composer":"Jay Chou"}}

// format: {identifier:[Object]}

racci.Parser.import(docs)
```

### Step 3: Build models once and for all

```js
// full-text search model
racci.Parser.init("corpus", ["lyrics", "singer", "composer", 'songwritter', 'album'], [1, 20, 3, 2, 1])

// name, search from these fields, field weight for ranking.

// field search model
racci.Parser.init("singer", ["singer","composer"], "commit_count")

// name, search from these fields, sort by this field.

```
### Step 4: Search!

```js
racci.Search.search("corpus", "流星雨",0,0)

// [ { doc: '1',},
//  { doc: '2'} ]

// first flag: show doc details or not
// second flag: show score or not

racci.Search.search("singer", "周杰伦",0,1)

// [ { doc: '1', score: '57' },
//   { doc: '2', score: '22' }]

racci.Search.search("corpus", "流星雨",1,0)

// [ { doc: [Object] },
//  { doc: [Object] } ]

racci.Search.search("singer", "周杰伦",1,1)

// [ { doc: [Object], score: '57' },
//   { doc: [Object], score: '22' }]

```

[Examples](https://github.com/cogons/racci/tree/master/examples) 

