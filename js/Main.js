$(document).ready(function() {
	var user = Bmob.User.current();
	var Activity = Bmob.Object.extend("Activity");
	var query = new Bmob.Query(Activity);
	query.equalTo("user", user);
	// 查询所有数据
	query.find({
		success: function(results) {
			//			alert("共查询到 " + results.length + " 条记录");
			// 循环处理查询到的数据
			for(var i = 0; i < results.length; i++) {
				var object = results[i];
				//				alert(object.get('ActivityColor') + ' - ' + object.get('ActivityName'));
				// prepend user's setting
				$("#PrependIndex").prepend("<button type='button'class='btn btn-lg text-white ActivityButton' name='" + object.id + "' onclick='changeStyle()' style='background:" + object.get('ActivityColor') + ";'>" + object.get('ActivityName') + "</button>");
			}
		},
		error: function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});

	$(function() {
		var user = Bmob.User.current();
		var Timetable1 = Bmob.Object.extend("Timetable1");
		var query = new Bmob.Query(Timetable1);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		//$("#datepicker").val()
		// 查询所有数据
		query.find({
			success: function(results) {
				//      alert("共查询到 " + results.length + " 条记录");
				//				console.log(results);
				// 循环处理查询到的数据
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
					//      alert(object.id + ' - ' + object.get('playerName'));
				};
				for(var i = 0; i < 12; i++) {
					$("#timetable" + i).attr("name", object.get("timetable" + i));
				};
				console.log($("#timetable20").attr("name"));

				for(var i = 0; i < 1; i++) {
					//					console.log($("#timetable"+i).attr("name"));
					var ActivityQuery = Bmob.Object.extend("Activity");
					//创建查询对象，入口参数是对象类的实例
					var query = new Bmob.Query(ActivityQuery);
					//查询单条数据，第一个参数是这条数据的objectId值
					query.get($("#timetable" + i).attr("name"), {
						success: function(ActivityQuery) {
							// 查询成功，调用get方法获取对应属性的值
							var ActivityName = ActivityQuery.get("ActivityName");
							var ActivityColor = ActivityQuery.get("ActivityColor");
							//							alert($("#timetable0").attr("name"));
							$("#timetable" + i).children("span").html(ActivityName);
							$("#timetable" + i).addClass("text-white");
							$("#timetable" + i).css("background-color", ActivityColor);
						},
					});
					query.get($("#timetable20").attr("name"), {
						success: function(ActivityQuery) {
							// 查询成功，调用get方法获取对应属性的值
							var ActivityName = ActivityQuery.get("ActivityName");
							var ActivityColor = ActivityQuery.get("ActivityColor");
							//							alert($("#timetable0").attr("name"));
							$("#timetable20").children("span").html(ActivityName);
							$("#timetable20").addClass("text-white");
							$("#timetable20").css("background-color", ActivityColor);
						},
					});

				};

			},
			//  error: function(error) {
			//      alert("查询失败: " + error.code + " " + error.message);
			//  }
		});
	});

	//	
	//	$(function(){
	//    alert('5');
	//  });
	//alert($("#datepicker").val());

});

$(".ActivityButton").live("click", function() {
	//	alert($(this).css('background-color'));
	//	var colorcode = $(this).css('background-color');
	$(".active").children("span").html($(this).html());
	$(".active").addClass("text-white");
	$(".active").attr("name", $(this).attr("name"));
	$(".active").css("background-color", $(this).css('background-color'));
	$(".active").removeClass("active");
});

//datepicker
$('#sandbox-container input').datepicker({
	todayBtn: "linked",
	daysOfWeekHighlighted: "0,6",
	autoclose: true,
	todayHighlight: true
});
$("#datepicker").datepicker("setDate", new Date());

//$(".ActivityButtonGroup btn").live("onclick",function(){
//	alert("ok");
//	$(".active").addClass("bg-primary text-white");
//	$(".active").html("gg");
//	$(".active").removeClass("active");
//});

//function changeStyle(){
//	alert($(this).html());
//};

//function changeStyleGreat(table) {
//
//	$(".active").addClass("bg-primary text-white");
//	alert($(this));
////	$(".active").html(content);
//	$(".active").removeClass("active");
//};
//
//function changeStyleGreat2(table) {
//	$(".active").addClass("bg-secondary text-white");
//	$(".active").html("gg");
//	$(".active").removeClass("active");
//};

//colorpicker
$("#selectcolor").spectrum({
	showPaletteOnly: true,
	showPalette: true,
	color: '#ffffff',
	palette: [
		['#ffffff', '#FF1493', '#0000FF',
			'#00BFFF', '#00FF00'
		],
		['#FF8C00', '#FF0000', '#9400D3', '#778899', '#FFFF00']
	]
});

//ActivitySave
$("#ActivitySave").click(function() {
	var user = Bmob.User.current();

	// Make a new post
	var Post = Bmob.Object.extend("Activity");
	var post = new Post();
	post.set("ActivityName", $("input[id='ActivityInput']").val());
	post.set("ActivityColor", $("input[id='selectcolor']").val());
	post.set("user", user);
	post.save(null, {
		success: function(Post) {
			alert("Succeed");
			// Hooray! Let them use the app now.
		},
		error: function(Post, error) {
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
		}
	});

});

$("#TimetableSave").click(function() {
	var user = Bmob.User.current();

	var Autosave = Bmob.Object.extend("Timetable1");
	var autosave = new Autosave();
	//	autosave.set("test","test");
	autosave.set("user", user);
	autosave.set("Date", $("#datepicker").val());
	for(var i = 0; i < 12; i++) {
		console.log("timetable" + i);
		console.log("#timetable" + i);
		autosave.set("timetable" + i, $("#timetable" + i).attr("name"));
	};

	autosave.save(null, {
		success: function(Autosave) {
			alert($("#timetable0").html());
			// Hooray! Let them use the app now.
		},
		error: function(Autosave, error) {
			// Show the error message somewhere and let the user try again.
			alert("Error: " + error.code + " " + error.message);
		}
	});
});