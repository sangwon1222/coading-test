<template>
  <div class="keypad">
    <h3 @click="goAuthor" class="authorship">
    출처: https://programmers.co.kr/learn/courses/30/lessons/67256
    </h3>
    <ul class="wrap">
      <li>
        <img
          src="../../assets/img/programmers/67256.png"
          alt="프로그래머스_67256_문제사진"
        />
      </li>
      <li>
        <ol class="text ex-wrap">
          <li >
            <p>키패드에 들어갈 숫자 ex) 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 </p>
            => <input type="number" id="number-input" />
          </li>
          <li>
            <p>주로 쓰는 손 ex) "left" </p>
            => <input type="text" id="hand-input" />
          </li>
          <li>
            <button class="text btn" @click="submit">제출</button>
          </li>

          <li v-if="state.result">
            <p>결과값 => </p>
            <p> {{state.inputValue}} </p>
            <p> {{state.result}} </p>
          </li>
        </ol>
      </li>
    </ul>

    <tPopup :isVisible="state.isPopup" :text="state.popupText" @close="state.isPopup=false" />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import tPopup from '@/components/template/popup.vue'
import { useStore } from 'vuex';

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
  console.error(numbers, hand)
  let answer = ''
	const mainHand = hand[0].toUpperCase()

	for (const num of numbers) {
    console.error(num)
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
  .authorship{
    color: #fff;
    padding: 10px;
    cursor: pointer;
  }
  .wrap {
  display: flex;
  flex-wrap:wrap;
  justify-content: space-between;
  }
  .popup{
    position: fixed;
  }

  .ex-wrap{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .text {
    color: #bcbcbc
  }
  .btn{
    padding: 10px;
    border:2px #bcbcbc solid;
    border-radius: 4px;
  }
}

</style>
