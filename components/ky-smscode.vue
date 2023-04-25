<template>
	<ky-btn
		:disabled="isGetCode"
		@click="getSmsCode"
		type="text"
		size="small"
	>
	{{ isGetCode ? `重发${countDownTime}s` : '获取验证码' }}
	</ky-btn>
</template>

<script>
  const code_type = {
    login: '登录',
    reg: '注册',
    find: '找回密码',
    change: '修改密码'
  }
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
					this.$toast('请输入正确的手机号码')
					return;
				}
				try {
					await this.$api.user.GetSmsCode(this.mobile)
					this.isGetCode = true;
          this.is_success = true
					this.$toast('验证码已发送')
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
