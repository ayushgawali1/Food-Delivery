import Header from '../../components/Header/Header';
import './Home.css';
import ExploreMenue from '../../components/ExploreMenue/ExploreMenue';
import { useState } from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

export default function Home(){

    const [category,setCategory] = useState("All");

    return(
        <div>
            <Header />
            <ExploreMenue category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <AppDownload/>
        </div>
    )
}