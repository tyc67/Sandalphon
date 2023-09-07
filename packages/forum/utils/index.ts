/**
 * Check if the source is from YouTube. If it is, get the YouTube ID and transform it to https://www.youtube.com/embed/${youtubeId}?enablejsapi=1 in order to put it in <iframe>.
 * If the source is not from YouTube video, return the original source URL.
 *
 * Why we need to add parameter `enablejsapi` in youtube iframe attribute `src`?
 * Because we need to track gtm event when playing youtube video, the only way to achieve this is to add param.
 * see [Youtube API](https://developers.google.com/youtube/player_parameters?hl=zh-tw#enablejsapi) to get more info.
 *
 */
function getVideoSrc(url: string) {
  const youtubePattern =
    /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]+)(?:&\S+)?$/
  const match = url.match(youtubePattern)

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1`
  }

  return url
}

export { getVideoSrc }
