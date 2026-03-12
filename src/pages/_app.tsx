import '@/styles/globals.css'
import type { AppType } from 'next/app'
import { useRouter } from 'next/router'
import { api } from '@/utils/api'
import Layout from '@/components/Layout'

const STUDIO_ROUTES = /^\/studio/

const MyApp: AppType = ({ Component, pageProps }) => {
  const { pathname } = useRouter()
  const useLayout = STUDIO_ROUTES.test(pathname)

  return useLayout ? (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) : (
    <Component {...pageProps} />
  )
}

export default api.withTRPC(MyApp)
