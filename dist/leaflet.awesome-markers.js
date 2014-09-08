/*
  Leaflet.AwesomeMarkers, a plugin that adds colorful iconic markers for Leaflet, based on the Font Awesome icons
  (c) 2012-2013, Lennard Voogdt
  http://leafletjs.com
  https://github.com/lvoogdt


*/

/*global L*/

(function (window, document, undefined) {
    "use strict";
    /*
     * Leaflet.AwesomeMarkers assumes that you have already included the Leaflet library.
     */

    L.AwesomeMarkers = {};

    L.AwesomeMarkers.version = '2.0.1';

    L.AwesomeMarkers.Icon = L.Icon.extend({
        options: {
            //iconSize: [30, 30],
            iconAnchor:   [30, 30],
            popupAnchor: [1, -32],
            shadowAnchor: [10, 12],
            shadowSize: [36, 16],
            className: 'awesome-marker',
            prefix: '',
            spinClass: 'fa-spin',
            extraClasses: '',
            icon: 'glyphicon glyphicon-tint',
            iconColor: '333333',

            /* Added by Lu2 */
            fillColor: 'fafafa',
            weight: 2,
            //border: '1px solid',
            color: 'b02b2c',
            showShadow: 'yes',

            fillSize: 23,
            iconSize: 14,

            opacity: 1
        },

        initialize: function (options) {
            options = L.Util.setOptions(this, options);
        },

        createIcon: function () {
            var div = document.createElement('div'),
                options = this.options;

            if (options.icon) {
                div.innerHTML = this._createInner();
            }

            if (options.bgPos) {
                div.style.backgroundPosition =
                    (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
            }

            this._setIconStyles(div, 'icon-' + options.markerColor);
            return div;
        },

        _createInner: function() {
            var iconClass, iconSpinClass = "", iconColorClass = "", iconColorStyle = "", options = this.options;
            var backgroundColorStyle = "; background-color: " + options.fillColor;
            var iconFontSizeStyle = "; font-size: " + options.iconSize + 'px';
            var borderStyle = "; border: " + options.weight + 'px solid';
            var iconHeightSize = "; height: " + (parseInt(options.fillSize) + (parseInt(options.weight)*2)) + 'px' + "; width: " + (parseInt(options.fillSize) + (parseInt(options.weight)*2)) + 'px' + "; line-height: " + (parseInt(options.fillSize)) + 'px';
            var opacityMarkerStyle = "; opacity: " + options.opacity;
            var borderColorStyle = "; border-color: " + options.color + ";'";


            if(options.spin && typeof options.spinClass === "string") {
                iconSpinClass = options.spinClass;
            }

            if(options.iconColor) {
                if(options.iconColor === 'white' || options.iconColor === 'black') {
                    iconColorClass = "icon-" + options.iconColor;
                } else {
                    iconColorStyle = "color: " + options.iconColor;
                }
            }

            return "<i style = 'border-radius:100px; padding:0px;" + iconColorStyle + opacityMarkerStyle + iconHeightSize + iconFontSizeStyle + backgroundColorStyle + borderStyle + borderColorStyle +
            "class='" + options.extraClasses + " " + options.icon + " " + iconSpinClass + " " + iconColorClass + "'></i>";
        },

        _setIconStyles: function (img, name) {
            var options = this.options,
                size = L.point(options[name === 'shadow' ? 'shadowSize' : 'iconSize']),
                anchor;

            if (name === 'shadow') {
                anchor = L.point(options.shadowAnchor || options.iconAnchor);
            } else {
                anchor = L.point(options.iconAnchor);
            }

            if (!anchor && size) {
                anchor = size.divideBy(2, true);
            }

            img.className = 'awesome-marker-' + name + ' ' + options.className;

            if (anchor) {
                img.style.marginLeft = (-((parseInt(this.options.fillSize) + parseInt(this.options.weight) * 2) /2)) + 'px';
                img.style.marginTop  = img.style.marginLeft;
            }

            if (size) {
                img.style.width  = size.x + 'px';
                img.style.height = size.y + 'px';
            }
        },

        createShadow: function () {
            var div = document.createElement('div');

            this._setIconStyles(div, 'shadow');
            return div;
      }
    });

    L.AwesomeMarkers.icon = function (options) {
        return new L.AwesomeMarkers.Icon(options);
    };

}(this, document));



