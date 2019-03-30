$(document).ready(function(){
	$('body').on('click', 'label', function (e) {
        var field_id = $(this).attr('for');
        if (field_id) {
            if($("#"+field_id).hasClass('select2')) {
                $("#"+field_id).select2("open");
                return false;
            }
        }
    });
	fileinput_setting = {'showUpload':false, 'showPreview':false, 'browseLabel': LANG.file_browse_label, 'removeLabel': LANG.remove};
	$(document).ajaxStart(function() { Pace.restart(); });

	__select2($('.select2'));

	// popover
	$('body').on('mouseover', '[data-toggle="popover"]', function(){
		if($(this).hasClass('popover-default') ){
			return false;
		}
		$(this).popover('show');
	});

	//Date picker
    $('.start-date-picker').datepicker({
    	autoclose: true,
    	endDate: 'today'
    });
    $(document).on( 'click', '.btn-modal', function(e){
    	e.preventDefault();
    	var container = $(this).data("container");

    	$.ajax({
			url: $(this).data("href"),
			dataType: "html",
			success: function(result){
				$(container).html(result).modal('show');
			}
		});
    });

	$(document).on('submit', 'form#brand_add_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success == true){
					$('div.brands_modal').modal('hide');
					toastr.success(result.msg);
					brands_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});
    
    //Brands table
    var brands_table = $('#brands_table').DataTable({
					processing: true,
					serverSide: true,
					ajax: '/brands',
					columnDefs: [ {
						"targets": 2,
						"orderable": false,
						"searchable": false
					} ]
			    });

    $(document).on('click', 'button.edit_brand_button', function(){

    	$( "div.brands_modal" ).load( $(this).data('href'), function(){

    		$(this).modal('show');

    		$('form#brand_edit_form').submit(function(e){
	    		e.preventDefault();
				var data = $(this).serialize();

	    		$.ajax({
					method: "POST",
					url: $(this).attr("action"),
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							$('div.brands_modal').modal('hide');
							toastr.success(result.msg);
							brands_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
    		});
    	});
    });

    $(document).on('click', 'button.delete_brand_button', function(){
    	swal({
          title: LANG.sure,
          text: LANG.confirm_delete_brand,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).data('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							toastr.success(result.msg);
							brands_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });

    //Start: CRUD for tax Rate

    //Tax Rates table
    var tax_rates_table = $('#tax_rates_table').DataTable({
					processing: true,
					serverSide: true,
					ajax: '/tax-rates',
					columnDefs: [ {
						"targets": 2,
						"orderable": false,
						"searchable": false
					} ]
			    });

    $(document).on('submit', 'form#tax_rate_add_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success == true){
					$('div.tax_rate_modal').modal('hide');
					toastr.success(result.msg);
					tax_rates_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});

	$(document).on('click', 'button.edit_tax_rate_button', function(){

    	$( "div.tax_rate_modal" ).load( $(this).data('href'), function(){

    		$(this).modal('show');

    		$('form#tax_rate_edit_form').submit(function(e){
	    		e.preventDefault();
				var data = $(this).serialize();

	    		$.ajax({
					method: "POST",
					url: $(this).attr("action"),
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							$('div.tax_rate_modal').modal('hide');
							toastr.success(result.msg);
							tax_rates_table.ajax.reload();
							tax_groups_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
    		});
    	});
    });

    $(document).on('click', 'button.delete_tax_rate_button', function(){
    	swal({
          title: LANG.sure,
          text: LANG.confirm_delete_tax_rate,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).data('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							toastr.success(result.msg);
							tax_rates_table.ajax.reload();
							tax_groups_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });

    //End: CRUD for tax Rate

    //Start: CRUD for unit
    //Unit table
    var units_table = $('#unit_table').DataTable({
					processing: true,
					serverSide: true,
					ajax: '/units',
					columnDefs: [ {
						"targets": 3,
						"orderable": false,
						"searchable": false
					} ]
			    });

    $(document).on('submit', 'form#unit_add_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success == true){
					$('div.unit_modal').modal('hide');
					toastr.success(result.msg);
					units_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});

	$(document).on('click', 'button.edit_unit_button', function(){

    	$( "div.unit_modal" ).load( $(this).data('href'), function(){

    		$(this).modal('show');

    		$('form#unit_edit_form').submit(function(e){
	    		e.preventDefault();
				var data = $(this).serialize();

	    		$.ajax({
					method: "POST",
					url: $(this).attr("action"),
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							$('div.unit_modal').modal('hide');
							toastr.success(result.msg);
							units_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
    		});
    	});
    });

    $(document).on('click', 'button.delete_unit_button', function(){
    	swal({
          title: LANG.sure,
          text: LANG.confirm_delete_unit,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).data('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							toastr.success(result.msg);
							units_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });

    var starting_balance_table = $('#starting_balance_table').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
        	url: "/contacts/starting-balances",
			type: "GET",
			data: function ( d ) {
        		d.type = $('#contact_type').val();
			}
        },
        columnDefs: [ {
            "orderable": false,
            "searchable": false
        } ],
        columns: [
            {data: 'id', name: 'name'},
            {data: 'name', name: 'contacts.name'},
            {data: 'updated_at', name: 'updated_at'},
            {data: 'starting_balance', name: 'starting_balance'},
        ],
        "fnDrawCallback": function (oSettings) {
            __currency_convert_recursively($('#starting_balance_table'));
        }
    });

    $(document).on('click', '.delete_contact_button', function(e){
        e.preventDefault();
        swal({
            title: LANG.sure,
            text: LANG.confirm_delete_contact,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                var href = $(this).attr('href');
                var data = $(this).serialize();

                $.ajax({
                    method: "DELETE",
                    url: href,
                    dataType: "json",
                    data: data,
                    success: function(result){
                        if(result.success == true){
                            toastr.success(result.msg);
                            starting_balance_table.ajax.reload();
                        } else {
                            toastr.error(result.msg);
                        }
                    }
                });
            }
        });
    });

    var regular_balance_table = $('#regular_balance_table').DataTable({
        processing: true,
        serverSide: true,
        ajax: '/regular-balances?type=' + $('#contact_type').val(),
        aaSorting: [[0, 'desc']],
        columnDefs: [ {
            "orderable": false,
            "searchable": false
        } ],
        "fnDrawCallback": function (oSettings) {
            __currency_convert_recursively($('#regular_balance_table'));
        }
    });

    $('.regular_balance_modal').on('shown.bs.modal', function (e) {

        $("form#regular_balance_add_form, form#regular_balance_edit_form").submit(function(e){
            e.preventDefault();
        }).validate({
            rules: {
				amount: {
                	remote: {
                		url: "/regular-balances/check-regular-balance-amount",
						type: "post",
						data: {
                			amount: function() {
                				return $("#amount").val();
							}
						}
					}
				}
            },
            messages:{
				amount: {
                	remote: LANG.amount_should_be_positive
				}
            },
            submitHandler: function(form) {
                e.preventDefault();
                var data = $(form).serialize();

                $.ajax({
                    method: "POST",
                    url: $(form).attr("action"),
                    dataType: "json",
                    data: data,
                    success: function(result){
                        if(result.success == true){
                            $('div.regular_balance_modal').modal('hide');
                            toastr.success(result.msg);
                            regular_balance_table.ajax.reload();
                        } else {
                            toastr.error(result.msg);
                        }
                    }
                });
            }
        });
    });

    $(document).on('click', '.edit_regular_balance_button', function(e){
        e.preventDefault();
        $( "div.regular_balance_modal" ).load( $(this).attr('href'), function(){
            $(this).modal('show');
        });
    });

    $(document).on('click', '.delete_regular_balance_button', function(e){
        e.preventDefault();
        swal({
            title: LANG.sure,
            text: LANG.confirm_delete_contact,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                var href = $(this).attr('href');
                var data = $(this).serialize();

                $.ajax({
                    method: "DELETE",
                    url: href,
                    dataType: "json",
                    data: data,
                    success: function(result){
                        if(result.success == true){
                            toastr.success(result.msg);
                            regular_balance_table.ajax.reload();
                        } else {
                            toastr.error(result.msg);
                        }
                    }
                });
            }
        });
    });

    $(document).on('click', '#receive_date', function () {
        $('#receive_date').datepicker({
            autoclose: true,
            format: "yyyy-mm-dd"
        });
	});

    //Start: CRUD for Contacts
    //contacts table
    var contact_table_type = $('#contact_type').val();
    var targets = 4;
    if(contact_table_type == 'supplier'){
    	targets = 5;
    }

    var contact_table = $('#contact_table').DataTable({
        // processing: true,
        // serverSide: true,
        ajax: {
            url: '/contacts',
            data:function (d) {
                d.type= $('#contact_type').val();
                d.nonZero= $('#nonZero').is(':checked');
            }
        },
        // columns: [
        //     {data: 'id', name: 'name'},
        //     {data: 'name', name: 'contacts.name'},
        //     {data: 'city', name: 'contacts.city'},
        //     {data: 'balance', name: 'balance'},
        //     {data: 'action', name: 'action'}
        // ],
        "fnDrawCallback": function (oSettings) {
            __currency_convert_recursively($('#contact_table'));
        }
    });

    $('#nonZero').on('change', function () {
        contact_table.ajax.reload();
    });

    //On display of add contact modal
    $('.contact_modal').on('shown.bs.modal', function (e) {

    	if($('select#contact_type').val() == 'customer'){
    		$('div.supplier_fields').hide();
    		$('div.customer_fields').show();
    	} else if($('select#contact_type').val() == 'supplier'){
    		$('div.supplier_fields').show();
    		$('div.customer_fields').hide();
    	}

    	$('select#contact_type').change(function(){
    		var t = $(this).val();

    		if(t == 'supplier'){
    			$('div.supplier_fields').fadeIn();
    			$('div.customer_fields').fadeOut();
    		} else if(t == 'both') {
    			$('div.supplier_fields').fadeIn();
    			$('div.customer_fields').fadeIn();
    		} else if(t == 'customer') {
    			$('div.customer_fields').fadeIn();
				$('div.supplier_fields').fadeOut();
    		}
    	});

    	$("form#contact_add_form, form#contact_edit_form").submit(function(e){
    		e.preventDefault();
    	}).validate({
    		rules: {
	            name: {
			    	remote: {
				        url: "/contacts/check-contact-name",
				        type: "post",
				        data: {
					        name: function() {
					            return $( "#name" ).val();
					        },
					        hidden_id: function() {
				            	if($('#hidden_id').length){
				            		return $('#hidden_id').val();
				            	} else {
				            		return '';
				            	}
				        	}
				    	}
			    }
				}
	        },
	        messages:{
	        	name: {
	        		remote: LANG.contact_name_already_exists
	        	}
	        },
    		submitHandler: function(form) {
    			e.preventDefault();
				var data = $(form).serialize();

				$.ajax({
					method: "POST",
					url: $(form).attr("action"),
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							$('div.contact_modal').modal('hide');
							toastr.success(result.msg);
							contact_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
    		}
    	});
    });

    $(document).on('click', '.edit_contact_button', function(e){
		e.preventDefault();
    	$( "div.contact_modal" ).load( $(this).attr('href'), function(){
    		$(this).modal('show');
    	});
    });

    // $(document).on('click', '.edit_contact_button', function(e){
    //     e.preventDefault();
    //     var href = $(this).attr('href');
		// var contact_id = href.split('//')[1].split('/')[2];
    //
    //     $.ajax({
    //         method: "POST",
    //         url: '/contacts/check_edit_possiblity',
		// 	data: {'contact_id': contact_id},
    //         dataType: "json",
    //         success: function(result){
    //             if(result.success == false){
    //                 toastr.error(result.msg);
    //                 contact_table.ajax.reload();
    //             } else {
    //                 $( "div.contact_modal" ).load( href, function(){
    //                     $(this).modal('show');
    //                 });
    //             }
    //         }
    //     });
    // });

    $(document).on('click', '.delete_contact_button', function(e){
    	e.preventDefault();
    	swal({
          title: LANG.sure,
          text: LANG.confirm_delete_contact,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).attr('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							toastr.success(result.msg);
							contact_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });
	
	//Start: CRUD for category
    //Category table
    var category_table = $('#category_table').DataTable({
					processing: true,
					serverSide: true,
					ajax: '/categories',
					columnDefs: [ {
						"targets": 2,
						"orderable": false,
						"searchable": false
					} ]
			    });
	$(document).on('submit', 'form#category_add_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success === true){
					$('div.category_modal').modal('hide');
					toastr.success(result.msg);
					category_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});
	$(document).on('click', 'button.edit_category_button', function(){

    	$( "div.category_modal" ).load( $(this).data('href'), function(){

    		$(this).modal('show');

    		$('form#category_edit_form').submit(function(e){
	    		e.preventDefault();
				var data = $(this).serialize();

	    		$.ajax({
					method: "POST",
					url: $(this).attr("action"),
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success === true){
							$('div.category_modal').modal('hide');
							toastr.success(result.msg);
							category_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
    		});
    	});
    });

	$(document).on('click', 'button.delete_category_button', function(){
		swal({
          title: LANG.sure,
          text: LANG.confirm_delete_category,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                var href = $(this).data('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success === true){
							toastr.success(result.msg);
							category_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });
	//End: CRUD for category

    //Start: CRUD for product variations
    //Variations table
    var variation_table = $('#variation_table').DataTable({
					processing: true,
					serverSide: true,
					ajax: '/variation-templates',
					columnDefs: [ {
						"targets": 2,
						"orderable": false,
						"searchable": false
					} ]
			    });
    $(document).on('click', '#add_variation_values', function(){
        var html = '<div class="form-group"><div class="col-sm-7 col-sm-offset-3"><input type="text" name="variation_values[]" class="form-control" required></div><div class="col-sm-2"><button type="button" class="btn btn-danger delete_variation_value">-</button></div></div>';
        $('#variation_values').append(html);
    });
    $(document).on('click', '.delete_variation_value', function(){
        $(this).closest('.form-group').remove();
    });
    $(document).on('submit', 'form#variation_add_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success === true){
					$('div.variation_modal').modal('hide');
					toastr.success(result.msg);
					variation_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});

    $(document).on('click', 'button.edit_variation_button', function(){

    	$( "div.variation_modal" ).load( $(this).data('href'), function(){

    		$(this).modal('show');

    		$('form#variation_edit_form').submit(function(e){
	    		e.preventDefault();
				var data = $(this).serialize();

	    		$.ajax({
					method: "POST",
					url: $(this).attr("action"),
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success === true){
							$('div.variation_modal').modal('hide');
							toastr.success(result.msg);
							variation_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
    		});
    	});
    });

    $(document).on('click', 'button.delete_variation_button', function(){
    	swal({
          title: LANG.sure,
          text: LANG.confirm_delete_variation,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).data('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success === true){
							toastr.success(result.msg);
							variation_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });
    
    var active = false;
    $(document).on( 'mousedown', '.drag-select', function(ev){
		active = true;
		$(".active-cell").removeClass("active-cell"); // clear previous selection
		
		$(this).addClass("active-cell");
		cell_value = $(this).find('input').val();
	});
    $(document).on( 'mousemove', '.drag-select', function(ev){
		if (active) {
			$(this).addClass("active-cell");
			$(this).find('input').val(cell_value);
		}
	});
	
	$(document).mouseup(function(ev) {
		active = false;
		if( !$(ev.target).hasClass('drag-select') && !$(ev.target).hasClass('dpp') && !$(ev.target).hasClass('dsp')){
			$('.active-cell').each( function(){
				$(this).removeClass('active-cell');
			});

		}
	});
    
    //End: CRUD for product variations
	$(document).on('change', '.toggler', function(){
		var parent_id = $(this).attr('data-toggle_id');
		if( $(this).is(':checked') ){
			$( '#' + parent_id).removeClass('hide');
		} else {
			$( '#' + parent_id).addClass('hide');
		}
		
	});
    //Start: CRUD for products
    $('#category_id').change( function(){
        get_sub_categories();
    });

    if($('.product_form').length){
        show_product_type_form();
    }
    $('#type').change( function(){
        show_product_type_form();
    });

    $(document).on( 'click', '#add_variation', function(){
        var row_index = $('#variation_counter').val();
        var action = $(this).attr('data-action');
        $.ajax({
			method: "POST",
			url: '/products/get_product_variation_row',
            data: { 'row_index': row_index, 'action': action },
			dataType: "html",
			success: function(result){
				if(result){
                    $('#product_variation_form_part  > tbody').append(result);
                    $('#variation_counter').val( parseInt(row_index) + 1 );
                    toggle_dsp_input();
                }
			}
		});
        
    });
    //End: CRUD for products

    //bussiness settings start

    if($("form#bussiness_edit_form").length > 0){
    	$("form#bussiness_edit_form").validate();
    	
    	// logo upload
    	$("#business_logo").fileinput(fileinput_setting);

    	//Purchase currency
    	$('input#purchase_in_diff_currency').on('ifChecked', function(event){
  			$('div#settings_purchase_currency_div, div#settings_currency_exchange_div').removeClass('hide');
		});
		$('input#purchase_in_diff_currency').on('ifUnchecked', function(event){
  			$('div#settings_purchase_currency_div, div#settings_currency_exchange_div').addClass('hide');
		});

		//Product expiry
		$('input#enable_product_expiry').change(function(){
			if($(this).is(':checked')){
				$('select#expiry_type').attr('disabled', false);
				$('div#on_expiry_div').removeClass('hide');
			} else {
				$('select#expiry_type').attr('disabled', true);
				$('div#on_expiry_div').addClass('hide');
			}
		});

		$('select#on_product_expiry').change(function(){
			if($(this).val() == 'stop_selling'){
				$('input#stop_selling_before').attr('disabled', false);
				$('input#stop_selling_before').focus().select();
			} else {
				$('input#stop_selling_before').attr('disabled', true);
			}
		});

		//enable_category
		$('input#enable_category').on('ifChecked', function(event){
  			$('div.enable_sub_category').removeClass('hide');
		});
		$('input#enable_category').on('ifUnchecked', function(event){
			$('div.enable_sub_category').addClass('hide');
		});
		
    }
    //bussiness settings end

    $("#upload_document").fileinput(fileinput_setting);
    
    //user profile
    $('form#edit_user_profile_form').validate();
    $('form#edit_password_form').validate({
        rules: {
            current_password: {
		    	required: true,
		    	minlength: 5
		    },
		    new_password: {
		    	required: true,
		    	minlength: 5
		    },
		    confirm_password: {
      			equalTo: "#new_password"
    		},
        }
    });

    //Tax Rates table
    var tax_groups_table = $('#tax_groups_table').DataTable({
					processing: true,
					serverSide: true,
					ajax: '/group-taxes',
					columnDefs: [ {
						"targets": [2, 3],
						"orderable": false,
						"searchable": false
					} ],
					columns: [
					    {data: 'name', name: 'name'},
					    {data: 'amount', name: 'amount'},
					    {data: 'sub_taxes', name: 'sub_taxes'},
					    {data: 'action', name: 'action'}
					]
			    });
    $('.tax_group_modal').on('shown.bs.modal', function () {
	      $('.tax_group_modal').find('.select2').each( function(){
	      		__select2($(this));
	      });
    });

    $(document).on('submit', 'form#tax_group_add_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success == true){
					$('div.tax_group_modal').modal('hide');
					toastr.success(result.msg);
					tax_groups_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});

	$(document).on('submit', 'form#tax_group_edit_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success == true){
					$('div.tax_group_modal').modal('hide');
					toastr.success(result.msg);
					tax_groups_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});

	$(document).on('click', 'button.delete_tax_group_button', function(){
		swal({
          title: LANG.sure,
          text: LANG.confirm_tax_group,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).data('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							toastr.success(result.msg);
							tax_groups_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });

    //option-div
    $(document).on('click', '.option-div-group .option-div', function(){
    	$(this).closest('.option-div-group').find('.option-div').each( function(){
    		$(this).removeClass('active');
    	});
    	$(this).addClass('active');
    	$(this).find("input:radio").prop("checked", true).change();
    });

    $(document).on( 'change', 'input[type=radio][name=scheme_type]', function(){
    	$('#invoice_format_settings').removeClass('hide');
    	var scheme_type = $(this).val();
    	if(scheme_type == 'blank'){
    		$('#prefix').val('').attr('placeholder', 'XXXX').prop('disabled', false);
    	} else if(scheme_type == 'year') {
    		var d = new Date();
			var this_year = d.getFullYear();
    		$('#prefix').val( this_year + '-' ).attr('placeholder', '').prop('disabled', true);
    	}
    	show_invoice_preview();
    });
    $(document).on( 'change', '#prefix', function(){
    	show_invoice_preview();
    });
    $(document).on( 'keyup', '#prefix', function(){
    	show_invoice_preview();
    });
    $(document).on( 'keyup', '#start_number', function(){
    	show_invoice_preview();
    });
     $(document).on( 'change', '#total_digits', function(){
    	show_invoice_preview();
    });
	var invoice_table = $('#invoice_table').DataTable({
					processing: true,
					serverSide: true,
					bPaginate: false,
					buttons:[],
					ajax: '/invoice-schemes',
					columnDefs: [ {
						"targets": 4,
						"orderable": false,
						"searchable": false
					} ]
			    });
	$(document).on('submit', 'form#invoice_scheme_add_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success == true){
					$('div.invoice_modal').modal('hide');
					$('div.invoice_edit_modal').modal('hide');
					toastr.success(result.msg);
					invoice_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});
	$(document).on('click', 'button.set_default_invoice', function(){
        var href = $(this).data('href');
        var data = $(this).serialize();

        $.ajax({
            method: "get",
            url: href,
            dataType: "json",
            data: data,
            success: function(result){
                if(result.success === true){
                    toastr.success(result.msg);
                    invoice_table.ajax.reload();
                } else {
                    toastr.error(result.msg);
                }
            }
        });
    });
	$('.invoice_edit_modal').on('shown.bs.modal', function () {
		show_invoice_preview();
	});
	$(document).on('click', 'button.delete_invoice_button', function(){
		swal({
          title: LANG.sure,
          text: LANG.delete_invoice_confirm,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).data('href');
		        var data = $(this).serialize();

		        $.ajax({
		            method: "DELETE",
		            url: href,
		            dataType: "json",
		            data: data,
		            success: function(result){
		                if(result.success === true){
		                    toastr.success(result.msg);
		                    invoice_table.ajax.reload();
		                } else {
		                    toastr.error(result.msg);
		                }
		            }
		        });
            }
        });
    });

    $('#add_barcode_settings_form').validate();
    $(document).on('change', '#is_continuous', function(){
    	if( $(this).is(':checked') ){
    		$('.stickers_per_sheet_div').addClass('hide');
    		$('.paper_height_div').addClass('hide');
    	} else {
    		$('.stickers_per_sheet_div').removeClass('hide');
    		$('.paper_height_div').removeClass('hide');
    	}
    });

    //initialize iCheck
    $('input[type="checkbox"].input-icheck, input[type="radio"].input-icheck').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue'
    });
    $(document).on( 'ifChecked', '.check_all', function(){
    	$(this).closest('.check_group').find('.input-icheck').each( function(){
    		$(this).iCheck('check');
    	});
    });
    $(document).on( 'ifUnchecked', '.check_all', function(){
    	$(this).closest('.check_group').find('.input-icheck').each( function(){
    		$(this).iCheck('uncheck');
    	});
    });
    $('.check_all').each( function(){
    	var length = 0;
    	var checked_length = 0;
    	$(this).closest('.check_group').find('.input-icheck').each( function(){
    		length += 1;
    		if($( this ).iCheck('update')[0].checked){
    			checked_length += 1;
    		}
    	});
    	length = length - 1;
    	if( checked_length != 0 && length == checked_length){
    		$(this).iCheck('check');
    	}
    });

    //Bank CRUD
    var banks = $('#bank_list_table').DataTable({
        processing: true,
        serverSide: true,
        bPaginate: false,
        buttons:[],
        ajax: '/bank',
        columnDefs: [ {
            "orderable": false,
            "searchable": false
        } ]
    });

    $('.bank_add_modal, .bank_edit_modal').on('shown.bs.modal', function (e) {
        $("form#bank_add_form").submit(function(e){
            e.preventDefault();
        }).validate({
            submitHandler: function(form) {
                e.preventDefault();
                var data = $(form).serialize();

                $.ajax({
                    method: "POST",
                    url: $(form).attr("action"),
                    dataType: "json",
                    data: data,
                    success: function(result){
                        if(result.success == true){
                            $('div.bank_add_modal').modal('hide');
                            $('div.bank_edit_modal').modal('hide');
                            toastr.success(result.msg);
                            banks.ajax.reload();
                        } else {
                            toastr.error(result.msg);
                        }
                    }
                });
            }
        });
    });

    $(document).on('click', 'a.delete_bank', function(e){
        e.preventDefault();
        swal({
            title: LANG.sure,
            text: LANG.confirm_delete_bank,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                var href = $(this).data('href');
                var data = $(this).serialize();

                $.ajax({
                    method: "DELETE",
                    url: href,
                    dataType: "json",
                    data: data,
                    success: function(result){
                        if(result.success === true){
                            toastr.success(result.msg);
                            banks.ajax.reload();
                        } else {
                            toastr.error(result.msg);
                        }
                    }
                });
            }
        });
    });

    //Business locations CRUD
    var business_locations = $('#business_location_table').DataTable({
					processing: true,
					serverSide: true,
					bPaginate: false,
					buttons:[],
					ajax: '/inventory',
					columnDefs: [ {
						"orderable": false,
						"searchable": false
					} ]
			    });

    $('.location_add_modal, .location_edit_modal').on('shown.bs.modal', function (e) {
    $("form#business_location_add_form").submit(function(e){
    		e.preventDefault();
    	}).validate({
    		submitHandler: function(form) {
    			e.preventDefault();
				var data = $(form).serialize();

				$.ajax({
					method: "POST",
					url: $(form).attr("action"),
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							$('div.location_add_modal').modal('hide');
							$('div.location_edit_modal').modal('hide');
							toastr.success(result.msg);
							business_locations.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
    		}
    	});
    });

    $(document).on('click', 'a.delete_business_location', function(e){
        e.preventDefault();
        swal({
            title: LANG.sure,
            text: LANG.confirm_delete_inventory,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                var href = $(this).data('href');
                var data = $(this).serialize();

                $.ajax({
                    method: "DELETE",
                    url: href,
                    dataType: "json",
                    data: data,
                    success: function(result){
                        if(result.success === true){
                            toastr.success(result.msg);
                            business_locations.ajax.reload();
                        } else {
                            toastr.error(result.msg);
                        }
                    }
                });
            }
        });
    });

    if($('#header_text').length){
    	CKEDITOR.replace( 'header_text',
    	{ customConfig: '/AdminLTE/plugins/ckeditor/config.js' });
    }
	if($('#footer_text').length){
		CKEDITOR.replace( 'footer_text',
		{ customConfig: '/AdminLTE/plugins/ckeditor/config.js' });
	}

	//Start: CRUD for expense category
    //Expense category table
    var expense_cat_table = $('#expense_category_table').DataTable({
					processing: true,
					serverSide: true,
					ajax: '/expense-categories',
					columnDefs: [ {
						"targets": 2,
						"orderable": false,
						"searchable": false
					} ]
			    });
	$(document).on('submit', 'form#expense_category_add_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success === true){
					$('div.expense_category_modal').modal('hide');
					toastr.success(result.msg);
					expense_cat_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});
	$(document).on('click', 'button.delete_expense_category', function(){
		swal({
          title: LANG.sure,
          text: LANG.confirm_delete_expense_category,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).data('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success === true){
							toastr.success(result.msg);
							expense_cat_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });

    //Expense table
    expense_table = $('#expense_table').DataTable({
        processing: true,
        serverSide: true,
        aaSorting: [[0, 'desc'],[1, 'desc']],
        ajax: '/expenses',
        columnDefs: [ {
            "targets": 7,
            "orderable": false,
            "searchable": false
        } ],
        columns: [
            { data: 'transaction_date', name: 'transaction_date'  },
            { data: 'ref_no', name: 'ref_no'},
            { data: 'category', name: 'ec.name'},
            { data: 'bank_name', name: 'bank.name'},
            { data: 'payment_status', name: 'payment_status'},
            { data: 'final_total', name: 'final_total'},
            { data: 'expense_for', name: 'expense_for'},
            { data: 'additional_notes', name: 'additional_notes'},
            { data: 'action', name: 'action'}
        ],
        "fnDrawCallback": function (oSettings) {
        	var expense_total = sum_table_col($('#expense_table'), 'final-total');
            $('#footer_expense_total').text(expense_total);

            $('#footer_payment_status_count').html(__sum_status_html($('#expense_table'), 'payment-status'));
            
            __currency_convert_recursively($('#expense_table'));
        }
    });
    //Date picker
    $('#expense_transaction_date').datepicker({
    	autoclose: true,
    	format:datepicker_date_format
    });

    $(document).on('click', 'a.delete_expense', function(e){
    	e.preventDefault();
    	swal({
          title: LANG.sure,
          text: LANG.confirm_delete_expense,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).data('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success === true){
							toastr.success(result.msg);
							expense_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });

    $(document).on('change', '.payment_types_dropdown',function(){
		var payment_type = $(this).val();
		var to_show = null;

		$(this).closest('.payment_row').find('.payment_details_div').each( function(){
			if($(this).attr('data-type') == payment_type){
				to_show = $(this);
			} else{
				if(!$(this).hasClass('hide')){
					$(this).addClass('hide');
				}
			}
		});

		if(to_show && to_show.hasClass('hide')){
			to_show.removeClass('hide');
			to_show.find('input').filter(':visible:first').focus();
		}
	});

	//Start: CRUD operation for printers

	//Add Printer
	if($('form#add_printer_form').length == 1){

		printer_connection_type_field($('select#connection_type').val());
		$('select#connection_type').change(function(){
			var ctype = $(this).val();
			printer_connection_type_field(ctype);
		});

		$('form#add_printer_form').validate();
	}

	//Business Location Receipt setting
	if($('form#bl_receipt_setting_form').length == 1){

		if($('select#receipt_printer_type').val() == 'printer'){
			$('div#location_printer_div').removeClass('hide');
		} else {
			$('div#location_printer_div').addClass('hide');
		}
		
		$('select#receipt_printer_type').change(function(){
			var printer_type = $(this).val();
			if(printer_type == 'printer'){
				$('div#location_printer_div').removeClass('hide');
			} else {
				$('div#location_printer_div').addClass('hide');
			}
		});

		$('form#bl_receipt_setting_form').validate();
	}

	$(document).on('click', 'a.pay_purchase_due, a.pay_sale_due', function(e){
		e.preventDefault();
		$.ajax({
			url: $(this).attr("href"),
			dataType: "html",
			success: function(result){
				$('.pay_contact_due_modal').html(result).modal('show');
				 __currency_convert_recursively($('.pay_contact_due_modal'));
				$('#paid_on').datepicker({
                    autoclose: true,
                });
			}
		});
	});
	$(document).on('submit', 'form#pay_contact_due_form', function(e){
        e.preventDefault();
        var data = $(this).serialize();

        $.ajax({
            method: $(this).attr("method"),
            url: $(this).attr("action"),
            dataType: "json",
            data: data,
            success: function(result){
                if(result.success === true){
                    $('div.pay_contact_due_modal').modal('hide');
					if($('#contact_table').length < 1){
						location.reload();
					}
                    toastr.success(result.msg);
                    contact_table.ajax.reload();
                } else {
                    toastr.error(result.msg);
                }
            }
        });
    });

    //Todays profit modal
    $('#view_todays_profit').click( function(){
    	$('#todays_profit_modal').modal('show');
    });
    $('#todays_profit_modal').on('shown.bs.modal', function () {
	  	var start = $('#modal_today').val();
	    var end = start;
	    var location_id = '';

	    var data = { start_date: start, end_date: end, location_id: location_id  };
	    
	    var loader = __fa_awesome();
	    $('.modal_opening_stock, .modal_total_transfer_shipping_charges, .modal_closing_stock, .modal_total_sell, .modal_total_purchase, .modal_total_expense, .modal_net_profit, .modal_total_adjustment, .modal_total_recovered').html(loader);

	    $.ajax({
	        method: "GET",
	        url: '/reports/profit-loss',
	        dataType: "json",
	        data: data,
	        success: function(data){
	            $('.modal_opening_stock').html(__currency_trans_from_en( data.opening_stock, true ));
	            $('.modal_closing_stock').html(__currency_trans_from_en( data.closing_stock, true ));
	            $('.modal_total_sell').html(__currency_trans_from_en( data.total_sell, true ));
	            $('.modal_total_purchase').html(__currency_trans_from_en( data.total_purchase, true ));
	            $('.modal_total_expense').html(__currency_trans_from_en( data.total_expense, true ));
	            $('.modal_net_profit').html(__currency_trans_from_en( data.net_profit, true ));
	            $('.modal_total_adjustment').html(__currency_trans_from_en( data.total_adjustment, true ));
            	$('.modal_total_recovered').html(__currency_trans_from_en( data.total_recovered, true ));
            	$('.modal_total_transfer_shipping_charges').html(__currency_trans_from_en( data.total_transfer_shipping_charges, true ));
	            __highlight(data.net_profit, $('.modal_net_profit'));
	        }
	    });
	});

    //Used for Purchase & Sell invoice.
	$(document).on('click', 'a.print-invoice', function(e){
		e.preventDefault();
        var href = $(this).data('href');

        $.ajax({
            method: "GET",
            url: href,
            dataType: "json",
            success: function(result){

                if(result.success == 1 && result.receipt.html_content != ''){
                    $('#receipt_section').html(result.receipt.html_content);
                    __currency_convert_recursively($('#receipt_section'));
                    setTimeout(function(){window.print();}, 1000);
                } else {
                    toastr.error(result.msg);
                }
            }
        });
    });

    //Sales commission agent
    var sales_commission_agent_table = $('#sales_commission_agent_table').DataTable({
                    processing: true,
                    serverSide: true,
                    ajax: '/sales-commission-agents',
                    columnDefs: [ {
                        "targets": 2,
                        "orderable": false,
                        "searchable": false
                    } ],
                    "columns":[   
                       {"data":"full_name"},
                       {"data":"email"},
                       {"data":"contact_no"},
                       {"data":"address"},
                       {"data":"cmmsn_percent"},
                       {"data":"action"}
  
                    ]
                });
    $('div.commission_agent_modal').on('shown.bs.modal', function (e) {
    $("form#sale_commission_agent_form").submit(function(e){
    		e.preventDefault();
    	}).validate({
    		submitHandler: function(form) {
    			e.preventDefault();
				var data = $(form).serialize();

				$.ajax({
					method: $(form).attr("method"),
					url: $(form).attr("action"),
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							$('div.commission_agent_modal').modal('hide');
							toastr.success(result.msg);
							sales_commission_agent_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
    		}
    	});
    });
    $(document).on('click', 'button.delete_commsn_agnt_button', function(){
            swal({
              title: LANG.sure,
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    var href = $(this).data('href');
                    var data = $(this).serialize();
                    $.ajax({
                        method: "DELETE",
                        url: href,
                        dataType: "json",
                        data: data,
                        success: function(result){
                            if(result.success == true){
                                toastr.success(result.msg);
                                sales_commission_agent_table.ajax.reload();
                            } else {
                                toastr.error(result.msg);
                            }
                        }
                    });
                }
             });
        });

    $('button#full_screen').click(function(e){
		element = document.documentElement
		if (screenfull.enabled) {
			screenfull.toggle(element);
		}
    });

    $(document).on('submit', 'form#customer_group_add_form', function(e){
		e.preventDefault();
		var data = $(this).serialize();

		$.ajax({
			method: "POST",
			url: $(this).attr("action"),
			dataType: "json",
			data: data,
			success: function(result){
				if(result.success == true){
					$('div.customer_groups_modal').modal('hide');
					toastr.success(result.msg);
					customer_groups_table.ajax.reload();
				} else {
					toastr.error(result.msg);
				}
			}
		});
	});
    
    //Customer Group table
    var customer_groups_table = $('#customer_groups_table').DataTable({
					processing: true,
					serverSide: true,
					ajax: '/customer-group',
					columnDefs: [ {
						"targets": 2,
						"orderable": false,
						"searchable": false
					} ]
			    });

    $(document).on('click', 'button.edit_customer_group_button', function(){

    	$( "div.customer_groups_modal" ).load( $(this).data('href'), function(){

    		$(this).modal('show');

    		$('form#customer_group_edit_form').submit(function(e){
	    		e.preventDefault();
				var data = $(this).serialize();

	    		$.ajax({
					method: "POST",
					url: $(this).attr("action"),
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							$('div.customer_groups_modal').modal('hide');
							toastr.success(result.msg);
							customer_groups_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
    		});
    	});
    });

    $(document).on('click', 'button.delete_customer_group_button', function(){
    	swal({
          title: LANG.sure,
          text: LANG.confirm_delete_customer_group,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).data('href');
		    	var data = $(this).serialize();

		    	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					data: data,
					success: function(result){
						if(result.success == true){
							toastr.success(result.msg);
							customer_groups_table.ajax.reload();
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
    });

    //Delete Sale
	$(document).on('click', '.delete-sale', function(e){
		e.preventDefault();
		swal({
          title: LANG.sure,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
            	var href = $(this).attr('href');
            	$.ajax({
					method: "DELETE",
					url: href,
					dataType: "json",
					success: function(result){
						if(result.success == true){
							toastr.success(result.msg);
							if (typeof sell_table !== 'undefined') {
								sell_table.ajax.reload();
							}
							//Displays list of recent transactions
							if (typeof get_recent_transactions !== 'undefined') {
								get_recent_transactions('final', $('div#tab_final'));
								get_recent_transactions('draft', $('div#tab_draft'));
							}
							
						} else {
							toastr.error(result.msg);
						}
					}
				});
            }
        });
	});
});

function printer_connection_type_field(ctype){
	if(ctype == 'network'){
		$('div#path_div').addClass('hide');
		$('div#ip_address_div, div#port_div').removeClass('hide');
	} else if(ctype == 'windows' || ctype == 'linux'){
		$('div#path_div').removeClass('hide');
		$('div#ip_address_div, div#port_div').addClass('hide');
	}
}

function show_invoice_preview(){
	var prefix = $('#prefix').val();
	var start_number = $('#start_number').val();
	var total_digits = $('#total_digits').val();
	var preview = prefix + pad_zero(start_number, total_digits);
	$('#preview_format').text('#' + preview);

}
function pad_zero (str, max) {
  str = str.toString();
  return str.length < max ? pad_zero("0" + str, max) : str;
}

function get_sub_categories(){
    var cat = $('#category_id').val();
    $.ajax({
		method: "POST",
		url: '/products/get_sub_categories',
		dataType: "html",
		data: { 'cat_id': cat},
		success: function(result){
			if(result){
                $('#sub_category_id').html(result);
            }
		}
	});
}
function show_product_type_form(){
    var product_type = 'single';
    if( $('#type').val() === 'variable' ){
        product_type = 'variable';
    }
    var action = $('#type').attr('data-action');
    var product_id = $('#type').attr('data-product_id');
    $.ajax({
        method: "POST",
        url: '/products/product_form_part',
        dataType: "html",
        data: { 'type': product_type, 'product_id': product_id, 'action': action  },
        success: function(result){
            if(result){
                $('#product_form_part').html(result);
                toggle_dsp_input();
            }
        }
	});
}

$(document).on('click', 'table.ajax_view tbody tr', function(e){
	if(!$(e.target).is('td.clickable_td') && !$(e.target).is('a') && !$(e.target).is('button') && !$(e.target).hasClass('label') && !$(e.target).is('li') && $(this).data("href") && !$(e.target).is('i')){
		$.ajax({
		 	url: $(this).data("href"),
		 	dataType: "html",
		 	success: function(result){
		 		$('.view_modal').html(result).modal('show');
		 	}
		});
	}
});
$(document).on('click', 'td.clickable_td', function(e){
	e.preventDefault();
	e.stopPropagation();
	if($(this).find('a').length){
		var href = $(this).find('a').attr('href');
	    var container = $('.payment_modal');

	    $.ajax({
	        url: href,
	        dataType: "html",
	        success: function(result){
	            $(container).html(result).modal('show');
	            __currency_convert_recursively(container);
	        }
	    });
	}
});