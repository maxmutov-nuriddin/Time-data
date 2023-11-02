import { useEffect, useState } from "react";

const GlobalPage = () => {
  const [inputData, setInputData] = useState('');
  const [timeDate, setTimeDate] = useState('');
  const [text, setText] = useState([]);
  const colonIndex = inputData.indexOf(':');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInputData = inputData.trim();
    if (newInputData !== '') {
      const words = newInputData.split(' ');
      let dayValue = ''
      if (words.includes('bugun')) {
        dayValue = words[(words.indexOf('bugun'))].toLowerCase();
        delete words[(words.indexOf('bugun'))]
      } else if (words.includes('ertaga')) {
        dayValue = words[(words.indexOf('ertaga'))].toLowerCase();
        delete words[(words.indexOf('ertaga'))]
      }
      const inputNewData = words.join(' ');
      let newTime = '';
      if (colonIndex !== -1) {
        newTime = inputData.substring(colonIndex - 2, colonIndex + 3);
        console.log(newTime);
        newTime = '';
      } else if (dayValue === 'ertaga') {
        newTime = '9:00'
      } else if (dayValue !== 'ertaga' && dayValue !== 'bugun') {
        newTime = '9:00'
      } else {
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setHours(now.getHours() + 1);
        newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      setText([...text, { day: dayValue, data: inputNewData, time: newTime }]);
      setInputData('');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDate(new Date().toISOString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <div className="card-container">
        <div className="card-box">
          <h2 className="card-box-title">Bugun</h2>
          {text.map((item, index) => {
            if (item.day === 'bugun' || item.data.includes('bugun')) {
              return <>
                <input type="checkbox" />
                <p key={index}>{item.data} {item.time}</p></>
            }
            return null;
          })}
          <h2 className="card-box-title">Ertaga</h2>
          {text.map((item, index) => {
            if (item.day === 'ertaga' || item.data.includes('ertaga')) {
              return <>
                <input type="checkbox" />
                <p key={index}>{item.data} {item.time}</p></>
            }
            return null;
          })}
          <h2 className="card-box-title">Keyn</h2>
          {text.map((item, index) => {
            console.log(item);
            if (!item.data.includes('bugun') && !item.data.includes('ertaga')) {
              return <>
                <input type="checkbox" />
                <p key={index}>{item.data} {item.time}</p></>
            }
            return null;
          })}
        </div>
        <div className="skills">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="data"
              className="skills__input"
              placeholder="Yangi vazifa qo'shish"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button className="skills__button" type="submit">add</button>
          </form>
          <span className="skills__time">
            {timeDate
              ? `Bugun: ${timeDate.split('T')[0]}, ${timeDate.split('T')[1].split('.')[0]}`
              : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GlobalPage;