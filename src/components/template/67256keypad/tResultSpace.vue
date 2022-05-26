<template>
 <div class="result_wrap">
        <ul class="sticky  flex flex-col gap-20">
          <li >
            <p>키패드에 들어갈 숫자 ex) 1234567890 </p>
            => <input type="number" id="number-input" />
          </li>
          <li>
            <p>주로 쓰는 손 ex) "left" </p>
            => <input type="text" id="hand-input" />
          </li>
          <li>
            <button class="btn " @click="emit('submit')">제출</button>
          </li>

          <li v-if="props.result">
            <p>결과값 => </p>
            <p> {{props.inputValue}} </p>
            <p> {{props.result}} </p>
          </li>
        </ul>
      </div>
</template>

<script lang="ts" setup>
	const emit = defineEmits(['submit'])
	const props = defineProps({
		result: {type: String, default: ''},
		inputValue: {type: String, default: ''},
	})
</script>

<style lang="scss" scoped>
.result_wrap{
	@apply relative overflow-hidden;
}
</style>
