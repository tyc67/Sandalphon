import Head from 'next/head'

const CustomHead = ({ data }) => {
  return (
    <Head>
      <meta name="application-name" content={data?.og_title ?? ''} />
      <title key="title">{data?.og_title ?? ''} </title>
      <meta
        key="description"
        name="description"
        content={data?.og_description ?? ''}
      />

      <meta property="og:title" content={data?.og_title ?? ''} />
      <meta property="og:description" content={data?.og_description ?? ''} />

      <meta
        property="og:image"
        content={data?.og_image?.image?.url ?? '/og.jpg'}
      />

      <meta property="og:image:secure_url" content={'/og.jpg'} />
      <meta
        property="og:image:type"
        content={data?.og_image?.image?.filetype ?? 'image/jpeg'}
      />
      <meta
        property="og:url"
        content={
          `https://www.mirrormedia.mg/projects/${data?.slug}` ??
          'https://www.mirrormedia.mg/projects/birdbating'
        }
      />

      <meta
        name="twitter:image"
        content={data?.og_image?.image?.url ?? '/og.jpg'}
        key="twitter:image"
      />

      <meta
        name="twitter:url"
        content={
          `https://www.mirrormedia.mg/projects/${data?.slug}` ??
          'https://www.mirrormedia.mg/projects/birdbating'
        }
        key="twitter:url"
      />
      <meta
        name="twitter:title"
        content={data?.og_title ?? ''}
        key="twitter:title"
      />
      <meta
        name="twitter:description"
        content={data?.og_description ?? ''}
        key="twitter:description"
      />
      <meta charSet="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.ico" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

      <meta property="og:locale" content="zh_TW" key="og:locale" />
      <meta property="og:type" content="website" key="og:type" />
      <meta
        property="og:site_name"
        content="mirrormedia.mg"
        key="og:site_name"
      />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
    </Head>
  )
}

export default CustomHead
