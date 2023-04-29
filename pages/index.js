
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Sidebar from '@/Components/Sidebar'
import Center from '@/Components/Center'
import { getSession } from 'next-auth/react'
import Player from '@/Components/Player'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>Beat.com</title>
      </Head>


      <main className='flex'>
        {/* Sidebar */}
        <Sidebar />

        {/* Center Content */}
        <Center />
      </main>

      <div className='sticky bottom-0'>
        {/* playerBar */}
        <Player />
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
