import styles from './header.module.scss';

interface IProps {
  setSkip: (val: boolean) => void;
  setInputValue: (val: string) => void;
  setScale: (val: string) => void;
}

const Header: React.FC<IProps> = (props) => {
  return (
    <div className={styles['header']}>
      <div>
        <input
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            props.setInputValue(e.currentTarget.value);
            props.setSkip(true);
          }}
        />
        <button onClick={() => props.setSkip(false)}>Search city</button>
      </div>
      <input
        defaultChecked
        type='radio'
        id='c'
        name='scale'
        value='c'
        onChange={(e) => props.setScale(e.target.value)}
      />
      <label htmlFor='c'>Celcius</label> {' '}
      <input
        type='radio'
        id='f'
        name='scale'
        value='f'
        onChange={(e) => props.setScale(e.target.value)}
      />
      <label htmlFor='f'>Farenheit</label>
    </div>
  );
};

export default Header;
