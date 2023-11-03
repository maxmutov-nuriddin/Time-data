import { useEffect, useState } from "react";
import Card from "../components/Card";

const GlobalPage = () => {
  const [inputData, setInputData] = useState('');
  const [timeDate, setTimeDate] = useState('');
  const [id, setId] = useState('');
  const [text, setText] = useState([]);
  const colonIndex = inputData.indexOf(':');
  const dataClonId = inputData.indexOf('.');

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

      if (inputData.indexOf(':') !== -1) {
        delete words[(words.indexOf(inputData.substring(colonIndex - 2, colonIndex + 3)))]
      }
      let newDate = '';

      if (inputData.indexOf('.') !== -1) {
        newDate = words[(words.indexOf(inputData.substring(dataClonId - 2, dataClonId + 8)))]
      }

      let inputNewData = words.join(' ');
      let newTime = '';
      if (dayValue !== 'ertaga' && dayValue !== 'bugun' && !inputNewData.includes('.')) {
        dayValue = 'bugun';
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setHours(now.getHours() + 1);
        // newTime = '9:00';
        newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (dayValue !== 'ertaga' && dayValue === 'bugun' && !inputNewData.includes('.')) {
        dayValue = 'bugun';
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setHours(now.getHours() + 1);
        newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        console.log(newTime);
      } else if (dayValue !== 'bugun' && colonIndex === -1 || dayValue !== 'ertaga') {
        newTime = '9:00';
      } else {
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setHours(now.getHours() + 1);
        newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      if (colonIndex !== -1) {
        setId(inputData.substring(dataClonId - 2, dataClonId + 8));
        newTime = ''
      }
      if (colonIndex !== -1 || dataClonId !== -1) {
        setId(inputData.substring(dataClonId - 2, dataClonId + 8));
      }
      if (inputData.indexOf(':') !== -1) {
        newTime = inputData.substring(colonIndex - 2, colonIndex + 3)
      }
      if (inputData.indexOf('.') !== -1) {
        inputNewData = inputNewData.substring(0, inputNewData.indexOf(newDate)).trim()
        newDate = inputData.substring(dataClonId - 2, dataClonId + 8)
      }

      setText([...text, { day: dayValue, data: inputNewData, date: newDate, time: newTime }]);
      setInputData('');

    }
  };

  text.sort((a, b) => {
    const nameA = a.time;
    const nameB = b.time;

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

    return 0;
  });



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
        <div className="card-box" >
          <h2 className="card-box-title">Bugun</h2>
          {text.map((item, index) => {
            if (item.day === 'bugun' || item.data.includes('bugun') && !item.date.includes(id)) {
              return <>
                <Card item={item} index={index} key={index} />
              </>
            }
            return null;
          })}
          <h2 className="card-box-title">Ertaga</h2>
          {text.map((item, index) => {
            if (item.day === 'ertaga' || item.data.includes('ertaga') && !item.date.includes(id)) {
              return <>
                <Card item={item} index={index} key={index} />
              </>
            }
            return null;
          })}
          <h2 className="card-box-title">Keyn</h2>
          {text.map((item, index) => {
            if (item.date.includes('.') && !item.data.includes('bugun') && !item.day.includes('bugun') && !item.data.includes('ertaga') && !item.day.includes('ertaga')) {
              return <>
                <Card item={item} index={index} key={index} />
              </>
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