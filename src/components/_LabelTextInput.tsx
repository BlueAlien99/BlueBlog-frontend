import React from 'react';

import styles from './cssModules/_LabelTextInput.module.css';

interface Props{
  name: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  type?: 'text' | 'email' | 'password',
  textarea?: 'true' | 'false',
  autoComplete?: 'on' | 'off',
  inputClass?: string
}

function LabelTextInput(props: Props){
  return (
    <div id={styles.wrapper}>
      <label htmlFor={props.name}>{props.name}</label>
      {props.textarea === 'true'
        ? <textarea
            name={props.name}
            id={props.name}
            className={props.inputClass}
            value={props.value}
            onChange={props.onChange} />
        : <input
            type={props.type}
            name={props.name}
            id={props.name}
            className={props.inputClass}
            value={props.value}
            onChange={props.onChange}
            autoComplete={props.autoComplete} />
      }
    </div>
  );
}

export default LabelTextInput;