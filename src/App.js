import './App.css';
import Body from './components/Body';
import Header from './components/Header';




const WORD ='медоед';
const lettersArr = WORD.split('');


const App = () => {

  return (
    <div className="App">
        <Header/>
        <Body lettersArr={lettersArr} />
    </div>
  );
}

export default App;
