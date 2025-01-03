<script setup>
import PrivacyPolicyLink from '~/privacypolicylink/src/PrivacyPolicyLink.vue';

const privacyPolicyLinkPlaygroundCode = `<PrivacyPolicyLink :locale="en" > Privacy policy</PrivacyPolicyLink>`;

</script>

# Privacy policy component

## Description

PrivacyPolicyLink component

## Props

<Props :of="PrivacyPolicyLink"></Props>

## Example

<Playground
:code="privacyPolicyLinkPlaygroundCode"
:components="{ PrivacyPolicyLink}"> </Playground>
