## node 异步控制流程

### npm install async --save-dev

```js

function oneFun(){

	let ii = 0;
	setInterval(function(){

		console.log('aaa='+new Date());
		ii++;
		if(ii===3){

			clearInterval(this);
		}
	},2000);
	console.log('oneFun');
}

function twoFun(){

	let jj = 0;
	setInterval(function(){

		console.log('bbb='+new Date());
		jj++;
		if(jj===3){

			clearInterval(this);
		}
	},2000);
	console.log('twoFun');
}


function exec(){

	// 串行无关联方式
	async.series(
		{
			one:function(done) {

				let ii = 0;
				setInterval(function(){

					console.log('aaa='+new Date());
					ii++;
					if(ii===3){

						clearInterval(this);
						done(null,'one完毕')
					}
				},2000);
				
			},
			two:function(done) {

				let jj = 0;
				setInterval(function(){

					console.log('bbb='+new Date());
					jj++;
					if(jj===3){

						clearInterval(this);
						done(null,'two完毕')
					}
				},2000);
				
			}
		},function(err,data){

			console.log(err);
			console.log(data);
		}

	)

	//串行有关联
	async.waterfall([ //注意跟series的{}不一样，这里是数组形式

		function(callback){

			callback(null,'one')
		},
		function(callback){

			callback(null,'two')
		}
	],function(err,result){
		
		console.log(result)
	})
}

exec();
console.log('主进程执行完毕');
```