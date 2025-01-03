<script setup>
import UiSelect from '~/uiselect/src/UiSelect.vue';
import { $options } from '~/uiselect/src/options.js';

const uiSelectPlaygroundCode = `<UiSelect :options="[{text: 'English', value: 'en'}]" />`;
const uiSelectPlaygroundCode2 = `<UiSelect> 
                                      <option value="volvo">Volvo</option> 
                                      <option value="audi">Audi</option>
                                  </UiSelect>`;
</script>

# UiSelect component

## Description

UiSelect component

## Props

<Props :of="UiSelect"></Props>

## Example

<Playground
:code="uiSelectPlaygroundCode"
:components="{ UiSelect }"> </Playground>

## Example 2

You can also add the `<option>` tag manually
<Playground 
  :code="uiSelectPlaygroundCode2"
  :components="{ UiSelect }">
</Playground>

```html
<UiSelect :options="[{text: 'English', value: 'en'}]" />
```
