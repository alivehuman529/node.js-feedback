var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
   {
	name: '张三2',
    message: '今天天气不错！',
    dateTime: '2020-10-13'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2020-10-13'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2020-10-13'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2020-10-13'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2020-10-13'
  },
  {
    name: '张三6',
    message: '今天天气不错！',
    dateTime: '2020-10-13'
  }
]


http
	.createServer(function (req,res){
		var parseObj = url.parse(req.url,true)

		var pathname = parseObj.pathname
		
		if (pathname === '/'){
			fs.readFile('./views/index.html',function (err,data){
				if (err) {
					return res.end('404 Not Found.')
				}
				var htmlStr = template.render(data.toString(),{
					comments:comments
				})
				res.end(htmlStr)
			})
		} else if (pathname==='/post'){
			 fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
		} else if (pathname.indexOf('/public/')===0) {
			fs.readFile('.' + pathname,function (err,data){
				if (err) {
					return res.end('404 Not Found')
				}
				res.end(data)
			})
		} else if (pathname == '/pinglun') {
			// console.log('收到表单请求',parseObj.query)
			// res.end(JSON.stringify(parseObj.query))
			var comment = parseObj.query
			comment.dateTime = '2020-10-13'
			comments.unshift(comment)
			res.statusCode = 302
			res.setHeader('Location','/')
			res.end()
		}else{
			fs.readFile('./views/404.html',function(err,data){
				if (err) {
					return res.end('404')
				}
				res.end(data)
			})
		}
	})
	.listen(3000,function () {
		console.log('running......'+'http://127.0.0.1:3000/')
	})