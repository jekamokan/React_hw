import React, { useState, useRef, useEffect } from 'react';
import './style.css'

const Body = ({ lettersArr }) => {
  const FONT_SIZE = '30px';
  const STEP = 20;
  let currentValue = 0;

  const [inputValue, setInputValue] = useState('');
  console.log(setInputValue)
  const progressValue = useRef(null);
  const hiddenBg = useRef(null);

  useEffect(() => {
    // Присваиваем рефам ссылки на соответствующие элементы DOM после монтирования компонента
    progressValue.current = document.querySelector('.progress__bar-value');
    hiddenBg.current = document.querySelector('.hidden__bg');
  }, []);


  function* changeProgressBar() {
    while (true) {
      currentValue += STEP;
      progressValue.current.textContent = `${currentValue}%`;
      hiddenBg.current.style.width = `${currentValue}%`;

      if (currentValue >= 100) {
        setTimeout(() => alert('Вы проиграли'), 1000)
      }
      yield;
    }
  }

  const forChangeProgressBar = changeProgressBar()



  const letterElements = lettersArr.map((el, index) => <p key={index}>{el}</p>);
  const wrapperRef = useRef();


  const getClick = () => {

    // setShouldAdvanceProgressBar(true) ; // Верните флаг в исходное состояние
    let shouldAdvanceProgressBar = true;
    lettersArr.forEach((el, index) => {
      if (el === inputValue) {
        // Получаем элемент <p> по индексу и изменяем его стиль
        const paragraph = wrapperRef.current.children[index];
        paragraph.style.fontSize = FONT_SIZE;
        // setShouldAdvanceProgressBar(false); // Смените значение флага
        shouldAdvanceProgressBar = false;
      }
    })
    if (shouldAdvanceProgressBar) {
      forChangeProgressBar.next()
    }
    const includesFontSize = Array.from(wrapperRef.current.children).every((paragraph) => {
      const computedStyle = window.getComputedStyle(paragraph);
      console.log(computedStyle)
      return computedStyle.getPropertyValue('font-size') === FONT_SIZE;
    });
    if (includesFontSize) {
      setTimeout(() => alert('Вы выиграли'), 1000)
    }

  }

  const handleInputChange = (event) => setInputValue(event.target.value); // позволяет отслеживать и обновлять введенное пользователем значение в компоненте React.

  return (
    <div className='footer'>
      <p className="footer__title">"Это бесстрашное млекопитающее которое не умирает даже от укуса кобры"</p>
      <div className="footer__wrapper" ref={wrapperRef}> {letterElements} </div>
      <div className='footer__value'>
        <p>Введите букву </p>
        <input className="footer__value-input"
          type="text"
          placeholder="... да да сюда"
          value={inputValue} // Устанавливаем значение из состояния
          onChange={handleInputChange} // Обработчик изменения значения
        />
      </div>
      <button className="footer__btn" onClick={getClick}>button</button>
    </div>
  )
}

export default Body


