import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    login: 'Login',
    apiKey: 'API Key',
    apiKeyDescription: 'API key',
    accessToken: 'Access Token',
    accessTokenDescription: 'Access Token',
    chooseAPI: 'API',
    chooseAPIDescription: 'Please choose API',
    translate: 'Trans',
    summarize: 'Sum',
    polish: 'Polish',
    academic: 'Academic',
    settings: 'Settings',
    result: 'Result',
    confirm: 'Confirm',
    cancel: 'Cancel',
    settingOpen: 'Open',
    settingClose: 'Close',
    settingAzureDeploymentName: 'Deploy name',
    settingAzureEndpoint: 'endpoint',
    settingPalmEndpoint: 'endpoint',
    settingChooseLanguage: 'Language',
    settingTemperature: 'Temperature',
    settingMaxTokens: 'Max tokens',
    settingModel: 'Model',
    settingBasePath: 'Forward domain',
    settingReplyLanguage: 'Reply',
    settingProxy: 'Proxy',
    settingClickToShow: 'Click to set',
    settingEnableProxy: 'Enable proxy',
    settingProxyHost: 'Host',
    settingProxyPort: 'Port',
    settingProxyUsername: 'Username',
    settingProxyPassword: 'Password',
    settingProxyProtocol: 'Protocol',
    homeSystem: 'Character',
    homeSystemDescription: 'Please input the system prompt',
    addSystemPrompt: 'Add system prompt',
    addSystemPromptAlias: 'Alias',
    addSystemPromptAliasDescription: 'Please input the system prompt alias',
    addSystemPromptDescription: 'Please input the system prompt',
    removeSystemPrompt: 'Remove system prompt',
    homePrompt: 'Prompt',
    homePromptDescription: 'Please input the prompt',
    addPrompt: 'Add prompt',
    addPromptAlias: 'Alias',
    addPromptAliasDescription: 'Please input the prompt alias',
    addPromptDescription: 'Please input the prompt',
    removePrompt: 'Remove prompt',
    continue: 'Continue',
    start: 'Start',
    insertType: 'Insert',
    replace: 'Replace',
    append: 'Append',
    newLine: 'New line',
    emptyAPIKey: 'Go to settings to set API key',
    backToHome: 'Back to home'
  },
  'zh-cn': {
    apiKey: 'API 密钥',
    apiKeyDescription: 'API 密钥',
    accessToken: 'access token',
    accessTokenDescription: 'access token',
    chooseAPI: 'API',
    chooseAPIDescription: '请选择API',
    translate: '翻译',
    summarize: '摘要',
    polish: '润色',
    academic: '学术',
    settings: '设置',
    result: '结果',
    confirm: '确认',
    cancel: '取消',
    settingOpen: '开',
    settingClose: '关',
    settingAzureDeploymentName: '部署名',
    settingAzureEndpoint: 'endpoint',
    settingPalmEndpoint: 'endpoint',
    settingChooseLanguage: '语言',
    settingTemperature: 'temperature',
    settingMaxTokens: 'max tokens',
    settingModel: '选择模型',
    settingBasePath: '转发域名',
    settingReplyLanguage: '回复语言',
    settingProxy: '代理',
    settingClickToShow: '点击设置',
    settingEnableProxy: '启用代理',
    settingProxyHost: '代理主机地址',
    settingProxyPort: '代理端口',
    settingProxyUsername: '代理用户名',
    settingProxyPassword: '代理密码',
    settingProxyProtocol: '代理协议',
    homeSystem: '角色设定',
    homeSystemDescription: '请输入角色设定提示',
    addSystemPrompt: '添加角色设定提示',
    addSystemPromptAlias: '别名',
    addSystemPromptAliasDescription: '请输入角色设定提示别名',
    addSystemPromptDescription: '请输入角色设定提示',
    removeSystemPrompt: '移除角色设定',
    homePrompt: '提示',
    homePromptDescription: '请输入提示',
    addPrompt: '添加提示',
    addPromptAlias: '别名',
    addPromptAliasDescription: '请输入提示别名',
    addPromptDescription: '请输入提示',
    removePrompt: '移除提示',
    continue: '继续',
    start: '开始',
    insertType: '插入方式',
    replace: '替换',
    addend: '追加',
    newLine: '新行',
    emptyAPIKey: '请先去设置API key',
    backToHome: '返回主页'
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('localLanguage') || 'en',
  fallbackLocale: 'zh-cn',
  messages
})
