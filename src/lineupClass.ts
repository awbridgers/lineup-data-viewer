import {player} from './types';

export class Lineup {
  players: string;
  time: number;
  pointsFor: number;
  pointsAgainst: number;
  dRebFor: number;
  dRebAgainst: number;
  oRebFor: number;
  oRebAgainst: number;
  madeTwosFor: number;
  attemptedTwosFor: number;
  madeTwosAgainst: number;
  attemptedTwosAgainst: number;
  madeThreesFor: number;
  madeThreesAgainst: number;
  attemptedThreesFor: number;
  attemptedThreesAgainst: number;
  turnoversFor: number;
  turnoversAgainst: number;
  assistsFor: number;
  assistsAgainst: number;
  ftaFor: number;
  ftaAgainst: number;
  paintFor: number;
  paintAgainst: number;
  secondFor: number;
  secondAgainst: number;
  constructor(players: string) {
    this.players = players;
    this.pointsFor = 0;
    this.pointsAgainst = 0;
    this.dRebFor = 0;
    this.dRebAgainst = 0;
    this.oRebFor = 0;
    this.oRebAgainst = 0;
    this.madeTwosFor = 0;
    this.attemptedTwosFor = 0;
    this.madeTwosAgainst = 0;
    this.attemptedTwosAgainst = 0;
    this.madeThreesFor = 0;
    this.madeThreesAgainst = 0;
    this.attemptedThreesFor = 0;
    this.attemptedThreesAgainst = 0;
    this.paintFor = 0;
    this.paintAgainst = 0;
    this.secondFor = 0;
    this.secondAgainst = 0;
    this.turnoversFor = 0;
    this.turnoversAgainst = 0;
    this.assistsFor = 0;
    this.assistsAgainst = 0;
    this.ftaFor = 0;
    this.ftaAgainst = 0;
    this.time = 0;
  }
  combineLineup = (other: Lineup) => {
    const keys = Object.keys(other) as Array<keyof Lineup>;
    keys.forEach((property) => {
      const prop = other[property];
      if (typeof prop === 'number') {
        (this[property] as number) += prop;
      }
    });
  };
  get totalShots() {
    return {
      attemptedFor: this.attemptedThreesFor + this.attemptedTwosFor,
      attemptedAgainst: this.attemptedThreesAgainst + this.attemptedTwosAgainst,
      madeFor: this.madeTwosFor + this.madeThreesFor,
      madeAgainst: this.madeTwosAgainst + this.madeThreesAgainst,
    };
  }
  get fgPercentFor() {
    return this.totalShots.madeFor / this.totalShots.attemptedFor;
  }
  get fgPercentAgainst() {
    return this.totalShots.madeAgainst / this.totalShots.attemptedAgainst;
  }
  get twoPercentFor() {
    return this.madeTwosFor / this.attemptedTwosFor;
  }
  get twoPercentAgainst() {
    return this.madeTwosAgainst / this.attemptedTwosAgainst;
  }
  get threePercentFor() {
    return this.madeThreesFor / this.attemptedThreesFor;
  }
  get threePercentAgainst() {
    return this.madeThreesAgainst / this.attemptedThreesAgainst;
  }
  get netPoints() {
    return this.pointsFor - this.pointsAgainst;
  }
  get netORebounds() {
    return this.oRebFor - this.oRebAgainst;
  }
  get netDRebounds() {
    return this.dRebFor - this.dRebAgainst;
  }
  get netPaint() {
    return this.paintFor - this.paintAgainst;
  }
  get netSecond() {
    return this.secondFor - this.secondAgainst;
  }
  get netAssists() {
    return this.assistsFor - this.assistsAgainst;
  }
  get netTurnovers() {
    return this.turnoversFor - this.turnoversAgainst;
  }
  get netAttemptedTwos() {
    return this.attemptedTwosFor - this.attemptedTwosAgainst;
  }
  get netMadeTwos() {
    return this.madeTwosFor - this.madeTwosAgainst;
  }
  get netAttemptedThrees() {
    return this.attemptedThreesFor - this.attemptedThreesAgainst;
  }
  get netMadeThrees() {
    return this.madeThreesFor - this.madeThreesAgainst;
  }
  get possessions() {
    //FGA-OR + TO + .44*FTA
    const {attemptedFor, attemptedAgainst} = this.totalShots;
    const possFor =
      attemptedFor - this.oRebFor + this.turnoversFor + (0.42 * this.ftaFor);
    const possAgainst =
      attemptedAgainst -
      this.oRebAgainst +
      this.turnoversAgainst +
      (0.42 * this.ftaAgainst);
    //because lineups can change between possessions, just average out the possessions of off and def.
    return (possAgainst + possFor) / 2;
  }
  get oRating() {
    return Math.round((this.pointsFor / this.possessions) * 100);
  }
  get dRating() {
    return Math.round((this.pointsAgainst / this.possessions) * 100);
  }
  get threeARFor() {
    const {attemptedFor} = this.totalShots;
    return (this.attemptedThreesFor / attemptedFor);
  }
  get threeARAgainst(){
    const {attemptedAgainst} = this.totalShots;
    return (this.attemptedThreesFor / attemptedAgainst);
  }
  get assistsPerPoss() {
    return this.assistsFor / this.possessions;
  }
  get turnoversPerPoss() {
    return this.turnoversFor / this.possessions;
  }
  get eFGFor() {
    const {attemptedFor, madeFor} = this.totalShots;
    return (madeFor + 0.5 * this.madeThreesFor) / attemptedFor;
  }
  get eFGAgainst(){
    const {attemptedAgainst, madeAgainst} = this.totalShots;
    return (madeAgainst + 0.5 * this.madeThreesAgainst) / attemptedAgainst;
  }
  get oRebPercent() {
    //Percent of missed shots that were O-rebounded by team.
    const {attemptedFor, madeFor} = this.totalShots;
    return attemptedFor - madeFor === 0 ? 0 : this.oRebFor / (attemptedFor - madeFor);
  }
  get dRebPercent() {
    //Percent of missed shots that were D-rebounded by team.
    const {attemptedAgainst, madeAgainst} = this.totalShots;
    return attemptedAgainst - madeAgainst === 0 ? 0 : this.dRebFor / (attemptedAgainst - madeAgainst);
  }
  get assistPerFG() {
    const {madeFor} = this.totalShots;
    return madeFor === 0 ? 0 : this.assistsFor / madeFor;
  }
  get assistTurnoverRatio() {
    return this.turnoversFor === 0 ? 0 : this.assistsFor / this.turnoversFor;
  }
}
