import WistiaVideo from '~/wistiavideo/src/WistiaVideo.vue';
import Icon from '~/icon/src/UiIcon.vue';
import '~/tokens/variables.css';
import '~/tokens/color-light.css';

const Template = (args) => ({
  components: { WistiaVideo, Icon },
  setup() {
    return { args };
  },
  template: `<WistiaVideo v-bind="args">
                <template #icon>
                    <Icon icon="fa-solid:play-circle" iconSize="50px" />
                </template>
                <template #info> 
                    <h3> Video title </h3>
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                </template>
            </WistiaVideo>`,
});
//👇 Each story then reuses that template
export const UiWistiaVideo = Template.bind({});
UiWistiaVideo.args = {
  videoID: 'swtft1u3p5',
  videoTitle: 'Sample',
  videoText:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
