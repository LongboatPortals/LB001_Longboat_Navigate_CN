import UiSelect from '~/uiselect/src/UiSelect.vue';
import { $options } from '~/uiselect/src/options.js';
import '~/tokens/variables.css';
import '~/tokens/color-light.css';

export const select_manual = () => ({
  components: { UiSelect },
  template: `<UiSelect>
                <option> Select a language </option>
                <option value="en">English</option> 
                <option value="es">Spanish</option> 
            </UiSelect>`,
});

const Template = (args) => ({
  components: { UiSelect },
  setup() {
    return { args };
  },
  template: '<UiSelect v-bind="args" />',
});
//👇 Each story then reuses that template
export const Select = Template.bind({});
Select.args = { options: $options, selectedOption: 'es' };
