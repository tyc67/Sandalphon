'use client'

import ReactPlayer from 'react-player/lazy'

type Props = {
  src: string
  poster?: string
}
export default function PreviewVideo({ src, poster }: Props) {
  return (
    <div className="mx-auto w-full max-w-[960px]">
      <h2
        id="preview"
        className="mb-5 text-center text-[26px] font-bold leading-[1.8] md:mb-10"
      >
        課程預告
      </h2>
      <ReactPlayer
        className="custom-video"
        url={src}
        controls={true}
        width="100%"
        height="auto"
        config={{
          file: {
            attributes: {
              poster,
            },
          },
        }}
      />
    </div>
  )
}
