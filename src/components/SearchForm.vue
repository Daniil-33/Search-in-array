<template>
	<div class="wrap">
		<div class="info">
			<p id="selected">Выбранный элемент: {{ selected }}</p>
			<p id="length">Всего элементов в массиве: {{ info.length }}</p>
			<p id="">Найдено элементов по запросу: {{ searched_info.length }}</p>
			<button
				class="info-btn__reset"
				@click.prevent="clear"
			>Сброс</button>
		</div>
		<form class="search-form">
			<input 
				type="text" 
				placeholder="Поиск" 
				class="search-form__input"
				v-model="search"
				@input="searchInfo"
				@keydown.enter.prevent="selectEnter"
			>
			<div class="search-form__results active">
				<div 
					class="search-form-result"
					v-for="(item, idx) of searched_info"
					:key="idx"
					@click="selectClick"
				>
					<p>{{ item }}</p>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
	import info from '../static/data.json';
	export default{
		data: () => ({
			search: '',
			info,
			searched_info: [],
			searched_info_DOM: [],
			currentElementIdx: null,
			selected: '',
		}),
		methods: {
		    searchInfo(){
				if(this.search === ''){
					this.searched_info = []
				} else {
					const all_info = this.info
					const search_result = all_info.filter(item => item.includes(this.search))
					const results = document.getElementsByClassName('search-form__results active')[0].childNodes

					this.searched_info = search_result
					this.currentElementIdx = 0
					this.searched_info_DOM = results

					this.setControl(this.searched_info_DOM, this.currentElementIdx)
				}

		    },
		    clear(){
		    	this.searched_info = []
		    	this.selected = ''
		    	this.search = ''
		    },
		    selectClick(event){ 	    	
		    	let target = event.target
	    		let targetContent = target.textContent
				let input = document.getElementsByTagName('input')[0]

				let results = this.searched_info_DOM
	    		let index = this.searched_info.indexOf(targetContent)

	    		for(let i = 0; i < results.length; i++){
	    			results[i].classList.remove('hover')
	    		}

				
				this.selected = targetContent
				this.search = targetContent
				this.currentElementIdx = index
				this.searchInfo()
			},
			selectEnter(){
				let results = this.searched_info_DOM
				let input = document.getElementsByTagName('input')[0]
				let index = this.searched_info.indexOf(input.value)

				this.search = input.value
				this.selected = input.value
				this.currentElementIdx = index
				this.searchInfo()
			},
			setControl(array, index){
				const arr = array
				let idx = index
				let input = document.getElementsByTagName('input')[0]

		    	document.addEventListener('keydown', function(event){
		    		input.focus()

		    		for(let i = 0; i < arr.length; i++){
		    			arr[i].classList.remove('hover')
		    		}

		    		if(arr.length === 1){
		    			idx = 0
		    		}

					if(event.keyCode === 38){
						if(idx == 0){
							idx = arr.length
						} 

						idx--
						arr[idx].classList.add('hover')
						input.value = arr[idx].textContent

					} else if(event.keyCode === 40){
						if(idx == arr.length){
							idx = 0
						}

						arr[idx].classList.add('hover')
						input.value = arr[idx].textContent
						idx++
					} 
				})
			},
			beforeDestroy(){
				document.removeEventListener('keydown')
			}
		}
	}
</script>