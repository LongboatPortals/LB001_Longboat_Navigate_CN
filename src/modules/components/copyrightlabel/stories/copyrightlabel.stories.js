import CopyrightLabel from '~/copyrightlabel/src/CopyrightLabel.vue';
import PrivacyPolicyLink from '~/privacypolicylink/src/PrivacyPolicyLink.vue';
import '~/tokens/variables.css';
import '~/tokens/color-light.css';

export const copyrightLabel = () => ({
  components: { CopyrightLabel, PrivacyPolicyLink },
  template: `<CopyrightLabel><PrivacyPolicyLink>Privacy Policy</PrivacyPolicyLink></CopyrightLabel>`,
});

export const copyrightLabel2 = () => ({
  components: { CopyrightLabel, PrivacyPolicyLink },
  template: `<CopyrightLabel><PrivacyPolicyLink locale='sp'>Privacy Policy</PrivacyPolicyLink></CopyrightLabel>`,
});
