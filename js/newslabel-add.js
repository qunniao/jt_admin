let usrl =  decodeURI(location.search); //获取url中"?"符后的字串
            let labelid= usrl.split('&')[0].split('=')[1]
            let fatherid =''
            if(labelid!=0){
                _ajax({
                        url : "/newsTypes/info/"+labelid,  // url---->地址
                        type : "GET",   // type ---> 请求方式
                        async : true,   // async----> 同步：false，异步：true 
                        data : {        //传入信息
                        },
                        success : function(data){   //返回接受信息
                            let datas =JSON.parse(data);
                            if(datas.code==200){
                                $('#labelNames').val(datas.data.name)
                                $('#sort').val(datas.data.sort)
                                renderForm()
                            }
                        }
                    })
            }
            // $('#oneid').val(0)
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
                    if(labelid==0){
                        _ajax({
                            url : "newsTypes/save",  // url---->地址
                            type : "POST",   // type ---> 请求方式
                            async : true,   // async----> 同步：false，异步：true 
                            data : {        //传入信息
                                name :res.field.labelName,
                                sort :res.field.sort
                            },
                            success : function(data){   //返回接受信息
                                let datas =JSON.parse(data);
                                if(datas.code==200){
                                    layer.msg('添加成功', {icon: 1},function(){
                                        xadmin.close()
                                    }); 
                                }else{
                                    layer.msg('添加失败', {icon: 5})
                                }
                            }
                        })
                    }else{
                        _ajax({
                            url : "newsTypes/update",  // url---->地址
                            type : "POST",   // type ---> 请求方式
                            async : true,   // async----> 同步：false，异步：true 
                            data : {        //传入信息
                                id:labelid,
                                name :res.field.labelName,
                                sort :res.field.sort
                            },
                            success : function(data){   //返回接受信息
                                let datas =JSON.parse(data);
                                if(datas.code==200){
                                    layer.msg('修改成功', {icon: 1},function(){
                                        xadmin.close()
                                    }); 
                                }else{
                                    layer.msg('修改失败', {icon: 5})
                                }
                            }
                        })
                    }
                    return false;
                });

            });