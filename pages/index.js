
import styles from '../styles/Home.module.css'
import { Header } from '../components/Header'
import List from '../components/List'

export default function Home() {
  return (
    <div className={styles.container}>
        <div>
            <List />
        </div>
    </div>
  )
}


