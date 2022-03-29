import styled from 'styled-components';
import {useContext, useEffect, useState} from 'react';
import {player} from '../types';
import Select, {CSSObjectWithLabel} from 'react-select';
import {FirebaseContext} from './FirebaseProvider';

interface SelectorProps {
  disabled: boolean;
  selectedPlayers: string[];
  roster: string[];
  selection: string;
  changePlayer: (picked: string) => void;
}

interface FinderProps {
  year: string;
  includeSelected: string[];
}
interface Options {
  value: string;
  label: string;
}

const nullOption = {label: '', value: ''};

const customStyle = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    minHeight: '25px',
    height: '25px',
  }),
  indicatorsContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: '25px',
    minHeight: '25px',
  }),
  valueContainer: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: '25px',
  }),
};

const Finder = ({year, includeSelected}: FinderProps) => {
  const [roster, setRoster] = useState<Options[]>([]);
  const [include, setInclude] = useState<string[]>(includeSelected);
  const [omit, setOmit] = useState<string[]>([]);
  const data = useContext(FirebaseContext);

  useEffect(() => {
    //get the roster from the list of player data
    if (data) {
      setRoster(
        data[year].season.players.map((x) => ({
          label: x.players,
          value: x.players,
        }))
      );
    }
  }, [year]);

  const handleSelection = (
    type: 'omit' | 'include',
    selection: Options,
    index: number
  ) => {
    if (type === 'omit') {
      const newArray = omit.map((item, i) =>
        i === index ? selection.value : item
      );
      setOmit(newArray);
    } else {
      const newArray = include.map((item, i) =>
        i === index ? selection.value : item
      );
      setInclude(newArray);
    }
  };

  return (
    <Styles>
      <div className = 'finderTitle'>Lineup Finder</div>
      <div className = 'subTitle'>Include these players:</div> 
      <div className="span">
        <Select<Options>
          value={include[0] ? {value: include[0], label: include[0]} : null}
          onChange={(picked) =>
            handleSelection('include', picked ? picked : nullOption, 0)
          }
          options={roster}
          isClearable
          isSearchable={false}
          className="select"
          styles={customStyle}
          placeholder = 'Player 1'
          isOptionDisabled={(option)=>[...include, ...omit].includes(option.value)}
        />
      </div>
      <div className="span">
        <Select<Options>
          value={include[1] ? {value: include[1], label: include[1]} : null}
          onChange={(picked) =>
            handleSelection('include', picked ? picked : nullOption, 1)
          }
          options={roster}
          isClearable
          isSearchable={false}
          className="select"
          styles={customStyle}
          placeholder = 'Player 2'
          isOptionDisabled={(option)=>[...include, ...omit].includes(option.value)}

        />
      </div>
      <div className="span">
        <Select<Options>
          value={include[2] ? {value: include[2], label: include[2]} : null}
          onChange={(picked) =>
            handleSelection('include', picked ? picked : nullOption, 2)
          }
          options={roster}
          isClearable
          isSearchable={false}
          className="select"
          styles={customStyle}
          placeholder = 'Player 3'
          isOptionDisabled={(option)=>[...include, ...omit].includes(option.value)}

        />
      </div>
      <div className="span">
        <Select<Options>
          value={include[3] ? {value: include[3], label: include[3]} : null}
          onChange={(picked) =>
            handleSelection('include', picked ? picked : nullOption, 3)
          }
          options={roster}
          isClearable
          isSearchable={false}
          className="select"
          styles={customStyle}
          placeholder = 'Player 4'
          isOptionDisabled={(option)=>[...include, ...omit].includes(option.value)}

        />
      </div>
      <div className="span">
        <Select<Options>
          value={include[4] ? {value: include[4], label: include[4]} : null}
          onChange={(picked) =>
            handleSelection('include', picked ? picked : nullOption, 4)
          }
          options={roster}
          isClearable
          isSearchable={false}
          className="select"
          styles={customStyle}
          placeholder = 'Player 5'
          isOptionDisabled={(option)=>[...include, ...omit].includes(option.value)}

        />
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  width: 35vw;
  min-height: 400px;
  min-width: 400px;
  background-color: #daa520;
  margin: auto;
  color: black;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .finderTitle{
    font-size: 24px;
    font-weight: bold;
    margin: 5px 0px;
  }
  .subTitle{
    font-size: 18px;
    font-weight: 600;
  }
  .select {
    font-size: 14px;
    margin: 2px 5px;
    width: 250px;
  }
  .playerLabel {
    font-size: 16px;
    font-weight: bold;
  }
  .span {
    display: flex;
    width: 100%;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
  }
`;

export default Finder;
