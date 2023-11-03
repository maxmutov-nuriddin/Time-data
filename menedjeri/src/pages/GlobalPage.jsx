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

      const inputNewData = words.join(' ');
      let newTime = '';
      if (dayValue !== 'ertaga' && dayValue !== 'bugun' && !inputNewData.includes('.')) {
        dayValue = 'bugun';
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setHours(now.getHours() + 1);
        // newTime = '9:00';
        newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (dayValue !== 'ertaga' && dayValue === 'bugun' && inputNewData.includes('.')) {
        dayValue = 'bugun';
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setHours(now.getHours() + 1);
        newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        <div className="card-box" >
          <h2 className="card-box-title">Bugun</h2>
          {text.map((item, index) => {
            if (item.day === 'bugun' || item.data.includes('bugun') && !item.data.includes(id)) {
              return <>
                <Card item={item} index={index} key={index} />
              </>
            }
            return null;
          })}
          <h2 className="card-box-title">Ertaga</h2>
          {text.map((item, index) => {
            if (item.day === 'ertaga' || item.data.includes('ertaga') && !item.data.includes(id)) {
              return <>
                <Card item={item} index={index} key={index} />
              </>
            }
            return null;
          })}
          <h2 className="card-box-title">Keyn</h2>
          {text.map((item, index) => {
            if (item.data.includes('.') && !item.data.includes('bugun') && !item.day.includes('bugun') && !item.data.includes('ertaga') && !item.day.includes('ertaga')) {
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


// import React, { useEffect, useState } from "react";

// const GlobalPage = () => {
//   const [inputData, setInputData] = useState('');
//   const [timeDate, setTimeDate] = useState('');
//   const [text, setText] = useState([]);
//   const colonIndex = inputData.indexOf(':');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newInputData = inputData.trim();
//     if (newInputData !== '') {
//       const words = newInputData.split(' ');
//       let dayValue = '';
//       if (words.includes('bugun')) {
//         dayValue = words[(words.indexOf('bugun'))].toLowerCase();
//         words.splice(words.indexOf('bugun'), 1);
//       } else if (words.includes('ertaga')) {
//         dayValue = words[(words.indexOf('ertaga'))].toLowerCase();
//         words.splice(words.indexOf('ertaga'), 1);
//       }
//       const inputNewData = words.join(' ');
//       let newTime = '';
//       let newDate = '';
//       if (colonIndex !== -1) {
//         newTime = inputData.substring(colonIndex - 2, colonIndex + 3);
//         const dataClonId = inputData.indexOf('.');
//         if (dataClonId !== -1) {
//           console.log(dataClonId);
//           newDate = inputData.substring(dataClonId - 2, dataClonId + 8);
//         }
//       } else if (dayValue === 'ertaga') {
//         newTime = '9:00';
//       } else if (dayValue !== 'ertaga' && dayValue !== 'bugun') {
//         newTime = '9:00';
//       } else {
//         const now = new Date();
//         now.setMinutes(0);
//         now.setSeconds(0);
//         now.setHours(now.getHours() + 1);
//         newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       }
//       setText([...text, { day: dayValue, data: inputNewData, date: newDate, time: newTime }]);
//       setInputData('');
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeDate(new Date().toISOString());
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className="container">
//       <div className="card-container">
//         <div className="card-box">
//           <h2 className="card-box-title">Bugun</h2>
//           {text.map((item, index) => {
//             if (item.day === 'bugun' || (item.data.includes('bugun') && !item.data.includes(item.date))) {
//               return (
//                 <React.Fragment key={index}>
//                   <input type="checkbox" />
//                   <p>{item.data} {item.time}</p>
//                 </React.Fragment>
//               );
//             }
//             return null;
//           })}
//           <h2 className="card-box-title">Ertaga</h2>
//           {text.map((item, index) => {
//             if (item.day === 'ertaga' || (item.data.includes('ertaga') && !item.data.includes(item.date))) {
//               return (
//                 <React.Fragment key={index}>
//                   <input type="checkbox" />
//                   <p>{item.data} {item.time}</p>
//                 </React.Fragment>
//               );
//             }
//             return null;
//           })}
//           <h2 className="card-box-title">Keyn</h2>
//           {text.map((item, index) => {
//             console.log(item);
//             if (
//               !item.data.includes('bugun') &&
//               !item.day.includes('bugun') &&
//               !item.data.includes('ertaga') &&
//               !item.day.includes('ertaga') &&
//               item.data.includes(item.date)
//             ) {
//               return (
//                 <React.Fragment key={index}>
//                   <input type="checkbox" />
//                   <p>{item.data} {item.time}</p>
//                 </React.Fragment>
//               );
//             }
//             return null;
//           })}
//         </div>
//         <div className="skills">
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="data"
//               className="skills__input"
//               placeholder="Yangi vazifa qo'shish"
//               value={inputData}
//               onChange={(e) => setInputData(e.target.value)}
//             />
//             <button className="skills__button" type="submit">add</button>
//           </form>
//           <span className="skills__time">
//             {timeDate
//               ? `Bugun: ${timeDate.split('T')[0]}, ${timeDate.split('T')[1].split('.')[0]}`
//               : ''}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GlobalPage;