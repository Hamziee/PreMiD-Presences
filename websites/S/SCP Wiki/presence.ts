const presence = new Presence({
		clientId: "639208971806310441",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/S/SCP%20Wiki/assets/logo.png",
	LogoInt = "https://cdn.discordapp.com/app-assets/639208971806310441/639546099140395018.png?size=512",
	LogoSandbox = "https://cdn.discordapp.com/app-assets/639208971806310441/639546104202919936.png?size=512",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/S/SCP%20Wiki/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "scp-int.wikidot.com")
		presenceData.largeImageKey = Assets.LogoInt;
	if (document.location.hostname === "scp-sandbox-3.wikidot.com")
		presenceData.largeImageKey = Assets.LogoSandbox;

	if (document.location.pathname === "/" || !document.location.pathname)
		presenceData.state = "Front Page";
	else {
		presenceData.state = document
			.querySelector("#page-title")
			.textContent.trim();
	}

	presence.setActivity(presenceData);
});
