import PrivacyPolicyLink from '~/privacypolicylink/src/PrivacyPolicyLink.vue';
import '~/tokens/variables.css';
import '~/tokens/color-light.css';

export const privacyPolicyLink = () => ({
  components: { PrivacyPolicyLink },
  template: `<PrivacyPolicyLink locale='en'>Privacy Policy</PrivacyPolicyLink>`,
});
