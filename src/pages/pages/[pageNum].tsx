import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage, GetServerSideProps } from 'next'
import { GetCharacterResults, Character, Info } from 'types'
import imageLoader from 'imageLoader'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeadElement from '@/components/HeadElement'

const inter = Inter({ subsets: ['latin'] })

function PageList({ characters, currentPage, info }: { characters: Character[], currentPage: string, info: Info }) {
    const router = useRouter()
    return (
        <div className={`${styles.main}`}>
            <HeadElement/>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
                {characters.map((character) => {
                    return <div className='col' key={character.id}>
                        <div className={styles.padCards}>
                            {renderCard(character)}
                        </div>
                    </div>
                })}

            </div>

            {renderPaginationBar(parseInt(currentPage), 1, info.pages)}

        </div>
    )
}

const renderPaginationBar = (currentPage: number, minPage: number, maxPage: number) => {
    //renders pagination bar with 5 buttons:
    //prev, current -1, current, current + 1, next
    return (
        <nav aria-label="Page navigation">
            <ul className={`pagination ${styles.bottomButtons}`}>
                <li className={`page-item  ${currentPage - 1 < minPage ? "disabled" : ""}`}>
                    <Link className='page-link' href={`/pages/${minPage}`}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only"></span>
                    </Link>
                </li>
                <li className={`page-item  ${currentPage - 1 < minPage ? "disabled" : ""}`}>
                    <Link className='page-link' href={`/pages/${handlePrevious(currentPage, minPage)}`}>
                        Prev
                    </Link>
                </li>
                <li className={`page-item  ${currentPage - 1 < minPage ? "disabled" : ""}`}>
                    <Link className='page-link' href={`/pages/${handlePrevious(currentPage, minPage)}`} >
                        {currentPage - 1 < minPage ? "-" : currentPage - 1}
                    </Link>
                </li>
                <li className="page-item">
                    <Link className='page-link' href={`/pages/${currentPage}`} >
                        <u>{currentPage}</u>
                    </Link>
                </li>
                <li className={`page-item  ${currentPage + 1 > maxPage ? "disabled" : ""}`}>
                    <Link className='page-link ' href={`/pages/${handleNext(currentPage, maxPage)}`} >
                        {currentPage + 1 > maxPage ? "-" : currentPage + 1}
                    </Link>
                </li>
                <li className={`page-item  ${currentPage + 1 > maxPage ? "disabled" : ""}`}>
                    <Link className='page-link' href={`/pages/${handleNext(currentPage, maxPage)}`} >
                        Next
                    </Link>
                </li>
                <li className={`page-item  ${currentPage + 1 > maxPage ? "disabled" : ""}`}>
                    <Link className='page-link' href={`/pages/${maxPage}`} >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only"></span>
                    </Link>
                </li>
            </ul>
        </nav>
    )

}

const handleNext = (currentPage: number, maxPage: number) => {
    let nextPage = currentPage + 1;

    if (nextPage < maxPage) {
        return nextPage;
    }
    else {
        return maxPage;
    }
}

const handlePrevious = (currentPage: number, minPage: number) => {
    let nextPage = currentPage - 1;

    if (nextPage > minPage) {
        return nextPage;
    }
    else {
        return minPage;
    }
}

const renderCard = (character: Character) => {
    return (
        <div className="card" style={{ width: "15rem" }}>
            <div>
                <img
                    className="card-img-top"
                    src={character.image}
                    alt={character.name} />
            </div>
            <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">{`${character.name} was first seen in episode ${getEpisode(character.episode[0])}${getOrigin(character.origin.name, character.name)}`}.</p>
                <a href={`/characters/${character.id}`} className="btn btn-primary">Character Page</a>
            </div>
        </div>
    )
}

const getEpisode = (episodeUrl: string): string => {
    const getNumberEndOfStringRegex: RegExp = new RegExp('\\d+$');

    let firstEpisode = episodeUrl.match(getNumberEndOfStringRegex);

    return firstEpisode ? firstEpisode[0] : "";
}

const getOrigin = (originPlanet: string, characterName: string): string => {
    if (originPlanet == "unknown") {
        return `, but it is currently unkown where they originated from`
    }
    else {
        return ` and originates from ${originPlanet}`;
    }
}



export const getServerSideProps: GetServerSideProps = async (context) => {


    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${context.query.pageNum}`)

    const { results, info }: GetCharacterResults = await res.json();
    let pageNum = context.query.pageNum as string;

    return {
        props: {
            characters: results,
            currentPage: pageNum,
            info: info
        }
    }
}


export default PageList;