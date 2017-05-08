var VISUALIZATION = (function (visualization, window, document) {
    'use strict';

    visualization.config = {
        // Define CSS & JS resources for visualization
    	styles: [
            'https://fonts.googleapis.com/css?family=Cairo:400,300',
            'https://fonts.googleapis.com/css?family=Open+Sans:300',
			'simple/css/styles.css'
        ],

        scripts: [
            '~/jquery/1.11.1/jquery-1.11.1.min',
            'simple/js/jsrender.min.js'
        ]
    };

    visualization.navigate = function (index) {
        // Add functionality to navigate events via Player controls if desired
    };

    visualization.start = function (containerId, schedule, handlers, settings) {
        // Build visualization
        // Sample visualization using JsRender for templates
        // http://www.jsviews.com/
        
        // Set defaults 
        var defaults = {
            // default setting value used to hide or show images for event
            showImage: false
        }
        var options = _.assign({}, defaults, settings);

        // Add properties for formatted date and resized image leveraging wcHelper methods
        for (var i = 0; i < schedule.events.length; i++) {
            // set event date - wcHelper.formatDateRange(type=event, event and timeOnly=false)
            schedule.events[i].date = wcHelper.formatDateRange('event', schedule.events[i], false);

            // set event image - wcHelper.getImage(event, size=sm)
            schedule.events[i].image = options.showImage ? wcHelper.getImage(schedule.events[i], 'sm') : '';
        }

        var tmpl = $.templates("#itemTemplate");    // Get compiled template
        var html = tmpl.render(schedule.events);    // Render template using data - as HTML string
        $("#itemList").html(html);                  // Insert HTML string into DOM

        // Call handlers.ready for visualization to load
        handlers.ready();

        // Add detail view link after view is loaded
        $(function() {
            $('.details-link').on('click', function(e){
                e.preventDefault();

                // Get event id that was set in eventTemplate
                var id = $(this).parents('.item').attr('data-id');

                // Call showDetail method with event id passed to display built in player detail window
                handlers.showDetail(id);
            });
        });
    };

    return visualization;

})(VISUALIZATION || {}, window, document);