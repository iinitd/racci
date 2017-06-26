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
racci.Search.simple("corpus", "流星雨")

// [ { doc: '1', score: 0.21711158148190035 },
//  { doc: '2', score: 0.09759750074094325 } ]

racci.Search.simple("singer", "周杰伦")

// [ { doc: '1', score: '57' },
//   { doc: '2', score: '22' }]

racci.Search.full("corpus", "流星雨")

// [ { doc: [Object], score: 0.21711158148190035 },
//  { doc: [Object], score: 0.09759750074094325 } ]

racci.Search.full("singer", "周杰伦")

// [ { doc: [Object], score: '57' },
//   { doc: [Object], score: '22' }]

```

[Examples](https://github.com/cogons/racci/tree/master/examples) 

