import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Select, {components} from 'react-select';
import {gameData, group, seasonData} from '../types';
import Switch from 'react-switch';
import '../App.css';
import {Lineup} from '../lineupClass';
import {Filter, HeaderStyle} from '../styles/header';

interface iProps {
  games: gameData[];
  years: string[];
  selectedYear: string;
  selectedGame: number;
  selectedStat: string;
  finderActive: boolean;
  selectedGroup: string;
  changeGroup: Dispatch<SetStateAction<group>>;
  changeYear: (picked: string) => void;
  changeGame: Dispatch<SetStateAction<number>>;
  changeStat: Dispatch<SetStateAction<string>>;
  changeShowFinder: Dispatch<SetStateAction<boolean>>;
  changeFinderActive: () => void;
  filter: boolean;
  setFilter: Dispatch<SetStateAction<boolean>>;
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
interface groupChoice {
  label: string;
  value: group;
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
const groupOptions: groupChoice[] = [
  {value: 'lineups', label: 'Lineups'},
  {value: 'players', label: 'Players'},
  {value: 'yearly', label: 'Year to Year'},
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
  selectedGroup,
  selectedGame,
  selectedYear,
  finderActive,
  changeGame,
  changeYear,
  changeGroup,
  selectedStat,
  changeStat,
  changeShowFinder,
  changeFinderActive,
  filter,
  setFilter,
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
        label: year,
        value: year,
      }))
      .sort((a, b) => {
        const yearA = +a.value.slice(0, 4);
        const yearB = +b.value.slice(0, 4);
        return yearB - yearA;
      });
    setyearOptions(yearOptions);
  }, [years]);
  return (
    <div style={{paddingBottom: '10px'}}>
      <HeaderStyle>
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
              isDisabled={finderActive || selectedGroup === 'yearly'}
              styles={{
                control: (provided) => ({...provided, padding: '5px 0px'}),
                valueContainer: (provided) => ({
                  ...provided,
                  marginTop: 'auto',
                }),
              }}
              components={{
                Control: (props) => <Control {...props} title="Season" />,
              }}
            />
          </div>
          <div className="headerFinder">
            <button onClick={() => changeShowFinder(true)}>
              Search Lineups
            </button>
          </div>
        </div>
        <div className="headerGameControls">
          {finderActive && (
            <div
              className="gameInfo"
              style={{display: 'flex', flexFlow: 'column'}}
            >
              <div className="totals">Lineup Finder</div>
              <button className="back" onClick={changeFinderActive}>
                Exit Finder
              </button>
            </div>
          )}
          {!finderActive && (
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
          )}

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
              isDisabled={finderActive}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value.toFixed()}
              styles={{
                control: (provided) => ({...provided, padding: '5px 0px'}),
                valueContainer: (provided) => ({
                  ...provided,
                  marginTop: 'auto',
                }),
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
                valueContainer: (provided) => ({
                  ...provided,
                  marginTop: 'auto',
                }),
              }}
              components={{
                Control: (props) => <Control {...props} title="Stat Type" />,
              }}
            />
          </div>
          <div className="playerSwitch">
            <Select<groupChoice>
              options={groupOptions}
              value={groupOptions.find((x) => x.value === selectedGroup)}
              onChange={(picked) =>
                picked
                  ? changeGroup(picked.value)
                  : console.log('No option selected')
              }
              className="group select"
              isSearchable={false}
              isClearable={false}
              isDisabled={finderActive}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              styles={{
                control: (provided) => ({...provided, padding: '5px 0px'}),
                valueContainer: (provided) => ({
                  ...provided,
                  marginTop: 'auto',
                }),
              }}
              components={{
                Control: (props) => <Control {...props} title="Group" />,
              }}
            />
          </div>
        </div>
      </HeaderStyle>
      <Filter>
        <label style={{margin: '0px 5px'}}>Poss Limit</label>
        <Switch
          checked={filter}
          onChange={(checked) => setFilter(checked)}
          height={20}
          width={35}
          handleDiameter={18}
          disabled={selectedGame >= 0}
        />
      </Filter>
    </div>
  );
};

export default Header;
