const presence = new Presence({
		clientId: "970743721404530798",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Forums512 = "https://cdn.discordapp.com/app-assets/970743721404530798/971249087267606548.png?size=512",
	Home512 = "https://cdn.discordapp.com/app-assets/970743721404530798/971249087468937216.png?size=512",
	Info512 = "https://cdn.discordapp.com/app-assets/970743721404530798/971249087947104256.png?size=512",
	Logo = "https://cdn.discordapp.com/app-assets/970743721404530798/971249098390925322.png?size=512",
	Forums = "https://cdn.discordapp.com/app-assets/970743721404530798/971249112513146902.png?size=512",
	Category = "https://cdn.discordapp.com/app-assets/970743721404530798/971249113846931486.png?size=512",
	Home = "https://cdn.discordapp.com/app-assets/970743721404530798/971249114094395502.png?size=512",
	Info = "https://cdn.discordapp.com/app-assets/970743721404530798/971249114354450482.png?size=512",
	Logo1024 = "https://cdn.discordapp.com/app-assets/970743721404530798/971249114702544907.png?size=512",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search, hostname, href } = window.location;
	switch (hostname) {
		case "sonicretro.org": {
			presenceData.smallImageKey = Assets.Home512;
			if (search) {
				presenceData.largeImageKey = Assets.Search;
				if (!new URLSearchParams(search).get("s"))
					presenceData.details = "Searching for something...";
				else {
					presenceData.details = `Searching for "${
						document.querySelector("#main > div.archive-box > h1").textContent
					}"`;
				}
			} else if (
				!search &&
				(pathname === "/" || pathname === "/#" || pathname.includes("/page/"))
			) {
				presenceData.largeImageKey = Assets.Home;
				presenceData.details = "Zooming through the main page";
			} else if (pathname.includes("/category/")) {
				presenceData.largeImageKey = Assets.Search;
				presenceData.details = `Looking through ${
					document.querySelector("#main > div.archive-box > h1").textContent
				}`;
			} else if (
				/https:\/\/sonicretro.org\/\d{4}\/\d{2}\/(\d{2})*\//.test(pathname)
			) {
				presenceData.largeImageKey = Assets.Search;
				presenceData.details = `Looking for posts from ${
					document.title.split("-")[0]
				}`;
			} else if (
				/https:\/\/sonicretro.org\/([0-9]+(\/[0-9]+)+)\/+((\w|-|\d)*)\//g.test(
					href
				)
			) {
				presenceData.largeImageKey = Assets.Reading;
				presenceData.details = "Reading an article";
				presenceData.state = document.title.split(" - Sonic Retro")[0];
				presenceData.buttons = [
					{
						label: "Read Article",
						url: href,
					},
				];
			} else {
				presenceData.largeImageKey = Assets.Logo1024;
				presenceData.details = "Viewing an unsupported page";
			}
			break;
		}
		case "info.sonicretro.org": {
			// a full on wiki or index for the site
			const unsupported = [
				"Cite This Page - Sonic Retro",
				"Compare pages - Sonic Retro",
				"Export pages - Sonic Retro",
				"What links here - Sonic Retro",
				"Create account - Sonic Retro",
				"Log in - Sonic Retro",
				"Reset password - Sonic Retro",
				"Login required - Sonic Retro",
				"Preferences - Sonic Retro",
				"Watchlist - Sonic Retro",
				"Reset tokens - Sonic Retro",
				"Blocked users - Sonic Retro",
				"File list - Sonic Retro",
			];
			presenceData.smallImageKey = Assets.Info512;
			if (
				pathname === "/" ||
				pathname.includes("/Main_Page") ||
				(pathname.includes("/index.php") && !search)
			) {
				presenceData.largeImageKey = Assets.Info;
				presenceData.details = "Zooming through the main page";
			} else if (pathname.includes("Special:")) {
				if (unsupported.includes(document.title)) {
					presenceData.largeImageKey = Assets.Logo1024;
					presenceData.details = "Viewing an unsupported page";
				} else if (pathname.includes("/Special:SpecialPages")) {
					presenceData.largeImageKey = Assets.Search;
					presenceData.details = "Browsing special pages";
				} else if (pathname.includes("/Special:Search")) {
					presenceData.largeImageKey = Assets.Search;
					presenceData.details = "Searching for something...";
				} else {
					presenceData.largeImageKey = Assets.Category;
					presenceData.details = "Browsing a special page:";
					presenceData.state = document.title.split(" - Sonic Retro")[0];
					presenceData.buttons = [
						{
							label: "View Special Page",
							url: href,
						},
					];
				}
			} else if (document.title.startsWith("Category:")) {
				presenceData.largeImageKey = Assets.Reading;
				presenceData.details = "Reading an article:";
				presenceData.state = document.title
					.split("Category:")[1]
					.split(" - Sonic Retro")[0];
				presenceData.buttons = [
					{
						label: "View Article",
						url: href,
					},
				];
			} else if (document.title.startsWith("Talk:")) {
				presenceData.largeImageKey = Assets.Reading;
				presenceData.details = "Browsing a talk page:";
				presenceData.state = document.title
					.split("Talk:")[1]
					.split(" - Sonic Retro")[0];
			} else if (document.title.startsWith("Sonic Retro:")) {
				presenceData.largeImageKey = Assets.Reading;
				presenceData.details = "Reading an article:";
				presenceData.state = document.title
					.split("Sonic Retro:")[1]
					.split(" - Sonic Retro")[0];
				presenceData.buttons = [
					{
						label: "View Article",
						url: href,
					},
				];
			} else if (document.title.startsWith("User:")) {
				presenceData.largeImageKey = Assets.Reading;
				presenceData.details = "Viewing a user's page:";
				presenceData.state = `@${
					document.title.split("User:")[1].split(" - Sonic Retro")[0]
				}`;
				presenceData.buttons = [
					{
						label: "View User",
						url: href,
					},
				];
			} else if (
				pathname.includes("/File:") ||
				pathname.includes("/Sonic_Retro:General_disclaimer")
			) {
				presenceData.largeImageKey = Assets.Logo1024;
				presenceData.details = "Viewing an unsupported page";
			} else if (pathname === "/index.php" && search.includes("search=")) {
				presenceData.largeImageKey = Assets.Search;
				if (document.title.startsWith("Search -"))
					presenceData.details = "Searching for something...";
				else {
					presenceData.details = `Searching for ${
						document.title
							.split("Search results for ")[1]
							.split(" - Sonic Retro")[0]
					}`;
				}
			} else if (
				pathname === "/index.php" ||
				pathname.startsWith("User_talk:")
			) {
				presenceData.largeImageKey = Assets.Logo1024;
				presenceData.details = "Viewing an unsupported page";
			} else {
				presenceData.largeImageKey = Assets.Reading;
				presenceData.details = "Reading an article:";
				presenceData.state = document.title.split(" - Sonic Retro")[0];
				presenceData.buttons = [
					{
						label: "Read Article",
						url: href,
					},
				];
			}
			break;
		}
		case "forums.sonicretro.org": {
			presenceData.smallImageKey = Assets.Forums512;
			if (search) {
				const forumTitle = document.title.split(
					" | Sonic and Sega Retro Forums"
				)[0];
				presenceData.largeImageKey = Assets.Search;
				if (search.includes("?watched/forums"))
					presenceData.details = "Browsing watched forums";
				else if (search.startsWith("?watched/threads"))
					presenceData.details = "Browsing watched threads";
				else if (search.startsWith("?find-new/") && search.includes("/posts"))
					presenceData.details = "Browsing new posts";
				else if (
					search.startsWith("?find-new/") &&
					search.includes("/profile-posts")
				)
					presenceData.details = "Browsing new profile posts";
				else if (search.startsWith("?forums/")) {
					presenceData.details = "Browsing a forum:";
					presenceData.state = forumTitle;
					presenceData.buttons = [
						{
							label: "View Forum",
							url: href,
						},
					];
				} else if (search.startsWith("?threads/")) {
					presenceData.largeImageKey = Assets.Reading;
					presenceData.details = "Reading a thread:";
					presenceData.state = forumTitle;
					presenceData.buttons = [
						{
							label: "Read Thread",
							url: href,
						},
					];
				} else if (search.startsWith("?members/")) {
					if (document.title.startsWith("Notable Members")) {
						presenceData.largeImageKey = Assets.Search;
						presenceData.details = "Browsing notable members";
					} else {
						presenceData.largeImageKey = Assets.Reading;
						presenceData.details = "Viewing a member's page";
						presenceData.state = `@${forumTitle}`;
						presenceData.buttons = [
							{
								label: "View Member",
								url: href,
							},
						];
					}
				} else if (search.startsWith("?search/")) {
					presenceData.largeImageKey = Assets.Search;
					if (
						document.title.startsWith("Error") ||
						document.title.startsWith("Search")
					)
						presenceData.details = "Searching for something...";
					else {
						presenceData.details = `Searching for ${
							document.title
								.split("Search Results for Query: ")[1]
								.split(" | Sonic and Sega Retro Forums")[0]
						}`;
					}
				} else if (
					/(\?conversations\/|\?account\/|\?help\/|\?forums\/-\/index.rss)/.test(
						search
					)
				) {
					presenceData.largeImageKey = Assets.Logo1024;
					presenceData.details = "Viewing an unsupported page";
				}
			} else if (pathname === "/index.php" && !search) {
				presenceData.largeImageKey = Assets.Forums;
				presenceData.details = "Zooming through the main page";
			} else {
				presenceData.largeImageKey = Assets.Logo1024;
				presenceData.details = "Viewing an unsupported page";
			}
			break;
		}
		default: {
			presenceData.smallImageKey = Assets.Question;
			presenceData.smallImageText = "Unknown Page";
			presenceData.largeImageKey = Assets.Logo1024;
			presenceData.details = "Viewing an unsupported page";
		}
	}
	presence.setActivity(presenceData);
});
