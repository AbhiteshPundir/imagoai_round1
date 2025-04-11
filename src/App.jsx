// import { useEffect, useState } from 'react'
// import axios from "axios"
// import Select from 'react-select';

// function App() {
//   const [list, setList] = useState([]);
//   const [search,setSearch] = useState('');
//   const [newList,setNewList] = useState(list);

//   const handleInput=(e)=>{
//     setSearch(e.target.value)
//   }

//   useEffect(() => {
//     axios.get("https://api.first.org/data/v1/countries")
//       .then((response) => {
//         const countryNames = Object.values(response.data.data).map(item => item.country);
//         setList(countryNames);
//         setNewList(countryNames);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   //This is the part I was getting wrong, i was not using a state for the recieved data, and chained it more than required times

//   useEffect(()=>{
//     setNewList(list.filter((listItem)=>{
//       return listItem.toLowerCase().includes(search.toLowerCase())
//     }))
//   }, [search])

  
//   return (
//     <>
//       <div>
//         <input
//           list="countries"
//           value={search}
//           onChange={handleInput}
//           placeholder="Search countries"
//         />
//         <datalist id="countries">
//           {newList.map((country, index) => (
//             <option key={index} value={country} />
//           ))}
//         </datalist>
//       </div>
//     </>
//   )
// }

// export default App
import { useEffect, useState } from 'react'
import axios from "axios"

function App() {
  const [lists, setLists] = useState([]);
  const [search, setSearch] = useState('');
  const [newList, setNewList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInput = (e) => {
    setSearch(e.target.value);
    setShowDropdown(true);
  }

  useEffect(() => {
    axios.get("https://api.first.org/data/v1/countries")
      .then((response) => {
        const countryNames = Object.values(response.data.data).map(item => item.country);
        setLists(countryNames);
        setNewList(countryNames);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = lists.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    setNewList(filtered);
  }, [search, lists]);

  const handleSelect = (value) => {
    setSearch(value);
    setShowDropdown(false);
  }

  return (
    <div style={{ position: 'relative', margin: '50px auto' }}>
      <input
        onChange={handleInput}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(false)}
        value={search}
        placeholder="Search"
        type="text"
        style={{width: '100%',padding: '10px',fontSize: '16px',boxSizing: 'border-box'}}
      />
      {showDropdown && newList.length > 0 && (
        <ul style={{position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          maxHeight: '200px',
          overflowY: 'auto',
          margin: 0,
          padding: 0,
          listStyle: 'none',
          zIndex: 1
        }}>
          {newList.map((item, i) => (
            <li
              key={i}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(item)}
              style={{padding: '10px',cursor: 'pointer', borderBottom: '1px solid #eee'}}>
                {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App;
