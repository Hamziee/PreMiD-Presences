const presence = new Presence({
		clientId: "754070047193956492",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Editorial = "https://cdn.discordapp.com/app-assets/754070047193956492/870495050386276353.png?size=512",
	Post = "https://cdn.discordapp.com/app-assets/754070047193956492/870495050776322148.png?size=512",
	EditProfile = "https://cdn.discordapp.com/app-assets/754070047193956492/870495050776338452.png?size=512",
	Organization = "https://cdn.discordapp.com/app-assets/754070047193956492/870495050805682186.png?size=512",
	Problem = "https://cdn.discordapp.com/app-assets/754070047193956492/870495050809892924.png?size=512",
	About = "https://cdn.discordapp.com/app-assets/754070047193956492/870495050814074911.png?size=512",
	Home = "https://cdn.discordapp.com/app-assets/754070047193956492/870495050814087168.png?size=512",
	Contest = "https://cdn.discordapp.com/app-assets/754070047193956492/870495050918924318.png?size=512",
	Leaderboard = "https://cdn.discordapp.com/app-assets/754070047193956492/870495050931515393.png?size=512",
	Status = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051409657858.png?size=512",
	SubmissionList = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051510317118.png?size=512",
	Ticket = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051585814561.png?size=512",
	ProblemList = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051678105600.png?size=512",
	Submit = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051703283713.png?size=512",
	Statistics = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051720048710.png?size=512",
	Submission = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051732635688.png?size=512",
	Source = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051757793311.png?size=512",
	User = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051829108786.png?size=512",
	Users = "https://cdn.discordapp.com/app-assets/754070047193956492/870495051954925649.png?size=512",
	Icon = "https://cdn.discordapp.com/app-assets/754070047193956492/870496976570044449.png?size=512",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			smallImageKey: Assets.Icon,
			smallImageText: "DMOJ: Modern Online Judge",
			startTimestamp: browsingTimestamp,
		},
		url = document.location.pathname.split("/");
	if (url.includes("post")) {
		presenceData.details = "Viewing post:";
		presenceData.state = document
			.querySelector("#content > h2")
			.textContent.trim();
		presenceData.largeImageKey = Assets.Post;
		presenceData.buttons = [
			{ label: "View Post", url: `https://dmoj.ca/post/${url[2][2]}` },
		];
	} else if (url.includes("problems")) {
		presenceData.details = "Browsing problems";
		presenceData.largeImageKey = Assets.ProblemList;
	} else if (url.includes("problem")) {
		const problemURL = `https://dmoj.ca/problem/${url[2]}`;

		presenceData.buttons = [{ label: "View Problem", url: problemURL }];

		if (url.includes("submit")) {
			presenceData.details = "Submitting to problem:";
			presenceData.state = document
				.querySelector("#content > h2 > a")
				.textContent.trim();
			presenceData.largeImageKey = Assets.Submit;
		} else if (url.includes("submissions")) {
			presenceData.details = "Viewing submissions to problem:";
			presenceData.state = document.querySelectorAll(".tabs > h2 > a")[
				// eslint messed up the next line
				document.querySelectorAll(".tabs > h2 > a").length - 1
			].textContent.trim();
			presenceData.largeImageKey = Assets.SubmissionList;
			presenceData.buttons.push({
				label: "View Submissions",
				url: `${problemURL}/submissions/`,
			});
		} else if (url.includes("rank")) {
			presenceData.details = "Viewing best submissions to problem:";
			presenceData.state = document
				.querySelector(".tabs > h2 > a")
				.textContent.trim();
			presenceData.largeImageKey = Assets.SubmissionList;
			presenceData.buttons.push({
				label: "View Best Submissions",
				url: `${problemURL}/rank/`,
			});
		} else if (url.includes("editorial")) {
			presenceData.details = "Viewing editorial for problem:";
			presenceData.state = document
				.querySelector("#content > h2 > a")
				.textContent.trim();
			presenceData.largeImageKey = Assets.Editorial;
			presenceData.buttons.push({
				label: "View Editorial",
				url: `${problemURL}/editorial/`,
			});
		} else if (url.includes("tickets") && url.includes("new")) {
			presenceData.details = "Creating a ticket for problem:";
			presenceData.state = document
				.querySelector("#content > h2 > a")
				.textContent.trim();
			presenceData.largeImageKey = Assets.Ticket;
		} else {
			const problemName = document
					.querySelector(".problem-title > h2")
					.textContent.trim(),
				problemPoints = document.querySelector(".pi-value").textContent.trim();

			presenceData.details = "Viewing problem:";
			presenceData.largeImageKey = Assets.Problem;

			if (problemPoints === "1")
				presenceData.state = `${problemName} (${problemPoints} point)`;
			else presenceData.state = `${problemName} (${problemPoints} points)`;
		}
	} else if (url.includes("submissions")) {
		if (url.includes("user")) {
			presenceData.details = "Viewing submissions by user:";

			if (
				document.querySelector(".tabs > h2").textContent.trim() ===
				"All my submissions"
			) {
				const user = document
					.querySelector("#user-links > ul > li > a > span > span > b")
					.textContent.trim();
				presenceData.state = user;
				presenceData.largeImageKey = Assets.SubmissionList;
				presenceData.buttons = [
					{
						label: "View Submissions",
						url: `https://dmoj.ca/submissions/user/${user}`,
					},
					{ label: "View User", url: `https://dmoj.ca/user/${user}` },
				];
			} else {
				const user = document
					.querySelector(".tabs > h2 > a")
					.textContent.trim();
				presenceData.state = user;
				presenceData.largeImageKey = Assets.SubmissionList;
				presenceData.buttons = [
					{
						label: "View Submissions",
						url: `https://dmoj.ca/submissions/user/${user}`,
					},
					{ label: "View User", url: `https://dmoj.ca/user/${user}` },
				];
			}
		} else {
			presenceData.details = "Browsing submissions";
			presenceData.largeImageKey = Assets.SubmissionList;
		}
	} else if (url.includes("submission")) {
		presenceData.details = "Viewing submission to problem:";
		presenceData.state = document
			.querySelector("#content > h2 > a")
			.textContent.trim();
		presenceData.largeImageKey = Assets.Submission;
		presenceData.buttons = [
			{
				label: "View Submission",
				url: `https://dmoj.ca/submission/${url[2]}`,
			},
		];
	} else if (url.includes("src")) {
		presenceData.details = "Viewing submission source to problem:";
		presenceData.state = document
			.querySelector("#content > h2 > a")
			.textContent.trim();
		presenceData.largeImageKey = Assets.Source;
	} else if (url.includes("organizations")) {
		presenceData.details = "Browsing organizations";
		presenceData.largeImageKey = Assets.Organization;
	} else if (url.includes("organization")) {
		const organizationURL = `https://dmoj.ca/organization/${url[2]}`;
		presenceData.state = document
			.querySelector("#content > h2")
			.textContent.trim()
			.replace(" Members", "");
		presenceData.buttons = [
			{ label: "View Organization", url: organizationURL },
			{ label: "View Members", url: `${organizationURL}/users` },
		];

		if (url.includes("users")) {
			presenceData.details = "Viewing members of organization:";
			presenceData.largeImageKey = Assets.Users;
		} else {
			presenceData.details = "Viewing organization:";
			presenceData.largeImageKey = Assets.Organization;
		}
	} else if (url.includes("users")) {
		presenceData.details = "Viewing leaderboard";
		presenceData.largeImageKey = Assets.Leaderboard;
	} else if (url.includes("user")) {
		const userHeader = document.querySelector(".tabs > h2").textContent.trim();

		if (url.includes("solved")) {
			const [, userRank] = document
				.querySelectorAll(".user-sidebar > div")[2]
				.textContent.trim()
				.split("#");

			presenceData.details = "Viewing problems solved by:";

			if (userHeader === "My account") {
				const user = document
						.querySelector("#user-links > ul > li > a > span > span > b")
						.textContent.trim(),
					userURL = `https://dmoj.ca/user/${user}`;

				presenceData.state = `${user} (Rank: #${userRank})`;
				presenceData.largeImageKey = Assets.SubmissionList;
				presenceData.buttons = [
					{ label: "View User", url: userURL },
					{ label: "View Solved Problems", url: `${userURL}/solved` },
				];
			} else {
				const [, user] = document
						.querySelector(".tabs > h2")
						.textContent.trim()
						.split(" "),
					userURL = `https://dmoj.ca/user/${user}`;

				presenceData.state = `${user} (Rank: #${userRank})`;
				presenceData.largeImageKey = Assets.SubmissionList;
				presenceData.buttons = [
					{ label: "View User", url: userURL },
					{ label: "View Solved Problems", url: `${userURL}/solved` },
				];
			}
		} else {
			const [, userRank] = document
				.querySelectorAll(".user-sidebar > div")[2]
				.textContent.trim()
				.split("#");

			presenceData.details = "Viewing user:";

			if (userHeader === "My account") {
				const user = document
					.querySelector("#user-links > ul > li > a > span > span > b")
					.textContent.trim();
				presenceData.state = `${user} (Rank: #${userRank})`;
				presenceData.largeImageKey = Assets.User;
				presenceData.buttons = [
					{ label: "View User", url: `https://dmoj.ca/user/${user}` },
				];
			} else {
				const [, user] = document
					.querySelector(".tabs > h2")
					.textContent.trim()
					.split(" ");

				presenceData.state = `${user} (Rank: #${userRank})`;
				presenceData.largeImageKey = Assets.User;
				presenceData.buttons = [
					{ label: "View User", url: `https://dmoj.ca/user/${user}` },
				];
			}
		}
	} else if (url.includes("edit") && url.includes("profile")) {
		presenceData.details = "Editing profile:";
		presenceData.state = document
			.querySelector("#user-links > ul > li > a > span > span > b")
			.textContent.trim();
		presenceData.largeImageKey = Assets.EditProfile;
	} else if (url.includes("contests")) {
		presenceData.details = "Browsing contests";
		presenceData.largeImageKey = Assets.Contest;
	} else if (url.includes("contest")) {
		const contestURL = `https://dmoj.ca/contests/${url[2]}`;

		presenceData.state = document
			.querySelector(".tabs > h2")
			.textContent.trim();
		presenceData.buttons = [{ label: "View Contest", url: contestURL }];

		if (url.includes("stats")) {
			presenceData.details = "Viewing statistics of contest:";
			presenceData.largeImageKey = Assets.Statistics;
			presenceData.buttons.push({
				label: "View Statistics",
				url: `${contestURL}/stats`,
			});
		} else if (url.includes("ranking")) {
			presenceData.details = "Viewing rankings of contest:";
			presenceData.largeImageKey = Assets.Leaderboard;
			presenceData.buttons.push({
				label: "View Rankings",
				url: `${contestURL}/ranking`,
			});
		} else if (url.includes("participations")) {
			presenceData.details = "Viewing participation of contest:";
			presenceData.largeImageKey = Assets.Users;
			presenceData.buttons.push({
				label: "View Participation",
				url: `${contestURL}/participations`,
			});
		} else {
			presenceData.details = "Viewing contest:";
			presenceData.largeImageKey = Assets.Contest;
		}
	} else if (url.includes("about")) {
		presenceData.details = "Viewing about page";
		presenceData.largeImageKey = Assets.About;
	} else if (url.includes("status")) {
		presenceData.details = "Viewing status";
		presenceData.largeImageKey = Assets.Status;
	} else if (url.includes("runtimes")) {
		if (url.includes("matrix")) {
			presenceData.details = "Viewing version matrix";
			presenceData.largeImageKey = Assets.Source;
		} else {
			presenceData.details = "Viewing runtimes";
			presenceData.largeImageKey = Assets.Source;
		}
	} else if (url.includes("tips")) {
		presenceData.details = "Viewing tips";
		presenceData.largeImageKey = Assets.About;
	} else if (url.includes("api")) {
		presenceData.details = "Viewing API";
		presenceData.largeImageKey = Assets.Source;
	} else {
		presenceData.details = "Viewing home page";
		presenceData.largeImageKey = Assets.Home;
	}

	presence.setActivity(presenceData);
});
