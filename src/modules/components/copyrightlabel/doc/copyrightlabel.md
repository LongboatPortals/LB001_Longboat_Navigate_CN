<script setup>
import CopyrightLabel from '~/copyrightlabel/src/CopyrightLabel.vue';
import PrivacyPolicyLink from '~/privacypolicylink/src/PrivacyPolicyLink.vue';

const copyrightLabelPlaygroundCode = `<CopyrightLabel > <PrivacyPolicyLink locale='sp'>Privacy Policy</PrivacyPolicyLink></CopyrightLabel>`;

</script>

# CopyrightLabel component

## Description

CopyrightLabel component

## Props

<Props :of="CopyrightLabel"></Props>

## Example

<Playground
:code="copyrightLabelPlaygroundCode"
:components="{ CopyrightLabel}"> </Playground>
