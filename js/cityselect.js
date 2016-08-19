/*
url:省市数据josn文件路径
prov:默认省份
city:默认城市
dist:默认地区（县）
nodata:无数据状态
required:必选项
*/
(function($) {
    $.fn.citySelect = function(settings) {
        if (this.length < 1) {
            return; };

        // 默认值
        settings = $.extend({
            url: {
                "citylist": [{
                    'p': '广东',
                    'c': [{
                        'n': '广州'
                    }, {
                        'n': '深圳'
                    }, {
                        'n': '佛山'
                    }, {
                        'n': '东莞'
                    }, {
                        'n': '惠州'
                    }, {
                        'n': '中山'
                    }, {
                        'n': '江门'
                    }, {
                        'n': '汕头'
                    }, {
                        'n': '湛江'
                    }, {
                        'n': '梅州'
                    }, {
                        'n': '阳江'
                    }, {
                        'n': '河源'
                    }, {
                        'n': '韶关'
                    }, {
                        'n': '肇庆'
                    }, {
                        'n': '珠海'
                    }, {
                        'n': '茂名'
                    }, ]
                }, {
                    'p': '广西',
                    'c': [{
                        'n': '南宁'
                    }, {
                        'n': '柳州'
                    }, {
                        'n': '桂林'
                    }, {
                        'n': '百色'
                    }, {
                        'n': '梧州'
                    }, ]
                }, {
                    'p': '海南',
                    'c': [{
                        'n': '海口'
                    }, {
                        'n': '三亚'
                    }]
                }]
            },
            prov: null,
            city: null,
            dist: null,
            nodata: null,
            required: true
        }, settings);

        var box_obj = this;
        var prov_obj = box_obj.find(".prov");
        var city_obj = box_obj.find(".city");
        var dist_obj = box_obj.find(".dist");
        var prov_val = settings.prov;
        var city_val = settings.city;
        var dist_val = settings.dist;
        var select_prehtml = (settings.required) ? "" : "<option value=''>请选择</option>";
        var city_json;

        // 赋值市级函数
        var cityStart = function() {
            var prov_id = prov_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
            };
            city_obj.empty().attr("disabled", true);
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || typeof(city_json.citylist[prov_id].c) == "undefined") {
                if (settings.nodata == "none") {
                    //city_obj.css("display","none");
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    city_obj.css("visibility", "hidden");
                    dist_obj.css("visibility", "hidden");
                };
                return;
            };

            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist[prov_id].c, function(i, city) {
                temp_html += "<option value='" + city.n + "'>" + city.n + "</option>";
            });
            city_obj.html(temp_html).attr("disabled", false).css({ "display": "", "visibility": "" });
            distStart();
        };

        // 赋值地区（县）函数
        var distStart = function() {
            var prov_id = prov_obj.get(0).selectedIndex;
            var city_id = city_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
                city_id--;
            };
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || city_id < 0 || typeof(city_json.citylist[prov_id].c[city_id].a) == "undefined") {
                if (settings.nodata == "none") {
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    dist_obj.css("visibility", "hidden");
                };
                return;
            };

            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist[prov_id].c[city_id].a, function(i, dist) {
                temp_html += "<option value='" + dist.s + "'>" + dist.s + "</option>";
            });
            dist_obj.html(temp_html).attr("disabled", false).css({ "display": "", "visibility": "" });
        };

        var init = function() {
            // 遍历赋值省份下拉列表
            temp_html = select_prehtml;
            $.each(city_json.citylist, function(i, prov) {
                temp_html += "<option value='" + prov.p + "'>" + prov.p + "</option>";
            });
            prov_obj.html(temp_html);

            // 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
            setTimeout(function() {
                if (settings.prov != null) {
                    prov_obj.val(settings.prov);
                    cityStart();
                    setTimeout(function() {
                        if (settings.city != null) {
                            city_obj.val(settings.city);
                            distStart();
                            setTimeout(function() {
                                if (settings.dist != null) {
                                    dist_obj.val(settings.dist);
                                };
                            }, 1);
                        };
                    }, 1);
                };
            }, 1);

            // 选择省份时发生事件
            prov_obj.bind("change", function() {
                cityStart();
                //alert($('#form_prov').val());
                if ($('#form_prov').val() == "北京") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="北京海联力捷汽车销售服务有限公司">北京海联力捷汽车销售服务有限公司</option>' +
                        '<option value="北京上地四方汽车销售服务有限公司">北京上地四方汽车销售服务有限公司</option>' +
                        '<option value="北京鑫万维富达汽车销售有限公司">北京鑫万维富达汽车销售有限公司</option>' +
                        '<option value="北京海联力通经贸有限公司">北京海联力通经贸有限公司</option>' +
                        '<option value="北京鑫万维汽车经贸有限公司">北京鑫万维汽车经贸有限公司</option>' +
                        '<option value="北京市天达汽车修理有限公司">北京市天达汽车修理有限公司</option>' +
                        '<option value="北京德奥达一众汽车销售有限公司">北京德奥达一众汽车销售有限公司</option>' +
                        '<option value="北京博瑞祥泰汽车销售服务有限公司">北京博瑞祥泰汽车销售服务有限公司</option>' +
                        '<option value="北京友联威科汽车销售服务有限公司">北京友联威科汽车销售服务有限公司</option>' +
                        '<option value="北京运通嘉恩汽车销售服务有限公司">北京运通嘉恩汽车销售服务有限公司</option>' +
                        '<option value="北京长久博众汽车销售服务有限公司">北京长久博众汽车销售服务有限公司</option>' +
                        '<option value="北京庆洋惠众汽车服务有限公司">北京庆洋惠众汽车服务有限公司</option>' +
                        '<option value="北京运通兴恩汽车销售服务有限公司">北京运通兴恩汽车销售服务有限公司</option>' +
                        '<option value="北京运通博恩汽车销售服务有限公司">北京运通博恩汽车销售服务有限公司</option>' +
                        '<option value="北京北方华驿车辆销售服务有限公司">北京北方华驿车辆销售服务有限公司</option>' +
                        '<option value="北京庆洋汽车服务有限公司">北京庆洋汽车服务有限公司</option>' +
                        '<option value="北京骏宝威汽车贸易有限公司">北京骏宝威汽车贸易有限公司</option>' +
                        '<option value="北京冀东丰汽车销售服务有限公司">北京冀东丰汽车销售服务有限公司</option>' +
                        '<option value="北京首汽腾鹏汽车销售服务有限公司">北京首汽腾鹏汽车销售服务有限公司</option>' +
                        '<option value="北京东仁金舆汽车销售服务有限公司">北京东仁金舆汽车销售服务有限公司</option>' +
                        '<option value="北京亚之杰伯乐汽车销售服务有限公司">北京亚之杰伯乐汽车销售服务有限公司</option>' +
                        '<option value="北京鑫港汇众汽车销售服务有限公司">北京鑫港汇众汽车销售服务有限公司</option>' +
                        '<option value="北京捷亚泰万兴汽车销售有限公司">北京捷亚泰万兴汽车销售有限公司</option>' +
                        '<option value="北京捷亚泰中兴汽车销售有限公司">北京捷亚泰中兴汽车销售有限公司</option>' +
                        '<option value="北京捷亚泰中盛汽车销售有限公司">北京捷亚泰中盛汽车销售有限公司</option>' +
                        '<option value="北京汽车贸易中心有限公司">北京汽车贸易中心有限公司</option>' +
                        '<option value="北京博瑞祥弘汽车销售服务有限公司">北京博瑞祥弘汽车销售服务有限公司</option>' +
                        '<option value="北京华昌汽车销售服务有限公司">北京华昌汽车销售服务有限公司</option>' +
                        '<option value="北京华信宏业商贸有限公司">北京华信宏业商贸有限公司</option>' +
                        '<option value="北京东方华正汽车销售服务有限公司">北京东方华正汽车销售服务有限公司</option>' +
                        '<option value="北京市良乡万达工贸有限公司">北京市良乡万达工贸有限公司</option>' +
                        '<option value="北京硕川汽车销售服务有限公司">北京硕川汽车销售服务有限公司</option>' +
                        '<option value="北京博瑞祥恒汽车销售有限公司">北京博瑞祥恒汽车销售有限公司</option>' +
                        '<option value="北京捷亚泰汽贸有限公司">北京捷亚泰汽贸有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "安徽") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="马鞍山福联和县分公司">马鞍山福联和县分公司</option>' +
                        '<option value="合肥大步巢湖分公司">合肥大步巢湖分公司</option>' +
                        '<option value="阜阳恒大旭日颍上分公司">阜阳恒大旭日颍上分公司</option>' +
                        '<option value="滁州正丰天长分公司">滁州正丰天长分公司</option>' +
                        '<option value="安徽省大步新海大道分公司">安徽省大步新海大道分公司</option>' +
                        '<option value="安徽亚特汽车销售服务有限公司">安徽亚特汽车销售服务有限公司</option>' +
                        '<option value="安徽省大步汽车销售服务有限公司">安徽省大步汽车销售服务有限公司</option>' +
                        '<option value="合肥恒信德龙美华汽车销售服务有限公司">合肥恒信德龙美华汽车销售服务有限公司</option>' +
                        '<option value="合肥万福汽车销售有限公司">合肥万福汽车销售有限公司</option>' +
                        '<option value="安徽大步车业销售有限公司">安徽大步车业销售有限公司</option>' +
                        '<option value="安庆环福汽车销售服务有限公司">安庆环福汽车销售服务有限公司</option>' +
                        '<option value="蚌埠市润美汽车销售服务有限公司">蚌埠市润美汽车销售服务有限公司</option>' +
                        '<option value="亳州市远景福润汽车销售服务有限责任公司">亳州市远景福润汽车销售服务有限责任公司</option>' +
                        '<option value="亳州福铄汽车贸易有限公司">亳州福铄汽车贸易有限公司</option>' +
                        '<option value="滁州正丰汽车贸易服务有限公司">滁州正丰汽车贸易服务有限公司</option>' +
                        '<option value="安徽聚福汽车销售服务有限公司">安徽聚福汽车销售服务有限公司</option>' +
                        '<option value="巢湖大步畅达汽车科技有限公司">巢湖大步畅达汽车科技有限公司</option>' +
                        '<option value="安徽阜阳恒大旭日汽车贸易有限公司">安徽阜阳恒大旭日汽车贸易有限公司</option>' +
                        '<option value="阜阳恒之星汽车贸易有限公司">阜阳恒之星汽车贸易有限公司</option>' +
                        '<option value="淮北良宇汽车销售服务有限公司">淮北良宇汽车销售服务有限公司</option>' +
                        '<option value="淮南市福久汽车销售服务有限公司">淮南市福久汽车销售服务有限公司</option>' +
                        '<option value="黄山市华轩汽车销售服务有限公司">黄山市华轩汽车销售服务有限公司</option>' +
                        '<option value="马鞍山福联汽车销售服务有限公司">马鞍山福联汽车销售服务有限公司</option>' +
                        '<option value="六安大步汽车销售服务有限公司">六安大步汽车销售服务有限公司</option>' +
                        '<option value="六安之道汽车销售服务有限公司">六安之道汽车销售服务有限公司</option>' +
                        '<option value="宿州福誉通汽车销售服务有限公司">宿州福誉通汽车销售服务有限公司</option>' +
                        '<option value="铜陵市锐钧实业有限公司">铜陵市锐钧实业有限公司</option>' +
                        '<option value="芜湖福禧汽车销售服务有限公司">芜湖福禧汽车销售服务有限公司</option>' +
                        '<option value="芜湖亚夏福迪汽车销售服务有限公司">芜湖亚夏福迪汽车销售服务有限公司</option>' +
                        '<option value="宣城亚夏福嘉汽车销售服务有限公司">宣城亚夏福嘉汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "福建") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="福建华骏仓山分公司">福建华骏仓山分公司</option>' +
                        '<option value="福建新诺仙游县新时代分公司">福建新诺仙游县新时代分公司</option>' +
                        '<option value="安溪亿海丰和德化分公司">安溪亿海丰和德化分公司</option>' +
                        '<option value="龙岩全福永定分公司">龙岩全福永定分公司</option>' +
                        '<option value="泉州国骏惠安分公司">泉州国骏惠安分公司</option>' +
                        '<option value="南平华骏南平分公司">南平华骏南平分公司</option>' +
                        '<option value="龙岩龙丰福瑞长汀分公司">龙岩龙丰福瑞长汀分公司</option>' +
                        '<option value="龙岩市全福漳平分公司">龙岩市全福漳平分公司</option>' +
                        '<option value="龙岩市全福连城分公司">龙岩市全福连城分公司</option>' +
                        '<option value="龙岩市全福上杭分公司">龙岩市全福上杭分公司</option>' +
                        '<option value="福建新吉汽车贸易有限公司">福建新吉汽车贸易有限公司</option>' +
                        '<option value="福建华骏汽车销售服务有限公司">福建华骏汽车销售服务有限公司</option>' +
                        '<option value="福建吉诺汽车有限公司">福建吉诺汽车有限公司</option>' +
                        '<option value="福建华骏天行汽车销售服务有限公司">福建华骏天行汽车销售服务有限公司</option>' +
                        '<option value="福州丰骏福瑞汽车销售服务有限公司">福州丰骏福瑞汽车销售服务有限公司</option>' +
                        '<option value="福州汇京福瑞汽车贸易有限公司">福州汇京福瑞汽车贸易有限公司</option>' +
                        '<option value="福建省亿海丰和汽车销售服务有限公司">福建省亿海丰和汽车销售服务有限公司</option>' +
                        '<option value="龙岩全福汽车销售服务有限公司">龙岩全福汽车销售服务有限公司</option>' +
                        '<option value="龙岩龙丰福瑞汽车销售服务有限公司">龙岩龙丰福瑞汽车销售服务有限公司</option>' +
                        '<option value="福建省新辕汽车销售有限公司">福建省新辕汽车销售有限公司</option>' +
                        '<option value="福建省晋江市亿海万特汽车销售有限公司">福建省晋江市亿海万特汽车销售有限公司</option>' +
                        '<option value="福建丰达汽车销售服务有限公司">福建丰达汽车销售服务有限公司</option>' +
                        '<option value="南平华骏汽车销售服务有限公司">南平华骏汽车销售服务有限公司</option>' +
                        '<option value="福建丰润汽车销售服务有限公司">福建丰润汽车销售服务有限公司</option>' +
                        '<option value="福建新诺汽车销售服务有限公司">福建新诺汽车销售服务有限公司</option>' +
                        '<option value="泉州和祥汽车销售服务有限公司">泉州和祥汽车销售服务有限公司</option>' +
                        '<option value="泉州国骏汽车销售服务有限公司">泉州国骏汽车销售服务有限公司</option>' +
                        '<option value="福建丰诺汽车销售服务有限公司">福建丰诺汽车销售服务有限公司</option>' +
                        '<option value="泉州泉福汽车销售服务有限公司">泉州泉福汽车销售服务有限公司</option>' +
                        '<option value="三明华骏汽车销售服务有限公司 ">三明华骏汽车销售服务有限公司 </option>' +
                        '<option value="厦门信达汽车销售服务有限公司">厦门信达汽车销售服务有限公司</option>' +
                        '<option value="厦门丰骏汽车销售服务有限公司">厦门丰骏汽车销售服务有限公司</option>' +
                        '<option value="厦门信达通福汽车销售服务有限公司">厦门信达通福汽车销售服务有限公司</option>' +
                        '<option value="厦门信达通瑞汽车销售服务有限公司">厦门信达通瑞汽车销售服务有限公司</option>' +
                        '<option value="厦门信达汽车销售服务有限公司滨北分公司">厦门信达汽车销售服务有限公司滨北分公司</option>' +
                        '<option value="漳州市华骏天元汽车销售服务有限公司">漳州市华骏天元汽车销售服务有限公司</option>' +
                        '<option value="漳浦华骏天驰汽车销售服务有限公司">漳浦华骏天驰汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "甘肃") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="嘉峪关良志酒泉分公司">嘉峪关良志酒泉分公司</option>' +
                        '<option value="兰州赛福汽车销售服务有限公司">兰州赛福汽车销售服务有限公司</option>' +
                        '<option value="兰州金岛长福汽车销售有限公司">兰州金岛长福汽车销售有限公司</option>' +
                        '<option value="兰州永泰汽车销售服务有限公司">兰州永泰汽车销售服务有限公司</option>' +
                        '<option value="庆阳志达汽车销售服务有限公司">庆阳志达汽车销售服务有限公司</option>' +
                        '<option value="白银良志汽车销售服务有限公司">白银良志汽车销售服务有限公司</option>' +
                        '<option value="嘉峪关良志汽车销售有限公司">嘉峪关良志汽车销售有限公司</option>' +
                        '<option value="平凉恒信美华汽车销售服务有限公司">平凉恒信美华汽车销售服务有限公司</option>' +
                        '<option value="定西恒信美华汽车销售服务有限公司">定西恒信美华汽车销售服务有限公司</option>' +
                        '<option value="天水福汇达汽车销售有限公司">天水福汇达汽车销售有限公司</option>' +
                        '<option value="张掖宝之福汽车销售服务有限公司">张掖宝之福汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "广东") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="深圳标恒坪山分公司">深圳标恒坪山分公司</option>' +
                        '<option value="深圳标特公明分公司">深圳标特公明分公司</option>' +
                        '<option value="惠州共成河南岸分公司">惠州共成河南岸分公司</option>' +
                        '<option value="肇庆美轮广宁分公司">肇庆美轮广宁分公司</option>' +
                        '<option value="肇庆美轮怀集分公司">肇庆美轮怀集分公司</option>' +
                        '<option value="江门福恒开平分公司">江门福恒开平分公司</option>' +
                        '<option value="云浮美轮运福罗定分公司">云浮美轮运福罗定分公司</option>' +
                        '<option value="深圳共成东益分公司">深圳共成东益分公司</option>' +
                        '<option value="广东浩伟梅花园分公司">广东浩伟梅花园分公司</option>' +
                        '<option value="茂名广物福恒信宜分公司">茂名广物福恒信宜分公司</option>' +
                        '<option value="惠州市益成博罗分公司">惠州市益成博罗分公司</option>' +
                        '<option value="惠州深标特惠城分公司">惠州深标特惠城分公司</option>' +
                        '<option value="佛山昊海君霖高明分公司">佛山昊海君霖高明分公司</option>' +
                        '<option value="东莞市华永凤岗分公司">东莞市华永凤岗分公司</option>' +
                        '<option value="深圳市易达梅林分公司">深圳市易达梅林分公司</option>' +
                        '<option value="广州华驰福威越秀分公司">广州华驰福威越秀分公司</option>' +
                        '<option value="深圳市标恒龙东分公司">深圳市标恒龙东分公司</option>' +
                        '<option value="东莞市博雅樟木头分公司">东莞市博雅樟木头分公司</option>' +
                        '<option value="广州增福新塘分公司">广州增福新塘分公司</option>' +
                        '<option value="广州瀚福汽车销售服务有限公司">广州瀚福汽车销售服务有限公司</option>' +
                        '<option value="广东广物福恒汽车贸易有限公司 ">广东广物福恒汽车贸易有限公司 </option>' +
                        '<option value="广东浩伟汽车发展有限公司">广东浩伟汽车发展有限公司</option>' +
                        '<option value="广东恒远汽车贸易有限公司 ">广东恒远汽车贸易有限公司 </option>' +
                        '<option value="广州市华驰福威汽车销售服务有限公司">广州市华驰福威汽车销售服务有限公司</option>' +
                        '<option value="广州市安捷明福汽车有限公司">广州市安捷明福汽车有限公司</option>' +
                        '<option value="广州福远汽车贸易有限公司">广州福远汽车贸易有限公司</option>' +
                        '<option value="广东广物鸿福汽车销售服务有限公司">广东广物鸿福汽车销售服务有限公司</option>' +
                        '<option value="广州庆福汽车销售服务有限公司">广州庆福汽车销售服务有限公司</option>' +
                        '<option value="广州增福汽车销售有限公司">广州增福汽车销售有限公司</option>' +
                        '<option value="广州文华福瑞汽车销售有限公司">广州文华福瑞汽车销售有限公司</option>' +
                        '<option value="潮州德诚汽车销售服务有限公司">潮州德诚汽车销售服务有限公司</option>' +
                        '<option value="东莞市冠骏汽车销售服务有限公司">东莞市冠骏汽车销售服务有限公司</option>' +
                        '<option value="东莞市福丰汽车有限公司">东莞市福丰汽车有限公司</option>' +
                        '<option value="东莞市博雅贸易有限公司">东莞市博雅贸易有限公司</option>' +
                        '<option value="东莞市星锐汽车有限公司">东莞市星锐汽车有限公司</option>' +
                        '<option value="东莞市福凯汽车销售服务有限公司">东莞市福凯汽车销售服务有限公司</option>' +
                        '<option value="东莞市华永汽车销售服务有限公司">东莞市华永汽车销售服务有限公司</option>' +
                        '<option value="东莞市骏龙汽车有限公司">东莞市骏龙汽车有限公司</option>' +
                        '<option value="佛山市合福汽车销售服务有限公司(顺德) ">佛山市合福汽车销售服务有限公司(顺德) </option>' +
                        '<option value="佛山市金福麟汽车销售服务有限公司">佛山市金福麟汽车销售服务有限公司</option>' +
                        '<option value="佛山市昊海君霖汽车销售服务有限公司">佛山市昊海君霖汽车销售服务有限公司</option>' +
                        '<option value="佛山市东盛行汽车销售服务有限公司">佛山市东盛行汽车销售服务有限公司</option>' +
                        '<option value="佛山市励福汽车有限公司">佛山市励福汽车有限公司</option>' +
                        '<option value="佛山市南海合福汽车销售服务有限公司">佛山市南海合福汽车销售服务有限公司</option>' +
                        '<option value="佛山市广物福恒汽车贸易有限公司">佛山市广物福恒汽车贸易有限公司</option>' +
                        '<option value="佛山市东顺行汽车销售有限公司">佛山市东顺行汽车销售有限公司</option>' +
                        '<option value="惠州市共成汽车贸易有限公司   ">惠州市共成汽车贸易有限公司   </option>' +
                        '<option value="惠州市益成汽车贸易有限公司">惠州市益成汽车贸易有限公司</option>' +
                        '<option value="惠州深标特汽车有限公司">惠州深标特汽车有限公司</option>' +
                        '<option value="河源市共成汽车贸易有限公司">河源市共成汽车贸易有限公司</option>' +
                        '<option value="江门市福恒汽车销售服务有限公司">江门市福恒汽车销售服务有限公司</option>' +
                        '<option value="江门市万业汽车销售服务有限公司">江门市万业汽车销售服务有限公司</option>' +
                        '<option value="揭阳恒诚汽车销售有限公司">揭阳恒诚汽车销售有限公司</option>' +
                        '<option value="茂名市广物福恒汽车销售服务有限公司">茂名市广物福恒汽车销售服务有限公司</option>' +
                        '<option value="梅州铁诚汽车销售服务有限责任公司">梅州铁诚汽车销售服务有限责任公司</option>' +
                        '<option value="清远圆邦汽车销售服务有限公司">清远圆邦汽车销售服务有限公司</option>' +
                        '<option value="汕头市粤特汽车销售有限公司">汕头市粤特汽车销售有限公司</option>' +
                        '<option value="韶关市宇杰汽车贸易服务有限公司">韶关市宇杰汽车贸易服务有限公司</option>' +
                        '<option value="深圳共成投资发展有限公司">深圳共成投资发展有限公司</option>' +
                        '<option value="深圳市易达汽车技术服务有限公司">深圳市易达汽车技术服务有限公司</option>' +
                        '<option value="深圳市标特汽车（集团）有限公司">深圳市标特汽车（集团）有限公司</option>' +
                        '<option value="深圳市标恒汽车有限公司">深圳市标恒汽车有限公司</option>' +
                        '<option value="深圳市标华汽车有限公司     ">深圳市标华汽车有限公司     </option>' +
                        '<option value="深圳市标新汽车有限公司">深圳市标新汽车有限公司</option>' +
                        '<option value="深圳市标深汽车有限公司">深圳市标深汽车有限公司</option>' +
                        '<option value="汕头市粤驰汽车销售服务有限公司">汕头市粤驰汽车销售服务有限公司</option>' +
                        '<option value="阳江市溢福汽车销售服务有限公司">阳江市溢福汽车销售服务有限公司</option>' +
                        '<option value="云浮美轮运福汽车有限公司">云浮美轮运福汽车有限公司</option>' +
                        '<option value="湛江市广物福昌汽车销售服务有限公司">湛江市广物福昌汽车销售服务有限公司</option>' +
                        '<option value="肇庆美轮庆福汽车有限公司">肇庆美轮庆福汽车有限公司</option>' +
                        '<option value="中山市精文汽车贸易有限公司 ">中山市精文汽车贸易有限公司 </option>' +
                        '<option value="中山中裕福达汽车有限公司">中山中裕福达汽车有限公司</option>' +
                        '<option value="中山小榄中裕汽车有限公司">中山小榄中裕汽车有限公司</option>' +
                        '<option value="中山黄圃中裕汽车有限公司">中山黄圃中裕汽车有限公司</option>' +
                        '<option value="珠海市华亿汽车贸易有限公司">珠海市华亿汽车贸易有限公司</option>' +
                        '<option value="珠海市众特汽车销售服务有限公司">珠海市众特汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "广西") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="柳州恒嘉来宾分公司">柳州恒嘉来宾分公司</option>' +
                        '<option value="广西宝福河池分公司">广西宝福河池分公司</option>' +
                        '<option value="桂林真龙福福荔浦分公司">桂林真龙福福荔浦分公司</option>' +
                        '<option value="玉林桂福崇左分公司">玉林桂福崇左分公司</option>' +
                        '<option value="广西梧州昊海华光藤县分公司">广西梧州昊海华光藤县分公司</option>' +
                        '<option value="桂林市均富全州分公司">桂林市均富全州分公司</option>' +
                        '<option value="广西宝福宜州分公司">广西宝福宜州分公司</option>' +
                        '<option value="广西朗润平果分公司">广西朗润平果分公司</option>' +
                        '<option value="广西宝福巴马分公司">广西宝福巴马分公司</option>' +
                        '<option value="广西弘嘉汽车销售服务有限公司">广西弘嘉汽车销售服务有限公司</option>' +
                        '<option value="广西华圣汽车贸易有限公司">广西华圣汽车贸易有限公司</option>' +
                        '<option value="广西广福汽车销售服务有限公司">广西广福汽车销售服务有限公司</option>' +
                        '<option value="广西恒骏汽车销售服务有限公司">广西恒骏汽车销售服务有限公司</option>' +
                        '<option value="北海市桂福汽车销售服务有限公司">北海市桂福汽车销售服务有限公司</option>' +
                        '<option value="广西朗润汽车销售服务有限公司">广西朗润汽车销售服务有限公司</option>' +
                        '<option value="防城港市恒骐汽车销售服务有限公司">防城港市恒骐汽车销售服务有限公司</option>' +
                        '<option value="桂林真龙福福汽车销售有限公司  ">桂林真龙福福汽车销售有限公司  </option>' +
                        '<option value="桂林市均富汽车销售有限公司">桂林市均富汽车销售有限公司</option>' +
                        '<option value="广西贵港市华福汽车销售服务有限公司">广西贵港市华福汽车销售服务有限公司</option>' +
                        '<option value="广西宝福汽车销售服务有限公司">广西宝福汽车销售服务有限公司</option>' +
                        '<option value="贺州市均程汽车销售有限公司">贺州市均程汽车销售有限公司</option>' +
                        '<option value="柳州市华运汽车贸易有限公司">柳州市华运汽车贸易有限公司</option>' +
                        '<option value="柳州市恒嘉汽车销售服务有限公司">柳州市恒嘉汽车销售服务有限公司</option>' +
                        '<option value="柳州市恒捷汽车销售服务有限公司">柳州市恒捷汽车销售服务有限公司</option>' +
                        '<option value="钦州市恒驰汽车销售服务有限公司">钦州市恒驰汽车销售服务有限公司</option>' +
                        '<option value="广西梧州昊海华光汽车有限公司">广西梧州昊海华光汽车有限公司</option>' +
                        '<option value="玉林市桂福汽车销售服务有限责任公司">玉林市桂福汽车销售服务有限责任公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "贵州") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="凯里华通凯福都匀分公司">凯里华通凯福都匀分公司</option>' +
                        '<option value="贵州万福汽车销售有限公司">贵州万福汽车销售有限公司</option>' +
                        '<option value="贵州华通华特汽车贸易服务有限公司">贵州华通华特汽车贸易服务有限公司</option>' +
                        '<option value="贵阳花溪孟关万福汽车销售服务有限公司">贵阳花溪孟关万福汽车销售服务有限公司</option>' +
                        '<option value="贵州华通华福汽车销售服务有限公司">贵州华通华福汽车销售服务有限公司</option>' +
                        '<option value="贵州瀚羿睿和汽车销售服务有限公司">贵州瀚羿睿和汽车销售服务有限公司</option>' +
                        '<option value="安顺东冠汽车贸易有限公司">安顺东冠汽车贸易有限公司</option>' +
                        '<option value="贵州友福汽车销售服务有限公司">贵州友福汽车销售服务有限公司</option>' +
                        '<option value="凯里经济开发区华通凯福汽车贸易服务有限公司">凯里经济开发区华通凯福汽车贸易服务有限公司</option>' +
                        '<option value="六盘水万福汽车销售服务有限公司">六盘水万福汽车销售服务有限公司</option>' +
                        '<option value="铜仁市中源汽车销售服务有限责任公司">铜仁市中源汽车销售服务有限责任公司</option>' +
                        '<option value="贵州林福汽车销售服务有限公司">贵州林福汽车销售服务有限公司</option>' +
                        '<option value="贵州万佳汽车销售服务有限公司">贵州万佳汽车销售服务有限公司</option>' +
                        '<option value="贵州黔喜福汽车销售有限公司">贵州黔喜福汽车销售有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "海南") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="海南嘉德汽车销售服务有限公司">海南嘉德汽车销售服务有限公司</option>' +
                        '<option value="海南深标特汽车有限公司">海南深标特汽车有限公司</option>' +
                        '<option value="三亚安好汽车销售服务有限公司">三亚安好汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "河北") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="保定天孚白沟分公司">保定天孚白沟分公司</option>' +
                        '<option value="保定天孚定州分公司">保定天孚定州分公司</option>' +
                        '<option value="沧州众福黄骅分公司">沧州众福黄骅分公司</option>' +
                        '<option value="任丘世纪龙腾河间分公司">任丘世纪龙腾河间分公司</option>' +
                        '<option value="邢台沧龙宁晋分公司">邢台沧龙宁晋分公司</option>' +
                        '<option value="沧州德源献县分公司">沧州德源献县分公司</option>' +
                        '<option value="邢台沧龙清河分公司">邢台沧龙清河分公司</option>' +
                        '<option value="廊坊瑞泰广阳分公司">廊坊瑞泰广阳分公司</option>' +
                        '<option value="霸州皓润行大城分公司">霸州皓润行大城分公司</option>' +
                        '<option value="霸州皓润行文安分公司">霸州皓润行文安分公司</option>' +
                        '<option value="迁安市万荣泽福丰安分公司">迁安市万荣泽福丰安分公司</option>' +
                        '<option value="保定轩宇正道阜平分公司">保定轩宇正道阜平分公司</option>' +
                        '<option value="保定轩宇正道涞水分公司">保定轩宇正道涞水分公司</option>' +
                        '<option value="保定轩宇正道唐县分公司">保定轩宇正道唐县分公司</option>' +
                        '<option value="邯郸庆华馆陶分公司">邯郸庆华馆陶分公司</option>' +
                        '<option value="保定轩宇正道曲阳分公司">保定轩宇正道曲阳分公司</option>' +
                        '<option value="衡水和勤故城分公司">衡水和勤故城分公司</option>' +
                        '<option value="衡水和勤安平分公司">衡水和勤安平分公司</option>' +
                        '<option value="邯郸庆华曲周分公司">邯郸庆华曲周分公司</option>' +
                        '<option value="河北汇凯深州分公司">河北汇凯深州分公司</option>' +
                        '<option value="河北盛达汽车贸易有限公司">河北盛达汽车贸易有限公司</option>' +
                        '<option value="河北天和福昌汽车销售服务有限公司">河北天和福昌汽车销售服务有限公司</option>' +
                        '<option value="河北信达汽车贸易有限公司">河北信达汽车贸易有限公司</option>' +
                        '<option value="石家庄和霖汽车销售服务有限公司">石家庄和霖汽车销售服务有限公司</option>' +
                        '<option value="河北鹏顺汽车销售服务有限公司">河北鹏顺汽车销售服务有限公司</option>' +
                        '<option value="保定市天孚汽车贸易有限公司">保定市天孚汽车贸易有限公司</option>' +
                        '<option value="保定轩宇正道汽车销售服务有限公司">保定轩宇正道汽车销售服务有限公司</option>' +
                        '<option value="保定市天硕汽车贸易有限公司">保定市天硕汽车贸易有限公司</option>' +
                        '<option value="涿州市辉瑞汽车销售服务有限公司">涿州市辉瑞汽车销售服务有限公司</option>' +
                        '<option value="沧州市德源汽车贸易有限公司">沧州市德源汽车贸易有限公司</option>' +
                        '<option value="沧州市众福汽车销售服务有限">沧州市众福汽车销售服务有限</option>' +
                        '<option value="沧州市德华汽车销售服务有限公司">沧州市德华汽车销售服务有限公司</option>' +
                        '<option value="任丘市世纪龙腾汽车销售有限公司">任丘市世纪龙腾汽车销售有限公司</option>' +
                        '<option value="承德展旺汽车销售有限公司">承德展旺汽车销售有限公司</option>' +
                        '<option value="定州市福瑞翔汽车贸易有限公司">定州市福瑞翔汽车贸易有限公司</option>' +
                        '<option value="邯郸市庆华汽车销售服务有限公司">邯郸市庆华汽车销售服务有限公司</option>' +
                        '<option value="邯郸市华安汽车销售有限公司">邯郸市华安汽车销售有限公司</option>' +
                        '<option value="邯郸和誉汽车销售服务有限公司">邯郸和誉汽车销售服务有限公司</option>' +
                        '<option value="衡水和勤汽车销售服务有限公司">衡水和勤汽车销售服务有限公司</option>' +
                        '<option value="河北汇凯汽车销售服务有限公司">河北汇凯汽车销售服务有限公司</option>' +
                        '<option value="廊坊瑞泰伟业汽车销售有限公司">廊坊瑞泰伟业汽车销售有限公司</option>' +
                        '<option value="廊坊市福江汽车销售服务有限公司">廊坊市福江汽车销售服务有限公司</option>' +
                        '<option value="霸州市皓润行汽车销售服务有限公司">霸州市皓润行汽车销售服务有限公司</option>' +
                        '<option value="秦皇岛建达汽车销售服务有限公司  ">秦皇岛建达汽车销售服务有限公司  </option>' +
                        '<option value="秦皇岛金时福润汽车贸易有限公司">秦皇岛金时福润汽车贸易有限公司</option>' +
                        '<option value="唐山佳浩汽车销售服务有限公司       ">唐山佳浩汽车销售服务有限公司       </option>' +
                        '<option value="唐山市冀东兴业汽车销售服务有限公司">唐山市冀东兴业汽车销售服务有限公司</option>' +
                        '<option value="唐山国和兴滦汽车销售服务有限公司">唐山国和兴滦汽车销售服务有限公司</option>' +
                        '<option value="迁安市万荣泽福汽车贸易有限公司">迁安市万荣泽福汽车贸易有限公司</option>' +
                        '<option value="武安市远洋汽车销售服务有限公司">武安市远洋汽车销售服务有限公司</option>' +
                        '<option value="邢台盛源汽车贸易服务有限公司  ">邢台盛源汽车贸易服务有限公司  </option>' +
                        '<option value="邢台沧龙汽车销售服务有限公司">邢台沧龙汽车销售服务有限公司</option>' +
                        '<option value="张家口庞大亚航汽车销售服务有限公司">张家口庞大亚航汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "河南") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="商丘铭阳夏邑分公司">商丘铭阳夏邑分公司</option>' +
                        '<option value="商丘铭阳柘城分公司">商丘铭阳柘城分公司</option>' +
                        '<option value="南阳裕华南阳分公司">南阳裕华南阳分公司</option>' +
                        '<option value="三门峡兴源灵宝分公司">三门峡兴源灵宝分公司</option>' +
                        '<option value="南阳嘉华福尔邓州分公司">南阳嘉华福尔邓州分公司</option>' +
                        '<option value="信阳亮源固始分公司">信阳亮源固始分公司</option>' +
                        '<option value="西城天道郑州分公司">西城天道郑州分公司</option>' +
                        '<option value="新乡凯隆辉县分公司">新乡凯隆辉县分公司</option>' +
                        '<option value="三门峡兴源渑池分公司">三门峡兴源渑池分公司</option>' +
                        '<option value="漯河广润舞阳分公司">漯河广润舞阳分公司</option>' +
                        '<option value="信阳亮源信阳分公司">信阳亮源信阳分公司</option>' +
                        '<option value="郑东天道中牟分公司">郑东天道中牟分公司</option>' +
                        '<option value="河南天道汽车贸易服务有限公司">河南天道汽车贸易服务有限公司</option>' +
                        '<option value="河南裕华福源汽车销售服务有限公司 ">河南裕华福源汽车销售服务有限公司 </option>' +
                        '<option value="河南西城天道汽车贸易服务有限公司 ">河南西城天道汽车贸易服务有限公司 </option>' +
                        '<option value="河南东城天道汽车销售服务有限公司">河南东城天道汽车销售服务有限公司</option>' +
                        '<option value="河南吉福汽车销售服务有限公司">河南吉福汽车销售服务有限公司</option>' +
                        '<option value="河南东城吉福汽车销售服务有限公司">河南东城吉福汽车销售服务有限公司</option>' +
                        '<option value="河南郑东天道汽车销售服务有限公司">河南郑东天道汽车销售服务有限公司</option>' +
                        '<option value="郑州福帝汽车销售服务有限公司">郑州福帝汽车销售服务有限公司</option>' +
                        '<option value="河南鑫泰汽车销售服务有限公司">河南鑫泰汽车销售服务有限公司</option>' +
                        '<option value="安阳顺达尔汽车贸易有限公司">安阳顺达尔汽车贸易有限公司</option>' +
                        '<option value="林州市安泰汽车贸易有限公司">林州市安泰汽车贸易有限公司</option>' +
                        '<option value="鹤壁市顺达尔汽车销售服务有限公司">鹤壁市顺达尔汽车销售服务有限公司</option>' +
                        '<option value="焦作交运集团富源汽车销售服务有限公司">焦作交运集团富源汽车销售服务有限公司</option>' +
                        '<option value="焦作市福港汽车销售服务有限公司">焦作市福港汽车销售服务有限公司</option>' +
                        '<option value="济源市瑞福汽车贸易有限公司">济源市瑞福汽车贸易有限公司</option>' +
                        '<option value="河南捷成汽车贸易有限公司">河南捷成汽车贸易有限公司</option>' +
                        '<option value="开封嘉华汽车销售服务有限公司">开封嘉华汽车销售服务有限公司</option>' +
                        '<option value="河南动力汽车贸易服务有限公司">河南动力汽车贸易服务有限公司</option>' +
                        '<option value="洛阳凯捷汽车销售服务有限公司">洛阳凯捷汽车销售服务有限公司</option>' +
                        '<option value="洛阳和悦天道汽车贸易服务有限公司">洛阳和悦天道汽车贸易服务有限公司</option>' +
                        '<option value="漯河市广润汽车销售服务有限公司">漯河市广润汽车销售服务有限公司</option>' +
                        '<option value="南阳裕华福源汽车销售服务有限公司 ">南阳裕华福源汽车销售服务有限公司 </option>' +
                        '<option value="南阳嘉华福尔汽车销售服务有限公司">南阳嘉华福尔汽车销售服务有限公司</option>' +
                        '<option value="南阳吉福汽车销售服务有限公司">南阳吉福汽车销售服务有限公司</option>' +
                        '<option value="平顶山祥博汽车销售有限公司">平顶山祥博汽车销售有限公司</option>' +
                        '<option value="平顶山泰瑞福汽车销售服务有限公司">平顶山泰瑞福汽车销售服务有限公司</option>' +
                        '<option value="濮阳市福华汽车销售服务有限公司 ">濮阳市福华汽车销售服务有限公司 </option>' +
                        '<option value="商丘铭阳汽车销售服务有限公司">商丘铭阳汽车销售服务有限公司</option>' +
                        '<option value="商丘市铭盛汽车销售服务有限公司">商丘市铭盛汽车销售服务有限公司</option>' +
                        '<option value="三门峡市兴源汽车销售服务有限公司">三门峡市兴源汽车销售服务有限公司</option>' +
                        '<option value="新乡长久福祥汽车销售服务有限公司">新乡长久福祥汽车销售服务有限公司</option>' +
                        '<option value="新乡市凯隆汽车销售服务有限公司">新乡市凯隆汽车销售服务有限公司</option>' +
                        '<option value="信阳市亮源汽车贸易有限公司">信阳市亮源汽车贸易有限公司</option>' +
                        '<option value="信阳中岩福安汽车销售服务有限公司">信阳中岩福安汽车销售服务有限公司</option>' +
                        '<option value="许昌市和协汽车销售服务有限公司">许昌市和协汽车销售服务有限公司</option>' +
                        '<option value="永城市铭阳汽车销售有限公司">永城市铭阳汽车销售有限公司</option>' +
                        '<option value="许昌市新恒汽车销售服务有限公司">许昌市新恒汽车销售服务有限公司</option>' +
                        '<option value="周口铭阳汽车销售服务有限公司">周口铭阳汽车销售服务有限公司</option>' +
                        '<option value="周口铭盛汽车销售服务有限公司">周口铭盛汽车销售服务有限公司</option>' +
                        '<option value="驻马店铭阳汽车销售服务有限公司">驻马店铭阳汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "黑龙江") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="哈尔滨运通俊恩汽车销售服务有限公司">哈尔滨运通俊恩汽车销售服务有限公司</option>' +
                        '<option value="七台河市龙海汇众汽车销售服务有限公司">七台河市龙海汇众汽车销售服务有限公司</option>' +
                        '<option value="黑龙江龙海博众汽车销售服务有限公司">黑龙江龙海博众汽车销售服务有限公司</option>' +
                        '<option value="双鸭山安诚汽车销售服务有限公司">双鸭山安诚汽车销售服务有限公司</option>' +
                        '<option value="富锦安诚汽车销售服务有限公司">富锦安诚汽车销售服务有限公司</option>' +

                        '<option value="哈尔滨永达宏福汽车销售服务有限公司">哈尔滨永达宏福汽车销售服务有限公司</option>' +
                        '<option value="北安龙轩汽车销售服务有限公司">北安龙轩汽车销售服务有限公司</option>' +
                        '<option value="大庆勤华恒瑞汽车销售服务有限公司">大庆勤华恒瑞汽车销售服务有限公司</option>' +
                        '<option value="大庆天庆昌汽车销售服务有限公司">大庆天庆昌汽车销售服务有限公司</option>' +
                        '<option value="佳木斯市永诚汽车销售有限公司">佳木斯市永诚汽车销售有限公司</option>' +
                        '<option value="牡丹江天拓汽车销售有限公司">牡丹江天拓汽车销售有限公司</option>' +
                        '<option value="齐齐哈尔聚豪汽车销售服务有限公司">齐齐哈尔聚豪汽车销售服务有限公司</option>' +
                        '<option value="黑龙江龙海美福汽车销售服务有限公司">黑龙江龙海美福汽车销售服务有限公司</option>' +
                        '<option value="双鸭山凯华凯信汽车销售服务有限公司">双鸭山凯华凯信汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "湖北") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="武汉威汉潜江分公司">武汉威汉潜江分公司</option>' +
                        '<option value="黄石威汉鄂州分公司">黄石威汉鄂州分公司</option>' +
                        '<option value="武汉黄埔威汉江岸开发区-台银城">武汉黄埔威汉江岸开发区-台银城</option>' +
                        '<option value="武汉黄埔威汉东西湖区-金银潭">武汉黄埔威汉东西湖区-金银潭</option>' +
                        '<option value="武汉三喜高新区-佳园路">武汉三喜高新区-佳园路</option>' +
                        '<option value="武汉三喜高新区-雄楚">武汉三喜高新区-雄楚</option>' +
                        '<option value="仙桃威汉潜江天驰分公司">仙桃威汉潜江天驰分公司</option>' +
                        '<option value="武汉三喜创业街分公司">武汉三喜创业街分公司</option>' +
                        '<option value="仙桃威汉天门分公司">仙桃威汉天门分公司</option>' +
                        '<option value="武汉威汉汽车销售公司">武汉威汉汽车销售公司</option>' +
                        '<option value="武汉黄浦威汉汽车服务有限责任公司">武汉黄浦威汉汽车服务有限责任公司</option>' +
                        '<option value="武汉江城威汉汽车服务有限责任公司">武汉江城威汉汽车服务有限责任公司</option>' +
                        '<option value="武汉三喜汽车销售服务有限公司">武汉三喜汽车销售服务有限公司</option>' +
                        '<option value="武汉合福缘汽车销售服务有限公司 ">武汉合福缘汽车销售服务有限公司 </option>' +
                        '<option value="恩施州民福汽车销售服务有限公司">恩施州民福汽车销售服务有限公司</option>' +
                        '<option value="黄石威汉仙福汽车销售有限责任公司">黄石威汉仙福汽车销售有限责任公司</option>' +
                        '<option value="黄冈威汉仙福汽车销售有限责任公司">黄冈威汉仙福汽车销售有限责任公司</option>' +
                        '<option value="荆州东盛源汽车销售服务有限公司">荆州东盛源汽车销售服务有限公司</option>' +
                        '<option value="荆门三喜汽车销售服务有限公司">荆门三喜汽车销售服务有限公司</option>' +
                        '<option value="十堰三喜汽车销售服务有限公司">十堰三喜汽车销售服务有限公司</option>' +
                        '<option value="随州三喜汽车销售服务有限公司">随州三喜汽车销售服务有限公司</option>' +
                        '<option value="襄阳威汉机电有限责任公司">襄阳威汉机电有限责任公司</option>' +
                        '<option value="仙桃威汉汽车销售有限责任公司">仙桃威汉汽车销售有限责任公司</option>' +
                        '<option value="孝感贤达汽车销售服务有限公司">孝感贤达汽车销售服务有限公司</option>' +
                        '<option value="咸宁恒信美华汽车销售服务有限公司">咸宁恒信美华汽车销售服务有限公司</option>' +
                        '<option value="宜昌民福汽车销售服务有限公司">宜昌民福汽车销售服务有限公司</option>' +
                        '<option value="荆门三喜钟祥分公司">荆门三喜钟祥分公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "湖南") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="常德日福石门分公司">常德日福石门分公司</option>' +
                        '<option value="湖南华隆四方坪分公司">湖南华隆四方坪分公司</option>' +
                        '<option value="张家界东红慈利分公司">张家界东红慈利分公司</option>' +
                        '<option value="岳阳福众湘阴分公司">岳阳福众湘阴分公司</option>' +
                        '<option value="湖南华隆汽车销售服务有限公司">湖南华隆汽车销售服务有限公司</option>' +
                        '<option value="湖南力天汽车销售服务有限公司 ">湖南力天汽车销售服务有限公司 </option>' +
                        '<option value="湖南华达汽车销售服务有限公司">湖南华达汽车销售服务有限公司</option>' +
                        '<option value="湖南力天福驻汽车销售服务有限公司">湖南力天福驻汽车销售服务有限公司</option>' +
                        '<option value="湖南永通永利汽车销售服务有限公司">湖南永通永利汽车销售服务有限公司</option>' +
                        '<option value="宁乡津湘华沩汽车销售服务有限公司">宁乡津湘华沩汽车销售服务有限公司</option>' +
                        '<option value="常德市日福汽车销售服务有限公司">常德市日福汽车销售服务有限公司</option>' +
                        '<option value="常德市旭福汽车销售服务有限公司">常德市旭福汽车销售服务有限公司</option>' +
                        '<option value="郴州中天汽车销售服务有限公司">郴州中天汽车销售服务有限公司</option>' +
                        '<option value="衡阳市天禧汽车销售服务有限公司 ">衡阳市天禧汽车销售服务有限公司 </option>' +
                        '<option value="怀化津湘盈丰汽车销售服务有限公司">怀化津湘盈丰汽车销售服务有限公司</option>' +
                        '<option value="湘西华烽汽车销售服务有限公司">湘西华烽汽车销售服务有限公司</option>' +
                        '<option value="浏阳津湘华特汽车销售服务有限公司">浏阳津湘华特汽车销售服务有限公司</option>' +
                        '<option value="娄底市津湘汽车销售有限公司">娄底市津湘汽车销售有限公司</option>' +
                        '<option value="邵阳市宝迪汽车销售服务有限公司">邵阳市宝迪汽车销售服务有限公司</option>' +
                        '<option value="邵阳市宝华汽车销售服务有限公司">邵阳市宝华汽车销售服务有限公司</option>' +
                        '<option value="湘潭腾飞福来特汽车销售服务有限公司">湘潭腾飞福来特汽车销售服务有限公司</option>' +
                        '<option value="湘潭美腾汽车销售服务有限公司">湘潭美腾汽车销售服务有限公司</option>' +
                        '<option value="永州腾飞湘福汽车销售服务有限公司 ">永州腾飞湘福汽车销售服务有限公司 </option>' +
                        '<option value="岳阳福众汽车销售服务有限公司">岳阳福众汽车销售服务有限公司</option>' +
                        '<option value="益阳市骏和汽车贸易投资有限责任公司">益阳市骏和汽车贸易投资有限责任公司</option>' +
                        '<option value="株洲宏福汽车销售服务有限公司">株洲宏福汽车销售服务有限公司</option>' +
                        '<option value="株州蓝福汽车销售服务有限公司">株州蓝福汽车销售服务有限公司</option>' +
                        '<option value="张家界东红汽车服务有限公司">张家界东红汽车服务有限公司</option>' +
                        '<option value="湖南丰泽汽车销售服务有限公司">湖南丰泽汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "吉林") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="吉林省神驰汽车销售服务有限公司">吉林省神驰汽车销售服务有限公司</option>' +
                        '<option value="吉林省隆孚汽车销售服务有限公司">吉林省隆孚汽车销售服务有限公司</option>' +
                        '<option value="吉林省尊驰汽车销售服务有限公司">吉林省尊驰汽车销售服务有限公司</option>' +
                        '<option value="吉林市雷驰德汽车销售服务有限公司">吉林市雷驰德汽车销售服务有限公司</option>' +
                        '<option value="吉林省福原汽车销售维修服务有限公司">吉林省福原汽车销售维修服务有限公司</option>' +
                        '<option value="通化市鸿跃汽车销售服务有限公司">通化市鸿跃汽车销售服务有限公司</option>' +
                        '<option value="延吉市冀东汽车销售有限公司">延吉市冀东汽车销售有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "江苏") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="常州欧派罗武进分公司">常州欧派罗武进分公司</option>' +
                        '<option value="丹阳福联丹阳丹金路分公司">丹阳福联丹阳丹金路分公司</option>' +
                        '<option value="扬州福联仪征分公司">扬州福联仪征分公司</option>' +
                        '<option value="扬州福联高邮分公司">扬州福联高邮分公司</option>' +
                        '<option value="镇江福联句容分公司">镇江福联句容分公司</option>' +
                        '<option value="南京福联江东北路分公司">南京福联江东北路分公司</option>' +
                        '<option value="江北福联浦珠路分公司">江北福联浦珠路分公司</option>' +
                        '<option value="江苏富俊工业园区分公司">江苏富俊工业园区分公司</option>' +
                        '<option value="吴江富骏松陵分公司">吴江富骏松陵分公司</option>' +
                        '<option value="吴江富骏盛泽分公司">吴江富骏盛泽分公司</option>' +
                        '<option value="张家港富骏保税区分公司">张家港富骏保税区分公司</option>' +
                        '<option value="江苏良宇邳州分公司">江苏良宇邳州分公司</option>' +
                        '<option value="连云港盛资东海分公司">连云港盛资东海分公司</option>' +
                        '<option value="连云港盛资赣榆分公司">连云港盛资赣榆分公司</option>' +
                        '<option value="盐城森风阜宁分公司">盐城森风阜宁分公司</option>' +
                        '<option value="镇江福联润扬分公司">镇江福联润扬分公司</option>' +
                        '<option value="南京福联城东分公司">南京福联城东分公司</option>' +
                        '<option value="南京福联城西分公司">南京福联城西分公司</option>' +
                        '<option value="南京长福新港大厂分公司">南京长福新港大厂分公司</option>' +
                        '<option value="溧水福联高淳分公司">溧水福联高淳分公司</option>' +
                        '<option value="南通沪通福联狼山分公司">南通沪通福联狼山分公司</option>' +
                        '<option value="徐州润东嘉华沛县分公司">徐州润东嘉华沛县分公司</option>' +
                        '<option value="苏州天驰新佳驰云路分公司">苏州天驰新佳驰云路分公司</option>' +
                        '<option value="南京福联服务二厂">南京福联服务二厂</option>' +
                        '<option value="苏州南福新区分公司">苏州南福新区分公司</option>' +
                        '<option value="南京景山福联滨江分公司">南京景山福联滨江分公司</option>' +
                        '<option value="南京福联汽车贸易有限公司">南京福联汽车贸易有限公司</option>' +
                        '<option value="南京长福新港汽车销售服务有限公司">南京长福新港汽车销售服务有限公司</option>' +
                        '<option value="江苏福联汽车贸易有限公司">江苏福联汽车贸易有限公司</option>' +
                        '<option value="南京景山福联汽车贸易/服务有限公司">南京景山福联汽车贸易/服务有限公司</option>' +
                        '<option value="南京江北福联汽车销售有限公司">南京江北福联汽车销售有限公司</option>' +
                        '<option value="南京溧水福联汽车销售服务有限公司">南京溧水福联汽车销售服务有限公司</option>' +
                        '<option value="常熟德福汽车销售服务有限公司 ">常熟德福汽车销售服务有限公司 </option>' +
                        '<option value="常州福尔特汽车销售服务有限公司">常州福尔特汽车销售服务有限公司</option>' +
                        '<option value="常州欧派罗汽车销售有限公司">常州欧派罗汽车销售有限公司</option>' +
                        '<option value="常州薛家欧派罗汽车销售服务有限公司">常州薛家欧派罗汽车销售服务有限公司</option>' +
                        '<option value="丹阳福联汽车贸易有限公司">丹阳福联汽车贸易有限公司</option>' +
                        '<option value="高邮福联汽车销售服务有限公司">高邮福联汽车销售服务有限公司</option>' +
                        '<option value="海门福邦汽车销售服务有限公司">海门福邦汽车销售服务有限公司</option>' +
                        '<option value="淮安润东之福汽车销售服务有限公司">淮安润东之福汽车销售服务有限公司</option>' +
                        '<option value="淮安市宏宇金驰汽车销售服务有限公司">淮安市宏宇金驰汽车销售服务有限公司</option>' +
                        '<option value="格林威(昆山)汽车销售服务有限公司">格林威(昆山)汽车销售服务有限公司</option>' +
                        '<option value="江阴市广吉福祥汽车有限公司">江阴市广吉福祥汽车有限公司</option>' +
                        '<option value="江阴吉兆汽车销售服务有限公司">江阴吉兆汽车销售服务有限公司</option>' +
                        '<option value="靖江天安达汽车贸易有限公司">靖江天安达汽车贸易有限公司</option>' +
                        '<option value="金坛欧派罗汽车销售服务有限公司">金坛欧派罗汽车销售服务有限公司</option>' +
                        '<option value="溧阳福尔特汽车销售服务有限公司">溧阳福尔特汽车销售服务有限公司</option>' +
                        '<option value="连云港盛资汽车销售服务有限公司">连云港盛资汽车销售服务有限公司</option>' +
                        '<option value="南通福联汽车贸易有限公司">南通福联汽车贸易有限公司</option>' +
                        '<option value="南通沪通福联汽车贸易有限公司">南通沪通福联汽车贸易有限公司</option>' +
                        '<option value="南通涌鑫之福汽车销售服务有限公司">南通涌鑫之福汽车销售服务有限公司</option>' +
                        '<option value="海安福聚汽车贸易有限公司">海安福聚汽车贸易有限公司</option>' +
                        '<option value="启东启福汽车销售服务有限公司">启东启福汽车销售服务有限公司</option>' +
                        '<option value="如皋福联汽车贸易有限公司">如皋福联汽车贸易有限公司</option>' +
                        '<option value="如东福联汽车贸易有限公司">如东福联汽车贸易有限公司</option>' +
                        '<option value="格林威(太仓)汽车销售服务有限公司">格林威(太仓)汽车销售服务有限公司</option>' +
                        '<option value="泰州天安达汽车贸易有限公司">泰州天安达汽车贸易有限公司</option>' +
                        '<option value="泰州天盛达汽车贸易有限公司">泰州天盛达汽车贸易有限公司</option>' +
                        '<option value="江苏良宇嘉福汽车销售服务有限公司">江苏良宇嘉福汽车销售服务有限公司</option>' +
                        '<option value="宿迁市良宇瑞福汽车销售服务有限公司">宿迁市良宇瑞福汽车销售服务有限公司</option>' +
                        '<option value="江苏富骏汽车贸易有限公司">江苏富骏汽车贸易有限公司</option>' +
                        '<option value="苏州天驰新佳汽车销售服务有限公司">苏州天驰新佳汽车销售服务有限公司</option>' +
                        '<option value="苏州东昌福德汽车销售服务有限公司">苏州东昌福德汽车销售服务有限公司</option>' +
                        '<option value="苏州南福汽车销售服务有限公司">苏州南福汽车销售服务有限公司</option>' +
                        '<option value="泰兴市天安达汽车贸易有限公司">泰兴市天安达汽车贸易有限公司</option>' +
                        '<option value="吴江富骏汽车销售服务有限公司">吴江富骏汽车销售服务有限公司</option>' +
                        '<option value="无锡东方福美汽车销售服务有限公司">无锡东方福美汽车销售服务有限公司</option>' +
                        '<option value="无锡市新纪元福星汽车销售服务有限公司">无锡市新纪元福星汽车销售服务有限公司</option>' +
                        '<option value="无锡睿邦汽车销售服务有限公司">无锡睿邦汽车销售服务有限公司</option>' +
                        '<option value="无锡福阳汽车销售服务有限公司">无锡福阳汽车销售服务有限公司</option>' +
                        '<option value="徐州润东嘉华汽车销售服务有限公司">徐州润东嘉华汽车销售服务有限公司</option>' +
                        '<option value="江苏良宇汽车销售服务有限公司">江苏良宇汽车销售服务有限公司</option>' +
                        '<option value="徐州泰和汇福汽车销售服务有限公司">徐州泰和汇福汽车销售服务有限公司</option>' +
                        '<option value="徐州北辰汽车销售服务有限公司">徐州北辰汽车销售服务有限公司</option>' +
                        '<option value="兴化市天安达汽车贸易有限公司">兴化市天安达汽车贸易有限公司</option>' +
                        '<option value="森风集团盐城允升汽车有限公司">森风集团盐城允升汽车有限公司</option>' +
                        '<option value="盐宁永宁新城汽车销售服务有限公司">盐宁永宁新城汽车销售服务有限公司</option>' +
                        '<option value="大丰市德福汽车销售服务有限公司">大丰市德福汽车销售服务有限公司</option>' +
                        '<option value="东台永宁德福汽车销售服务有限公司">东台永宁德福汽车销售服务有限公司</option>' +
                        '<option value="扬州福联汽车销售服务有限公司">扬州福联汽车销售服务有限公司</option>' +
                        '<option value="扬州市江都区福联汽车销售服务有限公司 ">扬州市江都区福联汽车销售服务有限公司 </option>' +
                        '<option value="扬州城北福联汽车销售服务有限公司">扬州城北福联汽车销售服务有限公司</option>' +
                        '<option value="扬中市福联汽车贸易有限公司 ">扬中市福联汽车贸易有限公司 </option>' +
                        '<option value="宜兴市德森汽车销售服务有限公司">宜兴市德森汽车销售服务有限公司</option>' +
                        '<option value="宜兴市德众汽车销售有限公司">宜兴市德众汽车销售有限公司</option>' +
                        '<option value="张家港富骏汽车销售服务有限公司">张家港富骏汽车销售服务有限公司</option>' +
                        '<option value="镇江福联汽车贸易有限公司">镇江福联汽车贸易有限公司</option>' +
                        '<option value="镇江新城福联汽车贸易有限公司">镇江新城福联汽车贸易有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "江西") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="江西江铃洪都北大道分公司">江西江铃洪都北大道分公司</option>' +
                        '<option value="江西福翔洪都南路">江西福翔洪都南路</option>' +
                        '<option value="赣州华美行南康分公司">赣州华美行南康分公司</option>' +
                        '<option value="江西福翔进贤分公司">江西福翔进贤分公司</option>' +
                        '<option value="九江福万通开发区分公司">九江福万通开发区分公司</option>' +
                        '<option value="景德镇坤城乐平分公司">景德镇坤城乐平分公司</option>' +
                        '<option value="景德镇坤城鹰潭分公司">景德镇坤城鹰潭分公司</option>' +
                        '<option value="江铃海外安义分公司">江铃海外安义分公司</option>' +
                        '<option value="江铃海外红谷滩分公司">江铃海外红谷滩分公司</option>' +
                        '<option value="吉安永福达井冈山分公司">吉安永福达井冈山分公司</option>' +
                        '<option value="江西江铃海外汽车销售服务有限公司">江西江铃海外汽车销售服务有限公司</option>' +
                        '<option value="江西福翔汽车有限公司">江西福翔汽车有限公司</option>' +
                        '<option value="江西省智隆汽车有限公司">江西省智隆汽车有限公司</option>' +
                        '<option value="江西恒望汽车贸易有限公司">江西恒望汽车贸易有限公司</option>' +
                        '<option value="赣州华盛行汽车销售服务有限公司">赣州华盛行汽车销售服务有限公司</option>' +
                        '<option value="抚州福广汽车发展有限公司 ">抚州福广汽车发展有限公司 </option>' +
                        '<option value="赣州华美行汽车销售服务有限公司">赣州华美行汽车销售服务有限公司</option>' +
                        '<option value="江西鸿浩汽车销售服务有限公司">江西鸿浩汽车销售服务有限公司</option>' +
                        '<option value="景德镇市坤城汽车有限公司">景德镇市坤城汽车有限公司</option>' +
                        '<option value="吉安市青原区永福达汽车有限公司">吉安市青原区永福达汽车有限公司</option>' +
                        '<option value="九江福万通汽车有限公司">九江福万通汽车有限公司</option>' +
                        '<option value="九江江丰汽车有限公司">九江江丰汽车有限公司</option>' +
                        '<option value="萍乡福信达汽车销售服务有限公司">萍乡福信达汽车销售服务有限公司</option>' +
                        '<option value="上饶市福泉汽车有限公司">上饶市福泉汽车有限公司</option>' +
                        '<option value="宜春福顺达汽车销售服务有限公司">宜春福顺达汽车销售服务有限公司</option>' +
                        '<option value="新余丰源汽车销售服务有限公司">新余丰源汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "辽宁") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="营口红运顺众汽车销售服务有限公司">营口红运顺众汽车销售服务有限公司</option>' +
                        '<option value="大连中升汇众汽车销售服务有限公司">大连中升汇众汽车销售服务有限公司</option>' +
                        '<option value="大连中联伟业汽车销售有限公司">大连中联伟业汽车销售有限公司</option>' +
                        '<option value="大连禾众汽车销售服务有限公司">大连禾众汽车销售服务有限公司</option>' +
                        '<option value="大连弘鼎汽车销售服务有限公司">大连弘鼎汽车销售服务有限公司</option>' +
                        '<option value="鞍山谛赢汽车销售服务有限公司">鞍山谛赢汽车销售服务有限公司</option>' +
                        '<option value="大连通孚祥汽车贸易有限公司">大连通孚祥汽车贸易有限公司</option>' +
                        '<option value="鞍山市中田汽车贸易有限公司">鞍山市中田汽车贸易有限公司</option>' +
                        '<option value="瓦房店市顺发物资商贸有限公司">瓦房店市顺发物资商贸有限公司</option>' +
                        '<option value="营口红运汇众汽车销售服务有限公司">营口红运汇众汽车销售服务有限公司</option>' +
                        '<option value="大连汽贸集团汽车销售服务有限公司">大连汽贸集团汽车销售服务有限公司</option>' +
                        '<option value="盘锦伯骏汽车销售服务有限公司">盘锦伯骏汽车销售服务有限公司</option>' +
                        '<option value="朝阳川达捷胜汽车销售服务有限公司">朝阳川达捷胜汽车销售服务有限公司</option>' +
                        '<option value="灯塔凯祥汽车销售服务有限公司">灯塔凯祥汽车销售服务有限公司</option>' +
                        '<option value="辽宁惠华集团朝阳汽车销售服务有限公司">辽宁惠华集团朝阳汽车销售服务有限公司</option>' +
                        '<option value="阜新和利汽车销售服务有限公司">阜新和利汽车销售服务有限公司</option>' +
                        '<option value="辽阳凯众汽车销售服务有限公司">辽阳凯众汽车销售服务有限公司</option>' +
                        '<option value="阜新永生工贸发展有限公司">阜新永生工贸发展有限公司</option>' +
                        '<option value="葫芦岛市维立达汽车服务有限公司">葫芦岛市维立达汽车服务有限公司</option>' +
                        '<option value="锦州通用汽车销售服务有限公司">锦州通用汽车销售服务有限公司</option>' +
                        '<option value="盘锦隆达汽车产品销售服务有限公司">盘锦隆达汽车产品销售服务有限公司</option>' +
                        '<option value="辽宁惠华新业集团辽中汽车销售服务有限公司">辽宁惠华新业集团辽中汽车销售服务有限公司</option>' +
                        '<option value="辽宁惠华新业集团新民汽车销售服务有限公司">辽宁惠华新业集团新民汽车销售服务有限公司</option>' +
                        '<option value="沈阳惠华新业汽车销售服务有限公司">沈阳惠华新业汽车销售服务有限公司</option>' +
                        '<option value="辽宁惠华集团本溪汽车销售服务有限公司">辽宁惠华集团本溪汽车销售服务有限公司</option>' +
                        '<option value="沈阳市庞大一众汽车销售有限公司">沈阳市庞大一众汽车销售有限公司</option>' +
                        '<option value="铁岭和成汽车销售服务有限公司">铁岭和成汽车销售服务有限公司</option>' +
                        '<option value="抚顺和昆汽车销售服务有限公司">抚顺和昆汽车销售服务有限公司</option>' +
                        '<option value="沈阳和昊汽车销售服务有限公司">沈阳和昊汽车销售服务有限公司</option>' +
                        '<option value="铁岭市顺峰（集团）汽车销售服务有限公司">铁岭市顺峰（集团）汽车销售服务有限公司</option>' +
                        '<option value="辽宁惠华汽车集团有限公司">辽宁惠华汽车集团有限公司</option>' +
                        '<option value="沈阳合众汽车服务有限公司">沈阳合众汽车服务有限公司</option>' +
                        '<option value="辽宁和兴大众汽车销售服务有限公司">辽宁和兴大众汽车销售服务有限公司</option>' +
                        '<option value="丹东曙光新天地汽车销售服务有限公司">丹东曙光新天地汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "内蒙古") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="包头泰迪九原分公司">包头泰迪九原分公司</option>' +
                        '<option value="内蒙古泰迪汽车服务有限公司">内蒙古泰迪汽车服务有限公司</option>' +
                        '<option value="呼和浩特市耀世美福汽车销售有限公司">呼和浩特市耀世美福汽车销售有限公司</option>' +
                        '<option value="包头金福汽车销售服务有限公司">包头金福汽车销售服务有限公司</option>' +
                        '<option value="包头市泰迪汽车销售服务有限公司">包头市泰迪汽车销售服务有限公司</option>' +
                        '<option value="巴彦淖尔市利丰泰迪汽车销售服务有限公司">巴彦淖尔市利丰泰迪汽车销售服务有限公司</option>' +
                        '<option value="赤峰市利丰泰迪汽车服务有限公司 ">赤峰市利丰泰迪汽车服务有限公司 </option>' +
                        '<option value="鄂尔多斯市福鑫诚汽车销售责任有限公司 ">鄂尔多斯市福鑫诚汽车销售责任有限公司 </option>' +
                        '<option value="呼伦贝尔市利丰泰迪汽车销售有限公司">呼伦贝尔市利丰泰迪汽车销售有限公司</option>' +
                        '<option value="通辽市利丰泰迪汽车销售服务有限公司">通辽市利丰泰迪汽车销售服务有限公司</option>' +
                        '<option value="乌海庞大亚航汽车销售服务有限公司">乌海庞大亚航汽车销售服务有限公司</option>' +
                        '<option value="乌兰浩特市泰迪汽车销售服务有限公司">乌兰浩特市泰迪汽车销售服务有限公司</option>' +
                        '<option value="锡林郭勒瑞泰汽车销售服务有限公司">锡林郭勒瑞泰汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "宁夏") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="宁夏万易福固原分公司">宁夏万易福固原分公司</option>' +
                        '<option value="宁夏万易福吴忠分公司">宁夏万易福吴忠分公司</option>' +
                        '<option value="宁夏福立升兴庆分公司">宁夏福立升兴庆分公司</option>' +
                        '<option value="宁夏福立升汽车销售服务有限公司">宁夏福立升汽车销售服务有限公司</option>' +
                        '<option value="宁夏金岛长福汽车销售有限公司">宁夏金岛长福汽车销售有限公司</option>' +
                        '<option value="宁夏银福汽车销售服务有限公司">宁夏银福汽车销售服务有限公司</option>' +
                        '<option value="宁夏万易安汽车销售服务有限公司">宁夏万易安汽车销售服务有限公司</option>' +
                        '<option value="宁夏万易福汽车销售服务有限公司">宁夏万易福汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "青海") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="青海金岛长福格尔木分公司">青海金岛长福格尔木分公司</option>' +
                        '<option value="青海金岛长福销售服务分公司">青海金岛长福销售服务分公司</option>' +
                        '<option value="青海金岛长福汽车销售有限公司 ">青海金岛长福汽车销售有限公司 </option>' +
                        '<option value="青海嘉悦汽车销售服务有限公司">青海嘉悦汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "山东") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="临沂福华蒙阴分公司">临沂福华蒙阴分公司</option>' +
                        '<option value="泰安北方新福新泰分公司">泰安北方新福新泰分公司</option>' +
                        '<option value="日照泰华五莲分公司">日照泰华五莲分公司</option>' +
                        '<option value="威海福鑫文登分公司">威海福鑫文登分公司</option>' +
                        '<option value="聊城金福阳谷分公司">聊城金福阳谷分公司</option>' +
                        '<option value="临沂福华郯城分公司">临沂福华郯城分公司</option>' +
                        '<option value="临沂福华平邑分公司">临沂福华平邑分公司</option>' +
                        '<option value="德州福特宝平原分公司">德州福特宝平原分公司</option>' +
                        '<option value="济宁福泰金乡分公司">济宁福泰金乡分公司</option>' +
                        '<option value="济宁福泰梁山分公司">济宁福泰梁山分公司</option>' +
                        '<option value="临沂福华苍山分公司">临沂福华苍山分公司</option>' +
                        '<option value="临沂福华费县分公司">临沂福华费县分公司</option>' +
                        '<option value="聊城金福冠县分公司">聊城金福冠县分公司</option>' +
                        '<option value="荷泽福特鑫郓城分公司">荷泽福特鑫郓城分公司</option>' +
                        '<option value="青州飞达临朐分公司">青州飞达临朐分公司</option>' +
                        '<option value="山东晟和宁阳分公司">山东晟和宁阳分公司</option>' +
                        '<option value="烟台海之润海阳分公司">烟台海之润海阳分公司</option>' +
                        '<option value="烟台裕华蓬莱分公司">烟台裕华蓬莱分公司</option>' +
                        '<option value="烟台裕华栖霞分公司">烟台裕华栖霞分公司</option>' +
                        '<option value="邹城市宝泰曲阜分公司">邹城市宝泰曲阜分公司</option>' +
                        '<option value="菏泽福特鑫巨野分公司">菏泽福特鑫巨野分公司</option>' +
                        '<option value="菏泽福特鑫单县分公司">菏泽福特鑫单县分公司</option>' +
                        '<option value="青岛成胜达市南分公司">青岛成胜达市南分公司</option>' +
                        '<option value="山东福特福汽车销售服务有限公司">山东福特福汽车销售服务有限公司</option>' +
                        '<option value="山东银座天福汽车有限公司 ">山东银座天福汽车有限公司 </option>' +
                        '<option value="山东顺骋汽车贸易有限公司">山东顺骋汽车贸易有限公司</option>' +
                        '<option value="济南信达通福汽车销售服务有限公司">济南信达通福汽车销售服务有限公司</option>' +
                        '<option value="济南祥福汽车服务有限公司">济南祥福汽车服务有限公司</option>' +
                        '<option value="滨州泰瑞福汽车有限公司">滨州泰瑞福汽车有限公司</option>' +
                        '<option value="滨州和润汽车销售服务有限公司">滨州和润汽车销售服务有限公司</option>' +
                        '<option value="邹平德坤汽车销售服务有限公司">邹平德坤汽车销售服务有限公司</option>' +
                        '<option value="德州福特宝汽车销售服务有限公司">德州福特宝汽车销售服务有限公司</option>' +
                        '<option value="东营华正汽车销售有限公司">东营华正汽车销售有限公司</option>' +
                        '<option value="东营泰瑞福汽车有限公司">东营泰瑞福汽车有限公司</option>' +
                        '<option value="菏泽福特鑫汽车销售服务有限公司">菏泽福特鑫汽车销售服务有限公司</option>' +
                        '<option value="菏泽福特瑞汽车销售服务有限公司">菏泽福特瑞汽车销售服务有限公司</option>' +
                        '<option value="济宁福泰阳光汽车销售服务有限公司">济宁福泰阳光汽车销售服务有限公司</option>' +
                        '<option value="济宁德骏阳光汽车销售服务有限公司">济宁德骏阳光汽车销售服务有限公司</option>' +
                        '<option value="聊城金福汽车销售服务有限公司">聊城金福汽车销售服务有限公司</option>' +
                        '<option value="聊城五洲福翼达汽车销售服务有限公司">聊城五洲福翼达汽车销售服务有限公司</option>' +
                        '<option value="临沂福华汽车销售服务有限公司">临沂福华汽车销售服务有限公司</option>' +
                        '<option value="临沂福悦汽车销售有限公司">临沂福悦汽车销售有限公司</option>' +
                        '<option value="临沂御骏汽车销售服务有限公司">临沂御骏汽车销售服务有限公司</option>' +
                        '<option value="青岛六和汽车服务有限公司">青岛六和汽车服务有限公司</option>' +
                        '<option value="青岛成胜达汽车销售服务有限公司">青岛成胜达汽车销售服务有限公司</option>' +
                        '<option value="青岛成致达汽车销售服务有限公司">青岛成致达汽车销售服务有限公司</option>' +
                        '<option value="青岛成利达汽车销售服务有限公司">青岛成利达汽车销售服务有限公司</option>' +
                        '<option value="青岛成浩达汽车销售服务有限公司">青岛成浩达汽车销售服务有限公司</option>' +
                        '<option value="青岛成悦达汽车销售服务有限公司 ">青岛成悦达汽车销售服务有限公司 </option>' +
                        '<option value="青岛成泰达汽车销售服务有限公司">青岛成泰达汽车销售服务有限公司</option>' +
                        '<option value="莱州市康顺捷汽车销售服务有限公司">莱州市康顺捷汽车销售服务有限公司</option>' +
                        '<option value="青岛康安捷汽车销售服务有限公司">青岛康安捷汽车销售服务有限公司</option>' +
                        '<option value="青州飞达汽车销售服务有限公司">青州飞达汽车销售服务有限公司</option>' +
                        '<option value="日照泰华汽车销售服务有限公司">日照泰华汽车销售服务有限公司</option>' +
                        '<option value="日照荣华汽车销售服务有限公司">日照荣华汽车销售服务有限公司</option>' +
                        '<option value="泰安北方福泰汽车销售服务有限公司">泰安北方福泰汽车销售服务有限公司</option>' +
                        '<option value="山东晟和汽车销售服务有限公司">山东晟和汽车销售服务有限公司</option>' +
                        '<option value="滕州乐福汽车销售服务有限公司">滕州乐福汽车销售服务有限公司</option>' +
                        '<option value="潍坊冠成汽车销售服务有限公司">潍坊冠成汽车销售服务有限公司</option>' +
                        '<option value="潍坊天盛汽车销售服务有限公司">潍坊天盛汽车销售服务有限公司</option>' +
                        '<option value="高密润福汽车贸易有限公司">高密润福汽车贸易有限公司</option>' +
                        '<option value="寿光富赢汽车销售服务有限公司">寿光富赢汽车销售服务有限公司</option>' +
                        '<option value="威海福鑫汽车贸易有限公司">威海福鑫汽车贸易有限公司</option>' +
                        '<option value="威海福麒汽车销售有限公司">威海福麒汽车销售有限公司</option>' +
                        '<option value="烟台裕华汽车服务有限公司 ">烟台裕华汽车服务有限公司 </option>' +
                        '<option value="烟台海之润汽车销售有限公司">烟台海之润汽车销售有限公司</option>' +
                        '<option value="莱阳裕隆汽车服务有限公司">莱阳裕隆汽车服务有限公司</option>' +
                        '<option value="龙口裕通汽车服务有限公司">龙口裕通汽车服务有限公司</option>' +
                        '<option value="枣庄永乐汽车销售服务有限公司">枣庄永乐汽车销售服务有限公司</option>' +
                        '<option value="淄博鑫汇汽车销售服务有限公司">淄博鑫汇汽车销售服务有限公司</option>' +
                        '<option value="淄博锦骋汽车贸易有限公司">淄博锦骋汽车贸易有限公司</option>' +
                        '<option value="淄博众骋汽车贸易有限公司">淄博众骋汽车贸易有限公司</option>' +
                        '<option value="诸城广潍天瑞汽车销售服务有限公司">诸城广潍天瑞汽车销售服务有限公司</option>' +
                        '<option value="邹城宝泰汽车销售服务有限公司">邹城宝泰汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "山西") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="晋城安特晋城市健驰（新华夏）汽车有限公司">晋城安特晋城市健驰（新华夏）汽车有限公司</option>' +
                        '<option value="晋中必高必福介休分公司">晋中必高必福介休分公司</option>' +
                        '<option value="运城韩韩河津分公司">运城韩韩河津分公司</option>' +
                        '<option value="运城韩韩永济分公司">运城韩韩永济分公司</option>' +
                        '<option value="运城韩韩芮城分公司">运城韩韩芮城分公司</option>' +
                        '<option value="运城瑞安稷山分公司">运城瑞安稷山分公司</option>' +
                        '<option value="运城瑞安新绛分公司">运城瑞安新绛分公司</option>' +
                        '<option value="运城瑞安绛县分公司">运城瑞安绛县分公司</option>' +
                        '<option value="运城韩韩万荣分公司">运城韩韩万荣分公司</option>' +
                        '<option value="运城瑞安闻喜分公司">运城瑞安闻喜分公司</option>' +
                        '<option value="运城韩韩平陆分公司">运城韩韩平陆分公司</option>' +
                        '<option value="运城瑞安垣曲分公司">运城瑞安垣曲分公司</option>' +
                        '<option value="山西大昌北城分公司">山西大昌北城分公司</option>' +
                        '<option value="山西大昌汽车销售有限公司">山西大昌汽车销售有限公司</option>' +
                        '<option value="山西昌福汽车服务有限公司">山西昌福汽车服务有限公司 </option>' +
                        '<option value="长治市华信福安汽车销售有限公司">长治市华信福安汽车销售有限公司</option>' +
                        '<option value="长治市华信福达汽车销售服务有限公司">长治市华信福达汽车销售服务有限公司</option>' +
                        '<option value="大同市大昌灵曦汽车销售有限公司">大同市大昌灵曦汽车销售有限公司</option>' +
                        '<option value="晋城市安特汽车销售服务有限公司">晋城市安特汽车销售服务有限公司</option>' +
                        '<option value="山西必高必福汽车销售服务有限公司">山西必高必福汽车销售服务有限公司</option>' +
                        '<option value="临汾天健弘毅汽车销售服务有限公司">临汾天健弘毅汽车销售服务有限公司 </option>' +
                        '<option value="山西省吕梁市大昌汽车销售有限公司">山西省吕梁市大昌汽车销售有限公司</option>' +
                        '<option value="忻州联众汽车销售服务有限公司">忻州联众汽车销售服务有限公司</option>' +
                        '<option value="阳泉三江大福汽车销售有限公司">阳泉三江大福汽车销售有限公司</option>' +
                        '<option value="运城市韩韩汽车销售服务有限公司">运城市韩韩汽车销售服务有限公司</option>' +
                        '<option value="山西诺维兰集团运城瑞安汽车销售服务有限公司">山西诺维兰集团运城瑞安汽车销售服务有限公司</option>' +
                        '<option value="临汾天健弘毅侯马分公司">临汾天健弘毅侯马分公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "陕西") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="渭南福海韩城分公司">渭南福海韩城分公司</option>' +
                        '<option value="延安蓝天福海铜川分公司">延安蓝天福海铜川分公司</option>' +
                        '<option value="陕西榆林永盛神木分公司">陕西榆林永盛神木分公司</option>' +
                        '<option value="陕西福腾陕西福腾汽车贸易有限公司钣喷中心">陕西福腾陕西福腾汽车贸易有限公司钣喷中心</option>' +
                        '<option value="渭南福海富平分公司">渭南福海富平分公司</option>' +
                        '<option value="西安福新阎良分公司">西安福新阎良分公司</option>' +
                        '<option value="宝鸡福信眉县分公司">宝鸡福信眉县分公司</option>' +
                        '<option value="陕西福迪汽车贸易有限公司">陕西福迪汽车贸易有限公司</option>' +
                        '<option value="陕西福腾汽车贸易有限公司">陕西福腾汽车贸易有限公司</option>' +
                        '<option value="陕西幸福汽车销售有限公司">陕西幸福汽车销售有限公司</option>' +
                        '<option value="西安市福威汽车贸易有限公司">西安市福威汽车贸易有限公司</option>' +
                        '<option value="西安福康汽车销售服务有限公司">西安福康汽车销售服务有限公司</option>' +
                        '<option value="陕西福跃汽车销售服务有限公司">陕西福跃汽车销售服务有限公司</option>' +
                        '<option value="陕西嘉福圆汽车贸易服务有限公司">陕西嘉福圆汽车贸易服务有限公司</option>' +
                        '<option value="陕西新丰泰福生汽车销售服务有限公司">陕西新丰泰福生汽车销售服务有限公司</option>' +
                        '<option value="西安福新汽车销售服务有限公司">西安福新汽车销售服务有限公司</option>' +
                        '<option value="陕西福秦汽车销售服务有限公司">陕西福秦汽车销售服务有限公司</option>' +
                        '<option value="陕西福盈汽车销售服务有限公司">陕西福盈汽车销售服务有限公司</option>' +
                        '<option value="陕西亿禾汽车销售服务有限公司">陕西亿禾汽车销售服务有限公司</option>' +
                        '<option value="安康福泽汽车销售服务有限公司">安康福泽汽车销售服务有限公司</option>' +
                        '<option value="宝鸡市福信汽车销售服务有限公司">宝鸡市福信汽车销售服务有限公司</option>' +
                        '<option value="汉中惠福汽车销售服务有限公司">汉中惠福汽车销售服务有限公司</option>' +
                        '<option value="商洛福泽汽车销售服务有限公司">商洛福泽汽车销售服务有限公司</option>' +
                        '<option value="渭南市福海汽车服务有限公司">渭南市福海汽车服务有限公司</option>' +
                        '<option value="榆林东方集团福星汽车销售服务有限公司">榆林东方集团福星汽车销售服务有限公司</option>' +
                        '<option value="榆林永盛汽贸有限公司">榆林永盛汽贸有限公司</option>' +
                        '<option value="延安蓝天福海汽车销售服务有限公司">延安蓝天福海汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "上海") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="上海九华七莘路分公司">上海九华七莘路分公司</option>' +
                        '<option value="上海格林威嘉定分公司">上海格林威嘉定分公司</option>' +
                        '<option value="上海九华汽车维修有限公司">上海九华汽车维修有限公司</option>' +
                        '<option value="上海永达通宝汽车销售服务有限公司">上海永达通宝汽车销售服务有限公司</option>' +
                        '<option value="上海福成汽车销售服务有限公司">上海福成汽车销售服务有限公司</option>' +
                        '<option value="上海格林威汽车销售有限公司">上海格林威汽车销售有限公司</option>' +
                        '<option value="上海东昌福德汽车销售服务有限公司">上海东昌福德汽车销售服务有限公司</option>' +
                        '<option value="上海福银汽车销售服务有限公司">上海福银汽车销售服务有限公司</option>' +
                        '<option value="上海九华汽车服务有限公司">上海九华汽车服务有限公司</option>' +
                        '<option value="上海协通福骋汽车销售服务有限公司">上海协通福骋汽车销售服务有限公司</option>' +
                        '<option value="上海格林威中环汽车销售服务有限公司">上海格林威中环汽车销售服务有限公司</option>' +
                        '<option value="上海格林威沪青汽车维修服务有限公司">上海格林威沪青汽车维修服务有限公司</option>' +
                        '<option value="上海成套浦星汽车销售服务有限公司">上海成套浦星汽车销售服务有限公司</option>' +
                        '<option value="上海协通福茂汽车销售服务有限公司">上海协通福茂汽车销售服务有限公司</option>' +
                        '<option value="上海弘欣汽车销售服务有限公司">上海弘欣汽车销售服务有限公司</option>' +
                        '<option value="上海马洛克汽车销售服务有限公司">上海马洛克汽车销售服务有限公司</option>' +
                        '<option value="上海九华特联汽车销售有限公司">上海九华特联汽车销售有限公司</option>' +
                        '<option value="上海九华汽车销售有限公司">上海九华汽车销售有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "四川") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="成都天均双流分公司">成都天均双流分公司</option>' +
                        '<option value="成都福安达温江分公司">成都福安达温江分公司</option>' +
                        '<option value="德阳万星什邡分公司">德阳万星什邡分公司</option>' +
                        '<option value="资阳市清巍简阳分公司">资阳市清巍简阳分公司</option>' +
                        '<option value="成都杰益大丰分公司">成都杰益大丰分公司</option>' +
                        '<option value="德阳宗越岷江西路分公司">德阳宗越岷江西路分公司</option>' +
                        '<option value="遂宁新清巍射洪分公司">遂宁新清巍射洪分公司</option>' +
                        '<option value="成都万星郫县分公司">成都万星郫县分公司</option>' +
                        '<option value="成都万星汽车销售服务有限公司">成都万星汽车销售服务有限公司</option>' +
                        '<option value="四川先锋汽车有限责任公司">四川先锋汽车有限责任公司</option>' +
                        '<option value="成都通海三圣汽车销售有限责任公司">成都通海三圣汽车销售有限责任公司</option>' +
                        '<option value="四川长征腾飞汽车销售服务有限公司">四川长征腾飞汽车销售服务有限公司</option>' +
                        '<option value="成都福安达汽车销售服务有限公司">成都福安达汽车销售服务有限公司</option>' +
                        '<option value="成都天钧科技有限公司">成都天钧科技有限公司</option>' +
                        '<option value="成都杰益汽车销售服务有限公司">成都杰益汽车销售服务有限公司</option>' +
                        '<option value="成都福之星车业有限公司">成都福之星车业有限公司</option>' +
                        '<option value="成都龙福汽车销售服务有限公司">成都龙福汽车销售服务有限公司</option>' +
                        '<option value="彭州市明利车业有限公司">彭州市明利车业有限公司</option>' +
                        '<option value="成都福庆汽车销售服务有限公司">成都福庆汽车销售服务有限公司</option>' +
                        '<option value="巴中市祥宇汽车销售有限责任公司">巴中市祥宇汽车销售有限责任公司</option>' +
                        '<option value="达州骏翔汽车有限公司">达州骏翔汽车有限公司</option>' +
                        '<option value="德阳万星汽车销售服务有限公司">德阳万星汽车销售服务有限公司</option>' +
                        '<option value="德阳宗越汽车销售服务有限公司">德阳宗越汽车销售服务有限公司</option>' +
                        '<option value="四川安捷长信汽车销售服务有限公司">四川安捷长信汽车销售服务有限公司</option>' +
                        '<option value="广元中鸿汽车销售服务有限公司">广元中鸿汽车销售服务有限公司</option>' +
                        '<option value="广安骏安达汽车有限公司">广安骏安达汽车有限公司</option>' +
                        '<option value="乐山先锋汽车销售服务有限公司">乐山先锋汽车销售服务有限公司</option>' +
                        '<option value="泸州东创中孚车业有限公司">泸州东创中孚车业有限公司</option>' +
                        '<option value="内江市四达翔辉汽车销售有限公司">内江市四达翔辉汽车销售有限公司</option>' +
                        '<option value="绵阳万鸿汽车销售服务有限公司">绵阳万鸿汽车销售服务有限公司</option>' +
                        '<option value="绵阳安捷福信汽车销售服务有限公司">绵阳安捷福信汽车销售服务有限公司</option>' +
                        '<option value="眉山市清巍车业有限公司">眉山市清巍车业有限公司</option>' +
                        '<option value="南充德福达汽车有限公司 ">南充德福达汽车有限公司 </option>' +
                        '<option value="攀枝花市永福汽车销售服务有限公司">攀枝花市永福汽车销售服务有限公司</option>' +
                        '<option value="遂宁新清巍车业有限公司">遂宁新清巍车业有限公司</option>' +
                        '<option value="西昌祥和汽车销售服务有限责任公司">西昌祥和汽车销售服务有限责任公司</option>' +
                        '<option value="雅安市兴康通汽车销售服务有限公司">雅安市兴康通汽车销售服务有限公司</option>' +
                        '<option value="宜宾市翔奕汽车销售服务有限公司">宜宾市翔奕汽车销售服务有限公司</option>' +
                        '<option value="自贡四达翔辉汽车销售服务有限公司">自贡四达翔辉汽车销售服务有限公司</option>' +
                        '<option value="资阳市清巍车业有限公司">资阳市清巍车业有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "天津") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="塘沽柯兰德大港分公司">塘沽柯兰德大港分公司</option>' +
                        '<option value="天津柯兰德汽车销售服务有限公司">天津柯兰德汽车销售服务有限公司</option>' +
                        '<option value="天津市中乒北福汽车销售服务有限公司">天津市中乒北福汽车销售服务有限公司</option>' +
                        '<option value="天津开发区柯兰德汽车贸易有限公司">天津开发区柯兰德汽车贸易有限公司</option>' +
                        '<option value="天津市浩物燕兴汽车销售服务有限公司">天津市浩物燕兴汽车销售服务有限公司</option>' +
                        '<option value="中国长安汽车集团天津销售有限公司">中国长安汽车集团天津销售有限公司</option>' +
                        '<option value="天津远大汽车销售服务有限公司">天津远大汽车销售服务有限公司</option>' +
                        '<option value="天津市尊泰汽车销售服务有限公司">天津市尊泰汽车销售服务有限公司</option>' +
                        '<option value="天津博兴兆恒汽车销售服务有限公司">天津博兴兆恒汽车销售服务有限公司</option>' +
                        '<option value="天津捷世恒汽车销售服务有限公司 ">天津捷世恒汽车销售服务有限公司 </option>' +
                        '');
                } else if ($('#form_prov').val() == "西藏") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="西藏康盛汽车销售服务有限公司">西藏康盛汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "新疆") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="阿克苏秋林喀什分公司">阿克苏秋林喀什分公司</option>' +
                        '<option value="新疆福凌汽车销售服务有限公司">新疆福凌汽车销售服务有限公司</option>' +
                        '<option value="新疆天汇福达汽车销售服务有限责任公司 ">新疆天汇福达汽车销售服务有限责任公司 </option>' +
                        '<option value="新疆龙泽源汽车销售有限公司">新疆龙泽源汽车销售有限公司</option>' +
                        '<option value="阿克苏秋林汽车贸易有限公司">阿克苏秋林汽车贸易有限公司</option>' +
                        '<option value="新疆福瑞行汽车销售服务有限公司">新疆福瑞行汽车销售服务有限公司</option>' +
                        '<option value="哈密市天阅汽车销售服务有限公司">哈密市天阅汽车销售服务有限公司</option>' +
                        '<option value="新疆福荣汽车销售服务有限公司">新疆福荣汽车销售服务有限公司</option>' +
                        '<option value="巴州龙跃汽车销售有限公司">巴州龙跃汽车销售有限公司</option>' +
                        '<option value="伊犁福鼎汽车销售服务有限公司">伊犁福鼎汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "云南") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="西双版纳分公司">西双版纳分公司</option>' +
                        '<option value="云南中博人民西路城市展厅">云南中博人民西路城市展厅</option>' +
                        '<option value="德宏万福保山分公司">德宏万福保山分公司</option>' +
                        '<option value="云南健中冈仁福凯旋利分公司">云南健中冈仁福凯旋利分公司</option>' +
                        '<option value="曲靖安特宣威分公司">曲靖安特宣威分公司</option>' +
                        '<option value="丽江金鸿福永胜分公司">丽江金鸿福永胜分公司</option>' +
                        '<option value="曲靖安特交通路分公司">曲靖安特交通路分公司</option>' +
                        '<option value="云南万福车行天下服务分公司">云南万福车行天下服务分公司</option>' +
                        '<option value="云南万福寻甸分公司">云南万福寻甸分公司</option>' +
                        '<option value="云南万福汽车销售服务有限公司">云南万福汽车销售服务有限公司</option>' +
                        '<option value="云南中博汽车销售服务有限公司">云南中博汽车销售服务有限公司</option>' +
                        '<option value="云南健中冈仁福汽车销售有限公司">云南健中冈仁福汽车销售有限公司  </option>' +
                        '<option value="云南健中冈商贸有限公司">云南健中冈商贸有限公司</option>' +
                        '<option value="昆明涌鑫之福贸易有限公司">昆明涌鑫之福贸易有限公司</option>' +
                        '<option value="云南万福汽车销售服务有限公司安宁分公司">云南万福汽车销售服务有限公司安宁分公司</option>' +
                        '<option value="楚雄万福汽车销售服务有限公司">楚雄万福汽车销售服务有限公司</option>' +
                        '<option value="大理万福汽车销售服务有限公司">大理万福汽车销售服务有限公司</option>' +
                        '<option value="德宏万福汽车销售服务有限公司">德宏万福汽车销售服务有限公司</option>' +
                        '<option value="丽江金鸿福汽车销售服务有限公司">丽江金鸿福汽车销售服务有限公司</option>' +
                        '<option value="红河万福汽车销售服务有限公司">红河万福汽车销售服务有限公司</option>' +
                        '<option value="普洱普福汽车销售服务有限公司">普洱普福汽车销售服务有限公司</option>' +
                        '<option value="云南曲靖安特经贸有限公司">云南曲靖安特经贸有限公司 </option>' +
                        '<option value="文山健中冈天惠汽车销售服务有限公司">文山健中冈天惠汽车销售服务有限公司</option>' +
                        '<option value="玉溪安特经贸有限公司">玉溪安特经贸有限公司</option>' +
                        '<option value="昭通福鸿汽车销售服务有限公司">昭通福鸿汽车销售服务有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "浙江") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="嵊州兴福新昌">嵊州兴福新昌</option>' +
                        '<option value="湖州万国德清分公司">湖州万国德清分公司</option>' +
                        '<option value="嘉兴万国嘉善分公司">嘉兴万国嘉善分公司</option>' +
                        '<option value="嘉兴万国海盐分公司">嘉兴万国海盐分公司</option>' +
                        '<option value="萧山万国萧山万朋">萧山万国萧山万朋</option>' +
                        '<option value="金华福达武义分公司">金华福达武义分公司</option>' +
                        '<option value="湖州万朋南浔分公司">湖州万朋南浔分公司</option>' +
                        '<option value="衢州瑞鑫江山分公司">衢州瑞鑫江山分公司</option>' +
                        '<option value="绍兴福通城南分公司">绍兴福通城南分公司</option>' +
                        '<option value="浙江万国勾庄分公司">浙江万国勾庄分公司</option>' +
                        '<option value="余姚福顺余姚分公司">余姚福顺余姚分公司</option>' +
                        '<option value="乐清福荣永嘉分公司">乐清福荣永嘉分公司</option>' +
                        '<option value="浙江万国联大服务分公司">浙江万国联大服务分公司</option>' +
                        '<option value="浙江元通福通桐庐分公司">浙江元通福通桐庐分公司</option>' +
                        '<option value="义乌瑞鑫浦江分公司">义乌瑞鑫浦江分公司</option>' +
                        '<option value="浙江万国汽车有限公司">浙江万国汽车有限公司</option>' +
                        '<option value="浙江万国美福汽车有限公司">浙江万国美福汽车有限公司</option>' +
                        '<option value="浙江万国汽车有限公司萧山分公司 ">浙江万国汽车有限公司萧山分公司 </option>' +
                        '<option value="浙江元通福通汽车有限公司">浙江元通福通汽车有限公司</option>' +
                        '<option value="浙江康众汽车有限公司">浙江康众汽车有限公司</option>' +
                        '<option value="杭州元通元福汽车有限公司">杭州元通元福汽车有限公司</option>' +
                        '<option value="杭州万联汽车有限公司">杭州万联汽车有限公司</option>' +
                        '<option value="杭州万宏汽车有限公司">杭州万宏汽车有限公司</option>' +
                        '<option value="浙江万朋汽车有限公司">浙江万朋汽车有限公司</option>' +
                        '<option value="富阳通福汽车有限公司">富阳通福汽车有限公司</option>' +
                        '<option value="临安元通福通汽车有限公司">临安元通福通汽车有限公司</option>' +
                        '<option value="慈溪市康顺汽车销售服务有限公司">慈溪市康顺汽车销售服务有限公司</option>' +
                        '<option value="东阳市联鑫汽车有限公司">东阳市联鑫汽车有限公司</option>' +
                        '<option value="海宁万国汽车有限公司">海宁万国汽车有限公司</option>' +
                        '<option value="浙江万国汽车有限公司湖州分公司">浙江万国汽车有限公司湖州分公司  </option>' +
                        '<option value="湖州万朋汽车有限公司">湖州万朋汽车有限公司</option>' +
                        '<option value="长兴万国汽车有限公司">长兴万国汽车有限公司</option>' +
                        '<option value="安吉万国汽车有限公司">安吉万国汽车有限公司</option>' +
                        '<option value="浙江万国汽车有限公司嘉兴分公司 ">浙江万国汽车有限公司嘉兴分公司</option>' +
                        '<option value="嘉兴美福汽车有限公司">嘉兴美福汽车有限公司</option>' +
                        '<option value="海盐万国汽车有限公司">海盐万国汽车有限公司</option>' +
                        '<option value="桐乡万国汽车有限公司">桐乡万国汽车有限公司</option>' +
                        '<option value="平湖万国汽车有限公司">平湖万国汽车有限公司</option>' +
                        '<option value="金华市福达汽车销售有限公司">金华市福达汽车销售有限公司</option>' +
                        '<option value="金华市金东福达汽车销售有限公司">金华市金东福达汽车销售有限公司</option>' +
                        '<option value="丽水晨隆汽车销售有限公司">丽水晨隆汽车销售有限公司</option>' +
                        '<option value="台州恒之福汽车服务有限公司">台州恒之福汽车服务有限公司</option>' +
                        '<option value="宁波圣菲汽车销售服务有限公司">宁波圣菲汽车销售服务有限公司</option>' +
                        '<option value="宁波联福汽车销售有限公司 ">宁波联福汽车销售有限公司 </option>' +
                        '<option value="宁波金润汽车销售服务有限公司">宁波金润汽车销售服务有限公司</option>' +
                        '<option value="宁波华悦汽车销售服务有限公司">宁波华悦汽车销售服务有限公司</option>' +
                        '<option value="宁波锦福明海汽车销售服务有限公司">宁波锦福明海汽车销售服务有限公司</option>' +
                        '<option value="中国长安汽车集团宁波东祥销售有限公司">中国长安汽车集团宁波东祥销售有限公司</option>' +
                        '<option value="宁波永达福宁汽车销售服务有限公司">宁波永达福宁汽车销售服务有限公司</option>' +
                        '<option value="衢州市瑞鑫汽车销售服务有限公司">衢州市瑞鑫汽车销售服务有限公司</option>' +
                        '<option value="浙江晨隆汽车销售有限公司">浙江晨隆汽车销售有限公司</option>' +
                        '<option value="上虞福瑞通汽车销售服务有限公司">上虞福瑞通汽车销售服务有限公司</option>' +
                        '<option value="绍兴福通汽车有限公司">绍兴福通汽车有限公司</option>' +
                        '<option value="绍兴洪腾汽车有限公司(柯桥)">绍兴洪腾汽车有限公司(柯桥)</option>' +
                        '<option value="嵊州市兴福汽车有限公司">嵊州市兴福汽车有限公司</option>' +
                        '<option value="温州丰骏汽车销售服务有限公司">温州丰骏汽车销售服务有限公司</option>' +
                        '<option value="台州市东福汽车销售服务有限公司">台州市东福汽车销售服务有限公司 </option>' +
                        '<option value="台州森加福汽车销售服务有限公司">台州森加福汽车销售服务有限公司 </option>' +
                        '<option value="台州恒信汽车服务有限公司  ">台州恒信汽车服务有限公司  </option>' +
                        '<option value="温州福龙汽车有限公司">温州福龙汽车有限公司</option>' +
                        '<option value="温州金州汽车有限公司">温州金州汽车有限公司</option>' +
                        '<option value="乐清福荣汽车有限公司">乐清福荣汽车有限公司</option>' +
                        '<option value="义乌市瑞鑫汽车销售服务有限公司">义乌市瑞鑫汽车销售服务有限公司</option>' +
                        '<option value="永康市福达汽车销售有限公司">永康市福达汽车销售有限公司</option>' +
                        '<option value="余姚福舜汽车贸易有限公司">余姚福舜汽车贸易有限公司</option>' +
                        '<option value="舟山市明迪汽车销售服务有限公司 ">舟山市明迪汽车销售服务有限公司 </option>' +
                        '<option value="诸暨市中大汽车有限公司">诸暨市中大汽车有限公司</option>' +
                        '');
                } else if ($('#form_prov').val() == "重庆") {
                    $('#form_saler option').remove();
                    $('#form_saler').append('' +
                        '<option value="重庆建洲长寿分公司">重庆建洲长寿分公司</option>' +
                        '<option value="重庆安福大石坝分公司">重庆安福大石坝分公司</option>' +
                        '<option value="重庆福骏垫江分公司">重庆福骏垫江分公司</option>' +
                        '<option value="重庆万友龙俊彭水分公司">重庆万友龙俊彭水分公司</option>' +
                        '<option value="重庆福骏开县分公司">重庆福骏开县分公司</option>' +
                        '<option value="重庆万友龙骏秀山分公司">重庆万友龙骏秀山分公司</option>' +
                        '<option value="重庆福冠鱼洞维修分公司">重庆福冠鱼洞维修分公司</option>' +
                        '<option value="重庆福冠南川分公司">重庆福冠南川分公司</option>' +
                        '<option value="重庆安福大石坝分公司(重庆安福百俊">重庆安福大石坝分公司(重庆安福百俊</option>' +
                        '<option value="重庆福兆星璧山分公司">重庆福兆星璧山分公司</option>' +
                        '<option value="重庆安福汽车营销有限公司">重庆安福汽车营销有限公司</option>' +
                        '<option value="重庆中汽西南福星汽车有限公司 ">重庆中汽西南福星汽车有限公司 </option>' +
                        '<option value="重庆安福汽车营销有限公司南坪分公司">重庆安福汽车营销有限公司南坪分公司</option>' +
                        '<option value="重庆安博汽车销售有限公司">重庆安博汽车销售有限公司</option>' +
                        '<option value="重庆福兆星汽车营销有限公司">重庆福兆星汽车营销有限公司</option>' +
                        '<option value="重庆福冠汽车销售服务有限公司">重庆福冠汽车销售服务有限公司</option>' +
                        '<option value="重庆九福汽车销售服务有限公司">重庆九福汽车销售服务有限公司</option>' +
                        '<option value="重庆汇骏汽车销售有限公司">重庆汇骏汽车销售有限公司</option>' +
                        '<option value="重庆大福汽车销售有限公司">重庆大福汽车销售有限公司</option>' +
                        '<option value="重庆福驹汽车销售服务有限公司">重庆福驹汽车销售服务有限公司</option>' +
                        '<option value="重庆万友龙瑞汽车销售服务有限公司">重庆万友龙瑞汽车销售服务有限公司</option>' +
                        '<option value="重庆福川汽车销售有限公司">重庆福川汽车销售有限公司</option>' +
                        '<option value="重庆福骏汽车销售服务有限公司">重庆福骏汽车销售服务有限公司</option>' +
                        '<option value="重庆建洲汽车销售服务有限公司">重庆建洲汽车销售服务有限公司</option>' +
                        '<option value="重庆万友龙俊汽车销售服务有限公司">重庆万友龙俊汽车销售服务有限公司</option>' +
                        '');
                } else {
                    $('#form_saler option').remove();
                    $('#form_saler').append('<option value="">请选择经销商</option>');
                }

            });

            // 选择市级时发生事件
            city_obj.bind("change", function() {
                distStart();
            });
        };

        // 设置省市json数据
        if (typeof(settings.url) == "string") {
            $.getJSON(settings.url, function(json) {
                city_json = json;
                init();
            });
        } else {
            city_json = settings.url;
            init();
        };
    };
})(jQuery);
