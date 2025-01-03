import ConsentModal from '~/consentmodal/src/ConsentModal.vue';

export const consent_modal = () => ({
  components: { ConsentModal },
  template: `<ConsentModal locale='en'>
                <template #body-content>  This website would like to use third party cookies to analyze traffic. This analytics data will be anonymized and can’t be used to identify you.  <br />  For more information, please review our </template>
                <template #privacy-policy-link-text>Privacy Policy</template>
                <template #accept-btn-text>Accept</template>
                <template #reject-btn-text>I do not accept cookies</template>
            </ConsentModal>`,
});
