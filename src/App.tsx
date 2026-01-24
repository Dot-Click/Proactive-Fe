import { Toaster } from 'sonner';
import './App.css'
import Router from './router';
import { useSupabaseAuth } from './hooks/useSupabaseAuth';

function App() {
    useSupabaseAuth();
return (
<>
<Router/>
<Toaster richColors={true} position='top-right'/>
</>
)
}

export default App
