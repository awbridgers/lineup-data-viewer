import {useEffect, useState} from 'react';
import Select, {components} from 'react-select';
import {gameData, seasonData} from '../types';
import '../App.css';
import {Lineup} from '../lineupClass';

interface iProps {
  games: gameData[];
  years: string[];
  selectedYear: string;
  selectedGame: number;
  changeYear: (picked: string) => void;
  changeGame: (picked: number) => void;
}
interface gameChoice {
  label: string;
  value: number;
}
interface yearChoice {
  label: string;
  value: string;
}

const Header = ({
  games,
  years,
  selectedGame,
  selectedYear,
  changeGame,
  changeYear,
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
            onChange={(picked) => changeYear(picked!.value)}
            isClearable={false}
            value={yearOptions.find(x=>x.value === selectedYear)}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            className="select"
            isSearchable={false}
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
            onChange={(picked) => changeGame(picked!.value)}
            className="select"
            isSearchable={false}
            isClearable={false}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value.toFixed()}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
