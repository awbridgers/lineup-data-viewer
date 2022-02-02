import {useEffect, useState} from 'react';
import Select from 'react-select';
import {gameData} from '../types';

interface iProps {
  games: gameData[];
}

interface Choice {
  label: string;
  value: string;
}

const Header = ({games}: iProps) => {
  const [selected, setSelected] = useState<Choice|null>({value: '', label: 'Total'});
  const options: Choice[] = [
    {value: '', label: 'Total'},
    {value: 'conference', label: 'ACC Games'},
    ...games.map((opp) => ({
      value: opp.game,
      label: opp.game.replace(/_/g, ' '),
    })),
  ];

  return (
    <div className="App-header">
      <Select<Choice>
        options={options}
        value={selected}
        onChange={(picked)=>setSelected(picked)}
      />
    </div>
  );
};

export default Header;
