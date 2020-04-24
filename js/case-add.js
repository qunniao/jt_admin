//一般直接写在一个js文件中
// layui.use(['layer', 'form', 'layarea'], function () {
//     var layer = layui.layer
//         , form = layui.form
//         , layarea = layui.layarea;

//     layarea.render({
//         elem: '#area-picker',
//         change: function (res) {
//             //选择结果
//         }
//     });
// });
function del(e){
    e.parentNode.parentNode.removeChild(e.parentNode);
}
let casedivnum=0;
let ischeck=false
let usrl =  decodeURI(location.search); //获取url中"?"符后的字串
let caseid= usrl.split('&')[0].split('=')[1]
let caseshowid= usrl.split('&')[1].split('=')[1]
if(caseshowid==1){
    $('#savebtn').css('display','none')
}
if(caseid!=-1){
    ischeck=true
}


// 修改时获取案例详情
function getcasedetail(){
    _ajax({
        url : "case/info/"+caseid,  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
        },
        success : function(data){   //返回接受信息
            let datas =JSON.parse(data);
            if(datas.code==200){
                let div =' <div style="float:left;width: 100px;height:120px;"><img id="cover" name="shoppics" style="width: 100px;height:100px;" src="'+datas.data.cover+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                $('#demo2').html(div)
                $('#name').val(datas.data.name)
                let isrecimmend =0
                if(datas.data.recommend){
                    isrecimmend=1
                }
                $('#isRecommend').val(isrecimmend)
                $('#maxPrice').val(datas.data.maxPrice)
                $('#minPrice').val(datas.data.minPrice)
                let mobilepic = []
                if(datas.data.mobileDetail!=null&&datas.data.mobileDetail!=''){
                    mobilepic=datas.data.mobileDetail.split(',')
                }
                if(datas.data.address!=null&&datas.data.address!=undefined&&datas.data.address!=''){
                    let addressdata=datas.data.address.split(',')
                    $('#province').attr('data-value',addressdata[0])
                    $('#city').attr('data-value',addressdata[1])
                   $('#county').attr('data-value',addressdata[2])
                   // $('#province').val(addressdata[0]);
                   // $('#city').val(addressdata[1]);
                   //  $('#county').val(addressdata[2]);
                    layui.use(['layer', 'form', 'layarea'], function () {
                    var layer = layui.layer
                        , form = layui.form
                        , layarea = layui.layarea;

                    layarea.render({
                        elem: '#area-picker',
                        change: function (res) {
                            //选择结果
                        }
                    });
                });
                   if(addressdata.length>3){
                    $('#detailadress').val(addressdata[3])
                    }
                   console.log("province:"+addressdata[0]+""+"city:"+addressdata[1]+"county:"+addressdata[2]);
                  // renderForm()
               
                    
                    // console.log("provinc1:"+$('#province').val()+""+"city2:"+$('#city').val()+"county3:"+$('#county').val());
                    
                }
               
                let csseimglist =datas.data.caseImageList;
                for(let i=1;i<csseimglist.length;i++){
                    let div =' <div style="float:left;width: 100px;height:120px;"><img name="shoppics" style="width: 100px;height:100px;" src="'+csseimglist[i].url+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                    $('#demo4').append(div)
                }
                for(let i=0;i<mobilepic.length;i++){
                    let div =' <div style="float:left;width: 100px;height:120px;"><img name="mobileshoppics" style="width: 100px;height:100px;" src="'+mobilepic[i]+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                    $('#demo3').append(div)
                }
				if(datas.data.video!=null && datas.data.video!=''){
					 let videodiv =' <div style="float:left;width: 100px;height:120px;"><video  id="casevideo" name="casevideo" style="width: 100px;height:100px;" src="'+datas.data.video+'"></video><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
					 $('#demo5').html(videodiv)
				}
               
                let caseparamlist = datas.data.caseAttrs;
                for(let i=0;i<caseparamlist.length;i++){
                    casedivnum =1+i;
                    let casedivid= 'casediv'+casedivnum

                    console.log("案例属性casetwodiv");
                    let casetwodiv =[]
                    if(caseparamlist[i].attrValue!=null&&caseparamlist[i].attrValue!=''){
                        casetwodiv=caseparamlist[i].attrValue.split(',')
                        console.log(caseparamlist[i].attrValue);
                    }
                    
                   
                    let casediv=' <div name="casecsboxs" class="csbox" id="'+casedivid+'"><input style="width:120px;text-align:center" value="'+caseparamlist[i].attrName+'" placeholder="参数名"  name="casename" required="" lay-verify="required" autocomplete="off" class="layui-input"><input type="text" style="text-align:center" placeholder="参数值" value="'+casetwodiv[0]+'"  name="casenum" required="" lay-verify="required" autocomplete="off" class="layui-input">'+
                    ' <label>排序值（值越大排序越靠前）</label><input type="text" placeholder="排序值"  name="sort" value="'+caseparamlist[i].sort+'"  class="layui-input" style="width:60px;text-align:center"/> '+
                    '<label style="margin-left:20px;">首页显示（0为不显示，1为显示）</label><input type="text" placeholder="必须是0或1"  name="isRecommend" value="'+caseparamlist[i].isRecommend+'" class="layui-input" style="width:60px;text-align:center;margin-right:50px;"/> <label onclick="del(this)"> 删除</label></div>'
                    $('#caseattrbox').append(casediv)
                    for(let j=1;j<casetwodiv.length;j++){
                        let adddiv =' <div class="csboxtwo"><input type="text" value="'+casetwodiv[j]+'" placeholder="参数值"  style="width:200px;text-align:center" name="casenum" required="" lay-verify="required" autocomplete="off" class="layui-input">'
                        
                        $('#'+casedivid).append(adddiv)
                    }
                    
                }
                $("#layeditDemo").val(datas.data.content);
                layui.use('layedit', function () {
                    layedit = layui.layedit;
                    content = layedit.build('layeditDemo');
                });
                $('#protypeid').val(datas.data.tid)
                renderForm()
            }
        }
    })  
}
 //配置插件目录
 layui.config({
    base: './mods/'
    , version: '1.0'
});

// 分类下拉一级获取
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
            $('#protypeid').append(shopprolist)
            if(ischeck){
                ischeck=false;
                console.log("getcasedetail");
                getcasedetail()
            }else{
                layui.use(['layer', 'form', 'layarea'], function () {
                    var layer = layui.layer
                        , form = layui.form
                        , layarea = layui.layarea;

                    layarea.render({
                        elem: '#area-picker',
                        change: function (res) {
                            //选择结果
                        }
                    });
                });
            }
            renderForm()
        }
    }
})
// 添加案例属性
function addshopctwo(e){
    let adddiv =' <div class="csboxtwo"><input type="text" placeholder="参数值"  style="text-align:center" name="casenum" required="" lay-verify="required" autocomplete="off" class="c"><label onclick="del(this)"> 删除</label></div>'
    $('#'+e.id).append(adddiv)
}
function addcaseattr(){
    casedivnum +=1;
    let casedivid= 'casediv'+casedivnum
    let casediv=' <div name="casecsboxs" class="csbox" id="'+casedivid+'"><input type="text" placeholder="参数名"  name="casename" '+
    'class="layui-input" style="width:120px;text-align:center"><input type="text" style="text-align:center" placeholder="参数值"  name="casenum" required="" lay-verify="required" autocomplete="off" class="layui-input" style="width:200px;"> '+
    ' <label>排序值（值越大排序越靠前）</label><input type="text" placeholder="排序值"  name="sort" value="0"  class="layui-input" style="width:60px;text-align:center"/> '+
    '<label style="margin-left:20px;">首页显示（0为不显示，1为显示）</label><input type="text" placeholder="必须是0或1"  name="isRecommend" value="1" class="layui-input" style="width:60px;text-align:center;margin-right:50px;"/> <label onclick="del(this)"> 删除</label></div>'
    // let shopdiv = '<div class="csbox"><input type="text"  name="shopcsname" required="" lay-verify="required" autocomplete="off" class="layui-input"><input type="text"  name="shopcsnamestyle" required="" lay-verify="required" autocomplete="off" class="layui-input"><label onclick="del(this)"> 删除</label></div>'
    $('#caseattrbox').append(casediv)
}

layui.use('upload', function(){
    var $ = layui.jquery
    ,upload = layui.upload;
    upload.render({
        elem: '#test2'
        ,url: Url+'/file/addImage'
        ,multiple: true
        ,field:'files'
        ,size:5120
        ,number:1
        ,change: function(e, data) {//这个是选择文件的回调函数

        }
        ,before: function(e, data) {//这个是选择文件的回调函数

        }
        ,done: function(res){
            // for(let i=0;i<res.data.length;i++){
                let div =' <div style="float:left;width: 100px;height:120px;"><img id="cover" name="shoppics" style="width: 100px;height:100px;" src="'+res.data+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                $('#demo2').html(div)
            // }
        //上传完毕
        }
    });
    upload.render({
        elem: '#test4'
        ,url: Url+'/file/addImage'
        ,multiple: true
        ,field:'files'
        ,before: function(obj){
        //预读本地文件示例，不支持ie8
        // obj.preview(function(index, file, result){
        //     // $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
        //     let div =' <div style="float:left;width: 100px;height:120px;"><img name="shoppics" style="width: 100px;height:100px;" src="'+result+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
        //     $('#demo2').append(div)
        // });
        }
        ,done: function(res){
                let div =' <div style="float:left;width: 100px;height:120px;"><img name="shoppics" style="width: 100px;height:100px;" src="'+res.data+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                $('#demo4').append(div)
        //上传完毕
        }
    });
    upload.render({
        elem: '#test3'
        ,url: Url+'/file/addImage'
        ,multiple: true
        ,field:'files'
        ,size:5120
        ,before: function(obj){
        }
        ,done: function(res){
            let div =' <div style="float:left;width: 100px;height:120px;"><img name="mobileshoppics" style="width: 100px;height:100px;" src="'+res.data+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
            $('#demo3').append(div)
        //上传完毕
        }
    });
    upload.render({
        elem: '#test5'
        ,url: Url+'file/addImage'
        ,headers:{'token':localStorage.getItem('token')}
        ,multiple: true
        ,accept: 'video'
        ,field:'files'
        ,change: function(e, data) {//这个是选择文件的回调函数
            console.log(e)
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
            console.log(res)
            // for(let i=0;i<res.data.length;i++){
                // fileType=2
                let div =' <div style="float:left;width: 100px;height:120px;"><video  id="casevideo" name="casevideo" style="width: 100px;height:100px;" src="'+res.data+'"></video><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                $('#demo5').html(div)
            // }
        //上传完毕
        }
    });
})
layui.use(['layedit', 'layer', 'jquery'], function () {
    var $ = layui.jquery
        , layer = layui.layer
        , layedit = layui.layedit;
    layedit.set({
        //暴露layupload参数设置接口 --详细查看layupload参数说明
        uploadImage: {
            url: Url+'/file/addImage',
            accept: 'image',
            acceptMime: 'image/*',
            field:'files',
            exts: 'jpg|png|gif|bmp|jpeg',
            size: 1024 * 10,
            data: {
            }
            ,done: function (data) {
            }
        },
        uploadVideo: {
            url: 'your url',
            accept: 'video',
            acceptMime: 'video/*',
            exts: 'mp4|flv|avi|rm|rmvb',
            size: 1024 * 10 * 2,
            done: function (data) {
            }
        }
        , uploadFiles: {
            url:Url+'banner/addFile',
            accept: 'file',
            acceptMime: 'file/*',
            size: '20480',
            autoInsert: true , //自动插入编辑器设置
            done: function (data) {
                // console.log(data);
            }
        }
        //右键删除图片/视频时的回调参数，post到后台删除服务器文件等操作，
        //传递参数：
        //图片： imgpath --图片路径
        //视频： filepath --视频路径 imgpath --封面路径
        //附件： filepath --附件路径
        , calldel: {
            // url: 'your url',
            // done: function (data) {
            //     console.log(data);
            // }
        }
        , rightBtn: {
            type: "layBtn",//default|layBtn|custom  浏览器默认/layedit右键面板/自定义菜单 default和layBtn无需配置customEvent
            customEvent: function (targetName, event) {
                //根据tagName分类型设置
                switch (targetName) {
                    case "img":
                        alert("this is img");
                        break;
                    default:
                        alert("hello world");
                        break;
                };
                //或者直接统一设定
                //alert("all in one");
            }
        }
        //测试参数
        , backDelImg: true
        //开发者模式 --默认为false
        , devmode: true
        //是否自动同步到textarea
        , autoSync: true
        //内容改变监听事件
        , onchange: function (content) {
            // console.log(content);
        }
        //插入代码设置 --hide:false 等同于不配置codeConfig
        , codeConfig: {
            hide: true,  //是否隐藏编码语言选择框
            default: 'javascript', //hide为true时的默认语言格式
            encode: true //是否转义
            ,class:'layui-code' //默认样式
        }
        //新增iframe外置样式和js
        , quote:{
            // style: ['Content/css.css'],
            //js: ['/Content/Layui-KnifeZ/lay/modules/jquery.js']
        }
        , customlink:{
            title: '插入layui官网'
            , href: 'https://www.layui.com'
            ,onmouseup:''
        }
        , facePath: 'http://knifez.gitee.io/kz.layedit/Content/Layui-KnifeZ/'
        , devmode: true
        , videoAttr: ' preload="none" ' 
        , tool: [
            'undo', 'redo', 'code', 'strong', 'italic', 'underline', 'del', 'addhr', '|','removeformat', 'fontFomatt', 'fontfamily','fontSize', 'fontBackColor', 'colorpicker', 'face'
            , '|', 'left', 'center', 'right', '|', 'link', 'unlink', 'images', 'image_alt', 'attachment', 'anchors'
            , '|'
            , 'table','customlink'
            , 'fullScreen','preview'
        ]
        , height: '500px'
    });
var ieditor = layedit.build('layeditDemo');
})
layui.use(['form', 'layer'],
function() {
    $ = layui.jquery;
    var form = layui.form,
    layer = layui.layer;

    //监听提交
    form.on('submit(add)',
    function(data) {
        let casecslength=[]//获取所有案例的最外层id
        let caseparam =[]//案例属性
        let mobileurl='' //手机端详情图
        let shoppic=[] //案例轮播图
        let casevideo =''
        // let skulist =[];
        // 案例视频
        if($('#casevideo')[0]!=undefined){
            casevideo=$('#casevideo')[0].src
        }
        // let skulist =[];
        // 产品轮播图
        $("div[name='casecsboxs']").each(function(j,item){
            casecslength.push(item.id)
        });
        for(let i=0;i<casecslength.length;i++){
            $("#"+casecslength[i]).each(function(j,item){
                $("#"+casecslength[i]+" input[name='casename']").each(function(j,item){
                    let paramkey ={
                        name:item.value,
                        value:''
                    }
                    caseparam.push(paramkey)
                })
                $("#"+casecslength[i]+" input[name='casenum']").each(function(j,item){
                    if(j==0){
                        caseparam[i].value=''+item.value
                    }else{
                        caseparam[i].value+=","+item.value
                    }
                })
                $("#"+casecslength[i]+" input[name='sort']").each(function(j,item){
                    console.log("sort:"+item.value);
                    if(item.value==null || item.value==""){
                        layer.msg('请输入小于99的排序值', {icon: 5})
                        console.log("sort 测试2");
                        return false;
                    }
                    
                    if(isNaN(item.value)){
                        layer.msg('排序只能输入小于99的数字', {icon: 5})
                        console.log("sort 测试4");
                        return false;
                    }
                    caseparam[i].name+="###"+item.value
                    console.log("sort 测试5");
                })
                $("#"+casecslength[i]+" input[name='isRecommend']").each(function(j,item){
                    console.log("isRecommend:"+item.value);
                    if(item.value==null || item.value==""){
                        layer.msg('首页显示只能输入0或者1', {icon: 5})
                        console.log("isRecommend 测试1");
                        return false;
                    }
                 
                    if(item.value == '0' || item.value == '1'){
                        caseparam[i].name+="###"+item.value
                        console.log("name:"+caseparam[i].name+" value:"+caseparam[i].value);
                    }else{
                        layer.msg('首页显示只能输入0或者1', {icon: 5})
                        console.log("isRecommend 测试3");
                        return false
                    }
                
                    
                    
                   
                })
            });
        }
        console.log("caseparam");
        console.log(caseparam);

        $("img[name='shoppics']").each(function(j,item){
            if(j==0){
                let imgdata={
                    isCover:1,
                    url:item.src,
                    flag:0
                }
                shoppic.push(imgdata)
            }else{
                let imgdata={
                    isCover:0,
                    url:item.src,
                    flag:0
                }
                shoppic.push(imgdata)
            }
        });
       
        $("img[name='mobileshoppics']").each(function(j,item){
            if(j==0){
                mobileurl+=item.src
            }else{
                mobileurl+=","+item.src
            }
        });
        if($('#cover')[0]==undefined){
            layer.msg('图片未上传', {icon: 5})
            return false
        }
        
        if(caseid!=-1){
            let recommend =false;
            if(data.field.isRecommend==1){
                recommend=true
            }
            let pushadress =data.field.province+','+data.field.city+','+data.field.county+','+data.field.detailadress
            let maxPrice =Number(data.field.maxPrice)
            let minPrice =Number(data.field.minPrice)
            if(maxPrice==0){
                maxPrice=''
            }
            let pushdatas ={
                cid:caseid,
                sid:0,
                address:pushadress,
                recommend:recommend,
                name:data.field.name,
                caseImageList:shoppic,
                video:casevideo,
                maxPrice:maxPrice,
                minPrice:minPrice,
                tid:data.field.protypeid,
                cover:$('#cover')[0].src,
                mobileDetail:mobileurl,
                attrs:caseparam,
                content:data.field.layeditDemo
            }
            putJSON("case/update",JSON.stringify(pushdatas),function(data){
                if(data.code==200){
                    layer.msg('修改成功', {icon: 1},function(){
                            closeiframe()
                    });
                }else{
                    layer.msg('修改失败', {icon: 5})
                }
            })                       
        }else{
            let recommend =false;
            if(data.field.isRecommend==1){
                recommend=true
            }
            let pushadress =data.field.province+','+data.field.city+','+data.field.county+','+data.field.detailadress
            let pushdatas ={
                recommend:recommend,
                name:data.field.name,
                caseImageList:shoppic,
                video:casevideo,
                sid:0,
                address:pushadress,
                maxPrice:data.field.maxPrice,
                minPrice:data.field.minPrice,
                tid:data.field.protypeid,
                cover:$('#cover')[0].src,
                mobileDetail:mobileurl,
                attrs:caseparam,
                content:data.field.layeditDemo
            }
            postJSON("case/save",JSON.stringify(pushdatas),function(data){
                if(data.code==200&&data.data==true){
                    layer.msg('添加成功', {icon: 1},function(){
                        closeiframe()
                    });
                }else{
                    layer.msg('添加失败', {icon: 5})
                }
            })
        }
        return false;
    });

});