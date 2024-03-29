import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { GetCharacterResults, Character, Info } from 'types'
import imageLoader from 'imageLoader'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

function PageList({ characters }: { characters: Character[] }) {

  return (
    <div className={styles.main}>
      <Head>
        <title>Sam Hutton</title>
        <meta name="description" content="A website for really cool people" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='row'>
        {characters.map((character) => {
          return <div className='col' key={character.id}>
            <Link href={`/characters/${character.id}`}>
              <h3>{character.name}</h3>

            </Link>
            <Image
              loader={imageLoader}
              unoptimized
              src={character.image}
              alt={character.name}
              width="200"
              height="200">

            </Image>
          </div>
        })}

      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {

    console.log(context.query)
  const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${1}`)

  const { results, info }: GetCharacterResults = await res.json();

  console.log(info)

  return {
    props: {
      characters: results,
    }
  }
}

export default PageList;