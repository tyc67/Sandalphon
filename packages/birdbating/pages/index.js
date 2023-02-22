import DefaultLayout from '~/components/layout/layout'
import Main from '~/components/main'
import HeroVideo from '~/components/hero-video'
import CustomHead from '~/components/custom-head'

export default function Home({ data }) {
  return (
    <>
      <CustomHead data={data} />
      <DefaultLayout>
        <HeroVideo />
        <Main data={data} />
      </DefaultLayout>
    </>
  )
}

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'no-cache')

  let data = []

  try {
    const res = await fetch(
      'https://statics.mirrormedia.mg/json/dev_post_birdbating.json?xyz=11'
    )
    const posts = await res.json()
    data = posts._items[0]
  } catch (error) {
    console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
  }

  return {
    props: {
      data: data || [],
    },
  }
}
