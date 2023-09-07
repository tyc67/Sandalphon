import React, { useEffect, useMemo } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'
import { breakpoint } from '~/styles/theme'

const oddStyle = css`
  margin-left: auto;
  padding: 20px 40px 20px 0px;

  ${breakpoint.xl} {
    padding: 30px 60px 30px 0px;
  }
`
const evenStyle = css`
  margin-right: auto;
  padding: 20px 0px 20px 30px;

  ${breakpoint.xl} {
    padding: 30px 0px 30px 60px;
  }
`

const CustomMotionDiv = styled(motion.div)<CustomMotionDivProps>`
  order: ${(props) => props.order};
  width: 90%;
  font-size: 16px;
  outline: 2px solid black;

  & + div {
    margin-top: 15px;
  }

  ${breakpoint.md} {
    width: 70%;
  }

  ${breakpoint.md} {
    width: 85%;
  }
`

const RowContent = styled.div<{ isOrderOdd: boolean }>`
  line-height: 1.5;
  letter-spacing: 1.4px;
  max-width: 300px;
  ${(props) => (props.isOrderOdd ? oddStyle : evenStyle)};

  .time {
    font-weight: 700;

    & + * {
      margin-top: 10px;

      ${breakpoint.xl} {
        margin-top: 0px;
      }
    }
  }

  .topic {
    font-family: 'Noto Serif TC';

    & + * {
      margin-top: 15px;

      ${breakpoint.xl} {
        margin-top: 0px;
      }
    }
  }

  ${breakpoint.xl} {
    width: 80%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-width: none;
    gap: 40px;
  }
`

const SpeakerItem = styled.div`
  & + div {
    margin-top: 12px;
  }

  .speaker-name {
    font-family: 'Noto Serif TC';
    font-weight: 900;
    font-size: 16px;

    & + div {
      margin-top: 7px;
    }
  }
  .speaker-title {
    font-size: 14px;
  }
`

const SpeakerType = styled.div`
  color: #b3b3b3;
  margin-bottom: 5px;
`

type CustomMotionDivProps = {
  order: string
}

//FIXME: 目前 children 一定要傳，需改成不傳入也可以
export default function RowMotion({
  order,
}: CustomMotionDivProps): JSX.Element {
  const isOrderOdd = Boolean(parseInt(order) % 2 === 1)

  const controls = useAnimation()
  const [ref, inView] = useInView()

  const variants = useMemo(
    () => ({
      left: { x: -100, opacity: 0 },
      right: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.5, bounce: 0.1 } },
    }),
    []
  )

  const direction = isOrderOdd ? 'left' : 'right'

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.set(direction === 'left' ? variants.left : variants.right)
    }
  }, [controls, inView, direction, variants])

  const str = `＊主持人＊王美花：經濟部長、總統／馬英九：總統／蔡英文：前總統\n＊與會嘉賓＊王美花：經濟部長、總統／馬英九：總統／蔡英文：前總統\n＊＊趙樹海：國立臺灣海洋大學河海工程學系教授、諮詢專家／海綿寶寶：華南商業銀行 企業金融事業群副總經理／蔡英文：中華水下文化資產學會理事長`

  function parseData(str: string) {
    const dataArray = str.split('\n')

    const result = []
    let currentType = ''
    let currentSpeakers = []

    for (const data of dataArray) {
      const matches = data.match(/＊([^＊]+)＊(.+)/)

      if (matches && matches.length === 3) {
        if (currentType !== '') {
          // 如果已有当前类型的数据，则将其添加到结果数组
          result.push({
            type: currentType,
            speakers: currentSpeakers,
          })
        }

        currentType = matches[1].trim()
        currentSpeakers = []

        const [, , content] = matches
        const speakersData = content?.split('／')

        for (const speakerData of speakersData) {
          const [namePart, titlePart] = speakerData.split('：')
          const name = namePart.trim()
          const titles = titlePart.split('、').map((title) => title.trim())

          currentSpeakers.push({
            name,
            title: titles,
          })
        }
      } else {
        const speakersData = data.split('／')
        currentSpeakers = []

        for (const speakerData of speakersData) {
          const [namePart, titlePart] = speakerData.split('：')
          const name = namePart.trim()
          const titles = titlePart.split('、').map((title) => title.trim())

          currentSpeakers.push({
            name,
            title: titles,
          })
        }

        // 如果没有类型信息，将type设置为空字符串
        result.push({
          type: '',
          speakers: currentSpeakers,
        })
      }
    }

    // 处理最后一组数据
    if (currentType !== '') {
      result.push({
        type: currentType,
        speakers: currentSpeakers,
      })
    }

    return result
  }

  const parsedData = parseData(str)

  const data = [
    { name: '高虹安', title: '新竹市長' },
    {
      name: '伍麗華 Saidhai‧Tahovecahe',
      title: '英國離岸再生能源整合開發中心',
    },
  ]

  const speakerLists = data.map((item) => {
    return (
      <>
        <SpeakerType>與會嘉賓</SpeakerType>
        <SpeakerItem key={item.name}>
          <p className="speaker-name">{item.name} </p>
          <p className="speaker-title">{item.title}</p>
          <p className="speaker-title">{item.title}</p>
        </SpeakerItem>
      </>
    )
  })

  return (
    <CustomMotionDiv
      className="row-motion"
      ref={ref}
      order={order}
      initial={direction}
      animate={controls}
      variants={variants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      <RowContent className="row-content" isOrderOdd={isOrderOdd}>
        <p className="time">12/12 （一）00:00</p>
        <p className="topic">【城市永續】 新竹市永續城市與 綠運輸政策願景</p>
        <div>{speakerLists}</div>
      </RowContent>
    </CustomMotionDiv>
  )
}
