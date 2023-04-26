## 介绍
```` 
凯茵内部uniapp组件库，以ky-开头
````

## 安装
```bash
npm i @kaiyinchem/ky-uniui
```

## 使用
pages.json设置

```bash
"easycom": {
		"autoscan": true,
		"custom": {
			"^ky-(.*)": "@kaiyinchem/ky-uniui/components/ky-$1.vue"
		}
	},
```

App.vue引入css
```bash
@import '@kaiyinchem/ky-uniui/style/var.css';
```

组件中
```bash
<ky-btn>按钮</ky-btn>
```