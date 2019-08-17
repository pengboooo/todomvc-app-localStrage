(function (window) {

	'use strict';


// 自定义指令
Vue.directive('focus',{
	//里面有三个钩子函数
	bind:function(el){//绑定时
	},
	inserted:function(el){//插入时
		el.focus();
	},
	updated:function(){//元素更新时

	}
	
})



	var vm = new Vue({
		el: '.todoapp',
		data: {
			value: '',
			check: false,
			currentHash: '',
			currentIndex:'',
			list: [{
					isInput: true,
					name: 'Taste JavaScript'
				},
				{
					isInput: false,
					name: '张三'
				}
			]
		},
		created() { //在vue初始化生命周期之后的钩子函数
			window.addEventListener('load',()=>{//初始化地址栏hash值（#以后的内容）
				window.location.hash = "#/"
				this.currentHash = window.location.hash;
				// 3.页面加载时获取本地存储的数据 赋值给数据模型
			this.list = this.getStorge()
			}),
			window.addEventListener('hashchange', ()=> {//当hash值发生变化时触发
				console.log(window.location.hash)
				this.currentHash = window.location.hash
			})
		},
		// watch: {//某数据改变时触发
		// 	check(){
		// 		this.list.map(item=>{
		// 			item.isInput = this.check;
		// 		})
		// 	},
		// 	isInput(){
		// 		console.log("触发了");
				
		// 	}
			
			
			
		// },
	
		methods: {
			add() {

				if(this.value !=''){
					var obj = {}
				obj.name = this.value;
				obj.isInput = this.check;
				this.list.push(obj)
				this.value = ""
				this.setStorge(this.list)
				}else{
					alert('请不要输入空值')
				}
			},
			del(index) {
				this.list.splice(index, 1)
				this.setStorge(this.list)
			},
		
			tag(){
				
				this.list.map(item=>{
					console.log(this);
					
								item.isInput = !this.check;
							})
			// this.check =!this.check;
			this.setStorge(this.list)
			},
			clearAll() {
				this.list = this.list.filter((item)=> {
					return item.isInput == false;
				})
	
				// this.setStorge(this.todoList)
				this.setStorge(this.list)
			},
			arrErever(){
				this.check = this.list.every((item)=>{
					return item.isInput ==true;
				})
				this.setStorge(this.list)
			},
			dbl(index){
				console.log(index);
				
				// 设置index值给当前的index值，使得当前点中的todo处于编辑状态
			this.currentIndex = index;
			
			// 处于编辑状态之后进行聚焦
			this.$nextTick(()=> {
				this.$refs.input[index].focus()
			})
			},
			recoverStatus() {
				// 退出编辑状态
				this.currentIndex = ''
				this.setStorge(this.list)
			},
			setStorge(list) {
				window.localStorage.setItem('todolist', JSON.stringify(list))
			},
			getStorge() {
				return JSON.parse(window.localStorage.getItem('todolist'))
			}
		},
		computed: {
			filterList(){
					if(this.currentHash === "#/"){
						return this.list
					}else if(this.currentHash === "#/active"){
						return this.list.filter((item)=>{
							return item.isInput !=true;
						})
					}else if(this.currentHash === "#/completed"){
						return this.list.filter((item)=>{
							return item.isInput !=false;
						})
					}
			},
			letNum(){
				return this.list.reduce((falst,last)=>{
					
					if(!last.isInput){
						falst+=1;//利用了computend的数据依赖特质。直接使用第一次获取的值。
						return falst
					}else{
						return falst
					}
					
					
				},0)
			}
		},
	})
	
	
	//数据监听
	vm.$watch('list', function () {
		console.log("asdfsd");
		
		// this.list.map(item=>{
			
		// 	console.log(list.lenth);
			
		// })
		
	});
})(window);
