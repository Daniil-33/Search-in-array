import { shallowMount } from '@vue/test-utils'
import SearchForm from '@/components/SearchForm.vue'

describe('SearchForm.vue', () => {
  it('Contains interface', () => {
    const wrapper = shallowMount(SearchForm)
    expect(wrapper.contains('form')).toBe(true)
    expect(wrapper.contains('div[class=info]')).toBe(true)
  })

  it('Contains data', () => {
  	const wrapper = shallowMount(SearchForm)
  	expect(wrapper.vm.info.length).not.toBe(0)

  })

  it('Reset button work correcty', () => {
  	const wrapper = shallowMount(SearchForm)
  	const resetBtn = wrapper.find('button[class=info-btn__reset]')

  	wrapper.setData({selected:'some property'})
  	resetBtn.trigger('click')

  	expect(wrapper.vm.selected).toBe('')
  })

  it('Search work correcty', () => {
  	const wrapper = shallowMount(SearchForm)
  	const input = wrapper.find('input[class=search-form__input]')
  	var event = document.createEvent('Event');
	event.initEvent('input', true, true);

	wrapper.setData({search:'Albania'})
	input.value = "Albania"
	input.dispatchEvent(event)

	expect(wrapper.vm.searched_info.length).not.toBe(0)  	
  })

})