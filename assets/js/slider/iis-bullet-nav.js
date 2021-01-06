/*
 * Ideal Image Slider: Bullet Navigation Extension v1.0.2
 *
 * By Gilbert Pellegrom
 * http://gilbert.pellegrom.me
 *
 * Copyright (C) 2014 Dev7studios
 * https://raw.githubusercontent.com/gilbitron/Ideal-Image-Slider/master/LICENSE
 */

(function(IIS) {
	"use strict";

	var _updateActiveBullet = function(slider, activeIndex) {
		var bullets = slider._attributes.bulletNav.querySelectorAll('a');
		if (!bullets) return;

		Array.prototype.forEach.call(bullets, function(bullet, i) {
			IIS._removeClass(bullet, 'iis-bullet-active');
			bullet.setAttribute('aria-selected', 'false');
			if (i === activeIndex) {
				IIS._addClass(bullet, 'iis-bullet-active');
				bullet.setAttribute('aria-selected', 'true');
			}
		}.bind(this));
	};

	IIS.Slider.prototype.addBulletNav = function() {
		IIS._addClass(this._attributes.container, 'iis-has-bullet-nav');

		// Create bullet nav
		var bulletNav = document.createElement('div');
		IIS._addClass(bulletNav, 'iis-bullet-nav');
		bulletNav.setAttribute('role', 'tablist');

		// Create bullets
		Array.prototype.forEach.call(this._attributes.slides, function(slide, i) {
			var bullet = document.createElement('a');
			bullet.innerHTML = i + 1;
			bullet.setAttribute('role', 'tab');

			bullet.addEventListener('click', function() {
				if (IIS._hasClass(this._attributes.container, this.settings.classes.animating)) return false;
				this.stop();
				this.gotoSlide(i + 1);
			}.bind(this));

			bulletNav.appendChild(bullet);
		}.bind(this));

		this._attributes.bulletNav = bulletNav;
		this._attributes.container.appendChild(bulletNav);
		_updateActiveBullet(this, 0);

		// Hook up to afterChange events
		var origAfterChange = this.settings.afterChange;
		var afterChange = function() {
			var slides = this._attributes.slides,
				index = slides.indexOf(this._attributes.currentSlide);
			_updateActiveBullet(this, index);
			return origAfterChange();
		}.bind(this);
		this.settings.afterChange = afterChange;
	};

	return IIS;

})(IdealImageSlider);