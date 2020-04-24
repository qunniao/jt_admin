let usrl =  decodeURI(location.search); //获取url中"?"符后的字串
let labelid= usrl.split('&')[0].split('=')[1]
let labeltype =usrl.split('&')[1].split('=')[1]
let fatherid =''
if(labeltype==1){
    if(labelid==0){
        $('#oneid').append('<option value="0" checked>最外层标签</option>')
        renderForm()
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
                    // let showid=datas.data.pid
                    // let labletext =datas.data.labelName
                    $('#oneid').append('<option value="'+datas.data.bid+'" checked>'+datas.data.labelName+'</option>')
                    renderForm()
                }
            }
        })
    }
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
                    if(datas.data.pid==0){
                        $('#oneid').append('<option value="0" checked>最外层标签</option>')
                    }else{
                        _ajax({
                                url : "/caseLabel/list",  // url---->地址
                                type : "GET",   // type ---> 请求方式
                                async : true,   // async----> 同步：false，异步：true 
                                data : {        //传入信息
                                    pageNum:1,
                                    size:10,
                                    pid :0
                                },
                                success : function(data){   //返回接受信息
                                    let datas =JSON.parse(data);
                                    if(datas.code==200){
                                        let shopprolist =''
                                        for(let i=0;i<datas.data.length;i++){
                                            let optiondiv = '<option value="'+datas.data[i].bid+'">'+datas.data[i].labelName+'</option>'
                                            shopprolist+=optiondiv
                                        }
                                        $('#oneid').append(shopprolist)
                                        $('#oneid').val(showid)
                                        renderForm()
                                    }
                                }
                        })
                    }
                    // $('#oneid').val(datas.data.pid)
                    $('#labelNames').val(labletext)
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
        console.log(res.field.labelName)
        if(labeltype==1){
            _ajax({
                url : "/caseLabel/save",  // url---->地址
                type : "POST",   // type ---> 请求方式
                async : true,   // async----> 同步：false，异步：true 
                data : {        //传入信息
                    labelName :res.field.labelName,
                    pid :res.field.pid
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
                    pid :res.field.pid
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