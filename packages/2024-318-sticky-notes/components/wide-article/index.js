import styled from 'styled-components'
import DraftRenderBlock from '~/components/wide-article/shared/draft-renderer-block'
import { MirrorMedia } from '@mirrormedia/lilith-draft-renderer'
const { getContentBlocksH2H3 } = MirrorMedia

import Header from './header'
import DonateLink from '~/components/wide-article/shared/donate-link'
import SubscribeLink from '~/components/wide-article/shared/subscribe-link'
import HeroImageAndVideo from '~/components/wide-article/shared/hero-image-and-video'
import Credits from '~/components/wide-article/shared/credits'
import SupportMirrorMediaBanner from '~/components/wide-article/shared/support-mirrormedia-banner'
import NavSubtitleNavigator from '~/components/wide-article/shared/nav-subtitle-navigator'
import MoreInfoAndTag from '~/components/wide-article/shared/more-info-and-tag'
import Date from '~/components/wide-article/shared/date'
import ButtonCopyLink from '~/components/wide-article/shared/button-copy-link'
import ButtonSocialNetworkShare from '~/components/wide-article/shared/button-social-network-share'
import Aside from '~/components/wide-article/shared/aside'
import ArticleBrief from '~/components/wide-article/shared/brief'
import { defaultPingFangFontFamily } from '~/styles/shared-style/index'
import { onGA4Event } from '~/utils/wide-article'

/**
 * @typedef {import('~/type/wide-article/post').Post} PostData
 */

/**
 * @typedef {Object} PostContent
 * @property {'fullContent' | 'trimmedContent'} type
 * @property {Pick<PostData,'content'>['content']} data
 * @property {boolean} isLoaded
 */

/**
 * @typedef {import('~/type/theme').Theme} Theme
 */
const Main = styled.main`
  margin: auto;
  width: 100%;
`

const DateWrapper = styled.div`
  margin-top: 16px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 20px;
  }
`
const StyledDate = styled(Date)`
  margin: 8px auto 0;

  ${({ theme }) => theme.breakpoint.md} {
    margin: 0 auto;
  }
`
const ContentWrapper = styled.section`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 0 20px 20px;
  border: none;
  position: relative;
  .content {
    width: 100%;
    margin: 20px auto 0;
  }

  ${({ theme }) => theme.breakpoint.md} {
    border-bottom: 1px white solid;
    .content {
      margin: 40px auto 0;
    }
  }
`

const SocialMediaAndDonateLink = styled.ul`
  margin-bottom: 20px;
`

const SocialMedia = styled.li`
  display: none;
  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    margin-bottom: 12px;
    a {
      margin-right: 10px;
    }
  }
`
const StyledCredits = styled(Credits)`
  margin-left: auto;
  margin-right: auto;
`

const DonateSubscribeWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 20px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 12px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin-top: 24px;
  }

  .subscribe-btn {
    margin-left: 8px;
  }
`

const BriefWrapper = styled.div`
  margin: 32px 0;
`

const DraftWrapper = styled.div`
  *,
  *::before,
  *::after {
    color: white;
    ${defaultPingFangFontFamily};
  }
`

/**
 *
 * @param {Object} param
 * @param {PostData} param.postData
 * @param {PostContent} param.postContent
 * @returns {JSX.Element}
 */
export default function StoryWideStyle({ postData, postContent }) {
  const {
    title = '',
    subtitle = '',
    heroImage = null,
    heroVideo = null,
    heroCaption = '',
    updatedAt = '',
    publishedDate = '',
    writers = [],
    writersInInputOrder = [],
    photographers = [],
    camera_man = [],
    designers = [],
    engineers = [],
    vocals = [],
    extend_byline = '',
    relateds = [],
    relatedsInInputOrder = [],
    brief = null,
    tags = [],
  } = postData

  const relatedsWithOrdered =
    relatedsInInputOrder && relatedsInInputOrder.length
      ? relatedsInInputOrder
      : relateds

  const writersWithOrdered =
    writersInInputOrder && writersInInputOrder.length
      ? writersInInputOrder
      : writers

  const credits = [
    { writers: writersWithOrdered },
    { photographers: photographers },
    { camera_man: camera_man },
    { designers: designers },
    { engineers: engineers },
    { vocals: vocals },
    { extend_byline: extend_byline },
  ]

  const h2AndH3Block = getContentBlocksH2H3(postContent.data)

  return (
    <>
      <Header h2AndH3Block={h2AndH3Block} />
      <Main>
        <article>
          <HeroImageAndVideo
            heroImage={heroImage}
            heroVideo={heroVideo}
            heroCaption={heroCaption}
            title={title}
            subtitle={subtitle}
          />
          <ContentWrapper>
            <NavSubtitleNavigator h2AndH3Block={h2AndH3Block}>
              <SocialMediaAndDonateLink>
                <SocialMedia>
                  <ButtonSocialNetworkShare
                    type="facebook"
                    width={28}
                    height={28}
                  />
                  <ButtonSocialNetworkShare
                    type="line"
                    width={28}
                    height={28}
                  />
                  <ButtonCopyLink width={28} height={28} />
                </SocialMedia>
              </SocialMediaAndDonateLink>
            </NavSubtitleNavigator>
            <StyledCredits credits={credits} />
            <DateWrapper>
              <StyledDate timeData={publishedDate} timeType="publishedDate" />
              <StyledDate timeData={updatedAt} timeType="updatedDate" />
            </DateWrapper>

            <DonateSubscribeWrapper>
              <DonateLink
                onClick={() => onGA4Event('click', '贊助本文- top-318_10th')}
              />
              <SubscribeLink
                className="subscribe-btn"
                onClick={() =>
                  onGA4Event('click', '加入訂閱會員- top-318_10th')
                }
              />
            </DonateSubscribeWrapper>

            <section className="content">
              <BriefWrapper>
                <ArticleBrief brief={brief} contentLayout="wide" />
              </BriefWrapper>

              <DraftWrapper>
                <DraftRenderBlock
                  rawContentBlock={postContent.data}
                  contentLayout="wide"
                />
              </DraftWrapper>
            </section>
            <MoreInfoAndTag tags={tags} />
            <SupportMirrorMediaBanner />
          </ContentWrapper>

          <Aside relateds={relatedsWithOrdered} />
        </article>
      </Main>
    </>
  )
}
