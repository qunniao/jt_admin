let usrl =  decodeURI(location.search); //获取url中"?"符后的字串
            let labelid= usrl.split('&')[0].split('=')[1]
            // let labeltype =usrl.split('&')[1].split('=')[1]
            let fatherid =''
            function del(e){
                e.parentNode.parentNode.removeChild(e.parentNode);
            }
            if(labelid==0){
               
            }else{
                _ajax({
                    url : "/caseLabel/info/"+labelid,  // url---->地址
                    type : "GET",   // type ---> 请求方式
                    async : true,   // async----> 同步：false，异步：true 
                    data : {        //传入信息
                    },
                    success : function(data){   //返回接受信息
                        let datas =JSON.parse(data);
                            if(datas.code==200){
                                let showid=datas.data.pid
                                let labletext =datas.data.labelName
                                fatherid=datas.data.pid
                                let div =' <div style="float:left;width: 100px;height:120px;"><img id="cover" name="shoppics" style="width: 100px;height:100px;" src="'+datas.data.cover+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                                $('#demo2').html(div)
                                // $('#oneid').append('<option value="0" checked>最外层标签</option>')
                                // $('#oneid').val(datas.data.pid)
                                $('#labelNames').val(labletext)
                                renderForm()
                            }
                    }
                })                
            }
            layui.use('upload', function(){
                var $ = layui.jquery
                ,upload = layui.upload;
                upload.render({
                    elem: '#test2'
                    ,url: Url+'/file/addImage'
                    ,multiple: true
                    ,field:'files'
                    ,change: function(e, data) {//这个是选择文件的回调函数
                        if(data.upload.length > 2){//这里是判断选择文件的个数,根据实际情况设置
                            layer.alert('请选择单个文件!!!:', {//本人这里是用的layer插件提示用户
                                icon: 2,
                                skin: 'layer-ext-moon'
                            });
                            return false;
                        }
                    }
                    ,before: function(e, data) {//这个是选择文件的回调函数
                        if(e.upload.length > 2){//这里是判断选择文件的个数,根据实际情况设置
                            layer.alert('请选择单个文件!!!:', {//本人这里是用的layer插件提示用户
                                icon: 2,
                                skin: 'layer-ext-moon'
                            });
                            console.log('失败')
                            return false;
                        }
                    }
                    ,done: function(res){
                        // for(let i=0;i<res.data.length;i++){
                            let div =' <div style="float:left;width: 100px;height:120px;"><img  id="cover" name="shoppics" style="width: 100px;height:100px;" src="'+res.data+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                            $('#demo2').html(div)
                        // }
                    //上传完毕
                    }
                });
            })
            layui.use(['form', 'layer'],
            function() {
                $ = layui.jquery;
                var form = layui.form,
                layer = layui.layer;

                form.on('select(changepro)', function(data){
                   

                })
                //监听提交
                form.on('submit(add)',
                function(res) {
                    if($('#cover')[0]==undefined){
                        layer.msg('链接图标未上传', {icon: 5})
                        return false
                    }
                    if(labelid==0){
                        _ajax({
                            url : "/caseLabel/save",  // url---->地址
                            type : "POST",   // type ---> 请求方式
                            async : true,   // async----> 同步：false，异步：true 
                            data : {        //传入信息
                                labelName :res.field.labelName,
                                pid :0,
                                cover:$('#cover')[0].src
                            },
                            success : function(data){   //返回接受信息
                                let datas =JSON.parse(data);
                                if(datas.code==200){
                                    layer.msg('添加成功', {icon: 1},function(){
                                        closeiframe()
                                    }); 
                                }
                            }
                        })
                    }else{
                        _ajax({
                            url : "caseLabel/update",  // url---->地址
                            type : "POST",   // type ---> 请求方式
                            async : true,   // async----> 同步：false，异步：true 
                            data : {        //传入信息
                                bid:labelid,
                                labelName :res.field.labelName,
                                pid :0,
                                cover:$('#cover')[0].src
                            },
                            success : function(data){   //返回接受信息
                                let datas =JSON.parse(data);
                                if(datas.code==200){
                                    layer.msg('修改成功', {icon: 1},function(){
                                        closeiframe()
                                    }); 
                                }
                            }
                        })
                    }
                    return false;
                });

            });