import { FaGithub } from 'react-icons/fa';
import styles from './MainNav.module.css'
const MainNav = () => {
    return (
        <header className={styles.container}>
         <div className={styles.header}>
             <a href="/"><h2 >Video-Player</h2></a>
         </div>
           <a target ="_blank" href="https://github.com/Jakub-Chojnacki/digimonkeys"><FaGithub className={styles.github}/></a>
        </header>
    )
}

export default MainNav;