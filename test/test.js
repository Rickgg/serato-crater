const m = require("..");
const path = require("path");

const cratePath = path.join(__dirname, "Test.crate");

test("Async", async () => {
	var crate = await m(cratePath);
	expect(crate.columns).toContain("song");
	expect(crate.songs).toContain(
		"Users/rick/Music/Antonio Giacca - Birdland (Radio Mix).mp3"
	);
});

test("Sync", () => {
	var crate = m.sync(cratePath);
	expect(crate.columns).toContain("song");
	expect(crate.songs).toContain(
		"Users/rick/Music/Antonio Giacca - Birdland (Radio Mix).mp3"
	);
});
