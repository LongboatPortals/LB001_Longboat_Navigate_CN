<template>
    <span class="ui-checkbox-wrapper">
    <input class="ui-checkbox" type="checkbox" :id="props.id" :name="props.id" :value="props.value" :checked="props.checked" :disabled="disabled" @change="emitOptionChangeEvent($event)">
    <label :for="props.id"> {{props.label}}</label>
    </span>
</template>

<script setup>


const emit = defineEmits({
  onChange: {
    type: "change",
    default: () => {},
  },
});

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});


const emitOptionChangeEvent = ()=>{
    emit("onChange", props.id);
}
</script>

<style scoped lang="scss">

</style>
