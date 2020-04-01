const MENU_ICON = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
<style type="text/css">
	.st0{opacity:0.15;enable-background:new    ;}
	.st1{fill:{{backcolor}};}
	.st2{fill:{{fillcolor}};}
	.st3{fill:{{fillcolor}};stroke:{{fillcolor}};stroke-width:0.5;stroke-miterlimit:10;}
	.st4{fill:{{fillcolor}};stroke:{{fillcolor}};stroke-width:0.25;stroke-miterlimit:10;}
</style>
<g id="Layer_2_1_">
	<path class="st0" d="M14.4,1.3c-5.1-0.5-9.6,3-10.1,8s3.1,8.9,7.8,14c5.6-3.9,10-7,10.6-12C23.1,6.4,19.4,1.9,14.4,1.3z"/>
	<ellipse class="st1" cx="12" cy="10.3" rx="8.5" ry="8.5"/>
</g>
<g id="Layer_1_1_">
	<path class="st2" d="M12,0.9c-5.1,0-9.2,4-9.2,9c0,5.1,4,8.5,9.2,13.1c5.2-4.5,9.2-8,9.2-13.1C21.2,4.9,17.1,0.9,12,0.9z M12,18
		c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,18,12,18z"/>
	<g>
		<polygon class="st3" points="6.5,7.2 6.5,13 12.5,15.9 12.5,10.4 17,8.1 17,12.9 17.8,13.2 17.8,13.2 17.8,6.9 11.7,9.9 
			11.7,14.7 7.3,12.5 7.3,7.7 13.1,4.6 13.1,4.6 12.3,4.1 		"/>
		<polygon class="st4" points="15.7,5.7 14.8,5.3 9,8.5 9,10.1 9.8,10.5 9.8,8.9 		"/>
	</g>
	<polygon class="st1" points="18.2,6.6 10.6,3.6 14.6,3.4 	"/>
</g>
</svg>
`

export const MENU_ICONS = ['black', 'red', 'blue', 'yellow', 'orange', 'tomato'].map(
  color =>
    'data:image/svg+xml;charset=UTF-8;base64,' +
    btoa(MENU_ICON.replace('{{fillcolor}}', color).replace('{{backcolor}}', 'white'))
)

export const FOCUS_MENU_ICONS = ['black', 'red', 'blue', 'yellow', 'orange', 'tomato'].map(
  color =>
    'data:image/svg+xml;charset=UTF-8;base64,' +
    btoa(MENU_ICON.replace('{{fillcolor}}', color).replace('{{backcolor}}', 'navy'))
)
