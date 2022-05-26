<template>
  <div class="keypad">
    <h3 @click="goAuthor" class="authorship">
      출처: https://programmers.co.kr/learn/courses/30/lessons/67256
    </h3>
    
    <div class="wrap ">
      <tQuestion />
      <tResult :inputValue="state.inputValue" :result="state.result"/>
    </div>

    <tPopup :isVisible="state.isPopup" :text="state.popupText" @close="state.isPopup=false" />
  </div>
</template>

<script lang="ts" setup>
import tQuestion from '@/components/template/67256keypad/tQuestion.vue'
import tResult from '@/components/template/67256keypad/tResultSpace.vue'
import tPopup from '@/components/template/popup.vue'
import { useStore } from 'vuex';
import { reactive } from 'vue'

const store= useStore()
const state = reactive({
  isPopup: false,
  popupText: '',
  inputValue: '',
  result: ''
})
const handPos = { left: '*', right: '#' }
	const keypad = {
		1: { x: 0, y: 0 },  2: { x: 1, y: 0 }, 3: { x: 2, y: 0 },
		4: { x: 0, y: 1 },  5: { x: 1, y: 1 },  6: { x: 2, y: 1 },
		7: { x: 0, y: 2 },  8: { x: 1, y: 2 },  9: { x: 2, y: 2 },
		'*': { x: 0, y: 3 },  0: { x: 1, y: 3 },  '#': { x: 2, y: 3 },
	}

const goAuthor =()=>{window.open('https://programmers.co.kr/learn/courses/30/lessons/67256')}
const submit =async()=>{
  const numbers = (document.getElementById('number-input') as HTMLInputElement).value
  const hand = (document.getElementById('hand-input') as HTMLInputElement).value

  const numberInput = []
  for(const num of numbers){
    numberInput.push(num)
  }
  if(!numbers || !['left','right'].includes(hand)){
    openPopup('숫자와 손잡이(left , right)를 입력해주세요.')
  }else{
    store.commit('startLoading')
    state.inputValue = `numberInput: ${numberInput}, hand: ${hand}`
    state.result =  await getResult(numberInput, hand)
    store.commit('endLoading')
  }
}

const getResult =async (numbers: Array<number>, hand: string)=>{
  let answer = ''
	const mainHand = hand[0].toUpperCase()

	for (let num of numbers) {
    num = +num
		if ([1, 4, 7].includes(num)) {
		handPos.left = num.toString()
		answer += 'L'
		continue
		}
		if ([3, 6, 9].includes(num)) {
		handPos.right = num.toString()
		answer += 'R'
		continue
		}
		const { left, right } = handPos
		const leftDistance = 
			Math.ceil(
				Math.sqrt(
					Math.pow(keypad[num].x - keypad[left].x, 2) +
					Math.pow(keypad[num].y - keypad[left].y, 2),
				)
			)
		const rightDistance = 
			Math.ceil(
				Math.sqrt(
					Math.pow(keypad[num].x - keypad[right].x, 2) +
					Math.pow(keypad[num].y - keypad[right].y, 2),
				)
			)

		if (leftDistance === rightDistance) {
		handPos[hand] = num
		answer += mainHand
		continue
		}
		if (leftDistance > rightDistance) {
		handPos.right = num.toString()
		answer += 'R'
		continue
		}
		if (leftDistance < rightDistance) {
		handPos.left = num.toString()
		answer += 'L'
		continue
		}
	}
	return answer
}

const openPopup = (text: string) =>{
  state.isPopup = true
  state.popupText = text

}
</script>

<style lang="scss" scoped>
.keypad{
  background: #2d3747;
  color: #bcbcbc;
  .authorship{
    color: #fff;
    padding: 10px;
    cursor: pointer;
  }
  .wrap {
    @apply relative flex flex-wrap justify-between ;
    max-width: 100%;
    min-width: 930px;
  }

  .question_wrap{
    @apply  flex flex-col gap-20 ;
    max-width: 70%;
    min-width: 640px;
  }

  .ex-wrap{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .btn{
    color: #bcbcbc;
    padding: 10px;
    margin: 10px 0;
    border:2px #bcbcbc solid;
    border-radius: 4px;
  }
}

</style>
