const fs = require("fs");

// Učitavanje JSON fajla
const data = fs.readFileSync("groups.json", "utf8");
const groupsData = JSON.parse(data);

// Iteriranje kroz grupe (A, B, C)
Object.keys(groupsData).forEach((groupName) => {
  const group = groupsData[groupName];
  console.log(`Group ${groupName}:`);

  group.forEach((team) => {
    console.log(`- ${team.Team} (Rank: ${team.FIBARanking})`);
  });
});
function simulateGame(team1, team2) {
  const rankDiff = team1.FIBARanking - team2.FIBARanking;
  const probabilityTeam1Wins = 1 / (1 + Math.exp(-rankDiff / 10));

  const team1Wins = Math.random() < probabilityTeam1Wins;
  const scoreTeam1 = Math.floor(Math.random() * 30) + 70; // Score between 70 and 100
  const scoreTeam2 = Math.floor(Math.random() * 30) + 70;

  return team1Wins
    ? {
        winner: team1,
        loser: team2,
        scoreWinner: scoreTeam1,
        scoreLoser: scoreTeam2,
      }
    : {
        winner: team2,
        loser: team1,
        scoreWinner: scoreTeam2,
        scoreLoser: scoreTeam1,
      };
}

Object.keys(groupsData).forEach((groupName) => {
  const group = groupsData[groupName];
  console.log(`Group ${groupName}:`);

  for (let i = 0; i < group.length; i++) {
    for (let j = i + 1; j < group.length; j++) {
      const result = simulateGame(group[i], group[j]);
      console.log(
        `${result.winner.Team} defeats ${result.loser.Team} (${result.scoreWinner}:${result.scoreLoser})`
      );

      // Update points and other stats here
    }
  }
});
