let usrl =  decodeURI(location.search); //获取url中"?"符后的字串
let userid= usrl.split('&')[0].split('=')[1]
_ajax({
    url : "users/info/"+userid,  // url---->地址
    type : "GET",   // type ---> 请求方式
    async : true,   // async----> 同步：false，异步：true 
    data : {        //传入信息
    },
    success : function(data){
        // $('#nickname').html(data.data.nickname) 
        let userdatas = JSON.parse(data);
        if(userdatas.code==200){
            let userdetail =userdatas.data
            let usersex ='保密'
            if(userdetail.gender==1){
                usersex ='男'
            }else if(userdetail.gender==2){
                usersex='女'
            }
            $('#usersex').html(usersex)//昵称
            $('#nickname').html(userdetail.nickname)//昵称
            $('#phone').html(userdetail.phone)//手机号
            $('#name').html(userdetail.username)//名字
            $('#birth').html(userdetail.birth)//邮箱
            $('#email').html(userdetail.email)//邮箱
            $('#signature').html(userdetail.signature)//个性签名
            $("#userCover").attr('src',userdetail.cover); //用户头像图片
            
        }
    }
})
// 选项卡
layui.use('element', function(){
    var $ = layui.jquery
    ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
    
    //触发事件
    var active = {
        tabAdd: function(){
        //新增一个Tab项
        element.tabAdd('demo', {
            title: '新选项'+ (Math.random()*1000|0) //用于演示
            ,content: '内容'+ (Math.random()*1000|0)
            ,id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
        })
        }
        ,tabDelete: function(othis){
        //删除指定Tab项
        element.tabDelete('demo', '44'); //删除：“商品管理”
        
        
        othis.addClass('layui-btn-disabled');
        }
        ,tabChange: function(){
            console.log(123)
        //切换到指定Tab项
        element.tabChange('demo', '22'); //切换到：用户管理
        }
    };
    
    $('.site-demo-active').on('click', function(){
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });
    
    //Hash地址的定位
    var layid = location.hash.replace(/^#test=/, '');
    element.tabChange('test', layid);
    
    element.on('tab(demo)', function(data){
        if(data.index==1){
            layui.use(['table'], function(){
                    var table = layui.table //表格
                    table.render({
                    elem: '#demo1'
                    ,height: 1200
                    ,url: Url+'cardHistory/list' //数据接口
                    ,request: {
                        pageName: 'current' //页码的参数名称，默认：page
                        ,limitName: 'size' //每页数据量的参数名，默认：limit
                    },parseData: function(res){ //res 即为原始返回的数据
                        return {
                            "code": res.status, //解析接口状态
                            "msg": res.descripition, //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.records //解析数据列表
                        };
                    },where:{
                        uid:userid,
                        type:0
                    }
                    ,response: {
                        statusName: 'code' //数据状态的字段名称，默认：code
                        ,statusCode: 0 //成功的状态码，默认：0
                        ,msgName: 'msg' //状态信息的字段名称，默认：msg
                        ,countName: 'count' //数据总数的字段名称，默认：count
                        ,dataName: 'data' //数据列表的字段名称，默认：data
                    }
                    ,title: '用户表'
                    ,page: true //开启分页
                    ,toolbar: 'false' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
                    ,totalRow: false //开启合计行
                    ,cols: [[ //表头
                        {field: 'id', title: '编号', width:80, fixed: 'left'}
                        ,{field: 'cover', title: '头像', width:160,toolbar: '#coverone'}
                        ,{field: 'username', title: '用户名', width: 90}
                        ,{field: 'gmtCreate', title: '访问日期', width:150}
                        ,{field: 'phone', title: '手机号', width: 150}
                    ]]
                });
            })
        }else if(data.index==2){
            layui.use(['table'], function(){
                    var table = layui.table //表格
                    table.render({
                    elem: '#demo2'
                    ,height: 1200
                    ,url: Url+'cardHistory/list' //数据接口
                    ,request: {
                        pageName: 'current' //页码的参数名称，默认：page
                        ,limitName: 'size' //每页数据量的参数名，默认：limit
                    },parseData: function(res){ //res 即为原始返回的数据
                        return {
                            "code": res.status, //解析接口状态
                            "msg": res.descripition, //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.records //解析数据列表
                        };
                    },where:{
                        uid:userid,
                        type:1
                    }
                    ,response: {
                        statusName: 'code' //数据状态的字段名称，默认：code
                        ,statusCode: 0 //成功的状态码，默认：0
                        ,msgName: 'msg' //状态信息的字段名称，默认：msg
                        ,countName: 'count' //数据总数的字段名称，默认：count
                        ,dataName: 'data' //数据列表的字段名称，默认：data
                    }
                    ,title: '用户表'
                    ,page: true //开启分页
                    ,toolbar: 'false' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
                    ,totalRow: false //开启合计行
                    ,cols: [[ //表头
                        {field: 'id', title: '编号', width:80, fixed: 'left'}
                        ,{field: 'cover', title: '头像', width:160,toolbar: '#coverone'}
                        ,{field: 'username', title: '用户名', width: 90}
                        ,{field: 'gmtCreate', title: '访问日期', width:150}
                        ,{field: 'phone', title: '手机号', width: 150}
                    ]]
                });
            })
        }if(data.index==3){
            layui.use(['table'], function(){
                    var table = layui.table //表格
                    table.render({
                    elem: '#demo3'
                    ,height: 1200
                    ,url: Url+'orderInfo/order' //数据接口
                    ,request: {
                    pageName: 'pageNum' //页码的参数名称，默认：page
                    ,limitName: 'size' //每页数据量的参数名，默认：limit
                    },parseData: function(res){ //res 即为原始返回的数据
                        return {
                            "code": res.status, //解析接口状态
                            "msg": res.descripition, //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.records //解析数据列表
                        };
                    },where:{
                        uid:userid
                    }
                    ,response: {
                    statusName: 'code' //数据状态的字段名称，默认：code
                    ,statusCode: 0 //成功的状态码，默认：0
                    ,msgName: 'msg' //状态信息的字段名称，默认：msg
                    ,countName: 'count' //数据总数的字段名称，默认：count
                    ,dataName: 'data' //数据列表的字段名称，默认：data
                    }
                    ,title: '用户表'
                    ,page: true //开启分页
                    ,toolbar: 'false' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
                    ,totalRow: false //开启合计行
                    ,cols: [[ //表头
                        {field: 'oid', title: '编号', width:80, fixed: 'left'}
                        ,{field: 'order_number', title: '订单号', width:300}
                        ,{field: 'nickname', title: '用户名', width: 90}
                        ,{field: 'total_price', title: '总价格', width:80}
                        ,{field: 'pay_money', title: '实际付款', width: 80}
                        ,{field: 'gmt_modified', title: '付款时间', width:150,toolbar: '#timeone'} 
                        ,{field: 'order_state', title: '订单状态', width: 100,toolbar: '#orderstate'}
                        ,{field: 'gmt_create', title: '创建时间', width: 150,toolbar: '#timetwo'}
                    ]]
                });
            })
        }else if(data.index==4){
            layui.use(['table'], function(){
                    var table = layui.table //表格
                    table.render({
                    elem: '#demo4'
                    ,height: 1200
                    ,url: Url+'orderModule/list' //数据接口
                    ,request: {
                        pageName: 'current' //页码的参数名称，默认：page
                        ,limitName: 'size' //每页数据量的参数名，默认：limit
                    },parseData: function(res){ //res 即为原始返回的数据
                        return {
                            "code": res.status, //解析接口状态
                            "msg": res.descripition, //解析提示文本
                            "count": res.data.total, //解析数据长度
                            "data": res.data.records //解析数据列表
                        };
                    },where:{
                        uid:userid
                    }
                    ,response: {
                        statusName: 'code' //数据状态的字段名称，默认：code
                        ,statusCode: 0 //成功的状态码，默认：0
                        ,msgName: 'msg' //状态信息的字段名称，默认：msg
                        ,countName: 'count' //数据总数的字段名称，默认：count
                        ,dataName: 'data' //数据列表的字段名称，默认：data
                    }
                    ,title: '用户表'
                    ,page: true //开启分页
                    ,toolbar: 'false' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
                    ,totalRow: false //开启合计行
                    ,cols: [[ //表头
                        {field: 'id', title: '编号', width:80, fixed: 'left'}
                        ,{field: 'gmt_create', title: '报价时间', width:160,toolbar: '#timeone'}
                        ,{field: 'username', title: '用户名', width: 90}
                        ,{field: 'type_name', title: '项目类型', width:150}
                        ,{field: 'total_price', title: '总价格', width: 80}
                        ,{field: 'duration', title: '开发时间（工作日）', width:150} 
                    ]]
                });
            })
        }
    });
    
    });
function del(e){
    e.parentNode.parentNode.removeChild(e.parentNode);
    }