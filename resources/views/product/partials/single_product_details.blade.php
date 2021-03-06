<br>
<div class="row">
	<div class="col-md-12">
		<div class="table-responsive">
			<table class="table bg-gray">
				<tr class="bg-green">
					<th>@lang('product.default_purchase_price')</th>
					{{--<th>@lang('product.default_purchase_price')</th>--}}
			        <th>@lang('product.profit_percent')</th>
			        <th>@lang('product.default_selling_price')</th>
				</tr>
				@foreach($product->variations as $variation)
				<tr>
					<td>
						<span class="display_currency" data-currency_symbol="true">{{ $variation->default_purchase_price }}</span>
					</td>
					{{--<td>--}}
						{{--<span class="display_currency" data-currency_symbol="true">{{ $variation->dpp_inc_tax }}</span>--}}
					{{--</td>--}}
					<td>
						{{ $variation->profit_percent }}
					</td>
					<td>
						<span class="display_currency" data-currency_symbol="true">{{ $variation->default_sell_price }}</span>
					</td>
					{{--<td>--}}
						{{--<span class="display_currency" data-currency_symbol="true">{{ $variation->sell_price_inc_tax }}</span>--}}
					{{--</td>--}}
				</tr>
				@endforeach
			</table>
		</div>
	</div>
</div>