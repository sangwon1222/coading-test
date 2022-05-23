<template>
  <div class="popup-wrap" v-if="state.isVisible">
  <div class="bg" />
    <div class="popup">
		<p>{{props.text}}</p>
    <button class="closeBtn" @click="$emit('close')">닫기</button>
	</div>
  </div>
</template>

<script lang="ts" setup>
import {computed, reactive } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
})

const state = reactive({
  isVisible: computed(()=> props.isVisible)
})

</script>

<style lang="scss" scoped>
.popup-wrap{
  position: fixed;
  overflow: hidden;
  width: 100%;
  height:100%;
  top:0;
  left:0;
  .bg {
    display: block;
    background: #000;
    width: 100%;
    height:100%;
    animation: 0.5s appear forwards;
  }
  .popup{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    top:50%;
    left:50%;
    border-radius: 4px;
    background: #fff;
    transform: translate(-50%,-50%);
    color: #000;
  }

  .closeBtn{
    margin-top: 20px ;
    padding: 10px;
    border: 2px #bcbcbc solid;
    border-radius: 4px;
  }
}

@keyframes appear {
  from{
    opacity: 0;
  }
  to{
    opacity: 0.7;
  }
}

</style>
