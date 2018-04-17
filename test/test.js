const m = require("..");
const path = require("path");

const cratePath = path.join(__dirname, "Test.crate");

test("Async crate", async () => {
	var crate = await m(cratePath);
	expect(crate.columns).toContain("song");
	expect(crate.songs).toContain(
		"Users/rick/Music/Antonio Giacca - Birdland (Radio Mix).mp3"
	);
});

test("Sync crate", () => {
	var crate = m.sync(cratePath);
	expect(crate.columns).toContain("song");
	expect(crate.songs).toContain(
		"Users/rick/Music/Antonio Giacca - Birdland (Radio Mix).mp3"
	);
});

test("Async file", async () => {
	await expect(m(path.join(__dirname, "crate.txt"))).rejects.toThrow();
});

test("Sync file", () => {
	expect(() => {
		m.sync(path.join(__dirname, "crate.txt"));
	}).toThrow();
});

test("Async dir", async () => {
	await expect(m(__dirname)).rejects.toThrow();
});

test("Sync dir", () => {
	expect(() => {
		m.sync(__dirname);
	}).toThrow();
});
