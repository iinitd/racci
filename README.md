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

// field search model
racci.Parser.init("singer", "singer", "commit_count")
```
### Step 4: Search!

```js
racci.Search.simple("corpus", "流星雨")
racci.Search.simple("singer", "周杰伦")

racci.Search.full("corpus", "流星雨")
racci.Search.full("singer", "周杰伦")
```

[Examples](https://github.com/cogons/racci/tree/master/examples) 

