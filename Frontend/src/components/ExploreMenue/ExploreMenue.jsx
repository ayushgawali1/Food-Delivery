import './ExploreMenue.css'
import {menu_list} from '../../assets/assets'

export default function ExploreMenue({category,setCategory}){
    return(
        <div className='explore-menu' id="explore-menu">
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptas, aperiam possimus recusandae, distinctio quisquam iusto libero dolore similique molestiae pariatur vitae, voluptatem voluptates exercitationem unde officia dolor fugiat maiores.</p>
            <div className="explore-menu-list">
                {menu_list.map(({menu_name,menu_image},index) => 
                    (
                        <div onClick={() => setCategory((prev) => (prev===menu_name?"All":menu_name))} key={index} className="explore-menu-list-item">
                            <img className={category===menu_name?'active':''} src={menu_image}  alt=''/>
                            <p>{menu_name}</p>
                        </div>
                    )
                )}
            </div>
            <hr />
        </div>
    )
}