// emotes.js | getting emotes from twitch/bttv

module.exports = App => {

	App.runEmote = function (event) {
		if (!this.config.emojis) return
		let text = event.text.split(" ")
		for (var i = 0; i < text.length; i++) {
			let icon = this.getEmote(text[i])
			if (icon) text[i] = icon
		}
		if (event.text !== text.join(" ")) {
			this.addEmote(event.text, text.join(" "))
		}
	}

	App.getEmote = function (str) {
		let icon = this.findEmote(str)
		if (icon) return this.makeEmote(icon)
	}

	App.addEmote = function (find, replace) {
		let $el = $(".chat .messages .message:last-of-type")[0]
		if ($el.innerHTML.indexOf(find) < 0) return
		let html = `<span>${ replace }</span>`
		let trim = html.split("<span></span>").join("")
		$el.innerHTML = $el.innerHTML.split(find).join(trim)
	}

	App.findEmote = function (str) {
		let raw = str.split(":").join("").toLowerCase()
		let has = str[0] === ":" && str[str.length - 1] === ":"
		return has ? this.icons[raw] : false
	}

	App.makeEmote = function (icon) {
		let link = `${ this.icon_base}/${ icon }/1x`
		return `</span><img class="ts-emote" src="${ link }"><span>`
	}

	App.on("speak", App.runEmote)

}