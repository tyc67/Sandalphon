import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { selectIsLogined } from '@/redux/features/user/selector'
import { useAppSelector } from '@/redux/hooks'
import { useLocalStorage } from 'usehooks-ts'
import { ORIGIN_STORAGE_KEY } from '@/constants/config'

export const useRedirectOnLogined = () => {
  const router = useRouter()
  const isLogined = useAppSelector(selectIsLogined)
  const [originPath, , removeOriginPath] = useLocalStorage(
    ORIGIN_STORAGE_KEY,
    ''
  )

  useEffect(() => {
    if (isLogined) {
      router.push(originPath || '/')
      removeOriginPath()
    }
  }, [router, isLogined, removeOriginPath])
}
