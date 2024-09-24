import NextLink from 'next/link'

export default function Home() {
  return (
    <main className="">
      測試 test
      <NextLink
        href={{
          pathname: '/course/1',
        }}
      >
        第一筆
      </NextLink>
      <NextLink
        href={{
          pathname: '/course/2',
        }}
      >
        第二筆
      </NextLink>
    </main>
  )
}
