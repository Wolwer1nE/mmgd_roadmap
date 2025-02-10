import './App.css'
import ProgressCard from "./components/ProgressCard.jsx";
import data from './data.json'
function App() {


  return (
      <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center p-4 pt-6 gap-4">
          {data.map(lab=>(
              <ProgressCard
                  name={lab.name}
                  backgroundImage={lab.image}
                  url={lab.url}
                  completedSections={lab.sections}
                  points={lab.points}
                  isBlocked={lab.locked}
                  key={lab.id}
              />
          ))}
    </div>
  )
}

export default App
