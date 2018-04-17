# serato-crater [![Build Status](https://travis-ci.org/Rickgg/serato-crater.svg?branch=master)](https://travis-ci.org/Rickgg/serato-crater)

> Reads a Serato crate file and returns columns and songs.

## Install

```
$ npm install serato-crater
```

## Usage

```js
const seratoCrater = require("serato-crater");

seratoCrater(path.join(__dirname, "example.crate")).then(crate => {
	console.log(crate);
	//=> { columns: [ 'song', 'artist', 'bpm', 'key', 'length', 'genre', 'track' ],
	// songs:
	//   [ 'Users/rick/Music/Antonio Giacca - Birdland (Radio Mix).mp3',
	//     'Users/rick/Music/Bounce (Extended Mix) - Calvin Harris feat. Kelis.m4a' ] }
});

var crate = seratoCrater.sync(path.join(__dirname, "example.crate"));
console.log(crate);
//=> { columns: [ 'song', 'artist', 'bpm', 'key', 'length', 'genre', 'track' ],
// songs:
//   [ 'Users/rick/Music/Antonio Giacca - Birdland (Radio Mix).mp3',
//     'Users/rick/Music/Bounce (Extended Mix) - Calvin Harris feat. Kelis.m4a' ] }
```

## API

### seratoCrater(path)

Returns a `Promise` for the parsed crate.

### seratoCrater.sync(path)

Returns the parsed crate.

#### path

Type: `string`
Path to a Serato `.crate`.

## License

MIT © [](https://github.com/Rickgg)
