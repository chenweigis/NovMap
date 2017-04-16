///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'jimu/BaseWidget',
    'jimu/ma/EchartsLayer',
    "esri/geometry/Extent",
    'dojo/_base/html',
    'dojo/dom-construct',
    'dojo/topic',
    'dojo/on'
  ],
  function(
    declare,
    lang,
    BaseWidget, 
    EchartsLayer,
    Extent,
    html,
    domConstruct,
    topic,
    on) {
    var clazz = declare([BaseWidget], {

      name: 'EchartsMap',
      baseClass: 'jimu-widget-echartsmap',
      overlay:null,
      chartsContainer:null,
      myChart:null,
      num:0,
      postCreate: function() {
        this.own(topic.subscribe("appConfigChanged", lang.hitch(this, this.onAppConfigChanged)));
      },

      startup: function() {
        this.inherited(arguments);
        //this.createEchartMapDijit();
      },
		onOpen: function() {
			this.num++
			this.inherited(arguments);
			if(this.num==1)
				return
			else
			this.createEchartMapDijit();
			topic.publish("setOption",null);
			this.map._layers.Basemap_blue.setVisibleLayers([0]);
		},
	onClose: function() {

		console.log(this.num);
		if(this.num==1)
		return
		else
		 	console.log("oncolse");
			topic.publish("unbind",null);//发布解绑消息
		    this.map._layers.Basemap_blue.setVisibleLayers(-1);

		},
	createEchartMapDijit:function(){
		this.overlay = new EchartsLayer(this.map, echarts);
		this.chartsContainer = this.overlay.getEchartsContainer();
		this.myChart = this.overlay.initECharts(this.chartsContainer);
		
		
		//this.testMapLoad();
		this.setEchartsmapOption();
		//this.map.on('load',lang.hitch(this,this.testMapLoad));
		
		//this.map.on('load',lang.hitch(this,this.setEchartsmapOption));
		
		//window.onresize = this.myChart.onresize;
	},
	
	testMapLoad:function(){
		console.log("AAA测试地图加载事件AAA");
	},
	
	setEchartsmapOption:function(){
		
		
        var option = {
		    color: ['gold','aqua','lime'],
		    title : {
		       text: '商场流量图',
		        x:'center',
		        textStyle : {
		            color: '#fff'
		        }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: '{b}'
		    },
		    legend: {
		        orient: 'vertical',
		        x:'right',
		        y:'top',
		        data:['北京 Top10', '上海 Top10', '广州 Top10'],
		        selectedMode: 'single',
		        selected:{
		            '上海 Top10' : false,
		            '广州 Top10' : false
		        },
		        textStyle : {
		            color: '#fff'
		        }
		    },
		    
		    dataRange: {
		    	
		        min : 0,
		        max : 100,
		        calculable : true,
		        color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
		        textStyle:{
		            color:'#fff'
		        }
		        
		    },
		    series : [
		        {
		            name: '全国',
		            type: 'map',
		            roam: true,
		            hoverable: false,
		            mapType: 'none',
		            itemStyle:{
		                normal:{
		                    borderColor:'rgba(100,149,237,1)',
		                    borderWidth:0.5,
		                    areaStyle:{
		                        color: '#1b1b1b'
		                    }
		                }
		            },
		            data:[],
		            markLine : {
		                smooth:true,
		                symbol: ['none', 'circle'],  
		                symbolSize : 1,
		                itemStyle : {
		                    normal: {
		                        color:'#fff',
		                        borderWidth:1,
		                        borderColor:'rgba(30,144,255,0.5)'
		                    }
		                },
		                data : [
		                ],
		            },
		            geoCoord: {
						'光华路SOHO':[116.45227,39.91367],
						'蓝岛大厦':[116.44928,39.9223],
						'奥士凯东直门商场':[116.43481,39.94886],
						'国际大厦':[116.444,39.9103],
						'清华大学美术学院':[116.463,39.9123],
						'朝阳区政府':[116.442,39.9216],
						'和乔丽致酒店':[116.472,39.9125],
						'三里屯邮政府':[116.455,39.9273],
						'贡院六号':[116.431,39.912],
						'语文出版社':[116.426,39.924],
						'中国中医科学院':[116.428,39.9396],
						'京广中心':[116.457,39.9215],
						'朝阳门街道办':[116.431,39.9204],
						'白西社区':[116.455,39.9316],
						'朝阳体育馆':[116.471,39.9298],
						'雅宝大厦':[116.438,39.9164],
						'幸福二村':	[116.449,39.9398],
						'龙宝大厦':[116.467,39.9472],
						'光华西里':[116.452,39.9125],
						'儒林苑':[116.456,39.9554],
						'后山艺术空间':[116.44,39.9513],
						'柳芳':[116.434,39.9589],
						'北新桥工商所':[116.43,39.9365],
						'冢慈小区':	[116.44,39.943],
						'和平新城':[116.428,39.9515],
						'国展商务中心':[116.442,39.9612],
						'工人体育馆':[116.446,39.9324],
						'和平里一小':[116.42,39.9579],
						'曙光大厦':[116.453,39.9618]
		            }
		        },
		        {
		            name: '北京 Top10',
		            type: 'map',
		            mapType: 'none',
		            data:[],
		            markLine : {
		                smooth:true,
		                effect : {
		                    show: true,
		                    scaleSize: 1,
		                    period: 30,
		                    color: '#fff',
		                    shadowBlur: 10
		                },
		                itemStyle : {
		                    normal: {
		                        borderWidth:1,
		                        lineStyle: {
		                            type: 'solid',
		                            shadowBlur: 10
		                        }
		                    }
		                },
		                data : [
							[{name:'国际大厦',value:222}, {name:'光华路SOHO'}],
							[{name:'清华大学美术学院',value:140}, {name:'光华路SOHO'}],
							[{name:'朝阳区政府' ,value:140}, {name:'光华路SOHO'}],
							[{name:'和乔丽致酒店' ,value:27}, {name:'光华路SOHO'}],
							[{name:'三里屯邮政府',value:27}, {name:'光华路SOHO'}],
							[{name:'贡院六号' ,value:7}, {name:'光华路SOHO'}],
							[{name:'语文出版社',value:7}, {name:'光华路SOHO'}],
							[{name:'中国中医科学院',value:7}, {name:'光华路SOHO'}]
							/*  [{name:'北京'}, {name:'上海',value:95}],
		                    [{name:'北京'}, {name:'广州',value:90}],
							 [{name:'北京'}, {name:'大连',value:80}],
		                    [{name:'北京'}, {name:'南宁',value:70}],
		                    [{name:'北京'}, {name:'南昌',value:60}],
		                    [{name:'北京'}, {name:'拉萨',value:50}],
		                    [{name:'北京'}, {name:'长春',value:40}],
		                    [{name:'北京'}, {name:'包头',value:30}],
		                    [{name:'北京'}, {name:'重庆',value:20}],
		                    [{name:'北京'}, {name:'常州',value:10}]*/
		                ]
		            },
		            markPoint : {
		                symbol:'emptyCircle',
		                symbolSize : function (v){
		                    return 10 + v/10
		                },
		                effect : {
		                    show: true,
		                    shadowBlur : 0
		                },
		                itemStyle:{
		                    normal:{
		                        label:{show:false}
		                    },
		                    emphasis: {
		                        label:{position:'top'}
		                    }
		                },
		                data : [
							{name:'国际大厦',value:222},
							{name:'清华大学美术学院',value:140},
							{name:'朝阳区政府',value:140},
							{name:'和乔丽致酒店',value:27},
							{name: '三里屯邮政府'},
							{name:'贡院六号',value:7},
							{name:'语文出版社',value:7},
							{name:'中国中医科学院',value:7}
							/* {name:'上海',value:95},
		                    {name:'广州',value:90},
							  {name:'大连',value:80},
		                    {name:'南宁',value:70},
		                    {name:'南昌',value:60},
		                    {name:'拉萨',value:50},
		                    {name:'长春',value:40},
		                    {name:'包头',value:30},
		                    {name:'重庆',value:20},
		                    {name:'常州',value:10}*/
		                ]
		            }
		        },
		        {
		            name: '上海 Top10',
		            type: 'map',
		            mapType: 'none',
		            data:[],
		            markLine : {
		                smooth:true,
		                effect : {
		                    show: true,
		                    scaleSize: 1,
		                    period: 30,
		                    color: '#fff',
		                    shadowBlur: 10
		                },
		                itemStyle : {
		                    normal: {
		                        borderWidth:1,
		                        lineStyle: {
		                            type: 'solid',
		                            shadowBlur: 10
		                        }
		                    }
		                },
		                data : [
							[{name:'京广中心'},{name:'蓝岛大厦',value:436}],
							[{name:'朝阳门街道办'},{name:'蓝岛大厦',value:50}],
							[{name:'白西社区'},{name:'蓝岛大厦',value:50}],
							[{name:'朝阳体育馆'},{name:'蓝岛大厦',value:50}],
							[{name:'雅宝大厦'},{name:'蓝岛大厦',value:50}],
							[{name:'幸福二村'},{name:'蓝岛大厦',value:15}],
							[{name:'龙宝大厦'},{name:'蓝岛大厦',value:5}],
							[{name:'光华西里'},{name:'蓝岛大厦',value:5}],
							[{name:'儒林苑'},{name:'蓝岛大厦',value:5}]
		                ]
		            },
		            markPoint : {
		                symbol:'emptyCircle',
		                symbolSize : function (v){
		                    return 10 + v/10
		                },
		                effect : {
		                    show: true,
		                    shadowBlur : 0
		                },
		                itemStyle:{
		                    normal:{
		                        label:{show:false}
		                    },
		                    emphasis: {
		                        label:{position:'top'}
		                    }
		                },
		                data : [
							{name:'京广中心',value:436},
							{name:'朝阳门街道办',value:50},
							{name:'白西社区',value:50},
							{name:'朝阳体育馆',value:50},
							{name:'雅宝大厦',value:50},
							{name:'幸福二村',value:15},
							{name:'龙宝大厦',value:5},
							{name:'光华西里',value:5},
							{name:'儒林苑',value:5}
		                ]
		            }
		        },
		        {
		            name: '广州 Top10',
		            type: 'map',
		            mapType: 'none',
		            data:[],
		            markLine : {
		                smooth:true,
		                effect : {
		                    show: true,
		                    scaleSize: 1,
		                    period: 30,
		                    color: '#fff',
		                    shadowBlur: 10
		                },
		                itemStyle : {
		                    normal: {
		                        borderWidth:1,
		                        lineStyle: {
		                            type: 'solid',
		                            shadowBlur: 10
		                        }
		                    }
		                },
		                data : [
							[{name:'后山艺术空间',value:73},{name:'奥士凯东直门商场'}],
							[{name:'柳芳',value:45},{name:'奥士凯东直门商场'}],
							[{name:'北新桥工商所',value:14},{name:'奥士凯东直门商场'}],
							[{name:'冢慈小区',value:14},{name:'奥士凯东直门商场'}],
							[{name:'和平新城',value:14},{name:'奥士凯东直门商场'}],
							[{name:'国展商务中心',value:14},{name:'奥士凯东直门商场'}],
							[{name:'工人体育馆',value:7},{name:'奥士凯东直门商场'}],
							[{name:'和平里一小',value:7},{name:'奥士凯东直门商场'}],
							[{name:'曙光大厦',value:7},{name:'奥士凯东直门商场'}]
		                ]
		            },
		            markPoint : {
		                symbol:'emptyCircle',
		                symbolSize : function (v){
		                    return 10 + v/10
		                },
		                effect : {
		                    show: true,
		                    shadowBlur : 0
		                },
		                itemStyle:{
		                    normal:{
		                        label:{show:false}
		                    },
		                    emphasis: {
		                        label:{position:'top'}
		                    }
		                },
		                data : [
							{name:'后山艺术空间',value:73},//{name:'奥士凯东直门商场'}
							{name:'柳芳',value:45},
							{name:'北新桥工商所',value:14},
							{name:'冢慈小区',value:14},
							{name:'和平新城',value:14},
							{name:'国展商务中心',value:14},
							{name:'工人体育馆',value:7},
							{name:'和平里一小',value:7},
							{name:'曙光大厦',value:7}
		                ]
		            }
		        }
		    ]
		};                   
		this.overlay.setOption(option);
		
	},
           
    onAppConfigChanged: function(appConfig, reason, changedData) {
        
      }
    });
    return clazz;
  });