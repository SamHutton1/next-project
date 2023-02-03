import { Character, GetCharacterResults } from "types";
import Image from "next/image";
import imageLoader from "imageLoader";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/HeadElement";
import { ReactNode } from "react";
import Link from "next/link";
import HeadElement from "../../components/HeadElement";


function CharacterPage({ character }: { character: Character }) {
  const router = useRouter()

  return (
    <div>
      <HeadElement/>
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


export const getServerSideProps: GetServerSideProps = async (context) => {


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