import { Toaster } from 'sonner';
import './App.css'
import Router from './router';

function App() {
return (
<>
<Router/>
<Toaster richColors={true} position='top-right'/>
</>
)
}

export default App
