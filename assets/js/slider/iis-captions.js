/*
 * Ideal Image Slider: Captions Extension v1.0.1
 *
 * By Gilbert Pellegrom
 * http://gilbert.pellegrom.me
 *
 * Copyright (C) 2014 Dev7studios
 * https://raw.githubusercontent.com/gilbitron/Ideal-Image-Slider/master/LICENSE
 */

(function(IIS) {
	"use strict";

	IIS.Slider.prototype.addCaptions = function() {
		IIS._addClass(this._attributes.container, 'iis-has-captions');

		Array.prototype.forEach.call(this._attributes.slides, function(slide, i) {
			var caption = document.createElement('div');
			IIS._addClass(caption, 'iis-caption');

			var captionContent = '';
			if (slide.getAttribute('title')) {
				captionContent += '<div class="iis-caption-title">' + slide.getAttribute('title') + '</div>';
			}
			if (slide.getAttribute('data-caption')) {
				var dataCaption = slide.getAttribute('data-caption');
				if (dataCaption.substring(0, 1) == '#' || dataCaption.substring(0, 1) == '.') {
					var external = document.querySelector(dataCaption);
					if (external) {
						captionContent += '<div class="iis-caption-content">' + external.innerHTML + '</div>';
					}
				} else {
					captionContent += '<div class="iis-caption-content">' + slide.getAttribute('data-caption') + '</div>';
				}
			} else {
				if (slide.innerHTML) {
					captionContent += '<div class="iis-caption-content">' + slide.innerHTML + '</div>';
				}
			}

			slide.innerHTML = '';
			if (captionContent) {
				caption.innerHTML = captionContent;
				slide.appendChild(caption);
			}
		}.bind(this));
	};

	return IIS;

})(IdealImageSlider);