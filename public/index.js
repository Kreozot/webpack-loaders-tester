$(function () {
	var editTimer;
	$output = $('#output');

	$('#source')
		.on('keyup', function () {
			var $this = $(this);
			if (editTimer) {
				clearTimeout(editTimer);
			}

			editTimer = setTimeout(function () {
				$this.trigger('lastchange');
			}, 1000);
		})
		.bind('lastchange', function () {
			var source = $(this).val();
			$.get('/webpack', {
				source: source,
				loaders: ['raw', 'css?root=.']
			}, function (data) {
				$output.html(data);
			});
		});
});
