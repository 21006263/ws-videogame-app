import { React } from 'react';

import style from'./Loader.module.css';



const Loader = () => {
    return(
       
        <div className={style.loader}>
           <h1>LOADING</h1>
           <img src='/lo.gif' alt='ddd' width="112" height="112"/>
     {/* <img src="https://s2.svgbox.net/loaders.svg?ic=spinning-circles&color=000000" width="32" height="32" alt='GG'/>  */}
       {/* <img src="https://s2.svgbox.net/loaders.svg?ic=audio&color=000000" width="32" height="32" alt='f'/> */}
           {/* <img src="https://s2.svgbox.net/loaders.svg?ic=bars&color=000000" width="64" height="64" alt='J'/> */}
           {/* <img src='/loadin.gif' alt=''/> */}
           {/* <img src='/loading-36.gif' alt='ddd' width="132" height="132"/> */}
         
        </div>
       





    )        
}

export default Loader;