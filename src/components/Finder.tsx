import styled from 'styled-components';
import {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {finderPlayer, player} from '../types';
import Select, {CSSObjectWithLabel} from 'react-select';
import {FirebaseContext} from './FirebaseProvider';



interface FinderProps {
  year: string;
  players: finderPlayer[];
  changePlayers: Dispatch<SetStateAction<finderPlayer[]>>;
  cancel: ()=>void;
  submit: ()=>void;
}
interface Options {
  value: string;
  label: string;
}
interface IncludeOptions {
  value: 'include' | 'omit';
  label: string;
}

const nullOption = {label: '', value: ''};
const includeArray: IncludeOptions[] = [
  {label: 'include', value: 'include'},
  {label: 'omit', value: 'omit'},
];



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

const Finder = ({year, players, changePlayers, cancel,submit}: FinderProps) => {
  const [roster, setRoster] = useState<Options[]>([]);
  const data = useContext(FirebaseContext);

  useEffect(() => {
    //get the roster from the list of player data
    if (data) {
      setRoster(
        data[year].season.players.sort((a,b)=>b.time - a.time).map((x) => ({
          label: x.players,
          value: x.players,
        }))
      );
    }
  }, [year]);

  return (
    <Styles>
      <div className="finderTitle">Lineup Finder</div>
      {players.map((line, index) => (
        <div className="span" key={index}>
          <Select<Options>
            value={line.name ? {value: line.name, label: line.name} : null}
            onChange={(picked) => {
              changePlayers((prev) =>
                prev.map((input, i) =>
                  index !== i
                    ? input
                    : picked
                    ? {...input, name: picked.value}
                    : {...input, name: ''}
                )
              );
            }}
            options={roster}
            isClearable
            isSearchable={false}
            className="select"
            styles={customStyle}
            placeholder={`Player ${index + 1}`}
            isOptionDisabled={(option) =>
              players.map((x) => x.name).includes(option.value)
            }
          />
          <Select<IncludeOptions>
            options={includeArray}
            value={{label: line.type, value: line.type}}
            onChange={(picked) =>
              changePlayers((prev) =>
                prev.map((input, i) =>
                  i === index
                    ? {...input, type: picked ? picked.value : 'include'}
                    : input
                )
              )
            }
            isSearchable={false}
            isClearable={false}
            className="include"
            styles = {customStyle}
            //isOptionDisabled = {(option)=>option.value === }
          />
        </div>
      ))}
      <div>
        {players.length < 10 && <button onClick = {()=>changePlayers(prev=>[...prev, {name: '', type: 'include'}])}>Add More</button>}
      </div>
      <div>
        <button className = 'submit' onClick = {submit}>Find Lineups</button>
        <button className = 'cancel' onClick = {cancel}>Cancel</button>
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
  .finderTitle {
    font-size: 24px;
    font-weight: bold;
    margin: 5px 0px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 600;
  }
  .select {
    font-size: 14px;
    margin: 2px 5px;
    flex-grow: 1;
  }
  .include {
    width: 30%;
    font-size: 14px;
    font-weight: 600;
  }
  .playerLabel {
    font-size: 16px;
    font-weight: bold;
  }
  .span {
    display: flex;
    width: 95%;
    flex-flow: row nowrap;
    margin: auto;
    align-items: center;
    justify-content: space-between;
  }
  .submit{
    border-radius: 8px;
    width: 125px;
    height: 40px;
    margin-top: 10px;
    font-weight: bold;
    font-size: 16px;
    margin: 5px 5px;
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
  .submit:hover, .cancel:hover{
    background-color: #808080;
  }
`;

export default Finder;
