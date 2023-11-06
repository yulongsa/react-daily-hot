/*
 * @Description: 入口文件
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-30 15:29:07
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-11-06 09:07:37
 */
import { useLocalStorageState } from 'ahooks'
import { App, ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN';
import { eq, filter, includes } from 'lodash-es'
import { useState } from 'react'
import { Helmet } from 'react-helmet'

import ActionButtons from '@/components/ActionButtons'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HotContainer from '@/components/HotContainer'
import { LOCAL_KEY, THEME } from '@/enums'
import type { HotListConfig, HotTypes, ThemeName } from '@/types'
import { getLocalStorageItem } from '@/utils'

import { hotDataSource } from './components/HotContainer/config'

function AppConatiner() {
  // 主题色
  const [primaryColor, setPrimaryColor] = useState(getLocalStorageItem(LOCAL_KEY.PRIMARYCOLOR) || '#1677ff');
  // 主题模式
  const [siteTheme, setSiteTheme] = useLocalStorageState<ThemeName>(
    LOCAL_KEY.THEME,
    { defaultValue: THEME.LIGHT },
  );
  // 是否是暗黑主题
  const isDark = eq(siteTheme, THEME.DARK)
  /**
  * @description: 过滤掉不显示的热榜
  */
  const filterHiddenHot = (): HotListConfig[] => {
    // 不显示的榜单列表
    const hiddenHotList = getLocalStorageItem<HotTypes[]>(LOCAL_KEY.HOTHIDDEN) || [];
    return hiddenHotList.length ? filter(hotDataSource, (config: HotListConfig) => !includes(hiddenHotList, config.value)) : hotDataSource
  }
  const [hotConfig, setHotConfig] = useState<HotListConfig[]>(filterHiddenHot())
  return (
    <>
      <Helmet encodeSpecialCharacters={false}>
        <html lang='zh-CN' data-theme={siteTheme} />
        <script type="text/javascript">
          {
            `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jm0kos9fw7");`
          }
        </script>
      </Helmet>
      <ConfigProvider locale={zhCN} theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
      }}>
        <App>
          <div id="appContainer" style={{
            // backgroundColor: 'var(--baiwu-bg-color)'
          }}>
            {/* 头部布局 */}
            <Header primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} />
            {/* 今日热榜 */}
            <HotContainer primaryColor={primaryColor} hotConfig={hotConfig} />
            {/* 底部版权 */}
            <Footer />
            {/* 悬浮按钮 */}
            <ActionButtons
              setHotConfig={setHotConfig}
              filterHiddenHot={filterHiddenHot}
              isDark={isDark}
              setSiteTheme={setSiteTheme}
            />
          </div>
        </App>
      </ConfigProvider>
    </>
  )
}

export default AppConatiner
