const fs = require("fs");
const pathType = require("path-type");

// List of crate tags in hex
const crateStart = Buffer.from([
		0x00,
		0x53,
		0x00,
		0x65,
		0x00,
		0x72,
		0x00,
		0x61,
		0x00,
		0x74,
		0x00,
		0x6f
	]), // Serato
	osrt = Buffer.from([0x6f, 0x73, 0x72, 0x74]),
	columnSortEnd = Buffer.from([0x00, 0x00, 0x00, 0x01, 0x00]),
	tvcn = Buffer.from([0x74, 0x76, 0x63, 0x6e]),
	brev = Buffer.from([0x62, 0x72, 0x65, 0x76]),
	ovct = Buffer.from([0x6f, 0x76, 0x63, 0x74]),
	tvcw = Buffer.from([0x74, 0x76, 0x63, 0x77]),
	otrk = Buffer.from([0x70, 0x74, 0x72, 0x6b]),
	ptrk = Buffer.from([0x70, 0x74, 0x72, 0x6b]);

const processColumns = crateFile => {
	var pointer = crateFile.indexOf(ovct) + 16; // Advance to the start of the data of first column
	var columnEnd = crateFile.indexOf(tvcw, pointer); // Get position of first column ending
	let columns = [];

	while (true) {
		// Get column name
		let column = crateFile
			.slice(pointer, columnEnd)
			.swap16()
			.toString("utf16le");

		columns.push(column);

		// Advance to next position of column name
		pointer = crateFile.indexOf(ovct, columnEnd);
		if (pointer == -1) {
			break;
		}
		pointer += 16;
		columnEnd = crateFile.indexOf(tvcw, pointer);
	}
	return columns;
};

const processSongs = crateFile => {
	var pointer = crateFile.indexOf(ptrk) + 8; // Advance to start of song info
	var songEnd = crateFile.indexOf(otrk, pointer) - 8; // Get end of first song
	let songs = [];

	while (true) {
		// Get song name
		let song = crateFile
			.slice(pointer, songEnd)
			.swap16()
			.toString("utf16le");
		songs.push(song);

		// Advance to start of next song
		pointer = crateFile.indexOf(ptrk, songEnd);
		if (pointer == -1) {
			break;
		}
		pointer += 8;

		// Advance to end of next song
		songEnd = crateFile.indexOf(otrk, pointer);
		if (songEnd == -1) {
			songEnd = crateFile.length;
		} else {
			songEnd = crateFile.indexOf(otrk, pointer) - 8;
		}
	}
	return songs;
};

module.exports = fp => {
	return pathType.file(fp).then(isFile => {
		var crate = {};
		if (isFile) {
			let crateFile = fs.readFileSync(fp);
			if (crateFile.indexOf(crateStart) === -1) {
				// File is not a Serato crate
				throw "File is not a Serato crate.";
			}

			crate.columns = processColumns(crateFile);
			crate.songs = processSongs(crateFile);

			return crate;
		} else {
			throw "Path is a directory or can't be found.";
		}
	});
};

module.exports.sync = fp => {
	if (pathType.fileSync(fp)) {
		let crate = {};
		let crateFile = fs.readFileSync(fp);

		if (crateFile.indexOf(crateStart) === -1) {
			// File is not a Serato crate
			throw "File is not a Serato crate.";
		}

		crate.columns = processColumns(crateFile);
		crate.songs = processSongs(crateFile);

		return crate;
	} else {
		throw "Path is a directory or can't be found.";
	}
};
