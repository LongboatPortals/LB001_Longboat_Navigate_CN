/* eslint-disable no-undef */

/* Text Page importing */
import { mount } from '@vue/test-utils';
import QuestionTabRockstar from '@/modules/components/question-tab/QuestionTabRockstar.vue';
import PatientConnectForm from '@/apps/prw/patientConnect/PatientConnectForm.vue';
import AboutStudy from '@/apps/prw/views/AboutStudy.vue';
import SiteMenu from '@/apps/prw/views/SiteMenu.vue';
import SiteBanner from '@/apps/prw/views/SiteBanner.vue';
import SiteBanner2 from '@/apps/prw/views/SiteBanner2.vue';
import FooterSection from '@/apps/prw/views/FooterSection.vue';
import EligibilitySection from '@/apps/prw/patientConnect/EligibilitySection.vue';
//import { createI18n } from 'vue-i18n';
import CnLayout from '@/apps/cn/views/CnLayout.vue';
import localeList from '@/modules/components/i18n/src/locale-list';
//import en from '@/locales/en.yml';






/* components importing */
import LefteeLayout from '@/modules/components/layout/LefteeLayout.vue';
import {UiButton} from '@/modules/components/uibutton/src';
import CookieModal from '@/modules/components/consentmodal/src/CookieModal.vue';
import QuestionTabClassic from '@/modules/components/question-tab/QuestionTabClassic.vue';
import PrivacyPolicyLink from '@/modules/components/privacypolicylink/src/PrivacyPolicyLink.vue';
import CheckBox from '@/modules/components/checkbox/CheckBox.vue';
import CheckBoxGroup from '@/modules/components/checkbox/CheckBoxGroup.vue';
import ConsentBox from '@/modules/components/consentselect/ConsentBox.vue';
import { CopyrightLabel } from '@/modules/components/copyrightlabel/src';
import UiHeading from '@/modules/components/head-tab/UiHeading.vue';
import UiIcon from '@/modules/components/icon/src/UiIcon.vue';
import AlertLayout from '@/modules/components/layout/AlertLayout.vue';
import CenteredLayout from '@/modules/components/layout/CenteredLayout.vue';
import ModalLayout from '@/modules/components/layout/ModalLayout.vue';
import TextInput from '@/modules/components/textinput/TextInput.vue';
import UiFaq from '@/modules/components/uifaq/UiFaq.vue';
import UiSelect from '@/modules/components/uiselect/src/UiSelect.vue';
import UiSelectButton from '@/modules/components/uiselectbutton/src/UiSelectButton.vue';
import UiSelectClassic from '@/modules/components/uiselect/src/UiSelectClassic.vue';
import { i18n } from '@/main';

/*
const i18n = createI18n({
  locale: 'en',
  legacy: false,
  messages: {
    en
  }
});
*/


/* Text Page testing */
describe('Snapshot testing', () => {

    it('renders correctly', () => {
      const wrapper = mount(QuestionTabRockstar);
 expect(wrapper.html()).toMatchSnapshot();
    });
    it('renders list', () => {
      const wrapper = mount(localeList);
 expect(wrapper.html()).toMatchSnapshot();
    });
  
    it('renders correctly', () => {
      const wrapper = mount(CnLayout, { global: { plugins: [i18n] } });
 expect(wrapper.html()).toMatchSnapshot();
    });

  it('renders correctly', () => {
    const wrapper = mount(PatientConnectForm, { global: { plugins: [i18n] } });
expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = mount(AboutStudy, { global: { plugins: [i18n] } });
expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = mount(SiteMenu, { global: { plugins: [i18n] } });
expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = mount(SiteBanner, { global: { plugins: [i18n] } });
expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = mount(SiteBanner2, { global: { plugins: [i18n] } });
expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders correctly', () => {
    const wrapper = mount(FooterSection, { global: { plugins: [i18n] } });
expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders correctly', () => {
    const wrapper = mount(EligibilitySection, { global: { plugins: [i18n] } });
expect(wrapper.html()).toMatchSnapshot();
  });


});

/* Testing for components */
describe('Components Check Test', () => {
  it('renders a Layout', () => {
    const wrapper = mount(LefteeLayout);
    console.assert(wrapper.find('leftee-layout'));
    
  });
  it('renders PolicyLink', () => {
    const wrapper = mount(PrivacyPolicyLink);
    console.assert(wrapper.find('button'));
  });
  
  it('renders a button', () => {
    const wrapper = mount(UiButton);
    console.assert(wrapper.find('button'));
  });
  it('renders a Cookie test', () => {
    const wrapper = mount(CookieModal);
    console.assert(wrapper.find('cookie-law-modal'));
  });
  it('renders a question tab', () => {
    const wrapper = mount(QuestionTabClassic);
    console.assert(wrapper.find('question-tab-classic'));
  });

  it('verify-Button Text', () => {
    const wrapper = mount(UiButton)
    expect(wrapper.find('Accept'))
  });

  it('verify-Button Text 1', () => {
    const wrapper = mount(UiButton)
    expect(wrapper.find('Find out if you are eligible'))
  });
  it('verify-checkbox', () => {
    mount(CheckBox)
  });
  it('verify-checkboxGroup', () => {
    mount(CheckBoxGroup)
  });
  it('verify-ConsentBox', () => {
    mount(ConsentBox)
  });
  it('verify-CopyrightLabel', () => {
 mount(CopyrightLabel)
  });
  it('verify-UiHeading', () => {
    mount(UiHeading)
  });
  it('verify-UiIcon', () => {
    mount(UiIcon)
  });
  it('verify-AlertLayout', () => {
   mount(AlertLayout)
  });
  it('verify-CenteredLayout', () => {
     mount(CenteredLayout)
  }); 
  it('verify-ModalLayout', () => {
     mount(ModalLayout)
  });
  it('verify-TextInput', () => {
    mount(TextInput)
  });
  it('verify-UiFaq', () => {
     mount(UiFaq)
  });
  it('verify-UiSelect', () => {
     mount(UiSelect)
  });
  it('verify-UiSelectButton', () => {
     mount(UiSelectButton)
  });
  it('verify-UiSelectClassic', () => {
     mount(UiSelectClassic)
  });
});
