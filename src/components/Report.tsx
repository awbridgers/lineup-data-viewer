import {useContext, useEffect, useState} from 'react';
import Select, {components, CSSObjectWithLabel} from 'react-select';
import {gameData, group, seasonData} from '../types';
import Switch from 'react-switch';
import '../App.css';
import {Lineup} from '../lineupClass';
import {HeaderStyle} from '../styles/header';
import styled from 'styled-components';
import {FirebaseContext} from './FirebaseProvider';
interface IProps {
  data: seasonData;
}
interface Options {
  value: string;
  label: string;
}
const nullOption = {label: '', value: ''};
const format = new Intl.NumberFormat('en-us', {
  signDisplay: 'always',
  maximumFractionDigits: 1,
});

const PlayerReport = ({data}: IProps) => {
  const [roster, setRoster] = useState<Options[]>([]);
  const [player, setPlayer] = useState<string>('');
  const [onCourt, setOnCourt] = useState<Lineup | null>();
  const [onBench, setOnBench] = useState<Lineup | null>();

  useEffect(() => {
    //get the roster from the list of player data
    setRoster(
      data.season.players
        .sort((a, b) => b.time - a.time)
        .map((x) => ({
          label: x.players,
          value: x.players,
        }))
    );
  }, [data]);
  useEffect(() => {
    if (player && data) {
      let on = new Lineup(player);
      let off = new Lineup('rest');
      for (let unit of data.season.lineups) {
        if (unit.players.includes(player)) {
          on.combineLineup(unit);
        } else {
          off.combineLineup(unit);
        }
      }
      setOnCourt(on);
      setOnBench(off);
    } else {
      setOnBench(null);
      setOnCourt(null);
    }
  }, [player, data]);

  return (
    <Report>
      <div className="title">Player Report</div>
      <div className="selectBox">
        <Select<Options>
          value={player ? {value: player, label: player} : null}
          onChange={(picked) => {
            setPlayer(picked ? picked.value : '');
          }}
          options={roster}
          //isClearable
          isSearchable={false}
          className="select"
          styles={{
            indicatorsContainer: (provided: CSSObjectWithLabel) => ({
              ...provided,
              position: 'absolute',
              right: '0px',
            }),
            valueContainer: (provided: CSSObjectWithLabel)=>({
              ...provided,
              fontSize: '24px',
            })
          }}
          placeholder={`Select a Player`}
          isOptionDisabled={(option) => option.value === player}
        />
      </div>
      <table className="reportTable">
        <thead>
          <tr>
            <th>Stat</th>
            <th>Court</th>
            <th>Bench</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>O Rtg</td>
            <td>{onCourt?.oRating}</td>
            <td>{onBench?.oRating}</td>
            <td className="diff">
              {onCourt && onBench
                ? format.format(onCourt.oRating - onBench.oRating)
                : null}
            </td>
          </tr>
          <tr>
            <td>D Rtg</td>
            <td>{onCourt?.dRating}</td>
            <td>{onBench?.dRating}</td>
            <td className="diff">
              {onCourt && onBench
                ? format.format(onCourt.dRating - onBench.dRating)
                : null}
            </td>
          </tr>
          <tr>
            <td>eFG%</td>
            <td>{onCourt ? format.format(onCourt.eFGFor * 100) : null}</td>
            <td>{onBench ? format.format(onBench.eFGFor * 100) : null}</td>
            <td className="diff">
              {onCourt && onBench
                ? format.format((onCourt.eFGFor - onBench.eFGFor) * 100)
                : null}
            </td>
          </tr>
          <tr>
            <td>Net +/-</td>
            <td>{onCourt ? format.format(onCourt.netPoints) : null}</td>
            <td>{onBench ? format.format(onBench.netPoints) : null}</td>
            <td className="diff">
              {onCourt && onBench
                ? format.format(onCourt.netPoints - onBench.netPoints)
                : null}
            </td>
          </tr>
        </tbody>
      </table>
      <button className = 'cancel'>Back</button>
    </Report>
  );
};

const Report = styled.div`
  width: 35vw;
  min-height: 400px;
  min-width: 400px;
  background-color: #daa520;
  margin: auto;
  color: black;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  .title {
    font-weight: bold;
    font-size: 24px;
    margin: 5px 0px;
  }
  .selectBox {
    width: 80%;
    background-color: blue;
    margin: auto;
  }
  .cancel{
    margin-top: 10px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 8px;
    width: 125px;
    height: 40px;
    margin: 5px 5px;
  }
  .cancel:hover{
    background-color: #808080;
  }
  .reportTable {
    width: 80%;
    margin: auto;
    margin-bottom: 25px;
    table-layout: fixed;
    th {
      font-size: 22px;
      margin-bottom: 5px;
      font-weight: 500;
    }
    td {
      font-size: 20px;
    }
    .diff {
      font-weight: bold;
    }
  }
`;

export default PlayerReport;
