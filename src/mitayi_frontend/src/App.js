import React from 'react';
import Landing from './Landmain/Carousel/Landing';
import SlidePuzzle from './slidingpuzzle/SlidePuzzle';
// import Navbar from './navbar/Navbar';
import { Routes ,Route } from 'react-router-dom';
import SudokuSolver from './sudoku/SudokuSolver';
import TicTac from './TicTac/TicTac';
import Ben from './slidingpuzzle/Ben';
import Tomandjerry from './slidingpuzzle/Tomandjerry';
import Doremon from './slidingpuzzle/Doremon';
import MatchCard from './MatchCard/MatchCard';
import Landpage from './Landmain/Landpage'
import DiceGame from './DiceGame/DiceGame';

import Toh from './Toh/Toh';



function App() {
  return (
    <div className="App">
      
<Routes>
<Route path='/land' element={<Landing />}/>
<Route path='/' element={<Landpage/>}/>

<Route path='/sliding-puzzle/doremon' element={<Doremon/>}/>
<Route path='/sliding-puzzle/ben' element={<Ben />}/>
<Route path='/sliding-puzzle/tomandjerry' element={<Tomandjerry />}/>
<Route path='/sliding-puzzle' element={<SlidePuzzle />}/>
<Route path='/sudoku-solver' element={<SudokuSolver />}/>
<Route path='/TicTac' element={<TicTac />}/>
<Route path='/MatchCard' element={<MatchCard />}/>

<Route path='/DiceGame' element={<DiceGame/>}/>

<Route path='/Toh' element={<Toh />}/>

</Routes>
      
    </div>
  );
}

export default App;
