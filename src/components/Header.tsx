import {useEffect, useState} from 'react';
import Select, {components} from 'react-select';
import {gameData, seasonData} from '../types';
import Switch from 'react-switch';
import '../App.css';
import {Lineup} from '../lineupClass';

interface iProps {
  games: gameData[];
  years: string[];
  selectedYear: string;
  selectedGame: number;
  selectedStat: string;
  showPlayers: boolean;
  changeYear: (picked: string) => void;
  changeGame: (picked: number) => void;
  changeStat: (picked: string) => void;
  changeShowPlayers: (checked: boolean) => void;
}
interface gameChoice {
  label: string;
  value: number;
}
interface yearChoice {
  label: string;
  value: string;
}
interface statChoice {
  label: string;
  value: 'total' | 'net' | 'advanced' | 'shooting';
}

const statOptions: statChoice[] = [
  {
    label: 'Total',
    value: 'total',
  },
  {
    label: 'Net',
    value: 'net',
  },
  {
    label: 'Advanced',
    value: 'advanced',
  },
  {
    label: 'Shooting',
    value: 'shooting',
  },
];

//custom control compononet for select
const Control = (props: any) => {
  return (
    <>
      <div className="label">{props.title}</div>
      <components.Control {...props} />
    </>
  );
};

const Header = ({
  games,
  years,
  showPlayers,
  selectedGame,
  selectedYear,
  changeGame,
  changeYear,
  selectedStat,
  changeStat,
  changeShowPlayers,
}: iProps) => {
  const [gameOptions, setGameOptions] = useState<gameChoice[]>([]);
  const [yearOptions, setyearOptions] = useState<yearChoice[]>([]);
  useEffect(() => {
    const gameOptions: gameChoice[] = [
      {label: 'Season Total', value: -2},
      {label: 'ACC Total', value: -1},
      ...games.map((x) => ({label: x.game.replace(/_/g, ' '), value: x.order})),
    ];
    setGameOptions(gameOptions);
  }, [games]);
  useEffect(() => {
    const yearOptions: yearChoice[] = years
      .map((year) => ({
        label: `${year[0].toUpperCase()}${year.slice(1)}`,
        value: year,
      }))
      .sort((a, b) => {
        if (a.value === 'current') {
          return -1;
        }
        if (b.value === 'current') {
          return 1;
        }
        return +a.label - +b.label;
      });
    setyearOptions(yearOptions);
  }, [years]);
  return (
    <div className="App-header">
      <div className="headerYearControls">
        <div className="selectContainer">
          <Select
            options={yearOptions}
            onChange={(picked) =>
              picked
                ? changeYear(picked.value)
                : console.log('no option selected')
            }
            isClearable={false}
            value={yearOptions.find((x) => x.value === selectedYear)}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            className="select year"
            isSearchable={false}
            styles={{
              control: (provided) => ({...provided, padding: '5px 0px'}),
              valueContainer: (provided) => ({...provided, marginTop: 'auto'}),
            }}
            components={{
              Control: (props) => <Control {...props} title="Season" />,
            }}
          />
        </div>
      </div>
      <div className="headerGameControls">
        <div className="gameInfo">
          {selectedGame === -2 ? (
            <div className="totals">Season Total</div>
          ) : selectedGame === -1 ? (
            <div className="totals">ACC Total</div>
          ) : (
            <div className="score">
              <div>Wake Forest: {games[selectedGame].score.wake}</div>
              <div>
                {games[selectedGame].game}: {games[selectedGame].score.opp}
              </div>
            </div>
          )}
        </div>
        <div className="selectContainer">
          <Select<gameChoice>
            options={gameOptions}
            value={gameOptions.find((x) => x.value === selectedGame)}
            onChange={(picked) =>
              picked
                ? changeGame(picked.value)
                : console.log('No option selected')
            }
            className="game select"
            isSearchable={false}
            isClearable={false}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value.toFixed()}
            styles={{
              control: (provided) => ({...provided, padding: '5px 0px'}),
              valueContainer: (provided) => ({...provided, marginTop: 'auto'}),
            }}
            components={{
              Control: (props) => <Control {...props} title="Game" />,
            }}
          />
        </div>
      </div>
      <div className="headerStatControls">
        <div className="selectController">
          <Select<statChoice>
            options={statOptions}
            value={statOptions.find((x) => x.value === selectedStat)}
            onChange={(picked) =>
              picked
                ? changeStat(picked.value)
                : console.log('No option selected')
            }
            className="stat select"
            isSearchable={false}
            isClearable={false}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            styles={{
              control: (provided) => ({...provided, padding: '5px 0px'}),
              valueContainer: (provided) => ({...provided, marginTop: 'auto'}),
            }}
            components={{
              Control: (props) => <Control {...props} title="Stat Type" />,
            }}
          />
        </div>
        <div className="playerSwitch">
          <button onClick = {()=>changeShowPlayers(!showPlayers)}>{showPlayers ? 'Show Team' : 'Show Players'}</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
