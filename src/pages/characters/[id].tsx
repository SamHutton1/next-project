import { Character, GetCharacterResults } from "types";
import Image from "next/image";
import imageLoader from "imageLoader";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { ReactNode } from "react";


function CharacterPage({ character }: { character: Character }) {
  const router = useRouter()

  console.log(router.query)
  return (
    <div>
      <h1>{character.name}</h1>

      <p>Date Created: {character.created.toString().substring(0, 10)}</p>
      <p>Location: {character.location.name}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Status: {character.status}</p>

      <Image
        loader={imageLoader}
        unoptimized
        src={character.image}
        alt={character.name}
        width="200"
        height="200"
      />
    </div>
  );
}

CharacterPage.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  console.log(context.query)

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${context.query.id}`
  );
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
}

export default CharacterPage;