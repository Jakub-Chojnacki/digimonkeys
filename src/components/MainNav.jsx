import { FaGithub } from 'react-icons/fa';
import styles from './MainNav.module.css'
import {motion} from 'framer-motion'

const logoVariants = {
    start: {y: '-100vh', type:'spring', stiffness: '100'},
    end: {y:0,
    transition:{duration:0.5}}
    
}
const MainNav = () => {
    return (
        <header className={styles.container}>
         <div className={styles.header}>
             <a href="/"><motion.h2 variants={logoVariants} initial='start' animate='end'>Video-Player</motion.h2></a>
         </div>
           <motion.a whileHover={{ rotate: 180, scale:1.1}}  variants={logoVariants} initial='start' animate='end' target ="_blank" href="https://github.com/Jakub-Chojnacki/digimonkeys"><FaGithub className={styles.github}/></motion.a>
        </header>
    )
}

export default MainNav;