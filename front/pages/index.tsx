import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import ComponentSample, { mainStationState } from './ComponentSample'
import { CurrentImage } from "./CurrentImage";

const MapArea = () => {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("../components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return <Map />;
}

const Home: NextPage = () => {
  const [mainStation, setMainStation] = useRecoilState(mainStationState)  
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          ゴミステーションの状況
          {/* <a className="text-blue-600" href="https://nextjs.org">
            Next.js! nextだよ
          </a> */}
        </h1>

        <ComponentSample></ComponentSample>
        { mainStation == 0 ? (<CurrentImage />) : (<>画像を取得できませんでした</>)}
        
        <br></br>
        <MapArea></MapArea>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by 越前ガニ
          {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
        </a>
      </footer>
    </div>
  );
};

export default Home;
