//components
import Header from './components/Header';
import Route from './components/Route';
//pages
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import RND from './components/pages/RND';
function App() {
    return (
        <div className='app'>
            <Header />
            <Route path='/'>
                <Home />
            </Route>
            <Route path='/products'>
                <Products />
            </Route>
            <Route path='/researchanddevelopment'>
                <RND />
            </Route>
        </div>
    )
}

export default App;