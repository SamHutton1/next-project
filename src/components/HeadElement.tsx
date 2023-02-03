import Head from "next/head";
import Link from "next/link";
import React from "react";

function HeadElement() {
  return (
    <Head>
      <title>Sam Hutton</title>
      <meta name="description" content="A website for really cool people" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default HeadElement;