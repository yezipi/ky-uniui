<template>
	<ky-btn
		:disabled="isGetCode"
		@click="getSmsCode"
		type="text"
		size="small"
	>
		{{ isGetCode ? `${countDownTime}s` : $t('getVerifyCode') }} 
	</ky-btn>
</template>

<script>

	export default {
		props: {
			mobile: {
				required: true
			},
      service_type: {
        type: String,
        default: '',
      }
		},
		data() {
			return {
				countDownTime: 60,
				timeInterval: null,
				isGetCode: false,
        is_success: false,
        errMsg: ''
			};
		},
		methods: {
			async getSmsCode() {
				this.$db.del('isToLogin')
				this.code = ''
				if (!this.mobile || !/^1\d{10}$/.test(this.mobile)) {
					this.$toast(this.$t('phoneTips'))
					return;
				}
				try {
					await this.$api.user.GetSmsCode(this.mobile)
					this.isGetCode = true;
          this.is_success = true
					this.$toast(this.$t('codeSendSuccess'))
					this.timeInterval = setInterval(() => {
						if (this.countDownTime === 0) {
							clearInterval(this.timeInterval);
							this.countDownTime = 60
							this.isGetCode = false
							return;
						}
						this.countDownTime -= 1
					}, 1000)
				} catch (e) {
					console.log(e)
          this.errMsg = e.errMsg
          this.is_success = false
				}
			},
		}
	}
</script>

<style lang="scss"></style>
