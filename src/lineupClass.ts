import { player } from './types';

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
  constructor(x: Lineup) {
    this.players = x.players;
    this.pointsFor = x.pointsFor;
    this.pointsAgainst = x.pointsAgainst;
    this.dRebFor = x.dRebFor;
    this.dRebAgainst = x.dRebAgainst;
    this.oRebFor = x.oRebFor;
    this.oRebAgainst = x.oRebAgainst;
    this.madeTwosFor = x.madeTwosFor;
    this.attemptedTwosFor = x.attemptedTwosFor
    this.madeTwosAgainst = x.madeTwosAgainst;
    this.attemptedTwosAgainst = x.attemptedTwosAgainst
    this.madeThreesFor = x.madeThreesFor;
    this.madeThreesAgainst = x.madeThreesAgainst;
    this.attemptedThreesFor = x.attemptedThreesFor
    this.attemptedThreesAgainst = x.attemptedThreesAgainst
    this.paintFor = x.paintFor;
    this.paintAgainst = x.paintAgainst;
    this.secondFor = x.secondFor;
    this.secondAgainst = x.secondAgainst;
    this.turnoversFor = x.turnoversFor;
    this.turnoversAgainst = x.turnoversAgainst;
    this.assistsFor = x.assistsFor;
    this.assistsAgainst = x.assistsAgainst;
    this.ftaFor = x.ftaFor;
    this.ftaAgainst = x.ftaAgainst;
    this.time = x.time;
  }
  combineLineup = (other: Lineup) =>{
    const keys = Object.keys(other) as Array<keyof Lineup>;
    keys.forEach((property)=>{
      const prop = other[property];
      if(typeof prop === 'number'){
        (this[property] as number) += prop
      }
    })
  }
}