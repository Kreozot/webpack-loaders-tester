$(function () {
	var editTimer;
	$source = $('#source');
	$output = $('#output');
	$loaders = $('#loaders');

	function updateOutput() {
		var source = $source.val();
		var loaders = $loaders.val();
		$.get('/webpack', {
			source: source,
			loaders: loaders
		}, function (data) {
			if (data.error) {
				$output.addClass('error-text')
					.html(data.error);
			} else {
				$output.removeClass('error-text')
					.html(data.output);
			}
		});
	}

	$('#source, #loaders')
		.on('keyup', function () {
			var $this = $(this);
			if (editTimer) {
				clearTimeout(editTimer);
			}

			editTimer = setTimeout(function () {
				$this.trigger('lastchange');
			}, 1000);
		})
		.bind('lastchange', updateOutput);
});
