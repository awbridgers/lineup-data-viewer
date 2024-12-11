export const getHeaderName = (id: string):string => {
  switch (id) {
    case 'players':
      return 'Lineup';
    case 'time':
      return 'Time on Court';
    case 'pointsFor':
      return 'Points For';
    case 'pointsAgainst':
      return 'Points Against';
    case 'dRebFor':
      return 'Defensive Rebounds For';
    case 'dRebAgainst':
      return 'Defensive Rebounds Against';
    case 'oRebFor':
      return 'Offensive Rebounds For';
    case 'oRebAgainst':
      return 'Offensive Rebounds Against';
    case 'madeFor':
      return 'FG Made For';
    case 'madeAgainst':
      return 'FG Made Against';
    case 'attemptedFor':
      return 'FG Attempted For';
    case 'attemptedAgainst':
      return 'FG Attempted Against';
    case 'madeTwosFor':
      return '2P Made For';
    case 'madeTwosAgainst':
      return '2P Made Against';
    case 'attemptedTwosFor':
      return '2P Attempted For';
    case 'attemptedTwosAgainst':
      return '2P Attempted Against';
    case 'madeThreesFor':
      return '3P Made For';
    case 'attemptedThreesFor':
      return '3P Attempted For';
    case 'attemptedThreesAgainst':
      return '3P Attempted Against';
    case 'madeThreesAgainst':
      return '3P Made Against';
    case 'paintFor':
      return 'Points in the Paint For';
    case 'paintAgainst':
      return 'Points in the Paint Against';
    case 'secondFor':
      return '2nd Chance Points For';
    case 'secondAgainst':
      return '2nd Chance Points Against';
    case 'assistsFor':
      return 'Assists For';
    case 'assistsAgainst':
      return 'Assists Against';
    case 'turnoversFor':
      return 'Turnovers For';
    case 'turnoversAgainst':
      return 'Turnovers Against';
    case 'netPoints':
      return 'Net Points';
    case 'netDRebounds':
      return 'Net Defensive Rebounds';
    case 'netORebounds':
      return 'Net Offensive Rebounds';
    case 'netMadeTwos':
      return 'Net 2P Made';
    case 'netAttemptedTwos':
      return 'Net 2P Attempted';
    case 'netMadeThrees':
      return 'Net 3P Made';
    case 'netAttemptedThrees':
      return 'Net 3P Attempted';
    case 'netPaint':
      return 'Net Points in the Paint';
    case 'netSecond':
      return 'Net 2nd Chance Points';
    case 'netAssists':
      return 'Net Assists';
    case 'netTurnovers':
      return 'Net Turnovers';
    case 'possessions':
      return 'Possessions';
    case 'oRating':
      return 'Offensive Rating';
    case 'dRating':
      return 'Defensive Rating';
    case 'oRebPercent':
      return 'Offensive Rebound Percent';
    case 'dRebPercent':
      return 'Defensive Rebound Percent';
    case 'assistPerFG':
      return 'Assist% (% of made baskets assisted)';
    case 'assistsPerPoss':
      return 'Assists per Possession';
    case 'assistTurnoverRatio':
      return 'Assist/Turnover';
    case 'turnoversPerPoss':
      return 'Turnovers per Possession';
    case 'fgPercentFor':
      return 'FG% For';
    case 'fgPercentAgainst':
      return 'FG% Against';
    case 'twoPercentFor':
      return '2P% For';
    case 'twoPercentAgainst':
      return '2P% Against';
    case 'threePercentFor':
      return '3P% For';
    case 'threePercentAgainst':
      return '3P% Against';
    case 'eFGFor':
      return 'eFG% For';
    case 'eFGAgainst':
      return 'eFG% Against';
    case 'threeARFor':
      return '3P Attempt Rate For';
    case 'threeARAgainst':
      return '3P Attempt Rate Against';
      default:
        return ''
  }
};
