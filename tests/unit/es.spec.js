/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
//import { createI18n } from 'vue-i18n'
import SiteBanner from '@/apps/es/views/SiteBanner.vue'
import SiteMenu from '@/apps/es/views/SiteMenu.vue'
import * as utils from '@/modules/components/common/src/utils'
//import en from '@/locales/en.yml'
import { i18n } from '@/main'

/*
const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en
  }
})
  */

// Mocking i18n and utils for Dropdown and Lang Changes.

jest.mock('@/modules/components/i18n/src/utils', () => ({
  getSupportedLocales: jest.fn(() => [{ code: 'en', name: 'English' }]),
  localelist: []
}))

jest.mock('@/modules/components/common/src/utils', () => ({
  renameKeys: jest.fn((obj) => obj),
  setPageTitle: jest.fn(),
  setHtmlElementLangAttribute: jest.fn(),
  setCurrentLocale: jest.fn(),
  updateLocaleCodeInURL: jest.fn(),
  addLocaleToHtmlElementClass: jest.fn(),
}))

describe('Snapshot testing', () => {
  it('matches the snapshot', () => {
    const wrapper = mount(SiteBanner, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches the snapshot', () => {
    const wrapper = mount(SiteMenu, { global: { plugins: [i18n] } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('Test for dropdown and locale changes', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SiteMenu, {
      global: {
        plugins: [i18n],
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('changes locale and updates page title', async () => {
    await wrapper.vm.onLocaleOptionSelection('en')
    expect(utils.setHtmlElementLangAttribute).toHaveBeenCalledWith('en')
    expect(utils.addLocaleToHtmlElementClass).toHaveBeenCalledWith('lang-en')
    expect(utils.setCurrentLocale).toHaveBeenCalledWith('en')
    expect(utils.updateLocaleCodeInURL).toHaveBeenCalledWith('en')
    expect(utils.setPageTitle).toHaveBeenCalledWith('survey.site_title')
  })
})
