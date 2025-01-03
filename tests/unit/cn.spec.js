/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import CnLayout from '@/apps/cn/views/CnLayout.vue';
import { createI18n } from 'vue-i18n';
import en from '@/locales/en.yml';





const i18n = createI18n({
    locale: 'en',
    legacy: false,
    messages: {
      en
    }
  });




describe('Snapshot testing', () => {

it('matches the snapshot', () => {
    const wrapper = mount(CnLayout, { global: {plugins: [i18n]}});
    expect(wrapper.html()).toMatchSnapshot();
});

});

