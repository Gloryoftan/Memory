	$(document).ready(function() {

		var user = Bmob.User.current();
		var Activity = Bmob.Object.extend("Activity");
		var query = new Bmob.Query(Activity);
		query.equalTo("user", user);

//		$("#main1").hide();
//		$("#loading1").show();
		// 查询所有数据
		query.find({
				success: function(results) {
					//			alert("共查询到 " + results.length + " 条记录");
					// 循环处理查询到的数据
					for(var i = 0; i < results.length; i++) {
						(function(j) {
								var object = results[i];
								//				console.log(object.id);
								//				console.log(results[i]);
								//				alert(object.get('ActivityColor') + ' - ' + object.get('ActivityName'));
								// prepend user's setting
								$("#ActivitiesChange").prepend("<div class='btn-group'><button type='button'class='btn btn-lg text-white' name='" + object.id + "' style='background:" + object.get('ActivityColor') + ";'>" + object.get('ActivityName') + "</button><button type='button' class='btn btn-sm btn-outline-success ActivityModify' data-toggle='modal' data-target='#ModifyActivityModal' name='" + object.id + "' activityname='" + object.get('ActivityName') + "' activitycolor='" + object.get('ActivityColor') + "'>Modify</button><button type='button' class='btn btn-sm btn-outline-danger ActivityDelete' name='" + object.id + "' activityname='" + object.get('ActivityName') + "'>Delete</button></div><br /><div>&nbsp</div>");
								if(object.get('HasSub') == 1) {
									$("#PrependIndex").prepend("<div class='btn-group'><button type='button'class='btn btn-lg text-white ActivityButton' name='" + object.id + "' id='" + object.id + "' style='background:" + object.get('ActivityColor') + ";'>" + object.get('ActivityName') + "</button><button type='button' class='btn btn-lg dropdown-toggle dropdown-toggle-split text-white' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style='background:" + object.get('ActivityColor') + ";'></button><div class='dropdown-menu dropdown-menu-right' id='S" + object.id + "'></div></div>");
									var SubActivityQuery = Bmob.Object.extend("SubActivity");
									var query = new Bmob.Query(SubActivityQuery);
									query.equalTo("ActivityId", object.id);
									query.find({
										success: function(results2) {
											for(var x = 0; x < results2.length; x++) {
												var object2 = results2[x];
												//										console.log(object2.get("SubActivityName"));
												//										console.log(object.id);
												$("#S" + object.id).prepend("<button type='button' class='dropdown-item text-white SubActivityButton' name='" + object2.id + "' style='background:" + object.get('ActivityColor') + ";'>" + object2.get('SubActivityName') + "</button>");
												$("#SubActivitiesChange").prepend("<div class='btn-group'><button type='button' class='btn btn-lg text-white' name='" + object2.id + "' style='background:" + object.get('ActivityColor') + ";'>" + object2.get('SubActivityName') + "</button><button type='button' class='btn btn-sm btn-outline-success SubActivityModify' data-toggle='modal' data-target='#ModifySubActivityModal' subactivityname='" + object2.get('SubActivityName') + "' subactivitycolor='" + object2.get('SubActivityColor') + "' name='" + object2.id + "'>Modify</button><button type='button' class='btn btn-sm btn-outline-danger SubActivityDelete' name='" + object2.id + "' subactivityname='" + object2.get('SubActivityName') + "'>Delete</button></div><br /><div>&nbsp</div>");
											}
										},
										error: function(error) {}
									});
								} else {
									$("#PrependIndex").append("<button type='button'class='btn btn-lg text-white ActivityButton' name='" + object.id + "'  style='background:" + object.get('ActivityColor') + ";'>" + object.get('ActivityName') + "</button>");
								}
								$("#ChooseActivityMenu").prepend("<button type='button'class='dropdown-item text-white ChooseActivityBtn' name='" + object.id + "' onclick='chooseActivity()' style='background:" + object.get('ActivityColor') + ";'>" + object.get('ActivityName') + "</button>");

//								if (j == 11) {
//								$("#main1").show();
//							}

						})(i);

				}

			},
			error: function(error) {
				alert("查询失败: " + error.code + " " + error.message);
			}
		}); load1(); load2(); load3(); load4(); commentload();

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
		save1();
		save2();
		save3();
		save4();

		//		var user = Bmob.User.current();
		//		var AutoSaving = Bmob.Object.extend("Timetable1");
		//		var autosaving = new AutoSaving();
		//		autosaving.set("Date", $("#datepicker").val());
		//		autosaving.set("user", user);
		//		//添加数据
		//		autosaving.save(null, {
		//			success: function(autosaving) {
		//				for(var i = 0; i < 12; i++) {
		//					autosaving.set("timetable" + i, $("#timetable" + i).attr("name"));
		//					autosaving.save();
		//				}
		//			}
		//		})

	});

	$(".SubActivityButton").live("click", function() {
		$(".active").children("span").html($(this).html());
		$(".active").addClass("text-white");
		$(".active").attr("name", $(this).attr("name"));
		$(".active").css("background-color", $(this).css('background-color'));
		$(".active").removeClass("active");
		save1();
		save2();
		save3();
		save4();
	});

	// Modify-Delete
	$(".ActivityDelete").live("click", function() {
		var ActivityDelete = Bmob.Object.extend("Activity");
		var ActivityDelete = new Bmob.Query(ActivityDelete);
		var activityname = $(this).attr('ActivityName');
		ActivityDelete.get($(this).attr("name"), {
			success: function(result) {

				swal({
					title: "Delete important stuff?",
					text: "Are you sure you want to delete " + activityname,
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Yes, delete it！",
					closeOnConfirm: false
				}, function() {
					result.destroy({
						success: function(dres) {
							swal({
								title: "Activity Deleted！",
								text: activityname + " has been deleted!",
								type: "success",
								confirmButtonText: "OK",
							}, function() {
								parent.location.reload();
							});
						},
					})
				});

			}
		})

	});

	$(".SubActivityDelete").live("click", function() {
		var ActivityDelete = Bmob.Object.extend("SubActivity");
		var ActivityDelete = new Bmob.Query(ActivityDelete);
		ActivityDelete.get($(this).attr("name"), {
			success: function(result) {
				result.destroy({
					success: function(dres) {
						alert("Successed");
					},
					error: function() {
						alert("Failed");
					}
				})
			}
		})
	});

	//activity modify
	$(".ActivityModify").live("click", function() {
		$("#ModifyActivityInput").attr("placeholder", $(this).attr("activityname"));
		$("#ModifyActivitySave").attr("ActivityId", $(this).attr("name"))
		$(".selectcolor").spectrum({
			showPaletteOnly: true,
			showPalette: true,
			color: $(this).attr("activitycolor"),
			palette: [
				['#F0FFF0', '#FF1493', '#0000FF', '#00BFFF', '#00FF00'],
				['#FF8C00', '#FF0000', '#9400D3', '#778899', '#FFFF00'],
				['#87CEFA', '#54FF9F', '#FFD700', '#FFC1C1', '#FFB5C5']
			]
		});
	});

	$(".SubActivityModify").live("click", function() {
		$("#ModifySubActivityInput").attr("placeholder", $(this).attr("Subactivityname"));
		$("#ModifySubActivitySave").attr("SubActivityId", $(this).attr("name"))
	});

	$("#ModifyActivitySave").click(function() {
		var ModifyActivitySave = Bmob.Object.extend("Activity");
		var query = new Bmob.Query(ModifyActivitySave);
		query.get($(this).attr("activityid"), {
			success: function(results) {
				results.set("ActivityName", $("input[id='ModifyActivityInput']").val());
				results.set("ActivityColor", $("input[id='selectcolor2']").val());
				results.save();
				parent.location.reload();
				// The object was retrieved successfully.
			},
			error: function(object, error) {

			}
		});
	});
	$("#ModifySubActivitySave").click(function() {
		var ModifySubActivitySave = Bmob.Object.extend("SubActivity");
		var query = new Bmob.Query(ModifySubActivitySave);
		query.get($(this).attr("Subactivityid"), {
			success: function(results) {
				results.set("SubActivityName", $("input[id='ModifySubActivityInput']").val());
				results.save();
				parent.location.reload();
				// The object was retrieved successfully.
			},
			error: function(object, error) {}
		});
	});

	//datepicker
	$('#sandbox-container input').datepicker({
		todayBtn: "linked",
		daysOfWeekHighlighted: "0,6",
		autoclose: true,
		todayHighlight: true
	});
	$("#datepicker").datepicker("setDate", new Date());
	$('#sandbox-container input').datepicker()
		.on("changeDate", function(e) {
			Datechanged();

		});

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

	//star-rating
	$('#star').raty({
		hints: ['bad', 'poor', 'regular', 'good', 'gorgeous']
	});

	//colorpicker
	$(".selectcolor").spectrum({
		showPaletteOnly: true,
		showPalette: true,
		color: '#F0FFF0',
		palette: [
			['#F0FFF0', '#FF1493', '#0000FF', '#00BFFF', '#00FF00'],
			['#FF8C00', '#FF0000', '#9400D3', '#778899', '#FFFF00'],
			['#87CEFA', '#54FF9F', '#FFD700', '#FFC1C1', '#FFB5C5']
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
		post.set("HasSub", "0");
		post.set("user", user);
		post.save(null, {
			success: function(Post) {
				swal({
					title: "Activity Saved！",
					text: $("input[id='ActivityInput']").val() + " has been saved!",
					type: "success",
					confirmButtonText: "OK",
				}, function() {
					window.location.reload()
				});
			},
			error: function(Post, error) {
				swal({
					title: "Opps! " + error.message,
					type: "error",
					confirmButtonText: "OK",
				});
			}
		});
	});

	//Sub-Activity Save
	$("#SubActivitySave").click(function() {
		var user = Bmob.User.current();
		var Post = Bmob.Object.extend("SubActivity");
		var post = new Post();
		post.set("SubActivityName", $("input[id='SubActivityInput']").val());
		post.set("SubActivityColor", $("#chooseactivity").css('background-color'));
		post.set("ActivityId", $("#chooseactivity").attr("name"));
		post.set("user", user);
		post.save(null, {
			success: function(Post) {
				alert("Succeed");
				window.location.reload()
				// Hooray! Let them use the app now.
			},
			error: function(Post, error) {
				// Show the error message somewhere and let the user try again.
				alert("Error: " + error.code + " " + error.message);
			}
		});

		var Post2 = Bmob.Object.extend("Activity");
		var query = new Bmob.Query(Post2);

		query.get($("#chooseactivity").attr("name"), {
			success: function(post2) {

				post2.set('HasSub', '1');
				post2.save();

			},
			error: function(object, error) {

			}
		});

	});

	$('#AddActivity2').click(function() {
		$('#CreateActivity').modal('show');
		$('#CreateSubActivity').modal('hide');
	});

	$('#AddSubActivity').click(function() {
		$('#CreateActivity').modal('hide');
	});

	$(".ChooseActivityBtn").live("click", function() {
		$("#chooseactivity").children("span").html($(this).html());
		$("#chooseactivity").attr("name", $(this).attr("name"));
		$("#chooseactivity").css("background-color", $(this).css('background-color'));
		$("#chooseactivity2").css("background-color", $(this).css('background-color'));
	});

	//	$("#TimetableSave").click(function() {
	//		var user = Bmob.User.current();
	//
	//		var Autosave = Bmob.Object.extend("Timetable1");
	//		var autosave = new Autosave();
	//
	//		autosave.set("user", user);
	//		autosave.set("Date", $("#datepicker").val());
	//		for(var i = 0; i < 12; i++) {
	//			console.log("timetable" + i);
	//			console.log("#timetable" + i);
	//			autosave.set("timetable" + i, $("#timetable" + i).attr("name"));
	//		};
	//
	//		autosave.save(null, {
	//			success: function(Autosave) {
	//				alert($("#timetable0").html());
	//				// Hooray! Let them use the app now.
	//			},
	//			error: function(Autosave, error) {
	//				// Show the error message somewhere and let the user try again.
	//				alert("Error: " + error.code + " " + error.message);
	//			}
	//		});
	//	});

	//load function Cutting line
	function load1() {

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
				//					console.log($("#timetable10").attr("name"));
				for(var i = 0; i < 12; i++) {
					(function(j) {
						if(typeof($("#timetable" + j).attr("name")) !== "undefined") {
							//					console.log($("#timetable"+j).attr("name"));
							var ActivityQuery = Bmob.Object.extend("Activity");

							//创建查询对象，入口参数是对象类的实例
							var query = new Bmob.Query(ActivityQuery);

							//查询单条数据，第一个参数是这条数据的objectId值
							query.get($("#timetable" + j).attr("name"), {
								success: function(ActivityQuery) {
									//							console.log(ActivityQuery.get("ActivityName"));
									console.log(ActivityQuery);
									// 查询成功，调用get方法获取对应属性的值
									var ActivityName = ActivityQuery.get("ActivityName");
									var ActivityColor = ActivityQuery.get("ActivityColor");
									//							alert($("#timetable0").attr("name"));
									$("#timetable" + j).children("span").html(ActivityName);
									$("#timetable" + j).addClass("text-white");
									$("#timetable" + j).css("background-color", ActivityColor);
								},
							});
							var SubActivityQuery = Bmob.Object.extend("SubActivity");
							var subquery = new Bmob.Query(SubActivityQuery);
							subquery.get($("#timetable" + j).attr("name"), {
								success: function(SubActivityQuery) {
									var SubActivityName = SubActivityQuery.get("SubActivityName");
									var SubActivityColor = SubActivityQuery.get("SubActivityColor");
									$("#timetable" + j).children("span").html(SubActivityName);
									$("#timetable" + j).addClass("text-white");
									$("#timetable" + j).css("background-color", SubActivityColor);
								},
							});

						};
//							if (j == 11) {
//								$("#main1").show();
//							}
					})(i);
				}

			},
			//  error: function(error) {
			//      alert("查询失败: " + error.code + " " + error.message);
			//  }
		});

	};

	function load2() {

		var user = Bmob.User.current();
		var Timetable2 = Bmob.Object.extend("Timetable2");
		var query = new Bmob.Query(Timetable2);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		query.find({
			success: function(results) {
				//				console.log(results);
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
				};
				for(var i = 12; i < 24; i++) {
					$("#timetable" + i).attr("name", object.get("timetable" + i));
				};
				for(var i = 12; i < 24; i++) {
					(function(j) {
						if(typeof($("#timetable" + j).attr("name")) !== "undefined") {
							var ActivityQuery = Bmob.Object.extend("Activity");
							var query = new Bmob.Query(ActivityQuery);
							query.get($("#timetable" + j).attr("name"), {
								success: function(ActivityQuery) {
									var ActivityName = ActivityQuery.get("ActivityName");
									var ActivityColor = ActivityQuery.get("ActivityColor");
									$("#timetable" + j).children("span").html(ActivityName);
									$("#timetable" + j).addClass("text-white");
									$("#timetable" + j).css("background-color", ActivityColor);
								},
							});
							var SubActivityQuery = Bmob.Object.extend("SubActivity");
							var subquery = new Bmob.Query(SubActivityQuery);
							subquery.get($("#timetable" + j).attr("name"), {
								success: function(SubActivityQuery) {
									var SubActivityName = SubActivityQuery.get("SubActivityName");
									var SubActivityColor = SubActivityQuery.get("SubActivityColor");
									$("#timetable" + j).children("span").html(SubActivityName);
									$("#timetable" + j).addClass("text-white");
									$("#timetable" + j).css("background-color", SubActivityColor);
								},
							});
						};
					})(i);
				}
			},
		});
	};

	function load3() {

		var user = Bmob.User.current();
		var Timetable3 = Bmob.Object.extend("Timetable3");
		var query = new Bmob.Query(Timetable3);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		query.find({
			success: function(results) {
				//				console.log(results);
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
				};
				for(var i = 24; i < 36; i++) {
					$("#timetable" + i).attr("name", object.get("timetable" + i));
				};
				for(var i = 24; i < 36; i++) {
					(function(j) {
						if(typeof($("#timetable" + j).attr("name")) !== "undefined") {
							var ActivityQuery = Bmob.Object.extend("Activity");
							var query = new Bmob.Query(ActivityQuery);
							query.get($("#timetable" + j).attr("name"), {
								success: function(ActivityQuery) {
									var ActivityName = ActivityQuery.get("ActivityName");
									var ActivityColor = ActivityQuery.get("ActivityColor");
									$("#timetable" + j).children("span").html(ActivityName);
									$("#timetable" + j).addClass("text-white");
									$("#timetable" + j).css("background-color", ActivityColor);
								},
							});
							var SubActivityQuery = Bmob.Object.extend("SubActivity");
							var subquery = new Bmob.Query(SubActivityQuery);
							subquery.get($("#timetable" + j).attr("name"), {
								success: function(SubActivityQuery) {
									var SubActivityName = SubActivityQuery.get("SubActivityName");
									var SubActivityColor = SubActivityQuery.get("SubActivityColor");
									$("#timetable" + j).children("span").html(SubActivityName);
									$("#timetable" + j).addClass("text-white");
									$("#timetable" + j).css("background-color", SubActivityColor);
								},
							});
						};
					})(i);
				}
			},
		});
	};

	function load4() {

		var user = Bmob.User.current();
		var Timetable4 = Bmob.Object.extend("Timetable4");
		var query = new Bmob.Query(Timetable4);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		query.find({
			success: function(results) {
				//				console.log(results);
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
				};
				for(var i = 36; i < 48; i++) {
					$("#timetable" + i).attr("name", object.get("timetable" + i));
				};
				for(var i = 36; i < 48; i++) {
					(function(j) {
						if(typeof($("#timetable" + j).attr("name")) !== "undefined") {
							var ActivityQuery = Bmob.Object.extend("Activity");
							var query = new Bmob.Query(ActivityQuery);
							query.get($("#timetable" + j).attr("name"), {
								success: function(ActivityQuery) {
									var ActivityName = ActivityQuery.get("ActivityName");
									var ActivityColor = ActivityQuery.get("ActivityColor");
									$("#timetable" + j).children("span").html(ActivityName);
									$("#timetable" + j).addClass("text-white");
									$("#timetable" + j).css("background-color", ActivityColor);
								},
							});
							var SubActivityQuery = Bmob.Object.extend("SubActivity");
							var subquery = new Bmob.Query(SubActivityQuery);
							subquery.get($("#timetable" + j).attr("name"), {
								success: function(SubActivityQuery) {
									var SubActivityName = SubActivityQuery.get("SubActivityName");
									var SubActivityColor = SubActivityQuery.get("SubActivityColor");
									$("#timetable" + j).children("span").html(SubActivityName);
									$("#timetable" + j).addClass("text-white");
									$("#timetable" + j).css("background-color", SubActivityColor);
								},
							});
						};

					})(i);
				}
			},
		});
	};

	//save function Cutting line
	function save1() {
		var user = Bmob.User.current();
		var Timetable1 = Bmob.Object.extend("Timetable1");
		var query = new Bmob.Query(Timetable1);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		//$("#datepicker").val()
		// 查询所有数据
		query.find({
			success: function(results) {
				//				alert(obj.id);
				//				console.log(results);
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
				};

				if(results.length > 0) {
					var AutoSaving1 = Bmob.Object.extend("Timetable1");
					var query = new Bmob.Query(AutoSaving1);
					query.get(obj.id, {
						success: function(AutoSaving1) {
							for(var i = 0; i < 12; i++) {
								AutoSaving1.set("timetable" + i, $("#timetable" + i).attr("name"));
								AutoSaving1.save();
							}
							AutoSaving1.save();
						},

					});
				} else {
					var user = Bmob.User.current();
					var AddNew1 = Bmob.Object.extend("Timetable1");
					var AddNew1 = new AddNew1();
					// 添加数据，第一个入口参数是Json数据
					AddNew1.save({
						Date: $("#datepicker").val(),
						user: user
					}, {
						success: function(AddNew1) {
							save1();
						},
						error: function(AddNew1, error) {
							//							alert("not ok");
						}
					});
				}

			}
		});
	};

	function save2() {
		var user = Bmob.User.current();
		var Timetable2 = Bmob.Object.extend("Timetable2");
		var query = new Bmob.Query(Timetable2);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		//$("#datepicker").val()
		// 查询所有数据
		query.find({
			success: function(results) {
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
				};

				if(results.length > 0) {
					var AutoSaving2 = Bmob.Object.extend("Timetable2");
					var query = new Bmob.Query(AutoSaving2);
					query.get(obj.id, {
						success: function(AutoSaving2) {
							for(var i = 12; i < 24; i++) {
								AutoSaving2.set("timetable" + i, $("#timetable" + i).attr("name"));
								AutoSaving2.save();
							}
							AutoSaving2.save();
						},

					});
				} else {
					var user = Bmob.User.current();
					var AddNew2 = Bmob.Object.extend("Timetable2");
					var AddNew2 = new AddNew2();
					// 添加数据，第一个入口参数是Json数据
					AddNew2.save({
						Date: $("#datepicker").val(),
						user: user
					}, {
						success: function(AddNew2) {
							save2();
						},
						error: function(AddNew2, error) {

						}
					});
				}

			}
		});
	};

	function save3() {
		var user = Bmob.User.current();
		var Timetable3 = Bmob.Object.extend("Timetable3");
		var query = new Bmob.Query(Timetable3);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		//$("#datepicker").val()
		// 查询所有数据
		query.find({
			success: function(results) {
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
				};

				if(results.length > 0) {
					var AutoSaving3 = Bmob.Object.extend("Timetable3");
					var query = new Bmob.Query(AutoSaving3);
					query.get(obj.id, {
						success: function(AutoSaving3) {
							for(var i = 24; i < 36; i++) {
								AutoSaving3.set("timetable" + i, $("#timetable" + i).attr("name"));
								AutoSaving3.save();
							}
							AutoSaving3.save();
						},

					});
				} else {
					var user = Bmob.User.current();
					var AddNew3 = Bmob.Object.extend("Timetable3");
					var AddNew3 = new AddNew3();
					// 添加数据，第一个入口参数是Json数据
					AddNew3.save({
						Date: $("#datepicker").val(),
						user: user
					}, {
						success: function(AddNew3) {
							save3();
						},
						error: function(AddNew3, error) {

						}
					});
				}

			}
		});
	};

	function save4() {
		var user = Bmob.User.current();
		var Timetable4 = Bmob.Object.extend("Timetable4");
		var query = new Bmob.Query(Timetable4);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		//$("#datepicker").val()
		// 查询所有数据
		query.find({
			success: function(results) {
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
				};

				if(results.length > 0) {
					var AutoSaving4 = Bmob.Object.extend("Timetable4");
					var query = new Bmob.Query(AutoSaving4);
					query.get(obj.id, {
						success: function(AutoSaving4) {
							for(var i = 36; i < 48; i++) {
								AutoSaving4.set("timetable" + i, $("#timetable" + i).attr("name"));
								AutoSaving4.save();
							}
							AutoSaving4.save();
						},

					});
				} else {
					var user = Bmob.User.current();
					var AddNew4 = Bmob.Object.extend("Timetable4");
					var AddNew4 = new AddNew4();
					// 添加数据，第一个入口参数是Json数据
					AddNew4.save({
						Date: $("#datepicker").val(),
						user: user
					}, {
						success: function(AddNew4) {
							save4();
						},
						error: function(AddNew4, error) {}
					});
				}
			}
		});
	};

	function Datechanged() {
		for(var i = 0; i < 48; i++) {
			$("#timetable" + i).css("background-color", '');
			$("#timetable" + i).removeClass("text-white");
			$("#timetable" + i).attr("name", '');
		};
		$("#timetable0").children("span").html("00:00");
		$("#timetable1").children("span").html("00:30");
		$("#timetable2").children("span").html("01:00");
		$("#timetable3").children("span").html("01:30");
		$("#timetable4").children("span").html("02:00");
		$("#timetable5").children("span").html("02:30");
		$("#timetable6").children("span").html("03:00");
		$("#timetable7").children("span").html("03:30");
		$("#timetable8").children("span").html("04:00");
		$("#timetable9").children("span").html("04:30");
		$("#timetable10").children("span").html("05:00");
		$("#timetable11").children("span").html("05:30");
		$("#timetable12").children("span").html("06:00");
		$("#timetable13").children("span").html("06:30");
		$("#timetable14").children("span").html("07:00");
		$("#timetable15").children("span").html("07:30");
		$("#timetable16").children("span").html("08:00");
		$("#timetable17").children("span").html("08:30");
		$("#timetable18").children("span").html("09:00");
		$("#timetable19").children("span").html("09:30");
		$("#timetable20").children("span").html("10:00");
		$("#timetable21").children("span").html("10:30");
		$("#timetable22").children("span").html("11:00");
		$("#timetable23").children("span").html("11:30");
		$("#timetable24").children("span").html("12:00");
		$("#timetable25").children("span").html("12:30");
		$("#timetable26").children("span").html("13:00");
		$("#timetable27").children("span").html("13:30");
		$("#timetable28").children("span").html("14:00");
		$("#timetable29").children("span").html("14:30");
		$("#timetable30").children("span").html("15:00");
		$("#timetable31").children("span").html("15:30");
		$("#timetable32").children("span").html("16:00");
		$("#timetable33").children("span").html("16:30");
		$("#timetable34").children("span").html("17:00");
		$("#timetable35").children("span").html("17:30");
		$("#timetable36").children("span").html("18:00");
		$("#timetable37").children("span").html("18:30");
		$("#timetable38").children("span").html("19:00");
		$("#timetable39").children("span").html("19:30");
		$("#timetable40").children("span").html("20:00");
		$("#timetable41").children("span").html("20:30");
		$("#timetable42").children("span").html("21:00");
		$("#timetable43").children("span").html("21:30");
		$("#timetable44").children("span").html("22:00");
		$("#timetable45").children("span").html("22:30");
		$("#timetable46").children("span").html("23:00");
		$("#timetable47").children("span").html("23:30");
		$(".active").removeClass("active");
		load1();
		load2();
		load3();
		load4();
		commentload();
	};

	$("#mainswitch2").click(function() {
		$("#main3").hide();
		$("#main1").hide();
		$("#main2").show();
	});

	$("#mainswitch1").click(function() {
		$("#main3").hide();
		$("#main2").hide();
		$("#main1").show();
	});

	$("#mainswitch3").click(function() {
		$("#main1").hide();
		$("#main2").hide();
		$("#main3").show();
	});

	function Commentsave() {
		var score = $('#star').raty('score');

		var user = Bmob.User.current();
		var Comment = Bmob.Object.extend("Comment");
		var query = new Bmob.Query(Comment);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		query.find({
			success: function(results) {
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
				};
				console.log(results);
				if(results.length > 0) {
					var PostSave = Bmob.Object.extend("Comment");
					var query = new Bmob.Query(PostSave);
					query.get(obj.id, {
						success: function(PostSave) {
							PostSave.set("Content", $("#commentcontent").val());
							PostSave.set("Mood", score);
							PostSave.save();
						},

					});
				} else {
					var user = Bmob.User.current();
					var CommentPost = Bmob.Object.extend("Comment");
					var CommentPost = new CommentPost();
					CommentPost.save({
						Date: $("#datepicker").val(),
						user: user
					}, {
						success: function(CommentPost) {
							Commentsave();
						},
						error: function(CommentPost, error) {}
					});
				}
			}
		});
	};

	function commentload() {
		var user = Bmob.User.current();
		var comment = Bmob.Object.extend("Comment");
		var query = new Bmob.Query(comment);
		query.equalTo("user", user);
		query.equalTo("Date", $("#datepicker").val());
		query.find({
			success: function(results) {
				for(var i = 0; i < results.length; i++) {
					var object = results[i];
					$("#commentcontent").html(object.get("Content"));
					$("#star").raty('score', object.get("Mood"));
				}
			},
			error: function(error) {
				alert("查询失败: " + error.code + " " + error.message);
			}
		});

	};

	//Statistics
	var ctx = document.getElementById("DailyPolarareaChart");
	var myChart = new Chart(ctx, {
		type: 'polarArea',
		data: {
			datasets: [{
				data: [10, 20, 30]

			}],
			// These labels appear in the legend and in the tooltips when hovering different arcs
			labels: [
				'Red',
				'Yellow',
				'Blue'
			]
		},
		options: {

		}
	});
	
	//	function arrCheck(arr) {
	//		var newArr = [];
	//		for(var i = 0; i < 12; i++) {
	//			var temp = arr[i];
	//			var count = 0;
	//			for(var j = 0; j < 12; j++) {
	//				if(arr[j] == temp) {
	//					count++;
	//					arr[j] = -1;
	//				}
	//			}
	//			if(temp != -1) {
	//				newArr.push(temp + ":" + count)
	//			}
	//		}
	//		return newArr;
	//	}
	//	
	//	function arrCheck{
	//						
	//				var arrObj=new Array();
	//				
	//				for(var i=0;i<name1.length;i++){
	//					var flag=true;
	//					
	//					for(var j=0;j<arrObj.length;j++){
	//						if(arry[i]==arryObj[j].name){
	//							flag=false;
	//							arryObj[j].value=arryObj[j].value+1;
	//							break;
	//						}
	//					}
	//					if(flag){
	//						var obj={
	//							name:name1[i],
	//							value:1
	//						};
	//						arryObj.push(obj);
	//					}
	//				}
	//	}
			var temp = "";
		var count = 0;
		var arrNew = new Array();
	
				for(var i = 0; i < name1.length; i++) {
					if(name1[i] != -1) {
						temp = name1[i];
						for(var j = 0; j = name1.length; j++) {　
							if(temp == name1[j]) {
								count++;
								name1[j] = -1;
							}
						}
						arrNew.push(temp + ":" + count);
						count = 0;
					}
				}
				for(var i = 0; i < arryNew.length; i++) {　　
					　console.log(arryNew);
				}