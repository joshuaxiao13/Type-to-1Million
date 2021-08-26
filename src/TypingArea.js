import { useState, useEffect, useRef } from 'react';
import { wordBank } from './wordBank';

const TypeBox = ({
  numberOfWords,
  updateWpm,
  updateCharCount,
  startTimer,
  updateHistory,
  purple,
  gameWon,
}) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(null);
  const [errorIndex, setErrorIndex] = useState(null);
  const [typing, setTyping] = useState('');
  const wpmRef = useRef(null);

  const [textColor, typedColor] = purple
    ? ['#9932CC', '#EAD1EC']
    : ['black', '#DCDCDC'];

  const handleTyping = (evt) => {
    if (index === 0 && errorIndex === null) {
      setErrorIndex(text.length);
      startTimer();
      wpmRef.current = setInterval(updateWpm, 1000);
    }
    const str = evt.target.value;
    if (index + str.length === text.length && text.substring(index) === str) {
      updateCharCount(text.length);
      clearInterval(wpmRef.current);
      updateWpm();
      updateHistory();
      evt.target.value = '';
      reset();
    } else if (str.length > 20 || index + str.length > text.length) return;
    if (
      str &&
      str.slice(-1) === ' ' &&
      text.substring(index, index + str.length) === str
    ) {
      updateCharCount(index + str.length);
      setIndex(index + str.length);
      evt.target.value = '';
    }
    if (
      errorIndex === text.length &&
      str &&
      str.slice(-1) !== text.charAt(index + str.length - 1)
    ) {
      setErrorIndex(index + str.length - 1);
    } else if (
      errorIndex !== null &&
      errorIndex !== text.length &&
      (str === '' || str === text.substring(index, index + str.length))
    ) {
      setErrorIndex(text.length);
    }
    setTyping(evt.target.value);
  };

  const reset = () => {
    clearInterval(wpmRef.current);
    setTyping('');
    setErrorIndex(null);
    setIndex(0);
    updateCharCount(0);
    let newText = '';
    if (gameWon) newText = 'rick rolled ;)';
    else {
      for (let i = 0; i < numberOfWords; ++i) {
        newText += wordBank[Math.floor(Math.random() * wordBank.length)];
        if (i < numberOfWords - 1) newText += ' ';
      }
    }
    setText(newText);
  };

  useEffect(reset, [numberOfWords, gameWon]);

  let characterCount = 0;

  return (
    <>
      <div id='text-box'>
        {text.split('').map((char) => {
          if (characterCount < index) {
            return (
              <pre key={characterCount++} style={{ color: typedColor }}>
                {char}
              </pre>
            );
          } else if (
            characterCount >= index &&
            characterCount < index + typing.length
          ) {
            return (
              <pre
                key={characterCount++}
                style={{
                  color:
                    typing.charAt(characterCount - index) !==
                    text.charAt(characterCount)
                      ? '#DC143C'
                      : typedColor,
                  textDecoration:
                    characterCount >= errorIndex ? 'underline' : 'none',
                  textDecorationColor:
                    characterCount >= errorIndex ? 'red' : 'none',
                }}
              >
                {char}
              </pre>
            );
          } else if (characterCount === index + typing.length) {
            return (
              <pre
                id='current-character'
                key={characterCount++}
                style={{
                  color: textColor,
                  textDecorationColor: textColor,
                }}
              >
                {char}
              </pre>
            );
          }
          return (
            <pre key={characterCount++} style={{ color: textColor }}>
              {char}
            </pre>
          );
        })}
      </div>
      <div>
        <input
          type='text'
          value={typing}
          onChange={handleTyping}
          onBlur={(evt) => evt.target.focus()}
          autoComplete='off'
          spellCheck='false'
          autoFocus='on'
        />
      </div>
    </>
  );
};

export default TypeBox;
