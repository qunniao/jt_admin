
    layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider','form'], function(){
    var laydate = layui.laydate //日期
    ,laypage = layui.laypage //分页
    ,layer = layui.layer //弹层
    ,table = layui.table //表格
    ,carousel = layui.carousel //轮播
    ,upload = layui.upload //上传
    ,element = layui.element //元素操作
    ,slider = layui.slider //滑块
  
  //监听Tab切换
  element.on('tab(demo)', function(data){
    layer.tips('切换了 '+ data.index +'：'+ this.innerHTML, this, {
      tips: 1
    });
  });
  
  //执行一个 table 实例
  table.render({
    elem: '#demo'
    ,height: 1200
    ,url: Url+'case/list' //数据接口
    ,request: {
      pageName: 'current' //页码的参数名称，默认：page
      ,limitName: 'size' //每页数据量的参数名，默认：limit
    },parseData: function(res){ //res 即为原始返回的数据
      // console.log(res.data.le)
      return {
        "code": res.code, //解析接口状态
        "msg": res.message, //解析提示文本
        "count": res.data.total, //解析数据长度
        "data": res.data.records //解析数据列表
      };
    }
    ,response: {
      statusName: 'code' //数据状态的字段名称，默认：code
      ,statusCode: 200 //成功的状态码，默认：0
      ,msgName: 'msg' //状态信息的字段名称，默认：msg
      ,countName: 'count' //数据总数的字段名称，默认：count
      ,dataName: 'data' //数据列表的字段名称，默认：data
    }
    ,title: '用户表'
    ,page: true //开启分页
    ,toolbar: 'false' //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
    ,totalRow: false //开启合计行
    ,cols: [[ //表头
      {type: 'checkbox', fixed: 'left',toolbar: '#checkbox'}
      ,{field: 'cid', title: '编号', width:80, fixed: 'left'}
      ,{field: 'name', title: '案例名称', width:300}
      ,{field: 'cover', title: '主图', width: 100,height:100,toolbar: '#imgcover'}
      // ,{field: 'total_price', title: '分类', width:80}
      ,{field: 'minPrice', title: '最低价格', width: 80}
      ,{field: 'maxPrice', title: '最高价格', width: 80}
      ,{field: 'gmtCreate', title: '创建时间', width:150} 
      ,{field: 'recommend', title: '是否推荐', width:150,toolbar: '#isrecommend'} 
      ,{fixed: 'right', width: 165, align:'center', toolbar: '#barDemo'}
    ]]
  });
  
  //监听头工具栏事件
  table.on('toolbar(demo)', function(obj){
    var checkStatus = table.checkStatus(obj.config.id)
    ,data = checkStatus.data; //获取选中的数据
    switch(obj.event){
      case 'add':
        layer.msg('添加');
      break;
      case 'update':
        if(data.length === 0){
          layer.msg('请选择一行');
        } else if(data.length > 1){
          layer.msg('只能同时编辑一个');
        } else {
          layer.alert('编辑 [id]：'+ checkStatus.data[0].id);
        }
      break;
      case 'delete':
        if(data.length === 0){
          layer.msg('请选择一行');
        } else {
          layer.msg('删除');
        }
      break;
    };
  });
  
  $('#search_hash').on('click', function () {
    pageNum=1
    table.reload('demo', {
      where: {
        // name:$("#searchstatus").val(),
        orderState:$("#searchid").val(),
      }
      ,page: {
        curr:pageNum
      }
    });
    return false
            
  });
  $('#del').on('click', function  (argument) {
        var ids = [];
        let checkdata=layui.table.checkStatus('demo').data
        for(let i=0;i<checkdata.length;i++){
          ids.push(checkdata[i].cid)
        }
  
        layer.confirm('确认要删除吗？'+ids.toString(),function(index){
          _ajax({
                    url : "case/delete",  // url---->地址
                    type : "DELETE",   // type ---> 请求方式
                    async : true,   // async----> 同步：false，异步：true 
                    data : {        //传入信息
                      cIds :ids,
                    },
                    success : function(data){  
                      let datas =JSON.parse(data);
                      if(datas.code==200){
                          layer.msg('删除成功', {icon: 1});
                          pageNum=1
                          table.reload('demo', {
                            where: {
                            }
                            ,page: {
                              curr:pageNum
                            }
                          });
                        }
                    }
            })
        });
      }
    );
})
layui.use(['laydate','form'], function(){
        var laydate = layui.laydate;
        var  form = layui.form;


        // 监听全选
        form.on('checkbox(checkall)', function(data){

          if(data.elem.checked){
            $('table input').prop('checked',true);
          }else{
            $('table input').prop('checked',false);
          }
          form.render('checkbox');
        }); 
        
        //执行一个laydate实例
        laydate.render({
          elem: '#start' //指定元素
        });

        //执行一个laydate实例
        laydate.render({
          elem: '#end' //指定元素
        });


      });

