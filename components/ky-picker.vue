<template>
	<picker
    :value="mode === 'selector' ? index : multiIndex"
    :range="names"
    :mode="mode"
		:fields="fields"
		:disabled="disabled"
    :range-key="mode === 'selector' ? '' : 'name'"
    @change="bindPickerChange"
    @columnchange="onColumnchange"
  >
		<view v-if="!$slots.default">
      <view v-if="mode === 'selector'" class="picker">
      	<text v-if="checked !== ''">{{ names[index] }}</text>
      	<text v-else class="gray-color">{{ placeholder }}</text>
      </view>
      <view v-else class="picker">
      	<text v-if="checked !== '' && checked.data[0]">{{ checked.data[0].name }} {{ checked.data[1].name ? `/${checked.data[1].name}` : '' }}</text>
      	<text v-else class="gray-color">{{ placeholder }}</text>
      </view>
    </view>
    <slot v-else></slot>
	</picker>
</template>

<script>
	export default {
		emits: ['update:value', 'update:label', 'change'],
		props: {
			value: {
				type: [Object, String, Number, Array],
			},
			label: {
				type: [Object, String, Number, Array],
			},
			/**
			 * 格式，[{ name: 'xx': id: 'xxx' }]
			 */
			list: {
				type: Array,
				default: () => []
			},
      placeholder: {
        type: String,
        default: '请选择'
      },
			keyName: {
				type: String,
				default: 'name'
			},
			valueName: {
				type: String,
				default: 'id'
			},
      mode: {
        type: String,
        default: 'selector',
      },
			fields: {
				type: String,
				default: 'day', // 有效值 year、month、day
			},
			disabled: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				index: 0,
        multiIndex: [0, 0],
				names: [],
				ids: [],
				checked: ''
			}
		},
		watch: {
			value(v) {
				this.mapVal(v)
			},
			list(v) {
				this.mapList(v)
			},
		},
		mounted() {
			this.mapList(this.list)
			this.mapVal(this.value)
		},
		methods: {
			bindPickerChange({ detail }) {
        if (this.mode === 'multiSelector') {
          this.onMultichange(detail.value)
          return
        }
				const index = +detail.value
				const currVal = this.list[index]
				this.checked = this.ids[index]
        const valProps = this.setVal(this.value)
				// if (valProps === this.checked) {
				// 	return
				// }
				this.index = index
				currVal.index = index
				this.$emit('update:value', this.checked)
				this.$emit('update:label', this.names[index])
				this.$emit('change', currVal)
			},
			mapVal(v) {
				if (typeof v === 'undefined') {
					this.index = 0
					this.multiIndex = [0, 0]
					this.checked = ''
					return
				}
        this.$nextTick(function() {
          if (this.mode === 'multiSelector') {
            return
          }
          const val = this.setVal(v)
          const itemIndex = this.list.findIndex(e => e[this.valueName] == val)
          this.index = itemIndex
          this.checked = this.ids[itemIndex]
        })
			},
			mapList(v) {
				if (typeof v === 'undefined') {
					return
				}
        if (this.mode === 'multiSelector') {
          const secondColumn = []
          const firstColumn = this.list.map((e, i) => {
            if (e.child) {
              e.child.forEach((j, k) => {
                secondColumn.push({
                  parentId: e.id,
                  parentIndex: i,
                  id: j.id,
                  name: j.name,
                })
              })
            } else {
							e.child = []
						}
            return { ...e, id: e.id, name: e.name, index: i }
          })
          this.names = [firstColumn, secondColumn]
          setTimeout(() => {
            this.setMultiIndex(this.value, firstColumn, secondColumn)
          }, 200)
          return
        }
				this.names = v.map(e => e[this.keyName])
				this.ids = v.map(e => e[this.valueName])
        this.mapVal(this.value)
			},
      setVal(v) {
        if (!v && typeof v !== 'number') {
          return ''
        }
        if (typeof v === 'string' || typeof v === 'number') {
          return v
        }
        return v[this.valueName]
      },

      // 根据id进行反选索引, 延迟是因为等待value变化
      setMultiIndex(v, firstColumn, secondColumn) {
        if (v && v.length) {
          v.forEach(i => {
            firstColumn.forEach((e) => {
              if (i === e.id) {
                this.multiIndex[0] = e.index
              }
            })
            secondColumn.forEach((e, k) => {
              if (i === e.id) {
                this.multiIndex[1] = k
              }
            })
          })
          console.log(this.multiIndex)
          this.onMultichange(this.multiIndex, false)
        }
      },

      // 多列的时候触发修改
      onColumnchange({ detail }) {

        const { column, value } = detail
        const result = [...this.multiIndex]

        console.log(detail)

        if (column === 0) {
          result[0] = value
          result[1] = this.names[1].findIndex(e => e.parentIndex === value)
        } else {
          result[0] = this.names[1].find((e, i) => i === value).parentIndex
          result[1] = value
        }

        console.log(result)

        this.multiIndex = result
      },

      // 多列完成的时候触发
      onMultichange(val, noEmit) {
				const data1 = this.names[0][val[0]]
				const data2 = this.names[1][val[1]]
				const emitValue = [data1[this.valueName], data2[this.valueName]]
				const emitName = [data1[this.keyName], data2[this.keyName]]
        this.checked = {
          index: val,
          data: [data1, data2]
        }
				console.log(emitValue, emitName)
        if (!noEmit) {
          this.$emit('update:value', emitValue)
					this.$emit('update:label', emitName)
					this.$emit('change', this.checked)
        }
      }
		}
	}
</script>

<style scoped lang="scss"></style>
