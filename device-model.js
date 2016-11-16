'use strict';

var models = require("./iphone-models.js");
var iosDevices = require('ios-device-list');

class DeviceModel {
    static headers() {
        return ['Model code','Model','Color','GB','Carrier','Display'];
    }

	constructor(modelCode) {
		this._modelCode = modelCode;
		// this._modelObj = models.getModel(modelCode);
		var model5char = this._modelCode.substring(0, 4);
		var iphone7plusList = iosDevices.deviceByModel(model5char, "iphone", { contains: true, caseInsensitive: true });
		// console.log(this._modelCode +' '+ iphone7plusList);
		if (iphone7plusList && iphone7plusList.length > 0) {
			var phone = iphone7plusList[0];
			this._generation = phone.Generation;
			this._storage = phone.Storage;
			this._color = phone.Color;
			this._carrier = models.iPhoneCarrierMap[this._modelCode];
		}
	}
	
	get modelCode() {
		return this._modelCode;
	}
	get modelName() {
		if (this._modelObj)
			return 'iPhone 7+ ' + this._modelObj.g + 'gb ' + this._modelObj.c + ' ' + this._modelObj.p;
		return this._generation + ' ' + this._storage + ' ' + this._color + ' ' + this._carrier; 
	}
	get color() {
		if (this._modelObj) return this._modelObj.c;
		return this._color;
	}
	get carrier() {
		if (this._modelObj) return this._modelObj.p;
		return this._carrier;
	}
	get storage() {
		if (this._modelObj) return this._modelObj.g;
		return this._storage;
	}
	get display() {
		return '5.5 inch display';
	}
}

module.exports = DeviceModel;
