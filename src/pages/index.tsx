import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/HomePage.module.css'
import { GetServerSideProps } from 'next'
import { GetCharacterResults, Character, Info } from 'types'
import imageLoader from 'imageLoader'
import Link from 'next/link'
import HeadElement from '@/components/HeadElement'

const inter = Inter({ subsets: ['latin'] })

function HomePage() {

  return (
    <div className={styles.main}>
      <div className={styles.titleDiv}>
        <h1 className={styles.title}>Welcome!</h1>
      </div>


      <div className={''}>
        <HeadElement />

        <button className={`btn btn-primary ${styles.confettiButton}`}>
          <a className={styles.pageLinks} href = {'/pages/1'}>Go to Rick and Morty API</a>
          
        </button>
        <button className={`btn btn-primary ${styles.confettiButton}`}>
        <a className={styles.pageLinks} href= {'/celebration'}>Confetti!!!</a>
        </button>

      </div>
    </div>
  )
}


export default HomePage;